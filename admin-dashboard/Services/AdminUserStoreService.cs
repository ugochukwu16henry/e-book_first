using System.Text.Json;
using EbookAdmin.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace EbookAdmin.Services;

public class AdminUserStoreService
{
    private readonly IWebHostEnvironment _environment;
    private readonly IOptions<AdminCredentialsOptions> _seedOptions;
    private readonly PasswordHasher<AdminUserRecord> _passwordHasher = new();
    private readonly JsonSerializerOptions _jsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        PropertyNameCaseInsensitive = true
    };
    private readonly SemaphoreSlim _syncLock = new(1, 1);

    public AdminUserStoreService(IWebHostEnvironment environment, IOptions<AdminCredentialsOptions> seedOptions)
    {
        _environment = environment;
        _seedOptions = seedOptions;
    }

    public string FilePath => ResolveRepoPath("content", "admin-users.json");

    public async Task<AdminUsersStore> GetStoreAsync()
    {
        await EnsureStoreExistsAsync();

        await _syncLock.WaitAsync();
        try
        {
            return await ReadStoreUnsafeAsync();
        }
        finally
        {
            _syncLock.Release();
        }
    }

    public async Task SaveStoreAsync(AdminUsersStore store)
    {
        NormalizeStore(store);
        EnsureValidStore(store);

        var directory = Path.GetDirectoryName(FilePath);
        if (!string.IsNullOrWhiteSpace(directory))
        {
            Directory.CreateDirectory(directory);
        }

        var json = JsonSerializer.Serialize(store, _jsonOptions);

        await _syncLock.WaitAsync();
        try
        {
            await File.WriteAllTextAsync(FilePath, json);
        }
        finally
        {
            _syncLock.Release();
        }
    }

    public async Task SaveUserAsync(AdminUserRecord user, string? newPassword = null)
    {
        var store = await GetStoreAsync();
        var existing = store.Users.FirstOrDefault(item => string.Equals(item.Id, user.Id, StringComparison.OrdinalIgnoreCase));
        var isNewUser = existing is null;

        if (isNewUser)
        {
            existing = new AdminUserRecord
            {
                Id = string.IsNullOrWhiteSpace(user.Id) ? Guid.NewGuid().ToString("N") : user.Id
            };
            store.Users.Add(existing);
        }

        existing!.DisplayName = string.IsNullOrWhiteSpace(user.DisplayName) ? user.Email.Trim() : user.DisplayName.Trim();
        existing.Email = user.Email.Trim();
        existing.Disabled = user.Disabled;
        existing.Roles = NormalizeRoles(user.Roles);
        existing.UpdatedUtc = DateTimeOffset.UtcNow;

        if (!string.IsNullOrWhiteSpace(newPassword))
        {
            existing.PasswordHash = _passwordHasher.HashPassword(existing, newPassword);
        }
        else if (isNewUser && string.IsNullOrWhiteSpace(existing.PasswordHash))
        {
            throw new InvalidOperationException("A password is required for a new admin user.");
        }

        await SaveStoreAsync(store);
    }

    public async Task DeleteUserAsync(string userId)
    {
        var store = await GetStoreAsync();
        var removed = store.Users.RemoveAll(user => string.Equals(user.Id, userId, StringComparison.OrdinalIgnoreCase));

        if (removed == 0)
        {
            return;
        }

        await SaveStoreAsync(store);
    }

    public PasswordVerificationResult VerifyPassword(AdminUserRecord user, string password)
    {
        if (string.IsNullOrWhiteSpace(user.PasswordHash))
        {
            return PasswordVerificationResult.Failed;
        }

        return _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
    }

    public string HashPassword(AdminUserRecord user, string password)
    {
        return _passwordHasher.HashPassword(user, password);
    }

    private async Task EnsureStoreExistsAsync()
    {
        if (File.Exists(FilePath))
        {
            return;
        }

        var seededStore = new AdminUsersStore
        {
            IdleTimeoutMinutes = Math.Clamp(_seedOptions.Value.IdleTimeoutMinutes, 5, 1440),
            Users = []
        };

        foreach (var configuredUser in _seedOptions.Value.Users ?? [])
        {
            if (string.IsNullOrWhiteSpace(configuredUser.Email) || string.IsNullOrWhiteSpace(configuredUser.Password))
            {
                continue;
            }

            var user = new AdminUserRecord
            {
                Id = Guid.NewGuid().ToString("N"),
                Email = configuredUser.Email.Trim(),
                DisplayName = string.IsNullOrWhiteSpace(configuredUser.DisplayName) ? configuredUser.Email.Trim() : configuredUser.DisplayName.Trim(),
                Roles = NormalizeRoles(configuredUser.Roles),
                Disabled = configuredUser.Disabled,
                UpdatedUtc = DateTimeOffset.UtcNow
            };

            user.PasswordHash = HashPassword(user, configuredUser.Password);
            seededStore.Users.Add(user);
        }

        if (seededStore.Users.Count == 0)
        {
            throw new InvalidOperationException("No seeded admin users were found. Add at least one admin in appsettings.json.");
        }

        await SaveStoreAsync(seededStore);
    }

    private async Task<AdminUsersStore> ReadStoreUnsafeAsync()
    {
        if (!File.Exists(FilePath))
        {
            return new AdminUsersStore
            {
                IdleTimeoutMinutes = Math.Clamp(_seedOptions.Value.IdleTimeoutMinutes, 5, 1440),
                Users = []
            };
        }

        await using var stream = File.OpenRead(FilePath);
        var store = await JsonSerializer.DeserializeAsync<AdminUsersStore>(stream, _jsonOptions) ?? new AdminUsersStore();
        NormalizeStore(store);
        return store;
    }

    private void NormalizeStore(AdminUsersStore store)
    {
        store.IdleTimeoutMinutes = Math.Clamp(store.IdleTimeoutMinutes, 5, 1440);
        store.Users ??= [];

        foreach (var user in store.Users)
        {
            user.Id = string.IsNullOrWhiteSpace(user.Id) ? Guid.NewGuid().ToString("N") : user.Id;
            user.Email = user.Email.Trim();
            user.DisplayName = string.IsNullOrWhiteSpace(user.DisplayName) ? user.Email : user.DisplayName.Trim();
            user.Roles = NormalizeRoles(user.Roles);
        }
    }

    private void EnsureValidStore(AdminUsersStore store)
    {
        if (store.Users.Count == 0)
        {
            throw new InvalidOperationException("At least one admin user is required.");
        }

        var duplicateEmail = store.Users
            .GroupBy(user => user.Email.Trim(), StringComparer.OrdinalIgnoreCase)
            .FirstOrDefault(group => !string.IsNullOrWhiteSpace(group.Key) && group.Count() > 1);

        if (duplicateEmail is not null)
        {
            throw new InvalidOperationException($"Duplicate admin email found: {duplicateEmail.Key}");
        }

        if (!store.Users.Any(user => !user.Disabled && user.Roles.Contains("SuperAdmin", StringComparer.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException("At least one active SuperAdmin must remain.");
        }

        foreach (var user in store.Users)
        {
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                throw new InvalidOperationException("Every admin user must have an email address.");
            }

            if (string.IsNullOrWhiteSpace(user.PasswordHash))
            {
                throw new InvalidOperationException($"The admin user '{user.Email}' is missing a password.");
            }
        }
    }

    private static List<string> NormalizeRoles(IEnumerable<string>? roles)
    {
        var normalized = (roles ?? [])
            .Where(role => !string.IsNullOrWhiteSpace(role))
            .Select(role => role.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (normalized.Count == 0)
        {
            normalized.Add("Editor");
        }

        return normalized;
    }

    private string ResolveRepoPath(params string[] segments)
    {
        var path = _environment.ContentRootPath;
        path = Path.Combine(path, "..");

        foreach (var segment in segments)
        {
            path = Path.Combine(path, segment);
        }

        return Path.GetFullPath(path);
    }
}
