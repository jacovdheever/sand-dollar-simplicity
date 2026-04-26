/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Compass,
  FileSearch,
  Gauge,
  Layers,
  LineChart,
  MonitorSmartphone,
  Network,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import PageShell from '@/components/marketing/PageShell';
import MarketingFAQ from '@/components/marketing/MarketingFAQ';
import MarketingInternalLinks from '@/components/marketing/MarketingInternalLinks';
import FeaturedCaseStudiesGrid from '@/components/marketing/FeaturedCaseStudiesGrid';
import { pageImageSrc } from '@/components/marketing/pageImageSrc';
import type { MarketingImageSpec, MarketingPageContent } from '@/types/marketing';

type MediaPresentation = 'auto' | 'photo' | 'ui';

type PremiumCard = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

type RelatedLink = MarketingPageContent['internalLinks'][number];

type ServicePageConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  chips: string[];
  heroPresentation?: MediaPresentation;
  heroVisualClassName?: string;
  valueEyebrow: string;
  valueTitle: string;
  valueIntro?: string;
  valueCards: PremiumCard[];
  primarySection: {
    eyebrow: string;
    title: string;
    body: string;
    imageMatch?: string;
    presentation?: MediaPresentation;
  };
  processTitle: string;
  processSteps: { title: string; body: string }[];
  featureSection: {
    eyebrow: string;
    title: string;
    body: string;
    imageMatch?: string;
    presentation?: MediaPresentation;
  };
  capabilityTitle: string;
  capabilities: PremiumCard[];
  outcomeTitle: string;
  outcomes: string[];
  ctaTitle: string;
  ctaBody: string;
  relatedLinks: RelatedLink[];
};

export const CORE_SERVICE_PREMIUM_SLUGS: string[] = [
  'ux-research-agency',
  'ux-ui-design-services',
  'enterprise-ux-consulting',
  'product-design-agency',
  'design-system-consulting',
  'ai-development-agency',
  'app-design-and-development',
  'digital-transformation-ux-consulting',
  'design-maturity-and-capability-building',
  'website-design-and-development',
  'projects',
];

const serviceSlugSet = new Set(CORE_SERVICE_PREMIUM_SLUGS);

const defaultPrimaryCta = 'https://calendly.com/sanddollardesign/intro';

function imageFromGallery(data: MarketingPageContent, match?: string): MarketingImageSpec | undefined {
  if (!match) return data.gallery?.[0];
  return data.gallery?.find((image) => {
    const haystack = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
    return haystack.includes(match.toLowerCase());
  });
}

function heroImage(data: MarketingPageContent): MarketingImageSpec | undefined {
  if (!data.heroImage) return undefined;
  return {
    file: data.heroImage,
    placement: 'HERO',
    alt: data.heroImageAlt || data.h1,
  };
}

function isPhotoAsset(image: MarketingImageSpec): boolean {
  const text = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
  return [
    'team',
    'workshop',
    'collaborating',
    'collaboration',
    'studio',
    'office',
    'environment',
    'facilitating',
    'session',
    'whiteboard',
    'observation',
    'researcher',
    'coding',
  ].some((term) => text.includes(term));
}

function isUiAsset(image: MarketingImageSpec): boolean {
  if (isPhotoAsset(image)) return false;
  const text = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
  return [
    'ui',
    'interface',
    'dashboard',
    'screen',
    'screens',
    'wireframe',
    'prototype',
    'component',
    'design system',
    'figma',
    'token',
    'model',
    'platform',
    'app',
    'website',
    'desktop',
    'mobile',
    'mockup',
    'report',
    'persona',
  ].some((term) => text.includes(term));
}

function shouldUseUiTreatment(image: MarketingImageSpec, presentation: MediaPresentation = 'auto'): boolean {
  return presentation === 'ui' || (presentation === 'auto' && isUiAsset(image));
}

function shouldTightCropPhoto(image: MarketingImageSpec): boolean {
  return image.file.toLowerCase().includes('ux research - user testing observation');
}

const ShowcaseMedia: React.FC<{
  image?: MarketingImageSpec;
  aspect?: string;
  className?: string;
  presentation?: MediaPresentation;
}> = ({ image, aspect = 'aspect-[4/3]', className = '', presentation = 'auto' }) => {
  if (!image) return null;

  if (shouldUseUiTreatment(image, presentation)) {
    return (
      <figure className={`relative ${className}`}>
        <img
          src={pageImageSrc(image.file)}
          alt={image.alt}
          className={`${aspect} w-full object-contain drop-shadow-[0_18px_36px_rgba(15,23,42,0.16)]`}
        />
      </figure>
    );
  }

  const tightCrop = shouldTightCropPhoto(image);

  return (
    <figure className={`overflow-hidden rounded-[2rem] shadow-2xl ${className}`}>
      <img
        src={pageImageSrc(image.file)}
        alt={image.alt}
        className={`block ${aspect} h-full w-full object-cover ${tightCrop ? 'scale-[1.12]' : ''}`}
      />
    </figure>
  );
};

