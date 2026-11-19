---
title: "Example weekly post (draft — do not publish)"
slug: example-weekly-post-draft
draft: true
date: 2099-01-01
description: "Template for the markdown blog workflow. This file must never appear on the live site."
tags:
  - UX
  - template
author: Sand Dollar Design
ogImage: /og-image.jpg
category: Insights
sources:
  - "https://www.nngroup.com/articles/"
---

This file is **intentionally marked `draft: true`**. The build skips it, so it never lands in `articles.json` or the sitemap.

## Weekly publishing flow

1. Copy this file to `content/blog/your-post-slug.md`
2. Set `draft: false`, a real `date`, `title`, `slug`, and `description`
3. Add body markdown and optional hero image under `public/…` referenced by `ogImage`
4. Open a PR — merge triggers deploy on `main`

Posts with a **future** `date` are held until that UTC calendar day (re-deploy on or after that date to publish).