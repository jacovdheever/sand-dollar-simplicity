# CLAUDE.md — Sand Dollar Design

## Purpose
Build a world-class, SEO-optimised website for Sand Dollar Design — a UX/UI design consultancy — to generate inbound client leads from the USA, Europe, and South Africa. Every decision (copy, structure, performance, schema, content) should serve that goal.

---

## Project Tree
```
sand-dollar-simplicity/
├── src/                    # React 18 + TypeScript app (edit here)
│   ├── components/         # UI components
│   ├── pages/              # Route-level pages
│   ├── data/               # Static content/data files
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API/Supabase calls
│   ├── types/              # TypeScript types
│   └── utils/              # Helpers
├── public/                 # Static assets (logos, videos, images)
├── dist/                   # Build output — do not edit directly
├── supabase/               # DB config
├── Articles/               # Published articles (.docx) — source material
├── Case Studies/           # Case study content by client
├── content repository/     # Blog posts + case study drafts
├── context/                # Strategy docs and playbooks
├── drafts/                 # Work-in-progress content
└── [*.md files]            # Setup/admin docs (BLOG_SETUP, ADMIN_SYSTEM, etc.)
```

**Stack:** React 18 · TypeScript · Vite 5.4 · Tailwind CSS · Supabase · Node.js server
**Dev:** `npm run dev` → localhost:8080 | **Build:** `npm run build:preview`
**Deploy:** GitHub Actions → production via `deploy-to-production.sh`

---

## Rules of Engagement

1. **SEO first.** Every page needs: unique `<title>` + `<meta description>`, semantic HTML, schema markup (LocalBusiness, Service, Article), and fast Core Web Vitals. Target keywords: UX design, UI design, website audit — for USA/Europe/SA markets.
2. **Lead gen is the metric.** Measure decisions against: will this increase qualified enquiries? CTAs, social proof (case studies, logos), and trust signals are non-negotiable.
3. **Edit `src/`, never `dist/`.** Dist is generated on build.
4. **Content lives in `src/data/` or `content repository/`.** Don't hardcode content in components.
5. **Use existing case studies and articles** in `Articles/` and `Case Studies/` as source material — don't invent credentials.
6. **No breaking changes without asking.** Confirm before restructuring routes, changing component APIs, or touching `supabase/`.
7. **Commit messages:** short imperative, e.g. `add FAQ schema to services page`.

---

## Notes System

**When to take notes:** After any session that adds new features, changes SEO strategy, uncovers bugs, or produces reusable decisions.

**Where:** `context/` folder.

**Format:**
```
# [Topic] — [YYYY-MM-DD]
## What changed / decided
## Why
## Next steps (if any)
```

**New context file when:**
- A new strategic direction is set (e.g. new target market, rebrand)
- A major feature is completed (e.g. blog system, case study CMS)
- Notes in an existing file exceed ~50 lines

**Naming:** `YYYY-MM-DD_Topic_vN.md` (e.g. `2026-03-15_SEO_strategy_v1.md`)
