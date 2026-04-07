using System.Text.Json;
using EbookAdmin.Models;

namespace EbookAdmin.Services;

public class JsonEbookRepository
{
    private readonly IWebHostEnvironment _environment;
    private readonly JsonSerializerOptions _jsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        PropertyNameCaseInsensitive = true
    };

    public JsonEbookRepository(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public string EbooksFilePath => ResolveRepoPath("public", "data", "ebooks.json");
    public string TemplatesFilePath => ResolveRepoPath("public", "data", "pdf-templates.json");

    public async Task<List<EbookRecord>> GetAllAsync()
    {
        return await ReadListAsync<EbookRecord>(EbooksFilePath);
    }

    public async Task<List<PdfTemplateOption>> GetTemplatesAsync()
    {
        return await ReadListAsync<PdfTemplateOption>(TemplatesFilePath);
    }

    public async Task SaveAllAsync(IEnumerable<EbookRecord> ebooks)
    {
        var directory = Path.GetDirectoryName(EbooksFilePath);
        if (!string.IsNullOrWhiteSpace(directory))
        {
            Directory.CreateDirectory(directory);
        }

        var json = JsonSerializer.Serialize(ebooks, _jsonOptions);
        await File.WriteAllTextAsync(EbooksFilePath, json);
    }

    private async Task<List<T>> ReadListAsync<T>(string path)
    {
        if (!File.Exists(path))
        {
            return [];
        }

        await using var stream = File.OpenRead(path);
        var data = await JsonSerializer.DeserializeAsync<List<T>>(stream, _jsonOptions);
        return data ?? [];
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