const PremiumHero: React.FC<{
  data: MarketingPageContent;
  config: ServicePageConfig;
}> = ({ data, config }) => {
  const image = heroImage(data);
  const useUiHero = image ? shouldUseUiTreatment(image, config.heroPresentation) : false;
  const photoHero = Boolean(image && config.heroPresentation === 'photo');
  const primaryHref = data.primaryCta?.href || defaultPrimaryCta;

  return (
    <section className="relative overflow-hidden bg-[#0c0d10] text-white">
      {!useUiHero && image ? (
        <img
          src={pageImageSrc(image.file)}
          alt={image.alt}
          className={`absolute inset-0 h-full w-full object-cover ${photoHero ? 'opacity-60' : 'opacity-55'}`}
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(249,115,21,0.24),transparent_34%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.1),transparent_28%),linear-gradient(110deg,rgba(0,0,0,0.94),rgba(0,0,0,0.72)_52%,rgba(0,0,0,0.38))]" />
      <div
        className={`relative z-10 container-custom grid ${
          photoHero
            ? 'min-h-0 items-center gap-8 pb-12 pt-24 sm:min-h-[min(85vh,600px)] sm:pb-10 sm:pt-20 md:pb-16 md:pt-24 lg:grid-cols-1'
            : 'min-h-[650px] items-end gap-10 pb-14 pt-36 md:pt-40 lg:grid-cols-[1.22fr_0.78fr]'
        }`}
      >
        <div
          className={
            useUiHero ? 'max-w-4xl' : photoHero ? 'max-w-6xl' : 'max-w-5xl lg:col-span-2'
          }
        >
          <p
            className={`text-xs font-bold uppercase tracking-[0.28em] ${
              photoHero
                ? 'mb-4 text-white/65 sm:mb-5'
                : 'mb-5 text-white/70'
            }`}
          >
            {config.eyebrow}
          </p>
          <h1
            className={`font-black leading-[0.98] tracking-tight sm:text-5xl ${
              useUiHero
                ? 'max-w-4xl text-4xl md:text-6xl lg:text-7xl'
                : photoHero
                  ? 'text-4xl md:text-5xl lg:text-6xl'
                  : 'max-w-5xl text-4xl md:text-6xl lg:text-7xl'
            }`}
          >
            {config.title}
          </h1>
          <p
            className={`text-lg leading-relaxed md:text-xl ${
              useUiHero
                ? 'mt-7 max-w-2xl text-white/80'
                : photoHero
                  ? 'mt-5 max-w-6xl text-white/78 md:mt-6'
                  : 'mt-7 max-w-3xl text-white/80'
            }`}
          >
            {config.intro}
          </p>
          <div className={`flex flex-col gap-3 sm:flex-row ${photoHero ? 'mt-6 sm:mt-7' : 'mt-8'}`}>
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
            >
              {data.primaryCta?.label || 'Book a free strategy call'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link
              to={data.secondaryCta?.href || '/projects'}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {data.secondaryCta?.label || 'View our work'}
            </Link>
          </div>
          <div className={`flex flex-wrap gap-2 ${photoHero ? 'mt-6' : 'mt-8'}`}>
            {config.chips.map((chip) => (
              <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                {chip}
              </span>
            ))}
          </div>
        </div>
        {useUiHero && image ? (
          <ShowcaseMedia
            image={image}
            aspect="aspect-[16/10]"
            className={`mb-4 hidden lg:block ${config.heroVisualClassName || ''}`}
            presentation="ui"
          />
        ) : null}
      </div>
    </section>
  );
};

