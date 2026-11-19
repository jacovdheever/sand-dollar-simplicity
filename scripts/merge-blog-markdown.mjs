/**
 * Merges content/blog/*.md into public/data/articles.json before build.
 * - draft: true → skipped
 * - publishDate in the future → skipped (re-publish on/after that date via deploy)
 * - Does not overwrite existing JSON articles unless markdown has overwrite: true
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';
import { generateSlug, isPublishedByDate } from './lib/article-publish.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogDir = path.join(root, 'content/blog');
const articlesPath = path.join(root, 'public/data/articles.json');

marked.setOptions({ gfm: true, breaks: false });

function estimateReadMinutes(html) {
  const text = String(html || '').replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function loadExistingArticles() {
  if (!fs.existsSync(articlesPath)) return [];
  const raw = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
  return Array.isArray(raw) ? raw : Object.values(raw);
}

function markdownFiles() {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(blogDir, f));
}

function frontmatterToPost(filePath, data, body) {
  const slug = data.slug || generateSlug(data.title);
  if (!data.title || !slug) {
    console.warn(`Skip ${path.basename(filePath)}: missing title or slug`);
    return null;
  }
  if (data.draft === true) {
    console.log(`Skip draft: ${path.basename(filePath)} (${slug})`);
    return null;
  }
  const publishDate = data.date || data.publishDate;
  if (!isPublishedByDate(publishDate)) {
    console.log(`Skip scheduled (future date): ${slug} → ${publishDate}`);
    return null;
  }

  let html = marked.parse(body);
  if (Array.isArray(data.sources) && data.sources.length > 0) {
    const items = data.sources.map((s) => `<li>${s}</li>`).join('');
    html += `<h3>Sources</h3><ul>${items}</ul>`;
  }

  const excerpt =
    data.description ||
    data.excerpt ||
    body.replace(/[#>*`\-\[\]]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);

  const ogImage = data.ogImage || data.image;
  const featuredImage = ogImage
    ? ogImage.startsWith('/') || ogImage.startsWith('http')
      ? ogImage
      : `/${ogImage.replace(/^\//, '')}`
    : undefined;

  return {
    id: slug,
    title: data.title,
    slug,
    excerpt,
    content: html,
    author: data.author || 'Sand Dollar Design',
    publishDate: publishDate || new Date().toISOString().slice(0, 10),
    category: data.category || 'Insights',
    tags: Array.isArray(data.tags) ? data.tags : data.tags ? String(data.tags).split(',').map((t) => t.trim()) : [],
    featuredImage,
    imageAlt: data.imageAlt || data.title,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription || data.description,
    openGraphTitle: data.openGraphTitle,
    openGraphDescription: data.openGraphDescription,
    readTime: data.readTime || estimateReadMinutes(html),
    featured: data.featured === true,
  };
}

function main() {
  const existing = loadExistingArticles();
  const bySlug = new Map(existing.map((a) => [a.slug || generateSlug(a.title), a]));

  let added = 0;
  let updated = 0;
  let skipped = 0;

  for (const file of markdownFiles()) {
    const source = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(source);
    const post = frontmatterToPost(file, data, content);
    if (!post) {
      skipped++;
      continue;
    }
    const prior = bySlug.get(post.slug);
    if (prior && data.overwrite !== true) {
      console.log(`Keep existing JSON article (set overwrite: true to replace): ${post.slug}`);
      skipped++;
      continue;
    }
    if (prior) updated++;
    else added++;
    bySlug.set(post.slug, post);
  }

  const merged = [...bySlug.values()];
  fs.writeFileSync(articlesPath, JSON.stringify(merged, null, 2), 'utf8');
  console.log(
    `articles.json: ${merged.length} total (+${added} new markdown, ${updated} overwritten, ${skipped} skipped)`,
  );
}

main();