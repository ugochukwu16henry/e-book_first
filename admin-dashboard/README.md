# eBook Admin Dashboard

This Blazor app manages the shared JSON content used by the React storefront and PDF generator.

## Run locally

```bash
cd admin-dashboard
dotnet run
```

Default local URL is typically:

- `https://localhost:7xxx`
- `http://localhost:5xxx`

## What it edits

- `../public/data/ebooks.json`
- `../public/data/pdf-templates.json`

## Workflow

1. Open the Blazor admin dashboard.
2. Add or edit an eBook, chapters, lessons, cover path, and `templateKey`.
3. Save the JSON.
4. Refresh the React storefront at `http://localhost:3000`.
5. Optional: configure a GitHub token in `appsettings.json` and use **Sync to GitHub**.
