using EbookAdmin.Models;
using Microsoft.AspNetCore.Identity;

namespace EbookAdmin.Services;

public class AdminAuthService
{
    private readonly AdminUserStoreService _userStore;

    public AdminAuthService(AdminUserStoreService userStore)
    {
        _userStore = userStore;
    }

    public async Task<IReadOnlyList<AdminUserRecord>> GetUsersAsync()
    {
        var store = await _userStore.GetStoreAsync();
        return store.Users
            .OrderBy(user => user.DisplayName, StringComparer.OrdinalIgnoreCase)
            .ThenBy(user => user.Email, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    public async Task<AdminUserRecord?> ValidateAsync(string email, string password)
    {
        var store = await _userStore.GetStoreAsync();
        var user = store.Users.FirstOrDefault(candidate =>
            !candidate.Disabled &&
            string.Equals(candidate.Email, email, StringComparison.OrdinalIgnoreCase));

        if (user is null)
        {
            return null;
        }

        var result = _userStore.VerifyPassword(user, password);
        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        if (result == PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.PasswordHash = _userStore.HashPassword(user, password);
            user.UpdatedUtc = DateTimeOffset.UtcNow;
            await _userStore.SaveStoreAsync(store);
        }

        return user;
    }

    public async Task<TimeSpan> GetIdleTimeoutAsync()
    {
        var store = await _userStore.GetStoreAsync();
        return TimeSpan.FromMinutes(Math.Clamp(store.IdleTimeoutMinutes, 5, 1440));
    }

    public Task SaveUserAsync(AdminUserRecord user, string? newPassword = null)
        => _userStore.SaveUserAsync(user, newPassword);

    public Task DeleteUserAsync(string userId)
        => _userStore.DeleteUserAsync(userId);

    public async Task UpdateIdleTimeoutAsync(int minutes)
    {
        var store = await _userStore.GetStoreAsync();
        store.IdleTimeoutMinutes = Math.Clamp(minutes, 5, 1440);
        await _userStore.SaveStoreAsync(store);
    }

    public string GetStoragePath() => _userStore.FilePath;
}
