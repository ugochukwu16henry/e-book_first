namespace EbookAdmin.Models;

public class AdminCredentialsOptions
{
    public int IdleTimeoutMinutes { get; set; } = 30;
    public List<AdminUserDefinition> Users { get; set; } = [];
}

public class AdminUserDefinition
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string DisplayName { get; set; } = "Admin";
    public List<string> Roles { get; set; } = ["Editor"];
    public bool Disabled { get; set; }
}

public class AdminUsersStore
{
    public int IdleTimeoutMinutes { get; set; } = 30;
    public List<AdminUserRecord> Users { get; set; } = [];
}

public class AdminUserRecord
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = "Admin";
    public List<string> Roles { get; set; } = ["Editor"];
    public bool Disabled { get; set; }
    public string PasswordHash { get; set; } = string.Empty;
    public DateTimeOffset UpdatedUtc { get; set; } = DateTimeOffset.UtcNow;
}
