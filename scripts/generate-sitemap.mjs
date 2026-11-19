import fs from 'node:fs';
import pathFs from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectPrerenderRoutes } from './lib/collect-routes.mjs';

const __dirname = pathFs.dirname(fileURLToPath(import.meta.url));
const root = pathFs.join(__dirname, '..');

const origin = process.env.VITE_PUBLIC_SITE_URL || 'https://sanddollardesign.co.za';
const base = origin.replace(/\/$/, '');
const lastmod = new Date().toISOString().slice(0, 10);

const urls = collectPrerenderRoutes();

function priorityFor(p) {
  if (p === '/') return '1.0';
  if (['/work', '/blog'].includes(p)) return '0.9';
  if (['/about', '/contact', '/testimonials'].includes(p)) return '0.85';
  if (p.startsWith('/article/') || p.startsWith('/project/')) return '0.7';
  return '0.8';
}

function changefreqFor(p) {
  if (p.startsWith('/article/') || p.startsWith('/project/')) return 'monthly';
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

const publicPath = pathFs.join(root, 'public/sitemap.xml');
fs.writeFileSync(publicPath, xml, 'utf8');

const distPath = pathFs.join(root, 'dist/sitemap.xml');
if (fs.existsSync(pathFs.dirname(distPath)) || fs.existsSync(pathFs.join(root, 'dist'))) {
  fs.writeFileSync(distPath, xml, 'utf8');
}

console.log('Wrote sitemap.xml with', urls.length, 'URLs → public/ (+ dist/ when present).');