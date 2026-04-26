import allContent from './generated/allContent.json';
import pageAssets from './generated/pageAssets.json';
import type {
  MarketingFAQ,
  MarketingImageSpec,
  MarketingPageContent,
  MarketingPageCategory,
  MarketingTemplate,
} from '@/types/marketing';

function augmentInternalLinks(page: MarketingPageContent): MarketingPageContent {
  const links = [...(page.internalLinks ?? [])];
  const add = (label: string, href: string) => {
    if (!links.some((l) => l.href === href)) links.push({ label, href });
  };

  if (page.category === 'core_service') {
    add('Fintech UX design agency', '/fintech-ux-design-agency');
    add('Healthcare UX design agency', '/healthcare-ux-design-agency');
  } else if (page.category === 'industry') {
    add('Case study: Mukuru mobile app rebrand', '/mukuru-mobile-app-rebrand-and-redesign');
  } else if (page.category === 'geo') {
    add('UX strategy consulting', '/ux-strategy-consulting');
    add('UX research agency', '/ux-research-agency');
    add('UX/UI design services', '/ux-ui-design-services');
  } else if (page.category === 'insight') {
    add('UX strategy consulting', '/ux-strategy-consulting');
    add('UX/UI design services', '/ux-ui-design-services');
  } else if (page.category === 'case_study') {
    add('Product design agency', '/product-design-agency');
    add('B2B e-commerce UX design', '/b2b-ecommerce-ux-design');
  }

  return { ...page, internalLinks: links };
}

type RawRow = {
  slug: string;
  template: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle?: string;
  sections: MarketingPageContent['sections'];
  faqs: MarketingFAQ[];
  primaryCta: MarketingPageContent['primaryCta'];
  secondaryCta?: MarketingPageContent['secondaryCta'];
  internalLinks: MarketingPageContent['internalLinks'];
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  areaServed?: string[];
};

const raw = allContent as Record<string, RawRow>;
const assets = pageAssets as Record<
  string,
  { hero?: { file: string; alt: string }; body: MarketingImageSpec[] }
>;

export const MARKETING_SLUGS = Object.keys(raw);

export function loadMarketingPage(slug: string): MarketingPageContent | null {
  const row = raw[slug];
  if (!row) return null;
  const a = assets[slug];
  const gallery: MarketingImageSpec[] =
    a?.body?.map((b) => ({
      file: b.file,
      placement: b.placement,
      alt: b.alt,
    })) ?? [];

  let areaServed = row.areaServed;
  if (slug === 'ux-ui-design-agency-usa') {
    areaServed = ['Minneapolis', 'Florida', 'Boston', 'Chicago', 'Texas', 'United States'];
  }

  const merged: MarketingPageContent = {
    slug: row.slug,
    template: row.template as MarketingTemplate,
    category: row.category as MarketingPageCategory,
    seoTitle: row.seoTitle,
    metaDescription: row.metaDescription,
    h1: row.h1,
    heroSubtitle: row.heroSubtitle,
    heroImage: a?.hero?.file,
    heroImageAlt: a?.hero?.alt,
    sections: row.sections ?? [],
    faqs: row.faqs ?? [],
    primaryCta: row.primaryCta,
    secondaryCta: row.secondaryCta,
    internalLinks: row.internalLinks ?? [],
    publishedTime: row.publishedTime,
    modifiedTime: row.modifiedTime,
    tags: row.tags,
    areaServed,
    gallery,
  };
  return augmentInternalLinks(merged);
}
