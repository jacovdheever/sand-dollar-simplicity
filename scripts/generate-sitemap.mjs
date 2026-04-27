import fs from 'node:fs';
import pathFs from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = pathFs.dirname(fileURLToPath(import.meta.url));
const root = pathFs.join(__dirname, '..');

/** Matches `generateSlug` in `src/utils/docxParser.ts` for articles without a slug. */
function generateSlug(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const all = JSON.parse(
  fs.readFileSync(pathFs.join(root, 'src/data/marketingPages/generated/allContent.json'), 'utf8'),
);
const projects = JSON.parse(fs.readFileSync(pathFs.join(root, 'public/data/projects.json'), 'utf8'));
const articles = JSON.parse(fs.readFileSync(pathFs.join(root, 'public/data/articles.json'), 'utf8'));

const origin = process.env.VITE_PUBLIC_SITE_URL || 'https://sanddollardesign.co.za';
const base = origin.replace(/\/$/, '');
const lastmod = new Date().toISOString().slice(0, 10);

const staticPaths = ['/', '/work', '/blog', '/about', '/contact', '/testimonials'];
const marketing = Object.keys(all).map((slug) => `/${slug}`);
const projectPaths = Array.isArray(projects) ? projects.map((p) => `/project/${p.slug}`) : [];

const articleList = Array.isArray(articles) ? articles : Object.values(articles);
const articlePaths = articleList
  .map((a) => {
    const slug = a.slug || generateSlug(a.title);
    return slug ? `/article/${slug}` : null;
  })
  .filter(Boolean);

const urls = [...new Set([...staticPaths, ...marketing, ...projectPaths, ...articlePaths])].sort((a, b) => {
  if (a === '/') return -1;
  if (b === '/') return 1;
  return a.localeCompare(b);
});

function priorityFor(p) {
  if (p === '/') return '1.0';
  if (['/work', '/blog', '/projects'].includes(p)) return '0.9';
  if (['/about', '/contact', '/testimonials'].includes(p)) return '0.85';
  if (p.startsWith('/article/') || p.startsWith('/project/')) return '0.7';
  return '0.8';
}

function changefreqFor(p) {
  if (p.startsWith('/article/')) return 'monthly';
  if (p.startsWith('/project/')) return 'monthly';
  return 'weekly';
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((p) => {
    const loc = p === '/' ? `${base}/` : `${base}${p}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreqFor(p)}</changefreq>
    <priority>${priorityFor(p)}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

fs.writeFileSync(pathFs.join(root, 'public/sitemap.xml'), xml, 'utf8');
console.log('Wrote public/sitemap.xml with', urls.length, 'URLs (static + marketing + projects + articles).');
