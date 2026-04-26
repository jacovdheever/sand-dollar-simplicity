export type MarketingTemplate = 'service' | 'geo' | 'insight' | 'caseStudy';

export type MarketingPageCategory =
  | 'core_service'
  | 'industry'
  | 'geo'
  | 'insight'
  | 'case_study';

export interface MarketingImageSpec {
  file: string;
  placement: string;
  alt: string;
}

export interface MarketingFAQ {
  question: string;
  answer: string;
}

export interface MarketingSection {
  id: string;
  heading?: string;
  level?: 2 | 3;
  body?: string[];
  bullets?: string[];
  images?: MarketingImageSpec[];
}

export interface MarketingPageContent {
  slug: string;
  template: MarketingTemplate;
  category: MarketingPageCategory;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle?: string;
  heroImage?: string;
  heroImageAlt?: string;
  sections: MarketingSection[];
  faqs: MarketingFAQ[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  internalLinks: { label: string; href: string }[];
  /** Article / case study */
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  /** Geo: city or region labels for LocalBusiness areaServed */
  areaServed?: string[];
  /** Body images from Image_Asset_Mapping (verbatim alt). */
  gallery?: MarketingImageSpec[];
}
