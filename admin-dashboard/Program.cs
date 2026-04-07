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
        options.ExpireTimeSpan = TimeSpan.FromMinutes(Math.Clamp(builder.Configuration.GetValue<int?>("AdminCredentials:IdleTimeoutMinutes") ?? 30, 5, 1440));
        options.SlidingExpiration = true;
        options.Cookie.HttpOnly = true;
    });
builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();
builder.Services.Configure<GitHubSyncOptions>(builder.Configuration.GetSection("GitHubSync"));
builder.Services.Configure<AdminCredentialsOptions>(builder.Configuration.GetSection("AdminCredentials"));
builder.Services.AddScoped<AdminUserStoreService>();
builder.Services.AddScoped<AdminAuthService>();
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

app.MapPost("/auth/login", async (HttpContext context, AdminAuthService authService) =>
{
    var form = await context.Request.ReadFormAsync();
    var email = form["email"].ToString().Trim();
    var password = form["password"].ToString();
    var returnUrl = form["returnUrl"].ToString();

    var user = await authService.ValidateAsync(email, password);
    if (user is null)
    {
        return Results.LocalRedirect("/login?error=1");
    }

    var claims = new List<Claim>
    {
        new(ClaimTypes.Name, user.DisplayName),
        new(ClaimTypes.Email, user.Email),
        new(ClaimTypes.Role, "Admin")
    };

    foreach (var role in user.Roles.Distinct(StringComparer.OrdinalIgnoreCase))
    {
        claims.Add(new Claim(ClaimTypes.Role, role));
    }

    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
    var principal = new ClaimsPrincipal(identity);
    var authProperties = new AuthenticationProperties
    {
        IsPersistent = false,
        AllowRefresh = true,
        ExpiresUtc = DateTimeOffset.UtcNow.Add(await authService.GetIdleTimeoutAsync())
    };

    await context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, authProperties);

    return Results.LocalRedirect(string.IsNullOrWhiteSpace(returnUrl) ? "/" : returnUrl);
}).DisableAntiforgery();

app.MapPost("/auth/logout", async (HttpContext context) =>
{
    await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return Results.LocalRedirect("/login?signedOut=1");
}).DisableAntiforgery();

app.Run();
