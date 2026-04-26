import fs from 'node:fs';
import path from 'node:url';
import pathFs from 'node:path';

const __dirname = pathFs.dirname(path.fileURLToPath(import.meta.url));
const root = pathFs.join(__dirname, '..');
const all = JSON.parse(
  fs.readFileSync(pathFs.join(root, 'src/data/marketingPages/generated/allContent.json'), 'utf8'),
);
const origin = process.env.VITE_PUBLIC_SITE_URL || 'https://sanddollardesign.co.za';
const base = origin.replace(/\/$/, '');

const staticPaths = ['/', '/work', '/blog', '/sanddollar-admin'];
const marketing = Object.keys(all).map((slug) => `/${slug}`);

const urls = [...staticPaths, ...marketing];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (p) => `  <url>
    <loc>${base}${p === '/' ? '/' : p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(pathFs.join(root, 'public/sitemap.xml'), xml, 'utf8');
console.log('sitemap urls', urls.length);
