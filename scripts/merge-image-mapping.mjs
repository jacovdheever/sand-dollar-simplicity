// Parses generated/imageMapping.txt → pageAssets.json (hero + body image rows)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const txt = fs.readFileSync(path.join(root, 'src/data/marketingPages/generated/imageMapping.txt'), 'utf8');
const lines = txt.split(/\r?\n/);

/** @type {Record<string, { hero?: { file: string; alt: string }; body: { file: string; placement: string; alt: string }[] }>} */
const assets = {};
let slug = null;

function isSlug(value) {
  return /^\/[a-z0-9\-/]+$/i.test(value) && !value.includes(' ');
}

for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const line = raw.trim();
  if (isSlug(line)) {
    slug = line.replace(/^\//, '').replace(/\/$/, '');
    if (!assets[slug]) assets[slug] = { body: [] };
    continue;
  }
  if (!slug) continue;
  if (line === 'Image file' || line === 'Placement' || line === 'Alt text') continue;
  if (!line) continue;

  const placement = lines[i + 1]?.trim();
  const alt = lines[i + 2]?.trim();
  if (!placement || !alt) continue;
  if (isSlug(placement)) continue;
  if (/^\d{2}\s+—/.test(line)) continue;
  if (line === 'Complete Image Inventory (76 assets)') break;
  if (placement === 'Image file' || alt === 'Placement') continue;

  const file = line;
  if (placement.startsWith('HERO')) {
    assets[slug].hero = { file, alt };
  } else {
    assets[slug].body.push({ file, placement, alt });
  }
  i += 2;
}

const outPath = path.join(root, 'src/data/marketingPages/generated/pageAssets.json');
fs.writeFileSync(outPath, JSON.stringify(assets, null, 2), 'utf8');
console.log('pageAssets slugs', Object.keys(assets).length);
