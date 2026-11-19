/**
 * Writes public/og-image.jpg — 1200×630 default Open Graph image.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, loadImage } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'public/og-image.jpg');

const W = 1200;
const H = 630;
const BG = '#0c0d10';
const ACCENT = '#f97316';
const TEXT = '#ffffff';

async function main() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = ACCENT;
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, W - 96, H - 96);

  const logoCandidates = [
    path.join(root, 'public/Sand-Dollar_Logo.png'),
    path.join(root, 'public/Sand-Dollar-icon.png'),
  ];
  let logoDrawn = false;
  for (const logoPath of logoCandidates) {
    if (!fs.existsSync(logoPath)) continue;
    try {
      const img = await loadImage(logoPath);
      const maxH = 72;
      const scale = maxH / img.height;
      const w = img.width * scale;
      ctx.drawImage(img, 96, 96, w, maxH);
      logoDrawn = true;
      break;
    } catch {
      /* try next */
    }
  }

  const titleY = logoDrawn ? 220 : 180;
  ctx.fillStyle = TEXT;
  ctx.font = 'bold 52px Inter, system-ui, -apple-system, Segoe UI, sans-serif';
  ctx.fillText('Sand Dollar Design', 96, titleY);

  ctx.fillStyle = ACCENT;
  ctx.font = '36px Inter, system-ui, -apple-system, Segoe UI, sans-serif';
  ctx.fillText('UX · UI · Product Design · AI Development', 96, titleY + 64);

  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '26px Inter, system-ui, -apple-system, sans-serif';
  ctx.fillText('sanddollardesign.co.za', 96, H - 96);

  const buf = canvas.toBuffer('image/jpeg', { quality: 0.92 });
  fs.writeFileSync(outPath, buf);
  console.log('Wrote', outPath, `(${buf.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});