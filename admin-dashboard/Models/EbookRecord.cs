using System.Text.Json.Serialization;

namespace EbookAdmin.Models;

public class EbookRecord
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Badge { get; set; } = "New";
    public string Price { get; set; } = "$0";
    public string Format { get; set; } = "Instant PDF download";
    public string CoverImagePath { get; set; } = string.Empty;
    public string PdfFileName { get; set; } = string.Empty;
    public bool ShowPdfDownload { get; set; } = true;
    public string SelarUrl { get; set; } = string.Empty;
    public string TemplateKey { get; set; } = "premium";
    public string Description { get; set; } = string.Empty;
    public string Intro { get; set; } = string.Empty;
    public string ClosingNote { get; set; } = string.Empty;
    public List<ChapterRecord> Chapters { get; set; } = [];
}

public class ChapterRecord
{
    public string Title { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string IllustrationImagePath { get; set; } = string.Empty;
    public string IllustrationCaption { get; set; } = string.Empty;
    public List<string> Prompts { get; set; } = [];
    public string Takeaway { get; set; } = string.Empty;

    [JsonIgnore]
    public string PromptsText
    {
        get => string.Join(Environment.NewLine, Prompts);
        set => Prompts = value?
            .Split(new[] { "\r\n", "\n" }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .ToList() ?? [];
    }
}
