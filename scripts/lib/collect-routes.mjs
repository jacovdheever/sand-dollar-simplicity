import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateSlug, isPublishedByDate } from './article-publish.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/** Routes to prerender / include in sitemap (no admin, no future-dated posts). */
export function collectPrerenderRoutes(options = {}) {
  const { includeUnpublishedArticles = false } = options;

  const staticPaths = ['/', '/work', '/blog', '/about', '/contact', '/testimonials'];

  const marketingPath = path.join(root, 'src/data/marketingPages/generated/allContent.json');
  const marketing = readJson(marketingPath);
  const marketingPaths = marketing ? Object.keys(marketing).map((slug) => `/${slug}`) : [];

  const projects = readJson(path.join(root, 'public/data/projects.json'));
  const projectPaths = Array.isArray(projects) ? projects.map((p) => `/project/${p.slug}`) : [];

  const articles = readJson(path.join(root, 'public/data/articles.json'));
  const articleList = Array.isArray(articles) ? articles : articles ? Object.values(articles) : [];

  const articlePaths = articleList
    .filter((a) => includeUnpublishedArticles || isPublishedByDate(a.publishDate))
    .map((a) => {
      const slug = a.slug || generateSlug(a.title);
      return slug ? `/article/${slug}` : null;
    })
    .filter(Boolean);

  const combined = [...new Set([...staticPaths, ...marketingPaths, ...projectPaths, ...articlePaths])];
  combined.sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });
  return combined;
}