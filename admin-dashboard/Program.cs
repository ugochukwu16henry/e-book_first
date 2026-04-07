using System.Net.Http.Headers;
using System.Security.Claims;
using EbookAdmin.Components;
using EbookAdmin.Models;
using EbookAdmin.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddCascadingAuthenticationState();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/login";
        options.AccessDeniedPath = "/login";
        options.Cookie.Name = "ebookadmin.auth";
    });
builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();
builder.Services.Configure<GitHubSyncOptions>(builder.Configuration.GetSection("GitHubSync"));
builder.Services.Configure<AdminCredentialsOptions>(builder.Configuration.GetSection("AdminCredentials"));
builder.Services.AddScoped<JsonEbookRepository>();
builder.Services.AddScoped<GitHubSyncService>();
builder.Services.AddScoped<GitAutomationService>();
builder.Services.AddHttpClient("github", client =>
{
    client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("EbookAdmin", "1.0"));
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github+json"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.MapPost("/auth/login", async (HttpContext context, Microsoft.Extensions.Options.IOptions<AdminCredentialsOptions> credentials) =>
{
    var form = await context.Request.ReadFormAsync();
    var email = form["email"].ToString().Trim();
    var password = form["password"].ToString();
    var returnUrl = form["returnUrl"].ToString();
    var settings = credentials.Value;

    var isValid = string.Equals(email, settings.Email, StringComparison.OrdinalIgnoreCase) && password == settings.Password;
    if (!isValid)
    {
        return Results.LocalRedirect("/login?error=1");
    }

    var claims = new List<Claim>
    {
        new(ClaimTypes.Name, settings.DisplayName),
        new(ClaimTypes.Email, settings.Email),
        new(ClaimTypes.Role, "Admin")
    };

    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
    var principal = new ClaimsPrincipal(identity);
    await context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

    return Results.LocalRedirect(string.IsNullOrWhiteSpace(returnUrl) ? "/" : returnUrl);
}).DisableAntiforgery();

app.MapPost("/auth/logout", async (HttpContext context) =>
{
    await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return Results.LocalRedirect("/login?signedOut=1");
}).DisableAntiforgery();

app.Run();
