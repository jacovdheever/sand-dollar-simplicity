// One-off generator: reads website-copy/**/*.docx via macOS textutil,
// emits src/data/marketingPages/generated/allContent.json
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const copyRoot = path.join(repoRoot, 'website-copy');

function walkDocx(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkDocx(p, acc);
    else if (name.endsWith('.docx') && !name.startsWith('~') && name !== 'Image_Asset_Mapping.docx' && name !== '00_Master_Content_Plan.docx') {
      acc.push(p);
    }
  }
  return acc;
}

function categoryFromPath(filePath) {
  if (filePath.includes(`${path.sep}01_Core_Services${path.sep}`)) return 'core_service';
  if (filePath.includes(`${path.sep}02_Industries${path.sep}`)) return 'industry';
  if (filePath.includes(`${path.sep}03_Geo_Pages${path.sep}`)) return 'geo';
  if (filePath.includes(`${path.sep}04_Insights${path.sep}`)) return 'insight';
  if (filePath.includes(`${path.sep}05_Case_Studies${path.sep}`)) return 'case_study';
  return 'core_service';
}

function templateFor(cat) {
  if (cat === 'geo') return 'geo';
  if (cat === 'insight') return 'insight';
  if (cat === 'case_study') return 'caseStudy';
  return 'service';
}

