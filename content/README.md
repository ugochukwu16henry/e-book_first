# JSON content backend structure

This repository now treats **GitHub as the database** by storing eBook content in versioned JSON files.

## Source files

- `public/data/ebooks.json` — all eBooks, chapters, lessons, cover paths, Selar links, and PDF template choice.
- `public/data/pdf-templates.json` — selectable PDF design presets.
- `admin-dashboard/` — Blazor admin UI for managing the JSON content.

## Flow

1. Update eBook content from the Blazor admin dashboard.
2. Save changes back into `public/data/ebooks.json`.
3. Commit/push to GitHub.
4. Frontend storefront and downloadable PDFs reflect the same content source.

## Per-book fields

- `slug`
- `title`
- `price`
- `coverImagePath`
- `selarUrl`
- `templateKey`
- `chapters[]`
- `prompts[]`
- `takeaway`
