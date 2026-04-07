namespace EbookAdmin.Models;

public class GitHubSyncOptions
{
    public string Owner { get; set; } = string.Empty;
    public string Repository { get; set; } = string.Empty;
    public string Branch { get; set; } = "main";
    public string Token { get; set; } = string.Empty;
    public string EbooksFilePath { get; set; } = "public/data/ebooks.json";
}

public record GitHubSyncResult(bool Success, string Message);
