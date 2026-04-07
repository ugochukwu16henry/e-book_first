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
