using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using EbookAdmin.Models;
using Microsoft.Extensions.Options;

namespace EbookAdmin.Services;

public class GitHubSyncService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IOptions<GitHubSyncOptions> _options;
    private readonly JsonEbookRepository _repository;

    public GitHubSyncService(
        IHttpClientFactory httpClientFactory,
        IOptions<GitHubSyncOptions> options,
        JsonEbookRepository repository)
    {
        _httpClientFactory = httpClientFactory;
        _options = options;
        _repository = repository;
    }

    public async Task<GitHubSyncResult> SyncEbooksAsync(CancellationToken cancellationToken = default)
    {
        var settings = _options.Value;

        if (string.IsNullOrWhiteSpace(settings.Owner) ||
            string.IsNullOrWhiteSpace(settings.Repository) ||
            string.IsNullOrWhiteSpace(settings.Token))
        {
            return new GitHubSyncResult(
                false,
                "GitHub sync is not configured yet. Add your owner, repository, and token in admin-dashboard/appsettings.json.");
        }

        if (!File.Exists(_repository.EbooksFilePath))
        {
            return new GitHubSyncResult(false, "The shared ebooks.json file could not be found.");
        }

        var client = _httpClientFactory.CreateClient("github");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", settings.Token);

        var requestUrl = $"https://api.github.com/repos/{settings.Owner}/{settings.Repository}/contents/{settings.EbooksFilePath}?ref={settings.Branch}";
        string? sha = null;

        var currentFileResponse = await client.GetAsync(requestUrl, cancellationToken);
        if (currentFileResponse.IsSuccessStatusCode)
        {
            using var document = JsonDocument.Parse(await currentFileResponse.Content.ReadAsStringAsync(cancellationToken));
            if (document.RootElement.TryGetProperty("sha", out var shaProperty))
            {
                sha = shaProperty.GetString();
            }
        }
        else if (currentFileResponse.StatusCode != HttpStatusCode.NotFound)
        {
            var errorBody = await currentFileResponse.Content.ReadAsStringAsync(cancellationToken);
            return new GitHubSyncResult(false, $"GitHub read failed: {errorBody}");
        }

        var localJson = await File.ReadAllTextAsync(_repository.EbooksFilePath, cancellationToken);
        var payload = new Dictionary<string, object?>
        {
            ["message"] = $"Update eBook data {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC",
            ["content"] = Convert.ToBase64String(Encoding.UTF8.GetBytes(localJson)),
            ["branch"] = settings.Branch,
            ["sha"] = sha
        };

        using var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
        var saveResponse = await client.PutAsync(requestUrl, content, cancellationToken);

        if (saveResponse.IsSuccessStatusCode)
        {
            return new GitHubSyncResult(true, "GitHub sync completed successfully. The JSON database is now updated in the repository.");
        }

        var saveError = await saveResponse.Content.ReadAsStringAsync(cancellationToken);
        return new GitHubSyncResult(false, $"GitHub sync failed: {saveError}");
    }
}
