using System.Diagnostics;

namespace EbookAdmin.Services;

public class GitAutomationService
{
    private readonly IWebHostEnvironment _environment;

    public GitAutomationService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<(bool Success, string Message)> CommitAndPushAsync(CancellationToken cancellationToken = default)
    {
        var repoRoot = Path.GetFullPath(Path.Combine(_environment.ContentRootPath, ".."));

        var status = await RunGitAsync("status --porcelain public/data/ebooks.json public/data/pdf-templates.json public/images", repoRoot, cancellationToken);
        if (!status.Success)
        {
            return (false, status.Output);
        }

        if (string.IsNullOrWhiteSpace(status.Output))
        {
            return (true, "Saved locally. No new JSON or image changes were detected for git push.");
        }

        var add = await RunGitAsync("add public/data/ebooks.json public/data/pdf-templates.json public/images", repoRoot, cancellationToken);
        if (!add.Success)
        {
            return (false, add.Output);
        }

        var message = $"content: update ebook library {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC";
        var commit = await RunGitAsync($"commit -m \"{message}\"", repoRoot, cancellationToken);

        var nothingToCommit = commit.Output.Contains("nothing to commit", StringComparison.OrdinalIgnoreCase) ||
                             commit.Output.Contains("no changes added to commit", StringComparison.OrdinalIgnoreCase);

        if (!commit.Success && !nothingToCommit)
        {
            return (false, commit.Output);
        }

        var push = await RunGitAsync("push", repoRoot, cancellationToken);
        if (!push.Success)
        {
            return (false, $"Local save succeeded, but git push failed: {push.Output}");
        }

        return (true, "Saved, committed, and pushed to GitHub successfully.");
    }

    private static async Task<(bool Success, string Output)> RunGitAsync(string arguments, string workingDirectory, CancellationToken cancellationToken)
    {
        var startInfo = new ProcessStartInfo("git", arguments)
        {
            WorkingDirectory = workingDirectory,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };

        using var process = new Process { StartInfo = startInfo };
        process.Start();

        var outputTask = process.StandardOutput.ReadToEndAsync(cancellationToken);
        var errorTask = process.StandardError.ReadToEndAsync(cancellationToken);

        await process.WaitForExitAsync(cancellationToken);

        var output = (await outputTask) + Environment.NewLine + (await errorTask);
        return (process.ExitCode == 0, output.Trim());
    }
}