const CardGrid: React.FC<{ cards: PremiumCard[]; dark?: boolean }> = ({ cards, dark = false }) => (
  <div className="grid gap-5 md:grid-cols-3">
    {cards.map(({ title, body, Icon }) => (
      <article
        key={title}
        className={`rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-xl ${
          dark ? 'border-white/10 bg-white/[0.06] text-white' : 'border-gray-100 bg-white text-gray-950 shadow-sm'
        }`}
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl coral-gradient text-white">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </div>
        <h3 className="text-xl font-black">{title}</h3>
        <p className={`mt-3 text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>{body}</p>
      </article>
    ))}
  </div>
);

const ValueSection: React.FC<{ config: ServicePageConfig }> = ({ config }) => (
  <section className="section-padding bg-white">
    <div className="container-custom grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">{config.valueEyebrow}</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{config.valueTitle}</h2>
        {config.valueIntro ? <p className="mt-6 text-lg leading-relaxed text-gray-600">{config.valueIntro}</p> : null}
      </div>
      <CardGrid cards={config.valueCards} />
    </div>
  </section>
);

const SplitSection: React.FC<{
  section: ServicePageConfig['primarySection'];
  data: MarketingPageContent;
  reverse?: boolean;
  background?: string;
}> = ({ section, data, reverse = false, background = 'bg-[#f8f5f1]' }) => {
  const image = imageFromGallery(data, section.imageMatch);
  return (
    <section className={`section-padding ${background}`}>
      <div className={`container-custom grid items-center gap-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">{section.eyebrow}</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{section.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">{section.body}</p>
        </div>
        <ShowcaseMedia image={image} presentation={section.presentation} />
      </div>
    </section>
  );
};

const ProcessSection: React.FC<{ title: string; steps: ServicePageConfig['processSteps'] }> = ({ title, steps }) => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Process</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-3xl border border-black/5 bg-[#f8f5f1] p-6 shadow-sm">
            <span className="text-sm font-black text-[#f97315]">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-5 text-xl font-black text-gray-950">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const CapabilitySection: React.FC<{ config: ServicePageConfig }> = ({ config }) => (
  <section className="section-padding bg-[#101113] text-white">
    <div className="container-custom">
      <div className="mb-10 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Capabilities</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{config.capabilityTitle}</h2>
      </div>
      <CardGrid cards={config.capabilities} dark />
    </div>
  </section>
);

const OutcomesCta: React.FC<{ config: ServicePageConfig; data: MarketingPageContent }> = ({ config, data }) => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="overflow-hidden rounded-[2rem] bg-[#101113] text-white shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-8 md:p-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Outcomes</p>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{config.outcomeTitle}</h2>
            <ul className="mt-8 space-y-4">
              {config.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-white/75">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#f97315]" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between bg-white/[0.06] p-8 md:p-12">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-white/45">Start here</p>
              <h3 className="text-3xl font-black tracking-tight md:text-4xl">{config.ctaTitle}</h3>
              <p className="mt-5 max-w-xl text-white/70">{config.ctaBody}</p>
            </div>
            <a
              href={data.primaryCta?.href || defaultPrimaryCta}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
            >
              {data.primaryCta?.label || 'Book a free strategy call'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ServicePremiumPage: React.FC<{ data: MarketingPageContent; config: ServicePageConfig }> = ({ data, config }) => (
  <PageShell showContact={false}>
    <PremiumHero data={data} config={config} />
    <ValueSection config={config} />
    <SplitSection data={data} section={config.primarySection} />
    <ProcessSection title={config.processTitle} steps={config.processSteps} />
    <SplitSection data={data} section={config.featureSection} reverse background="bg-white" />
    <CapabilitySection config={config} />
    <OutcomesCta config={config} data={data} />
    <MarketingFAQ items={data.faqs} />
    <MarketingInternalLinks links={config.relatedLinks} />
  </PageShell>
);

const projectsSnapshots = [
  {
    name: 'GigExecs',
    label: 'Digital marketplace platform',
    description: 'UX/UI and product design for a senior professional talent marketplace.',
    tags: ['Product Design', 'UX/UI Design', 'Marketplace'],
    imageFile: 'projects-gigexecs.png',
    imageAlt: 'GigExecs marketplace platform project snapshot',
  },
  {
    name: 'WHOLE App',
    label: 'Health and wellness app',
    description: 'Product design for a health and wellness app experience.',
    tags: ['Product Design', 'UX/UI Design', 'Healthcare'],
    imageFile: 'healthcare mobile app WHOLE.png',
    imageAlt: 'WHOLE app health and wellness app project snapshot',
  },
  {
    name: 'My Blood Test',
    label: 'Healthtech platform',
    description: 'Digital product design for a pathology and health testing platform.',
    tags: ['Healthtech', 'UX/UI Design', 'Product Design'],
    imageFile: 'healthcare digital solution my blood test responsive mockup also for app-design-and-development.png',
    imageAlt: 'My Blood Test healthtech platform project snapshot',
  },
  {
    name: 'Whole Health & Wellness Website',
    label: 'Wellness website',
    description: 'Website design and digital experience work for a wellness brand.',
    tags: ['Website Design', 'UX/UI Design', 'Healthcare'],
    imageFile: 'projects - whole health.png',
    imageAlt: 'Whole Health & Wellness website project snapshot',
  },
] as const;

const projectsServiceLinks = [
  { href: '/ux-strategy-consulting', label: 'UX Strategy Consulting' },
  { href: '/ux-research-agency', label: 'UX Research Agency' },
  { href: '/ux-ui-design-services', label: 'UX/UI Design Services' },
  { href: '/product-design-agency', label: 'Product Design Agency' },
  { href: '/enterprise-ux-consulting', label: 'Enterprise UX Consulting' },
  { href: '/ai-development-agency', label: 'AI Development Agency' },
] as const;

const projectsIndustryLinks = [
  { href: '/fintech-ux-design-agency', label: 'Fintech UX Design' },
  { href: '/financial-services-ux-design', label: 'Financial Services UX Design' },
  { href: '/b2b-ecommerce-ux-design', label: 'B2B E-commerce UX Design' },
  { href: '/healthcare-ux-design-agency', label: 'Healthcare UX Design' },
  { href: '/nonprofit-and-ngo-website-design', label: 'Nonprofit & NGO Website Design' },
] as const;

const ProjectsPremiumPage: React.FC<{ data: MarketingPageContent; config: ServicePageConfig }> = ({ data, config }) => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/projects' || location.hash !== '#featured-case-studies') return;
    const el = document.getElementById('featured-case-studies');
    if (!el) return;
    const id = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
    return () => clearTimeout(id);
  }, [location.pathname, location.hash]);

  return (
    <PageShell showContact={false}>
      <PremiumHero data={data} config={config} />

      <section className="section-padding bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Overview</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">Complex products, made clearer.</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Our work spans fintech, banking, FMCG, healthcare and marketplace products. The common thread is practical UX that supports real business change. Use the featured case studies
              below for deep, long-form write-ups; additional snapshots show more of the portfolio while full case studies are prepared.
            </p>
          </div>
          <CardGrid cards={config.valueCards} />
        </div>
      </section>

      <FeaturedCaseStudiesGrid id="featured-case-studies" />

      <section className="section-padding bg-white" aria-labelledby="project-snapshots-heading">
        <div className="container-custom">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Selected project snapshots</p>
          <h2 id="project-snapshots-heading" className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl">
            More digital product and website work
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            A few additional examples of digital product, app and website work from the Sand Dollar Design portfolio. These are visual snapshots only while full case studies are being
            prepared.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {projectsSnapshots.map((snap) => (
              <article
                key={snap.name}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#f8f5f1] shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img src={pageImageSrc(snap.imageFile)} alt={snap.imageAlt} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{snap.label}</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{snap.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{snap.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Snapshot tags">
                    {snap.tags.map((t) => (
                      <li key={t} className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection title={config.processTitle} steps={config.processSteps} />
      <CapabilitySection config={config} />
      <OutcomesCta config={config} data={data} />
      <MarketingFAQ items={data.faqs} />

      <section className="bg-[#f8f5f1] py-12 md:py-16" aria-labelledby="projects-related-heading">
        <div className="container-custom max-w-5xl">
          <h2 id="projects-related-heading" className="text-center text-2xl font-black text-gray-950 md:text-3xl">
            Related services and industries
          </h2>
          <p className="mt-3 text-center text-sm text-gray-600 md:text-base">
            Explore how we help teams with strategy, research, design and delivery—then see sector-specific UX patterns.
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97315]">Related services</h3>
              <ul className="mt-4 space-y-2">
                {projectsServiceLinks.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="inline-flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-950 transition hover:border-[#f97315]/50 hover:shadow-sm">
                      {l.label}
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#f97315]" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97315]">Related industries</h3>
              <ul className="mt-4 space-y-2">
                {projectsIndustryLinks.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="inline-flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-950 transition hover:border-[#f97315]/50 hover:shadow-sm">
                      {l.label}
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#f97315]" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

const configs: Record<string, ServicePageConfig> = {
  'ux-research-agency': {
    eyebrow: 'UX research agency',
    title: 'Reduce product risk before expensive decisions are made',
    intro: 'We run focused user research for product teams that need evidence, not opinions. Interviews, usability testing and synthesis become clear product direction.',
    chips: ['User interviews', 'Usability testing', 'Research synthesis', 'Evidence-led decisions'],
    heroPresentation: 'photo',
    valueEyebrow: 'Why research',
    valueTitle: 'Research gives teams the confidence to move.',
    valueIntro: 'Good research answers the questions that block product momentum and turns stakeholder debate into shared evidence.',
    valueCards: [
      { Icon: Search, title: 'Validate assumptions', body: 'Find out what users need, where they struggle and which ideas deserve investment.' },
      { Icon: ShieldCheck, title: 'Lower launch risk', body: 'Catch usability issues and adoption barriers before engineering effort is locked in.' },
      { Icon: BarChart3, title: 'Prioritise with evidence', body: 'Turn interviews, surveys and tests into recommendations your team can act on.' },
    ],
    primarySection: {
      eyebrow: 'Research methods',
      title: 'A practical research toolkit for product questions',
      body: 'We choose the lightest method that can answer the question: discovery interviews, contextual inquiry, usability testing, surveys, heuristic review or competitor benchmarking.',
      imageMatch: 'persona',
      presentation: 'ui',
    },
    processTitle: 'From question to product decision',
    processSteps: [
      { title: 'Frame the risk', body: 'Define the decision, audience, constraints and confidence needed.' },
      { title: 'Recruit and test', body: 'Run interviews, usability tests or surveys with the right participants.' },
      { title: 'Synthesize patterns', body: 'Separate signal from noise and map findings to product priorities.' },
      { title: 'Recommend action', body: 'Deliver a clear report, workshop and next-step design guidance.' },
    ],
    featureSection: {
      eyebrow: 'Deliverables',
      title: 'Insights your product team can use immediately',
      body: 'Research outputs are designed for action: severity-ranked usability findings, journey maps, personas, opportunity areas and clear recommendations for design or roadmap decisions.',
      imageMatch: 'report',
      presentation: 'ui',
    },
    capabilityTitle: 'Research support across the product lifecycle',
    capabilities: [
      { Icon: Users, title: 'Discovery research', body: 'Understand motivations, workflows and unmet needs before shaping a solution.' },
      { Icon: ClipboardCheck, title: 'Usability testing', body: 'Measure whether people can complete tasks and where the experience breaks down.' },
      { Icon: LineChart, title: 'Quantitative validation', body: 'Use surveys and structured analysis to confirm patterns at a larger scale.' },
    ],
    outcomeTitle: 'What changes after a research sprint',
    outcomes: [
      'Product teams stop guessing and start making decisions from observed user behaviour.',
      'High-risk flows are improved before launch, reducing rework and support burden.',
      'Stakeholders align around evidence instead of personal preference.',
    ],
    ctaTitle: 'Need answers from users?',
    ctaBody: 'Tell us the decision you need to make. We will shape a research plan that fits your timeline, budget and product risk.',
    relatedLinks: [
      { label: 'UX/UI Design Services', href: '/ux-ui-design-services' },
      { label: 'Product Design Agency', href: '/product-design-agency' },
      { label: 'Design Maturity and Capability Building', href: '/design-maturity-and-capability-building' },
    ],
  },
  'ux-ui-design-services': {
    eyebrow: 'UX/UI design services',
    title: 'Interfaces designed around how people actually use them',
    intro: 'We design web, mobile and enterprise interfaces that reduce friction, improve adoption and give development teams production-ready design direction.',
    chips: ['UX flows', 'UI design', 'Prototypes', 'Design systems'],
    heroPresentation: 'photo',
    valueEyebrow: 'Business value',
    valueTitle: 'Good UX/UI turns product quality into measurable outcomes.',
    valueIntro: 'The work is not just polish. It is the structure, flow and detail that help users succeed and businesses convert.',
    valueCards: [
      { Icon: Workflow, title: 'Clearer flows', body: 'Information architecture and user journeys that make complex tasks feel simple.' },
      { Icon: Gauge, title: 'Better conversion', body: 'Focused screens, strong hierarchy and fewer moments of hesitation.' },
      { Icon: Layers, title: 'Scalable UI', body: 'Reusable components and visual standards that keep product delivery consistent.' },
    ],
    primarySection: {
      eyebrow: 'Product surfaces',
      title: 'Design for the screens where trust is won or lost',
      body: 'We design dashboards, mobile apps, internal tools, e-commerce journeys and AI interfaces with the same discipline: reduce cognitive load, guide action and make the next step obvious.',
      imageMatch: 'insurance',
      presentation: 'ui',
    },
    processTitle: 'A design process that de-risks build',
    processSteps: [
      { title: 'Discovery', body: 'Understand users, business goals, current friction and technical constraints.' },
      { title: 'Structure', body: 'Map flows, wireframes and information architecture before visual detail.' },
      { title: 'Prototype', body: 'Test interaction patterns and refine the experience before handoff.' },
      { title: 'Systemise', body: 'Deliver high-fidelity screens, components and developer-ready documentation.' },
    ],
    featureSection: {
      eyebrow: 'Design process',
      title: 'From flow to interface system',
      body: 'The final UI is backed by validated structure, component thinking, accessibility standards and the design documentation your developers need to preserve quality.',
      imageMatch: 'Mukuru UX UI Redesign',
      presentation: 'ui',
    },
    capabilityTitle: 'What UX/UI design can include',
    capabilities: [
      { Icon: MonitorSmartphone, title: 'Web and mobile apps', body: 'Responsive product interfaces for SaaS, marketplaces and internal tools.' },
      { Icon: Palette, title: 'Visual design', body: 'High-fidelity UI that creates trust while staying usable and accessible.' },
      { Icon: Code2, title: 'Handoff support', body: 'Specs, components and implementation review to keep the shipped product aligned.' },
    ],
    outcomeTitle: 'What better interface design unlocks',
    outcomes: [
      'Users complete important tasks with less confusion and fewer support requests.',
      'Teams ship from a shared design language instead of one-off screen decisions.',
      'Products feel more credible to customers, investors and internal stakeholders.',
    ],
    ctaTitle: 'Ready to improve your interface?',
    ctaBody: 'Bring us the product, workflow or redesign challenge. We will help turn it into a clear, buildable UX/UI direction.',
    relatedLinks: [
      { label: 'UX Research Agency', href: '/ux-research-agency' },
      { label: 'Design System Consulting', href: '/design-system-consulting' },
      { label: 'Projects and Case Studies', href: '/projects' },
    ],
  },
  'enterprise-ux-consulting': {
    eyebrow: 'Enterprise UX consulting',
    title: 'Untangle complex systems your teams rely on every day',
    intro: 'We help large organisations modernise legacy tools, internal workflows and regulated digital products without losing the constraints that make them mission critical.',
    chips: ['Legacy UX', 'Internal tools', 'Compliance-aware design', 'Enterprise scale'],
    heroPresentation: 'photo',
    valueEyebrow: 'Enterprise reality',
    valueTitle: 'Complex software needs design that respects the organisation.',
    valueIntro: 'Enterprise UX succeeds when it works across users, stakeholders, governance, security and legacy constraints.',
    valueCards: [
      { Icon: Network, title: 'Map complexity', body: 'Understand workflows, permissions, dependencies and stakeholder needs before redesigning screens.' },
      { Icon: ShieldCheck, title: 'Reduce risk', body: 'Design for accessibility, compliance and security requirements from the start.' },
      { Icon: Users, title: 'Drive adoption', body: 'Create interfaces and guidance that reduce training time and user resistance.' },
    ],
    primarySection: {
      eyebrow: 'Design maturity',
      title: 'A clear path from fragmented tools to a coherent product ecosystem',
      body: 'We assess current usability, maturity and design debt, then prioritise the changes that reduce friction across the highest-impact workflows.',
      imageMatch: 'maturity',
      presentation: 'ui',
    },
    processTitle: 'How enterprise UX engagements move',
    processSteps: [
      { title: 'Audit', body: 'Review existing interfaces, workflows, analytics, support issues and constraints.' },
      { title: 'Research', body: 'Interview internal users, managers, support teams and compliance stakeholders.' },
      { title: 'Redesign', body: 'Simplify flows, modernise UI and create scalable interaction patterns.' },
      { title: 'Adopt', body: 'Support implementation, training, governance and design-system rollout.' },
    ],
    featureSection: {
      eyebrow: 'Research at scale',
      title: 'Enterprise decisions need evidence from real internal users',
      body: 'We bring structured research into complex environments so design changes reflect actual workflows, workarounds and adoption barriers.',
      imageMatch: 'research',
      presentation: 'photo',
    },
    capabilityTitle: 'Enterprise UX services for complex organisations',
    capabilities: [
      { Icon: FileSearch, title: 'UX audits', body: 'Heuristic, accessibility and workflow reviews with priority-ranked recommendations.' },
      { Icon: Layers, title: 'Design systems', body: 'Reusable patterns and governance for multi-product enterprise ecosystems.' },
      { Icon: Wrench, title: 'Modernisation', body: 'Legacy interface redesign that preserves essential functionality while reducing friction.' },
    ],
    outcomeTitle: 'What enterprise UX improves',
    outcomes: [
      'Internal teams need less training to complete frequent, high-value tasks.',
      'Support tickets drop as workflows become clearer and errors become harder to make.',
      'Modernised interfaces improve trust in digital transformation and internal tools.',
    ],
    ctaTitle: 'Modernising an enterprise system?',
    ctaBody: 'We can help you map the complexity, prioritise the work and design the next version with less organisational risk.',
    relatedLinks: [
      { label: 'Digital Transformation UX Consulting', href: '/digital-transformation-ux-consulting' },
      { label: 'Design System Consulting', href: '/design-system-consulting' },
      { label: 'UX Research Agency', href: '/ux-research-agency' },
    ],
  },
  'product-design-agency': {
    eyebrow: 'Product design agency',
    title: 'Product design that moves ideas from concept to launch',
    intro: 'We partner with founders, product teams and innovation leaders to shape, test and design digital products that customers can understand and businesses can scale.',
    chips: ['Product strategy', 'UX/UI design', 'Prototyping', 'Launch support'],
    heroPresentation: 'photo',
    valueEyebrow: 'Product impact',
    valueTitle: 'Product design connects customer problems to business outcomes.',
    valueIntro: 'The best products are not just attractive. They are researched, structured, tested and ready for delivery.',
    valueCards: [
      { Icon: Compass, title: 'Sharper direction', body: 'Define the MVP, roadmap and product decisions that deserve investment.' },
      { Icon: Target, title: 'Validated demand', body: 'Use research and prototypes to test assumptions before build costs rise.' },
      { Icon: Rocket, title: 'Launch readiness', body: 'Move from strategy to design system, handoff and early iteration support.' },
    ],
    primarySection: {
      eyebrow: 'Digital product design',
      title: 'From messy idea to coherent product experience',
      body: 'We turn product ambiguity into journeys, wireframes, prototypes and visual systems that help teams make faster decisions and ship with confidence.',
      imageMatch: 'product design',
      presentation: 'ui',
    },
    processTitle: 'The product design engagement',
    processSteps: [
      { title: 'Immerse', body: 'Learn the business, customers, market and constraints.' },
      { title: 'Validate', body: 'Research users, test assumptions and shape the MVP.' },
      { title: 'Design', body: 'Create flows, prototypes, UI and reusable component patterns.' },
      { title: 'Launch', body: 'Prepare handoff, documentation and iteration support for build.' },
    ],
    featureSection: {
      eyebrow: 'Featured work',
      title: 'Product interfaces with real-world complexity',
      body: 'Our work spans marketplaces, fintech, healthcare, enterprise dashboards and AI products where product clarity matters as much as visual craft.',
      imageMatch: 'GigExecs',
      presentation: 'ui',
    },
    capabilityTitle: 'Where product teams bring us in',
    capabilities: [
      { Icon: Brain, title: 'Product strategy', body: 'Clarify the problem, audience, value proposition and roadmap.' },
      { Icon: MonitorSmartphone, title: 'UX/UI delivery', body: 'Design responsive product experiences from wireframe to high fidelity.' },
      { Icon: ClipboardCheck, title: 'Testing and iteration', body: 'Validate prototypes and refine product direction before full build.' },
    ],
    outcomeTitle: 'What product design delivers',
    outcomes: [
      'A clearer MVP and roadmap grounded in customer needs rather than feature wishlists.',
      'Fewer expensive pivots because high-risk assumptions are tested earlier.',
      'A product interface and design system that can scale beyond the first release.',
    ],
    ctaTitle: 'Building a product that needs to work?',
    ctaBody: 'Tell us what you are trying to launch, fix or scale. We will help identify the highest-leverage design path.',
    relatedLinks: [
      { label: 'App Design and Development', href: '/app-design-and-development' },
      { label: 'AI Development Agency', href: '/ai-development-agency' },
      { label: 'UX/UI Design Services', href: '/ux-ui-design-services' },
    ],
  },
  'design-system-consulting': {
    eyebrow: 'Design system consulting',
    title: 'Build the shared language your product team can scale with',
    intro: 'We help teams audit, create and improve design systems so designers and engineers stop rebuilding the same decisions in different ways.',
    chips: ['Component libraries', 'Design tokens', 'Documentation', 'Team adoption'],
    heroPresentation: 'photo',
    valueEyebrow: 'Why systems',
    valueTitle: 'A design system turns consistency into delivery speed.',
    valueIntro: 'The right system reduces rework, creates shared standards and keeps product quality stable as teams grow.',
    valueCards: [
      { Icon: Layers, title: 'Consistent UI', body: 'Reusable components and patterns create a coherent experience across products.' },
      { Icon: Gauge, title: 'Faster delivery', body: 'Teams reuse documented decisions instead of debating every button, form and layout.' },
      { Icon: Code2, title: 'Design-code alignment', body: 'Tokens and component architecture reduce translation errors between Figma and build.' },
    ],
    primarySection: {
      eyebrow: 'System foundations',
      title: 'Component libraries, tokens and documentation that teams actually use',
      body: 'We structure the system around practical adoption: component inventory, token decisions, usage guidance and governance that fits how your team ships.',
      imageMatch: 'figma',
      presentation: 'ui',
    },
    processTitle: 'How we build or improve the system',
    processSteps: [
      { title: 'Inventory', body: 'Audit the product, current Figma files and code components.' },
      { title: 'Define', body: 'Create tokens, component rules and system architecture.' },
      { title: 'Document', body: 'Write usage guidance that supports real design and engineering decisions.' },
      { title: 'Adopt', body: 'Train teams and establish governance for maintenance.' },
    ],
    featureSection: {
      eyebrow: 'Tokens and standards',
      title: 'Make visual decisions reusable, accessible and easier to govern',
      body: 'Typography, colour, spacing and interaction standards become named decisions your team can apply consistently across new features and products.',
      imageMatch: 'typography',
      presentation: 'ui',
    },
    capabilityTitle: 'Design system services',
    capabilities: [
      { Icon: FileSearch, title: 'System audits', body: 'Find fragmentation, missing components, weak documentation and adoption barriers.' },
      { Icon: Palette, title: 'Token design', body: 'Define colour, type, spacing and semantic tokens that scale across themes.' },
      { Icon: Users, title: 'Training', body: 'Help teams understand how to use, maintain and evolve the system.' },
    ],
    outcomeTitle: 'What a stronger design system changes',
    outcomes: [
      'Teams ship interfaces with fewer inconsistencies and fewer repeated design decisions.',
      'Engineers get clearer specs, tokens and component expectations.',
      'The product can scale without every new feature creating fresh UI debt.',
    ],
    ctaTitle: 'Need a system your team will use?',
    ctaBody: 'We can audit your current setup or build the foundation for a design system that supports real delivery.',
    relatedLinks: [
      { label: 'UX/UI Design Services', href: '/ux-ui-design-services' },
      { label: 'Enterprise UX Consulting', href: '/enterprise-ux-consulting' },
      { label: 'Design Maturity and Capability Building', href: '/design-maturity-and-capability-building' },
    ],
  },
  'ai-development-agency': {
    eyebrow: 'AI development agency',
    title: 'AI products that start with users, not just models',
    intro: 'We design and build AI-powered products, prototypes and dashboards where the interface makes the intelligence understandable, useful and trustworthy.',
    chips: ['AI product strategy', 'LLM interfaces', 'Rapid prototypes', 'Production MVPs'],
    heroPresentation: 'photo',
    valueEyebrow: 'Design-led AI',
    valueTitle: 'AI adoption depends on the experience around the model.',
    valueIntro: 'Users need to understand what AI can do, how to guide it and when to trust it. That is a design problem as much as a technical one.',
    valueCards: [
      { Icon: Brain, title: 'Human-centred AI', body: 'Translate model capability into workflows people can understand and control.' },
      { Icon: Sparkles, title: 'Useful features', body: 'Prioritise AI moments that create user value, not technical novelty.' },
      { Icon: Rocket, title: 'Faster validation', body: 'Prototype AI workflows quickly so teams can test desirability before scaling build.' },
    ],
    primarySection: {
      eyebrow: 'What we build',
      title: 'AI dashboards, agents and assisted workflows with clear UX',
      body: 'We design interfaces for LLM applications, analytics dashboards, AI assistants and human-in-the-loop workflows where explanations, inputs, outputs and fallback states matter.',
      imageMatch: 'What we build',
      presentation: 'ui',
    },
    processTitle: 'From AI idea to working product',
    processSteps: [
      { title: 'Discover', body: 'Clarify the user problem, data context, model capability and product risk.' },
      { title: 'Design', body: 'Shape workflows, trust patterns, prompts, outputs and controls.' },
      { title: 'Prototype', body: 'Create interactive AI experiences that can be tested with users.' },
      { title: 'Build', body: 'Support MVP development, integration and post-launch refinement.' },
    ],
    featureSection: {
      eyebrow: 'Platform capability',
      title: 'Make AI outputs readable, actionable and trustworthy',
      body: 'The interface should help users interpret model output, understand confidence, recover from errors and keep the human in control when decisions matter.',
      imageMatch: 'Platform capabilities',
      presentation: 'ui',
    },
    capabilityTitle: 'AI product work we support',
    capabilities: [
      { Icon: Workflow, title: 'AI agents', body: 'Autonomous and assisted workflows designed around user goals and safeguards.' },
      { Icon: BarChart3, title: 'AI dashboards', body: 'Insight and analytics interfaces that turn predictions into decisions.' },
      { Icon: Code2, title: 'MVP development', body: 'Design-to-build support for prototypes and production-ready AI products.' },
    ],
    outcomeTitle: 'What design-led AI development improves',
    outcomes: [
      'Users understand how to interact with AI features and what to do with the results.',
      'Teams validate the product experience before committing to expensive production complexity.',
      'AI products launch with clearer onboarding, trust signals and workflow fit.',
    ],
    ctaTitle: 'Have an AI product idea?',
    ctaBody: 'We will help you turn the capability into a product flow, prototype and build plan users can believe in.',
    relatedLinks: [
      { label: 'AI Product Development for Startups', href: '/ai-product-development-for-startups' },
      { label: 'Product Design Agency', href: '/product-design-agency' },
      { label: 'App Design and Development', href: '/app-design-and-development' },
    ],
  },
  'app-design-and-development': {
    eyebrow: 'App design and development',
    title: 'Design-first apps built to reduce launch risk',
    intro: 'We help founders and product teams turn app ideas into validated, launchable mobile and web products with UX strategy, UI design and development support.',
    chips: ['Mobile apps', 'Web apps', 'MVP design', 'Build support'],
    heroPresentation: 'photo',
    valueEyebrow: 'Design first',
    valueTitle: 'The cheapest time to fix an app is before build.',
    valueIntro: 'Design-first app development validates the product, flow and interface before engineering effort becomes expensive to unwind.',
    valueCards: [
      { Icon: ShieldCheck, title: 'Less rework', body: 'Validate flows and assumptions before engineering commits to the wrong product shape.' },
      { Icon: MonitorSmartphone, title: 'Better adoption', body: 'Design onboarding, navigation and interaction patterns users can understand quickly.' },
      { Icon: Code2, title: 'Build-ready plans', body: 'Create design systems, specs and architecture direction that support development.' },
    ],
    primarySection: {
      eyebrow: 'Mobile product design',
      title: 'Mobile experiences that feel focused from the first session',
      body: 'We design app structures, onboarding, navigation and key task flows before shaping the interface details that make the product feel polished and usable.',
      imageMatch: 'Mukuru Onboarding',
      presentation: 'ui',
    },
    processTitle: 'A path from idea to launch',
    processSteps: [
      { title: 'Strategy', body: 'Define users, core features, monetisation, positioning and success metrics.' },
      { title: 'Design', body: 'Create flows, wireframes, prototypes and visual UI for key journeys.' },
      { title: 'Build', body: 'Support frontend, backend, API and infrastructure delivery.' },
      { title: 'Launch', body: 'Prepare deployment, analytics, feedback loops and post-launch optimisation.' },
    ],
    featureSection: {
      eyebrow: 'Desktop and web app flows',
      title: 'One product experience across devices and contexts',
      body: 'For web apps, marketplaces and internal tools, we balance desktop depth with mobile clarity so users can move between contexts without relearning the product.',
      imageMatch: 'healthcare digital solution',
      presentation: 'ui',
    },
    capabilityTitle: 'Apps we design and build',
    capabilities: [
      { Icon: MonitorSmartphone, title: 'Mobile apps', body: 'Native and cross-platform iOS and Android experiences.' },
      { Icon: Workflow, title: 'Web apps', body: 'Interactive browser-based products, marketplaces and internal systems.' },
      { Icon: Rocket, title: 'MVP launches', body: 'Prototype, validate and build the first version with a clearer path to market.' },
    ],
    outcomeTitle: 'What a design-first app process delivers',
    outcomes: [
      'A validated app structure before development cost compounds.',
      'A design system and component foundation for future feature growth.',
      'A launchable product with clearer analytics, handoff and optimisation loops.',
    ],
    ctaTitle: 'Planning an app build?',
    ctaBody: 'We can help you shape the idea, test the experience and prepare the build so launch risk is lower.',
    relatedLinks: [
      { label: 'Product Design Agency', href: '/product-design-agency' },
      { label: 'UX/UI Design Services', href: '/ux-ui-design-services' },
      { label: 'AI Development Agency', href: '/ai-development-agency' },
    ],
  },
  'digital-transformation-ux-consulting': {
    eyebrow: 'Digital transformation UX consulting',
    title: 'Transformation that people can actually adopt',
    intro: 'We help organisations embed human-centred design into transformation programmes so new systems, journeys and processes work for customers and employees.',
    chips: ['Adoption strategy', 'Journey design', 'Change UX', 'Embedded design leadership'],
    heroPresentation: 'photo',
    valueEyebrow: 'Transformation risk',
    valueTitle: 'Technology transformation fails when human workflows are ignored.',
    valueIntro: 'UX brings customer and employee needs into transformation decisions before new systems create new friction.',
    valueCards: [
      { Icon: Users, title: 'Higher adoption', body: 'Design around real employee and customer behaviour so change feels usable.' },
      { Icon: Workflow, title: 'Better journeys', body: 'Connect process, data and interface decisions into coherent end-to-end experiences.' },
      { Icon: ShieldCheck, title: 'Lower rollout risk', body: 'Test concepts early and identify adoption barriers before launch.' },
    ],
    primarySection: {
      eyebrow: 'Maturity-led transformation',
      title: 'Understand current capability before redesigning the future state',
      body: 'We benchmark journeys, processes and design maturity so transformation priorities are grounded in where the organisation can create the most value.',
      imageMatch: 'Maturity',
      presentation: 'ui',
    },
    processTitle: 'Embedding UX into transformation delivery',
    processSteps: [
      { title: 'Assess', body: 'Review customer journeys, employee workflows, technology context and adoption risk.' },
      { title: 'Design', body: 'Shape future-state journeys, service concepts and prototype experiences.' },
      { title: 'Test', body: 'Validate new workflows with customers, employees and operational stakeholders.' },
      { title: 'Embed', body: 'Support governance, adoption, communication and continuous improvement.' },
    ],
    featureSection: {
      eyebrow: 'Client transformation results',
      title: 'From legacy friction to clearer digital workflows',
      body: 'UX-led transformation creates practical improvements: better self-service, more usable internal tools, clearer data experiences and less resistance to new systems.',
      imageMatch: 'Client transformation',
      presentation: 'ui',
    },
    capabilityTitle: 'UX support for transformation programmes',
    capabilities: [
      { Icon: Compass, title: 'Readiness discovery', body: 'Identify where transformation will create friction and where design can reduce it.' },
      { Icon: FileSearch, title: 'Journey research', body: 'Understand customer and employee needs inside the change context.' },
      { Icon: Network, title: 'Embedded leadership', body: 'Bring UX into programme governance, delivery decisions and adoption planning.' },
    ],
    outcomeTitle: 'What UX-led transformation changes',
    outcomes: [
      'Employees and customers can adopt new systems with less training and frustration.',
      'Transformation roadmaps prioritise journeys, behaviours and business outcomes together.',
      'Concept testing catches expensive problems before full technology rollout.',
    ],
    ctaTitle: 'Running a transformation programme?',
    ctaBody: 'We can embed UX thinking into the work so the technology investment becomes easier for people to adopt.',
    relatedLinks: [
      { label: 'Enterprise UX Consulting', href: '/enterprise-ux-consulting' },
      { label: 'Design Maturity and Capability Building', href: '/design-maturity-and-capability-building' },
      { label: 'UX Research Agency', href: '/ux-research-agency' },
    ],
  },
  'design-maturity-and-capability-building': {
    eyebrow: 'Design maturity and capability building',
    title: 'Build the design capability your organisation needs next',
    intro: 'We help product and transformation leaders assess maturity, strengthen design practice and create the processes, culture and confidence needed for better decisions.',
    chips: ['Maturity assessment', 'DesignOps', 'Team coaching', 'Research culture'],
    heroPresentation: 'photo',
    valueEyebrow: 'Capability',
    valueTitle: 'Design maturity turns design from decoration into a strategic practice.',
    valueIntro: 'A mature practice gives teams a repeatable way to research, decide, design, measure and improve.',
    valueCards: [
      { Icon: Gauge, title: 'Know the current level', body: 'Assess team structure, research, process, governance and measurement honestly.' },
      { Icon: Users, title: 'Grow the team', body: 'Coach designers, leaders and cross-functional teams toward stronger decision-making.' },
      { Icon: Workflow, title: 'Create repeatability', body: 'Define the process, documentation and rituals that make design easier to scale.' },
    ],
    primarySection: {
      eyebrow: 'Research culture',
      title: 'Help teams build evidence into their normal rhythm',
      body: 'Capability building turns research, testing and design critique from occasional activities into a practical operating model teams can repeat.',
      imageMatch: 'research culture',
      presentation: 'photo',
    },
    processTitle: 'A maturity-building engagement',
    processSteps: [
      { title: 'Assess', body: 'Audit people, process, tools, research practice and organisational influence.' },
      { title: 'Prioritise', body: 'Create a roadmap that fits the organisation and avoids maturity theatre.' },
      { title: 'Coach', body: 'Build capability through critiques, workshops, mentorship and practical templates.' },
      { title: 'Operationalise', body: 'Document process, governance and measures so the practice can sustain itself.' },
    ],
    featureSection: {
      eyebrow: 'Documentation and standards',
      title: 'Create shared practices that survive beyond one project',
      body: 'We help teams build the playbooks, reporting formats, design review rituals and standards that make good design easier to repeat.',
      imageMatch: 'typography',
      presentation: 'ui',
    },
    capabilityTitle: 'Capability building services',
    capabilities: [
      { Icon: FileSearch, title: 'Maturity assessment', body: 'A clear audit and prioritised roadmap for improving the design practice.' },
      { Icon: Users, title: 'Coaching', body: 'Mentorship, critiques and leadership support for design teams.' },
      { Icon: Wrench, title: 'DesignOps', body: 'Tools, workflow, governance, onboarding and documentation that help teams scale.' },
    ],
    outcomeTitle: 'What stronger design capability creates',
    outcomes: [
      'Teams make better product decisions because research, critique and measurement are part of the process.',
      'Designers and stakeholders share language, standards and expectations.',
      'New hires, product teams and engineers can understand how design work happens.',
    ],
    ctaTitle: 'Want to strengthen your design practice?',
    ctaBody: 'We can assess where you are now and map the next practical steps toward a more mature design organisation.',
    relatedLinks: [
      { label: 'Design System Consulting', href: '/design-system-consulting' },
      { label: 'Digital Transformation UX Consulting', href: '/digital-transformation-ux-consulting' },
      { label: 'UX Research Agency', href: '/ux-research-agency' },
    ],
  },
  'website-design-and-development': {
    eyebrow: 'Website design and development',
    title: 'Websites built as commercial platforms, not brochures',
    intro: 'We design and build UX-led websites with clear messaging, conversion architecture, SEO foundations and responsive implementation from the start.',
    chips: ['UX-led websites', 'SEO foundations', 'Conversion pages', 'Modern builds'],
    heroPresentation: 'photo',
    valueEyebrow: 'Website performance',
    valueTitle: 'A serious website should attract, explain and convert.',
    valueIntro: 'Template builds can look fine and still fail commercially. UX-led websites are shaped around the journey from attention to action.',
    valueCards: [
      { Icon: Target, title: 'Clear positioning', body: 'Structure pages around what buyers need to understand before they enquire.' },
      { Icon: Gauge, title: 'Performance foundations', body: 'Build with semantic HTML, responsive layouts and Core Web Vitals in mind.' },
      { Icon: LineChart, title: 'Conversion architecture', body: 'Design paths, proof points and CTAs that make action feel natural.' },
    ],
    primarySection: {
      eyebrow: 'Website design for non-profits',
      title: 'Mission-driven sites need clarity, accessibility and trust',
      body: 'We design websites that help visitors understand the mission, find key information quickly and take meaningful action on any device.',
      imageMatch: 'non-profits',
      presentation: 'ui',
    },
    processTitle: 'From strategy to launch',
    processSteps: [
      { title: 'Discover', body: 'Clarify audience, positioning, content needs, competitors and conversion goals.' },
      { title: 'Design', body: 'Create information architecture, wireframes, visual design and responsive prototypes.' },
      { title: 'Build', body: 'Implement the site with performance, SEO and content management foundations.' },
      { title: 'Launch', body: 'QA, analytics setup, deployment, handoff and post-launch optimisation.' },
    ],
    featureSection: {
      eyebrow: 'B2B website design',
      title: 'Complex offerings need simple buying journeys',
      body: 'For B2B and product-led websites, we use page structure, proof, messaging and interaction design to make the offer easier to evaluate.',
      imageMatch: 'B2B',
      presentation: 'ui',
    },
    capabilityTitle: 'Websites we design and build',
    capabilities: [
      { Icon: MonitorSmartphone, title: 'Corporate and B2B', body: 'Service websites, product sites and lead-generation experiences.' },
      { Icon: Sparkles, title: 'Campaign pages', body: 'Focused landing pages with clear promise, proof and conversion intent.' },
      { Icon: Code2, title: 'Modern implementation', body: 'React, Next.js, headless CMS and SEO-aware frontend builds.' },
    ],
    outcomeTitle: 'What a better website should do',
    outcomes: [
      'Explain your value faster to the people most likely to become qualified leads.',
      'Support organic visibility with stronger structure, semantic markup and performance.',
      'Give your team a site foundation they can maintain, measure and improve.',
    ],
    ctaTitle: 'Is your website underperforming?',
    ctaBody: 'We can help define what your site needs to achieve, then design and build the experience around that job.',
    relatedLinks: [
      { label: 'UX/UI Design Services', href: '/ux-ui-design-services' },
      { label: 'Nonprofit and NGO Website Design', href: '/nonprofit-and-ngo-website-design' },
      { label: 'Projects and Case Studies', href: '/projects' },
    ],
  },
  projects: {
    eyebrow: 'Case studies & selected work',
    title: 'Work that delivers across fintech, banking, FMCG and healthcare',
    intro:
      'Explore selected UX, product design and AI development work where research, strategy and interface design helped teams move from complexity to clarity.',
    chips: ['Fintech', 'Banking', 'B2B e-commerce', 'Healthcare', 'Enterprise UX'],
    heroPresentation: 'photo',
    valueEyebrow: 'Overview',
    valueTitle: 'Complex products, made clearer.',
    valueIntro:
      'Each engagement starts with a business problem and ends with a clearer product experience. Featured case studies are written for teams who need depth; additional snapshots add breadth to the portfolio.',
    valueCards: [
      { Icon: ShieldCheck, title: 'Regulated complexity', body: 'Banking, fintech and healthcare products where trust and compliance matter.' },
      { Icon: MonitorSmartphone, title: 'Multi-device products', body: 'Mobile apps, desktop workflows, web platforms and responsive experiences.' },
      { Icon: BarChart3, title: 'Measurable improvement', body: 'Projects focused on adoption, clarity, support reduction and speed to insight.' },
    ],
    primarySection: {
      eyebrow: 'Unused',
      title: 'Unused',
      body: 'Unused',
    },
    processTitle: 'How we approach project work',
    processSteps: [
      { title: 'Understand', body: 'Frame the business goal, user need, constraints and current product reality.' },
      { title: 'Research', body: 'Use evidence to identify where the experience is creating friction.' },
      { title: 'Design', body: 'Create flows, prototypes and interfaces that solve the highest-value problems.' },
      { title: 'Support', body: 'Prepare handoff, implementation guidance and iteration after launch.' },
    ],
    featureSection: {
      eyebrow: 'Unused',
      title: 'Unused',
      body: 'Unused',
    },
    capabilityTitle: 'Project types represented in the work',
    capabilities: [
      { Icon: LineChart, title: 'Data platforms', body: 'Analytics and reporting tools that make decision-making faster.' },
      { Icon: Rocket, title: 'New products', body: 'Marketplace, app and digital product design from concept to launch.' },
      { Icon: Layers, title: 'Systems and portals', body: 'B2B, enterprise and service platforms with complex user journeys.' },
    ],
    outcomeTitle: 'What our work is designed to change',
    outcomes: [
      'Users understand the product faster and can complete important tasks with less friction.',
      'Teams get a clearer path from strategy to implementation.',
      'Digital products become easier to trust, scale and improve.',
    ],
    ctaTitle: 'Have a project that needs clarity?',
    ctaBody: 'Share the product, audience and business goal. We will help identify the right starting point.',
    relatedLinks: [
      { label: 'Product Design Agency', href: '/product-design-agency' },
      { label: 'Enterprise UX Consulting', href: '/enterprise-ux-consulting' },
      { label: 'Heineken B2B E-Commerce UX/UI Design', href: '/heineken-b2b-ecommerce-ux-ui-design' },
    ],
  },
};

export function renderCoreServicePremiumPage(data: MarketingPageContent): React.ReactNode | null {
  if (!serviceSlugSet.has(data.slug)) return null;

  const config = configs[data.slug];
  if (!config) return null;

  if (data.slug === 'projects') {
    return <ProjectsPremiumPage data={data} config={config} />;
  }

  return <ServicePremiumPage data={data} config={config} />;
}
