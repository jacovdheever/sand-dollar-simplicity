# Blog posts (markdown)

Weekly posts are added as a single markdown file under `content/blog/`. The production build merges them into `public/data/articles.json`; you do not edit that JSON by hand for new posts.

## Add a post

1. Create `content/blog/<slug>.md` with YAML front-matter:

```yaml
---
title: "Your headline"
slug: your-url-slug
date: 2026-11-20          # YYYY-MM-DD; future dates stay unpublished until deploy on/after that day (UTC)
description: "Meta description for SEO and cards."
draft: false
author: Sand Dollar Design
category: Insights
tags: [UX, Product design]
ogImage: /images/blog/your-hero.jpg   # optional; falls back to /og-image.jpg
sources:                              # optional; rendered as a Sources list
  - "https://example.com/reference"
---
```

2. Write the article body in Markdown below the front-matter.
3. Put images in `public/` and reference them with root-relative paths (e.g. `/images/blog/...`).
4. Open a PR to `main` (do **not** push to `main` or `Test` directly).

## Rules

| Front-matter | Effect |
|--------------|--------|
| `draft: true` | Never published |
| `date` in the future | Omitted until that UTC date (trigger a deploy on or after that date) |
| `overwrite: true` | Replace an existing `articles.json` entry with the same `slug` (default: skip to protect legacy posts) |

See `content/blog/example-weekly-post-draft.md` for a non-publishing template (`draft: true`).

## Optional: scheduled rebuild

GitHub Actions does not run on a schedule unless you add a `workflow_dispatch` or cron job. To auto-publish dated posts at midnight, you could add a weekly/daily `schedule` trigger to `.github/workflows/deploy.yml` — **not enabled in this repo**; ask before turning cron on in production.