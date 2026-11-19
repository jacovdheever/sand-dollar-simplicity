import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}

function readHtml(relPath) {
  const p = path.join(dist, relPath);
  assert(fs.existsSync(p), `Missing ${relPath}`);
  return fs.readFileSync(p, 'utf8');
}

function canonicalCount($) {
  return $('link[rel="canonical"]').length;
}

function main() {
  const og = path.join(dist, 'og-image.jpg');
  assert(fs.existsSync(og), 'dist/og-image.jpg missing');
  assert(fs.statSync(og).size > 5000, 'og-image.jpg too small — not a real image');

  const blogHtml = readHtml('blog/index.html');
  const $blog = load(blogHtml);
  assert(canonicalCount($blog) === 1, `blog: expected 1 canonical, got ${canonicalCount($blog)}`);
  const blogCanon = $blog('link[rel="canonical"]').attr('href');
  assert(blogCanon && !blogCanon.includes('/blog/blog'), `bad blog canonical: ${blogCanon}`);

  const sampleArticle = 'article/ai-in-customer-experience-ux-strategy/index.html';
  if (fs.existsSync(path.join(dist, sampleArticle))) {
    const $a = load(readHtml(sampleArticle));
    assert(canonicalCount($a) === 1, 'article: duplicate canonical');
    assert($a('meta[property="og:type"]').attr('content') === 'article', 'article og:type');
    assert($a('script[type="application/ld+json"]').length >= 1, 'article JSON-LD missing');
  }

  const draftSlug = 'example-weekly-post-draft';
  const articles = JSON.parse(fs.readFileSync(path.join(root, 'public/data/articles.json'), 'utf8'));
  const slugs = (Array.isArray(articles) ? articles : Object.values(articles)).map((a) => a.slug);
  assert(!slugs.includes(draftSlug), `draft slug ${draftSlug} must not be in articles.json`);

  console.log('verify-build-seo: OK');
}

main();