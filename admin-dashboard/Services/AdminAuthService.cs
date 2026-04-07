using EbookAdmin.Models;
using Microsoft.Extensions.Options;

namespace EbookAdmin.Services;

public class AdminAuthService
{
    private readonly IOptions<AdminCredentialsOptions> _options;

    public AdminAuthService(IOptions<AdminCredentialsOptions> options)
    {
        _options = options;
    }

    public IReadOnlyList<AdminUserDefinition> GetUsers()
    {
        return _options.Value.Users ?? [];
    }

    public AdminUserDefinition? Validate(string email, string password)
    {
        return GetUsers().FirstOrDefault(user =>
            !user.Disabled &&
            string.Equals(user.Email, email, StringComparison.OrdinalIgnoreCase) &&
            user.Password == password);
    }

    public TimeSpan GetIdleTimeout()
    {
        var minutes = Math.Clamp(_options.Value.IdleTimeoutMinutes, 5, 1440);
        return TimeSpan.FromMinutes(minutes);
    }
}
