/**
 * Post-build static HTML per route (GitHub Pages returns HTTP 200 + crawlers see head meta).
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { collectPrerenderRoutes } from './lib/collect-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const PORT = Number(process.env.PRERENDER_PORT || 4173);
const PREVIEW_HOST = '127.0.0.1';

function writeRouteHtml(route, html) {
  if (route === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html, 'utf8');
    return;
  }
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  const outFile = path.join(dist, clean, 'index.html');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html, 'utf8');
}

function startPreview() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'npx',
      ['vite', 'preview', '--host', PREVIEW_HOST, '--port', String(PORT), '--strictPort'],
      { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, BROWSER: 'none' } },
    );
    let ready = false;
    const onData = (chunk) => {
      const s = chunk.toString();
      if (!ready && /Local:\s*http/.test(s)) {
        ready = true;
        resolve(child);
      }
    };
    child.stdout.on('data', onData);
    child.stderr.on('data', onData);
    child.on('error', reject);
    setTimeout(() => {
      if (!ready) reject(new Error('vite preview did not become ready in time'));
    }, 60_000);
  });
}

async function waitForRoute(page, route) {
  const base = `http://${PREVIEW_HOST}:${PORT}`;
  const url = route === '/' ? `${base}/` : `${base}${route}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 120_000 });

  if (route.startsWith('/article/')) {
    await page.waitForFunction(
      () => {
        const t = document.title || '';
        return t && !/loading article/i.test(t) && !/article not found/i.test(t);
      },
      { timeout: 90_000 },
    );
  } else if (route.startsWith('/project/')) {
    await page.waitForFunction(
      () => {
        const t = document.title || '';
        return t && !/loading project/i.test(t);
      },
      { timeout: 90_000 },
    );
  } else {
    await page.waitForSelector('#root', { timeout: 30_000 });
    await new Promise((r) => setTimeout(r, 400));
  }
}

async function main() {
  if (!fs.existsSync(dist)) {
    console.error('dist/ missing — run vite build first');
    process.exit(1);
  }

  const spaShell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  const routes = collectPrerenderRoutes();
  console.log(`Prerendering ${routes.length} routes…`);

  const preview = await startPreview();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    for (const route of routes) {
      process.stdout.write(`  ${route}… `);
      try {
        await waitForRoute(page, route);
        const html = await page.content();
        writeRouteHtml(route, html);
        console.log('ok');
      } catch (err) {
        console.log('failed:', err.message);
      }
    }
  } finally {
    await browser.close();
    preview.kill('SIGTERM');
  }

  fs.writeFileSync(path.join(dist, '404.html'), spaShell, 'utf8');
  console.log('Wrote SPA fallback 404.html');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});