function extractSlug(text) {
  const m = text.match(/URL:\s*([^\s]+)/i);
  if (m && m[1].trim() && m[1].trim() !== '') {
    let u = m[1].trim();
    if (u.startsWith('/')) u = u.slice(1);
    u = u.replace(/^projects\//, '');
    return u.replace(/\/$/, '') || null;
  }
  const m2 = text.match(/URL:\s*\n\s*(\/[^\s]+)/i);
  if (m2) {
    let u = m2[1].trim();
    if (u.startsWith('/')) u = u.slice(1);
    u = u.replace(/^projects\//, '');
    return u.replace(/\/$/, '') || null;
  }
  return null;
}

function extractSeoTitle(text) {
  const m = text.match(/SEO Title:\s*([^\n]+)/i);
  return m ? m[1].trim() : '';
}

function extractMeta(text) {
  const m = text.match(/Meta Description:\s*([^\n]+)/i);
  return m ? m[1].trim() : '';
}

function extractH1(text, seoTitle) {
  const afterMeta = text.replace(/^[\s\S]*?Meta Description:[^\n]+\n*/i, '');
  const lines = afterMeta.split('\n').map((l) => l.trim()).filter(Boolean);
  const skipLine = (line) =>
    !line ||
    /^url:$/i.test(line) ||
    /^seo title:$/i.test(line) ||
    /^meta description:$/i.test(line) ||
    line.startsWith('/') ||
    /^https?:/i.test(line);
  for (const line of lines) {
    if (skipLine(line)) continue;
    if (seoTitle && line === seoTitle) continue;
    return line;
  }
  return '';
}

function extractFaqs(text) {
  const faqMatch = text.split(/Frequently Asked Questions|FAQ/i);
  if (faqMatch.length < 2) return [];
  let block = faqMatch[1];
  const cut = block.split(/Internal Link/i)[0];
  block = cut;
  const faqs = [];
  const parts = block.split(/\n(?=Q[:：])/i);
  for (const part of parts) {
    const p = part.trim();
    if (!p) continue;
    const qm = p.match(/^Q[:：]?\s*(.+?)(?:\n|$)/i);
    if (!qm) continue;
    const question = qm[1].trim();
    const answer = p.slice(qm[0].length).trim();
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

function labelForHref(href) {
  const map = {
    '/ux-research-agency': 'UX Research Agency',
    '/ux-ui-design-services': 'UX/UI Design Services',
    '/product-design-agency': 'Product Design Agency',
    '/fintech-ux-design-agency': 'Fintech UX Design Agency',
    '/projects': 'View our work',
  };
  return map[href] || href.replace(/\//g, ' ').trim() || href;
}

function extractInternalLinks(text) {
  const m = text.split(/Internal Link/i)[1];
  if (!m) return [];
  const links = [];
  for (const line of m.split('\n')) {
    const t = line.trim();
    if (!t || t.length < 2) continue;
    if (t.toLowerCase().includes('image specification')) break;
    const arrow = t.replace(/^→\s*/, '').trim();
    if (!arrow) continue;
    const pathMatch = arrow.match(/(\/[a-z0-9\-/]+)/i);
    if (pathMatch) {
      let href = pathMatch[1].split(/\s/)[0];
      if (href.length < 2) continue;
      let label = arrow.replace(pathMatch[1], '').replace(/^[\s—\-:]+|[\s—\-:]+$/g, '').trim();
      if (!label || label.length < 2) label = labelForHref(href);
      links.push({ label, href });
    }
  }
  return links;
}

function cleanupSectionLines(sections) {
  const junk = (line) =>
    /^url:$/i.test(line) ||
    /^seo title:$/i.test(line) ||
    /^meta description:$/i.test(line) ||
    /^\/[a-z0-9\-/]*$/i.test(line.trim());
  return sections
    .map((s) => ({
      ...s,
      body: (s.body || []).filter((line) => !junk(line)),
    }))
    .filter((s) => (s.body && s.body.length > 0) || s.heading);
}

function bodySectionsFromText(text) {
  const main = text
    .replace(/^[\s\S]*?Meta Description:[^\n]+\n*/i, '')
    .split(/Frequently Asked Questions|FAQ/i)[0]
    .trim();
  const chunks = main.split(/\n\n+/).map((c) => c.trim()).filter(Boolean);
  /** @type {{ id: string; heading?: string; level?: 2|3; body?: string[] }[]} */
  const sections = [];
  let idx = 0;
  let current = null;
  for (const chunk of chunks) {
    const isHeading =
      chunk.length < 120 &&
      !chunk.includes('.') &&
      chunk === chunk.toUpperCase().replace(/[^A-Z0-9 &]/g, '') &&
      chunk.length > 3
        ? false
        : /^[A-Z][^.]{2,80}$/.test(chunk) && !chunk.includes('\n') && chunk.split(' ').length <= 12;

    const looksLikeTitle =
      chunk.length < 100 &&
      chunk.split('\n').length === 1 &&
      /^[A-Z]/.test(chunk) &&
      !chunk.endsWith('.') &&
      chunk.split(' ').length <= 14;

    if (looksLikeTitle && !chunk.includes('•') && idx > 0) {
      if (current) sections.push(current);
      current = {
        id: `section-${idx++}`,
        heading: chunk,
        level: 2,
        body: [],
      };
    } else {
      if (!current) {
        current = { id: `section-${idx++}`, heading: undefined, level: 2, body: [] };
      }
      chunk.split('\n').forEach((line) => {
        const l = line.trim();
        if (l) current.body.push(l);
      });
    }
  }
  if (current) sections.push(current);
  return cleanupSectionLines(sections.filter((s) => (s.body && s.body.length > 0) || s.heading));
}

function docxToText(file) {
  return execSync(`textutil -convert txt -stdout "${file}"`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
}

function main() {
  const files = walkDocx(copyRoot);
  const out = {};
  for (const file of files) {
    let text;
    try {
      text = docxToText(file);
    } catch {
      continue;
    }
    const slug = extractSlug(text);
    if (!slug) continue;
    const category = categoryFromPath(file);
    const template = templateFor(category);
    const seoTitle = extractSeoTitle(text);
    const metaDescription = extractMeta(text);
    const h1 = extractH1(text, seoTitle);
    const faqs = extractFaqs(text);
    const internalLinks = extractInternalLinks(text);
    const sections = bodySectionsFromText(text);

    out[slug] = {
      slug,
      template,
      category,
      seoTitle: seoTitle || `${h1} | Sand Dollar Design`,
      metaDescription,
      h1: h1 || seoTitle.replace(/\s*\|.*$/, '').trim(),
      heroSubtitle: '',
      sections,
      faqs,
      primaryCta: {
        label: 'Book a free strategy call',
        href: 'https://calendly.com/sanddollardesign/intro',
      },
      secondaryCta: {
        label: 'View our work',
        href: slug === 'projects' ? '/projects#featured-case-studies' : '/projects',
      },
      internalLinks,
    };
  }

  const outDir = path.join(repoRoot, 'src/data/marketingPages/generated');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'allContent.json'), JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', Object.keys(out).length, 'pages to generated/allContent.json');
}

main();
