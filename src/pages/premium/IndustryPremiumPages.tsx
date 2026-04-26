import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  HeartPulse,
  Landmark,
  Layers,
  LineChart,
  LockKeyhole,
  Network,
  RadioTower,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import PageShell from '@/components/marketing/PageShell';
import MarketingFAQ from '@/components/marketing/MarketingFAQ';
import MarketingInternalLinks from '@/components/marketing/MarketingInternalLinks';
import { beforeAfterImageByFilename, BeforeAfterSection } from '@/components/marketing/BeforeAfterSection';
import { pageImageSrc } from '@/components/marketing/pageImageSrc';
import type { MarketingImageSpec, MarketingPageContent } from '@/types/marketing';

type MediaPresentation = 'auto' | 'photo' | 'ui';

type IndustryCard = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

type IndustryConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  chips: string[];
  heroPresentation?: MediaPresentation;
  heroVisualClassName?: string;
  proof: IndustryCard[];
  challengeTitle: string;
  challengeBody: string;
  challengeCards: IndustryCard[];
  capabilityTitle: string;
  capabilities: IndustryCard[];
  processTitle: string;
  process: { title: string; body: string }[];
  imageSections: {
    eyebrow: string;
    title: string;
    body: string;
    imageMatch?: string;
    fallbackIndex?: number;
    reverse?: boolean;
    presentation?: MediaPresentation;
  }[];
  showcaseTitle: string;
  showcaseBody: string;
  hideShowcase?: boolean;
  outcomes: IndustryCard[];
  ctaTitle: string;
  ctaBody: string;
  relatedLinks: MarketingPageContent['internalLinks'];
};

export const INDUSTRY_PREMIUM_SLUGS: string[] = [
  'financial-services-ux-design',
  'fintech-ux-design-agency',
  'banking-ux-consulting',
  'insurance-ux-design',
  'healthcare-ux-design-agency',
  'nonprofit-and-ngo-website-design',
  'b2b-ecommerce-ux-design',
  'telco-ux-design',
];

const primaryCtaFallback = 'https://calendly.com/sanddollardesign/intro';

function heroImage(data: MarketingPageContent): MarketingImageSpec | undefined {
  if (!data.heroImage) return undefined;
  return {
    file: data.heroImage,
    placement: 'HERO',
    alt: data.heroImageAlt || data.h1,
  };
}

function imageByMatch(data: MarketingPageContent, match?: string, fallbackIndex = 0): MarketingImageSpec | undefined {
  if (!match) return data.gallery?.[fallbackIndex];
  const lower = match.toLowerCase();
  return (
    data.gallery?.find((image) => `${image.file} ${image.placement} ${image.alt}`.toLowerCase().includes(lower)) ||
    data.gallery?.[fallbackIndex]
  );
}

function isPhotoAsset(image: MarketingImageSpec): boolean {
  const text = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
  return ['team', 'workshop', 'studio', 'office', 'whiteboard', 'collaborating', 'environment', 'lifestyle', 'community'].some(
    (term) => text.includes(term),
  );
}

function isUiAsset(image: MarketingImageSpec): boolean {
  if (isPhotoAsset(image)) return false;

  const text = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
  return [
    'app',
    'dashboard',
    'desktop',
    'interface',
    'layout',
    'mockup',
    'mobile',
    'portal',
    'screen',
    'ui',
    'wireframe',
  ].some((term) => text.includes(term));
}

const MediaImage: React.FC<{
  image: MarketingImageSpec;
  aspect?: string;
  className?: string;
  presentation?: MediaPresentation;
}> = ({ image, aspect = 'aspect-[4/3]', className = '', presentation = 'auto' }) => {
  const ui = presentation === 'ui' || (presentation === 'auto' && isUiAsset(image));
  const video = /\.(mp4|webm|mov)$/i.test(image.file);

  if (ui) {
    return (
      <figure className={`relative ${className}`}>
        {video ? (
          <video
            className={`${aspect} w-full object-contain drop-shadow-[0_20px_42px_rgba(15,23,42,0.18)]`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={image.alt}
          >
            <source src={pageImageSrc(image.file)} type="video/mp4" />
          </video>
        ) : (
          <img
            src={pageImageSrc(image.file)}
            alt={image.alt}
            className={`${aspect} w-full object-contain drop-shadow-[0_20px_42px_rgba(15,23,42,0.18)]`}
          />
        )}
      </figure>
    );
  }

  return (
    <figure className={`overflow-hidden rounded-[2rem] border border-white/60 bg-gray-100 shadow-2xl ${className}`}>
      <img src={pageImageSrc(image.file)} alt={image.alt} className={`${aspect} h-full w-full object-cover`} />
    </figure>
  );
};

const PremiumIndustryHero: React.FC<{
  data: MarketingPageContent;
  config: IndustryConfig;
}> = ({ data, config }) => {
  const visual = heroImage(data);
  const backgroundHero = visual && config.heroPresentation === 'photo';
  return (
    <section className="relative overflow-hidden bg-[#0c0d10] text-white">
      {backgroundHero ? (
        <img
          src={pageImageSrc(visual.file)}
          alt={visual.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(249,115,21,0.24),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.1),transparent_24%),linear-gradient(105deg,rgba(12,13,16,0.96),rgba(23,24,27,0.78)_52%,rgba(12,13,16,0.38))]" />
      <div
        className={`relative z-10 container-custom grid gap-10 ${backgroundHero ? 'min-h-0 items-center gap-8 pb-12 pt-24 sm:min-h-[min(85vh,600px)] sm:pb-10 sm:pt-20 md:pb-16 md:pt-24 lg:grid-cols-1' : 'min-h-[680px] items-end gap-12 pb-14 pt-36 md:pt-40 lg:grid-cols-[0.95fr_1.05fr]'}`}
      >
        <div className={backgroundHero ? 'max-w-6xl' : 'max-w-4xl'}>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-white/65 sm:mb-5">{config.eyebrow}</p>
          <h1
            className={`font-black leading-[0.98] tracking-tight sm:text-5xl ${backgroundHero ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-4xl md:text-6xl lg:text-7xl'}`}
          >
            {config.title}
          </h1>
          <p
            className={`mt-5 text-lg leading-relaxed text-white/78 md:mt-6 md:text-xl ${backgroundHero ? 'max-w-6xl' : 'max-w-[740px]'}`}
          >
            {config.intro}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <a
              href={data.primaryCta?.href || primaryCtaFallback}
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
          <div className="mt-8 flex flex-wrap gap-2">
            {config.chips.map((chip) => (
              <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                {chip}
              </span>
            ))}
          </div>
        </div>
        {visual && !backgroundHero ? (
          <div className={`relative hidden lg:block ${config.heroVisualClassName || ''}`}>
            <div className="absolute -inset-8 rounded-[3rem] bg-[#f97315]/10 blur-3xl" />
            <MediaImage image={visual} aspect="aspect-[16/10]" presentation="ui" className="relative" />
          </div>
        ) : null}
      </div>
    </section>
  );
};

const CardGrid: React.FC<{ cards: IndustryCard[]; dark?: boolean; columns?: string }> = ({
  cards,
  dark = false,
  columns = 'lg:grid-cols-3',
}) => (
  <div className={`grid gap-5 md:grid-cols-2 ${columns}`}>
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

const SplitImageSection: React.FC<{
  eyebrow: string;
  title: string;
  body: string;
  image?: MarketingImageSpec;
  reverse?: boolean;
  presentation?: MediaPresentation;
}> = ({ eyebrow, title, body, image, reverse = false, presentation = 'auto' }) => (
  <section className="section-padding bg-white">
    <div className={`container-custom grid items-center gap-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">{eyebrow}</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{title}</h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">{body}</p>
      </div>
      {image ? <MediaImage image={image} presentation={presentation} /> : null}
    </div>
  </section>
);

const ProcessSection: React.FC<{ config: IndustryConfig }> = ({ config }) => (
  <section className="section-padding bg-[#f8f5f1]">
    <div className="container-custom">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Process</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{config.processTitle}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {config.process.map((step, index) => (
          <article key={step.title} className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <span className="text-sm font-black text-[#f97315]">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-5 text-xl font-black text-gray-950">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ShowcaseSection: React.FC<{ data: MarketingPageContent; config: IndustryConfig }> = ({ data, config }) => {
  if (config.hideShowcase) return null;

  const images = data.gallery?.slice(0, 5) || [];
  if (!images.length) return null;

  const [featured, ...supporting] = images;
  return (
    <section className="section-padding bg-[#101113] text-white">
      <div className="container-custom">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Sector proof</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{config.showcaseTitle}</h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-white/70">{config.showcaseBody}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <MediaImage image={featured} aspect="aspect-[16/10]" presentation="auto" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {supporting.slice(0, 2).map((image) => (
              <MediaImage key={image.file} image={image} aspect="aspect-[4/3]" presentation="auto" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const IntegratedCta: React.FC<{ data: MarketingPageContent; config: IndustryConfig }> = ({ data, config }) => (
  <section className="bg-white py-8">
    <div className="container-custom">
      <div className="overflow-hidden rounded-[2rem] bg-[#101113] p-8 text-white shadow-2xl md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_auto]">
          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{config.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl text-white/70">{config.ctaBody}</p>
          </div>
          <a
            href={data.primaryCta?.href || primaryCtaFallback}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
          >
            {data.primaryCta?.label || 'Book a free strategy call'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const relatedLinkFallbacks = {
  services: { label: 'UX/UI design services', href: '/ux-ui-design-services' },
  work: { label: 'Selected work', href: '/projects' },
  strategy: { label: 'UX strategy consulting', href: '/ux-strategy-consulting' },
  caseStudy: { label: 'Heineken B2B e-commerce case study', href: '/heineken-b2b-ecommerce-ux-ui-design' },
};

const INDUSTRY_CONFIGS: Record<string, IndustryConfig> = {
  'financial-services-ux-design': {
    eyebrow: 'Financial services UX design',
    title: 'Financial interfaces that make complexity feel trustworthy',
    intro:
      'We design wealth, banking, insurance and investment platforms where clarity, regulation and confidence have to work together.',
    chips: ['Trust-first UX', 'Portfolio dashboards', 'Compliance-aware design', 'Financial portals'],
    heroPresentation: 'photo',
    proof: [
      { Icon: ShieldCheck, title: 'Trust by design', body: 'Every hierarchy, state and label helps users feel confident with high-stakes financial decisions.' },
      { Icon: LineChart, title: 'Complex data made useful', body: 'Dashboards, reports and transaction journeys are structured around decision-making, not decoration.' },
      { Icon: Scale, title: 'Regulated from the start', body: 'Compliance requirements are treated as product constraints that can improve clarity when designed well.' },
    ],
    challengeTitle: 'Financial UX has to respect complexity without exposing the mess',
    challengeBody:
      'Financial services products cannot hide risk, regulation or advanced functionality. The work is to make those constraints understandable, navigable and credible for expert and non-expert users.',
    challengeCards: [
      { Icon: LockKeyhole, title: 'Security without friction', body: 'Authentication, access and audit trails need to protect users without making routine tasks painful.' },
      { Icon: Layers, title: 'Legacy modernization', body: 'Older platforms need modern experiences that still work with existing systems and operational reality.' },
      { Icon: Landmark, title: 'Multi-channel consistency', body: 'Web, mobile, advisor and internal tools need to feel like one coherent financial experience.' },
    ],
    capabilityTitle: 'Where financial services teams bring us in',
    capabilities: [
      { Icon: LineChart, title: 'Wealth and asset platforms', body: 'Portfolio dashboards, allocation tools and investor reporting for advisors and end clients.' },
      { Icon: Building2, title: 'Corporate banking workflows', body: 'Payments, liquidity, approvals and reporting for sophisticated institutional users.' },
      { Icon: FileCheck2, title: 'Compliance dashboards', body: 'Interfaces that help internal teams understand, review and act on regulatory data.' },
      { Icon: Smartphone, title: 'Mobile financial journeys', body: 'Secure, fast mobile experiences for checking, authorising and managing financial products.' },
    ],
    processTitle: 'A financial UX process built for risk and clarity',
    process: [
      { title: 'Domain discovery', body: 'Interview users, SMEs and compliance teams to understand the financial product in context.' },
      { title: 'Journey mapping', body: 'Map transactions, approvals, exceptions and handoffs before moving into interface design.' },
      { title: 'Prototype and test', body: 'Validate hierarchy, language and confidence with representative users before build.' },
      { title: 'System handoff', body: 'Deliver production-ready UI, design patterns and documentation for internal teams.' },
    ],
    imageSections: [
      {
        eyebrow: 'Digital banking interfaces',
        title: 'Dashboards that help users understand what matters next',
        body: 'Financial dashboards work best when balances, movement, risk and actions are sequenced around real decisions.',
        imageMatch: 'mockup',
      },
      {
        eyebrow: 'Wireframe to launch',
        title: 'Information architecture before polish',
        body: 'We start with structure, workflow and content hierarchy so the final UI is clear before it becomes beautiful.',
        imageMatch: 'wireframe',
        reverse: true,
      },
    ],
    showcaseTitle: 'Proof from regulated and data-heavy products',
    showcaseBody: 'Mapped assets include financial dashboard, wireframe and Tradition Capital Bank product proof.',
    outcomes: [
      { Icon: CheckCircle2, title: 'Higher confidence', body: 'Users understand financial status, next steps and risk more clearly.' },
      { Icon: Activity, title: 'Less support pressure', body: 'Better self-service reduces confusion around transactions and reporting.' },
      { Icon: BadgeCheck, title: 'More credible platforms', body: 'Modern interfaces help established financial teams compete with digital-first products.' },
    ],
    ctaTitle: 'Designing a financial product that needs trust?',
    ctaBody: 'Let us help you clarify the journeys, dashboards and decision points that matter most.',
    relatedLinks: [relatedLinkFallbacks.strategy, relatedLinkFallbacks.services, relatedLinkFallbacks.work],
  },
  'fintech-ux-design-agency': {
    eyebrow: 'Fintech UX design agency',
    title: 'Fintech UX that builds trust and drives conversion',
    intro:
      'We design payment, banking, lending, insurance tech and investment products where onboarding, clarity and compliance shape growth.',
    chips: ['KYC flows', 'Mobile payments', 'Fintech design systems', 'Trust and conversion'],
    heroPresentation: 'photo',
    proof: [
      { Icon: CreditCard, title: 'Conversion-led onboarding', body: 'Reduce drop-off in registration, KYC and activation without weakening compliance.' },
      { Icon: ShieldCheck, title: 'Trust signals everywhere', body: 'Fees, verification, status and errors are designed so users always know what is happening.' },
      { Icon: Layers, title: 'Systems for speed', body: 'Reusable fintech patterns help teams ship consistently across products and markets.' },
    ],
    challengeTitle: 'Fintech users leave when money, identity or risk feels unclear',
    challengeBody:
      'Fintech products ask users to hand over personal data, move money and trust a new service. The interface has to earn that trust at every step.',
    challengeCards: [
      { Icon: ClipboardCheck, title: 'KYC and AML friction', body: 'Verification can be long, but it should still feel transparent, guided and worthwhile.' },
      { Icon: Banknote, title: 'Fee and outcome clarity', body: 'Users need to understand cost, timing, eligibility and risk before they commit.' },
      { Icon: Smartphone, title: 'Mobile-first behaviour', body: 'Fintech adoption often happens on small screens, under time pressure, with low tolerance for confusion.' },
    ],
    capabilityTitle: 'Fintech products we shape',
    capabilities: [
      { Icon: CreditCard, title: 'Payments and wallets', body: 'Send money, bill pay, balances, limits and confirmation flows.' },
      { Icon: Landmark, title: 'Digital banking', body: 'Accounts, cards, statements, transfers and support journeys.' },
      { Icon: FileCheck2, title: 'Lending and insurance tech', body: 'Applications, eligibility, policy management and claims workflows.' },
      { Icon: LineChart, title: 'Investment tools', body: 'Portfolio, trading, reporting and education experiences for different literacy levels.' },
    ],
    processTitle: 'A research-first fintech design process',
    process: [
      { title: 'User and risk discovery', body: 'Understand anxieties, trust barriers, competitors and regulatory constraints.' },
      { title: 'Journey strategy', body: 'Define the onboarding, activation and transaction paths that matter most.' },
      { title: 'Interaction design', body: 'Design edge cases, error states, regulatory copy and high-confidence decision points.' },
      { title: 'Validation', body: 'Test for comprehension, trust, conversion and usability before launch.' },
    ],
    imageSections: [
      {
        eyebrow: 'Fintech design systems',
        title: 'Reusable patterns for products that cannot afford inconsistency',
        body: 'Typography, colour tokens and interaction states create a consistent trust layer across financial journeys.',
        imageMatch: 'fintech design systems',
        presentation: 'ui',
      },
      {
        eyebrow: 'Brand and colour tokens',
        title: 'Visual systems that make financial products feel stable',
        body: 'A well-built system makes compliance states, alerts, success messages and data displays easier to scale.',
        imageMatch: 'Brand and colour tokens',
        presentation: 'ui',
        reverse: true,
      },
    ],
    showcaseTitle: 'Fintech assets grounded in real platform work',
    showcaseBody: 'Mapped assets connect design systems with Tradition Capital Bank transformation proof.',
    hideShowcase: true,
    outcomes: [
      { Icon: CheckCircle2, title: 'Better onboarding', body: 'Users understand requirements and complete more steps with confidence.' },
      { Icon: Activity, title: 'Higher activation', body: 'Core actions are easier to discover, complete and repeat.' },
      { Icon: BadgeCheck, title: 'More trust', body: 'The product feels secure, transparent and credible from first use.' },
    ],
    ctaTitle: 'Building or redesigning a fintech product?',
    ctaBody: 'We can help you reduce friction, improve trust and design the journeys that drive adoption.',
    relatedLinks: [
      { label: 'Financial services UX design', href: '/financial-services-ux-design' },
      { label: 'Banking UX consulting', href: '/banking-ux-consulting' },
      relatedLinkFallbacks.work,
    ],
  },
  'banking-ux-consulting': {
    eyebrow: 'Banking UX consulting',
    title: 'Digital banking experiences that modernise without losing trust',
    intro:
      'We help retail, corporate and private banking teams redesign legacy journeys, mobile apps and customer platforms for modern expectations.',
    chips: ['Digital banking', 'Legacy redesign', 'Corporate workflows', 'Customer experience'],
    heroPresentation: 'photo',
    proof: [
      { Icon: Landmark, title: 'Banking domain depth', body: 'Retail, corporate and private banking journeys require different levels of control, trust and speed.' },
      { Icon: LockKeyhole, title: 'Secure by design', body: 'Security moments are designed to reassure users instead of making every task feel difficult.' },
      { Icon: Building2, title: 'Enterprise ready', body: 'Multi-user approvals, reporting and backend constraints are built into the UX strategy.' },
    ],
    challengeTitle: 'Banking transformation is hard because customers compare you to neobanks',
    challengeBody:
      'Customers expect instant, elegant digital banking, while banking teams have to work through regulation, risk, scale and core systems that were never built for modern front ends.',
    challengeCards: [
      { Icon: Smartphone, title: 'Mobile expectations', body: 'Account opening, payments and service tasks need to feel fast and self-evident.' },
      { Icon: Network, title: 'Legacy infrastructure', body: 'Good UX hides backend complexity without ignoring the constraints it creates.' },
      { Icon: FileCheck2, title: 'Operational compliance', body: 'KYC, fraud prevention and approvals need clear feedback and sensible progression.' },
    ],
    capabilityTitle: 'Banking journeys we redesign',
    capabilities: [
      { Icon: ClipboardCheck, title: 'Onboarding and KYC', body: 'Account opening, document capture, verification and activation.' },
      { Icon: Banknote, title: 'Payments and transfers', body: 'Domestic, international, bill pay and approval-heavy money movement.' },
      { Icon: LineChart, title: 'Corporate platforms', body: 'Treasury, reporting, permissions and multi-party workflows.' },
      { Icon: ShieldCheck, title: 'Fraud and security', body: 'Alerts, authentication, locked accounts and recovery journeys.' },
    ],
    processTitle: 'Modernisation without a fragile handoff',
    process: [
      { title: 'Current-state audit', body: 'Review app, web, branch and support journeys against customer expectations.' },
      { title: 'Service blueprint', body: 'Map front-stage journeys against backend systems, compliance and operations.' },
      { title: 'Priority redesign', body: 'Prototype high-value banking flows and test clarity with real users.' },
      { title: 'Design system', body: 'Create patterns internal product teams can keep using after launch.' },
    ],
    imageSections: [
      {
        eyebrow: 'Before and after',
        title: 'Legacy banking tools can become modern decision platforms',
        body: 'The work often starts by separating essential banking complexity from outdated interface friction.',
        imageMatch: 'before',
      },
      {
        eyebrow: 'Banking dashboard design',
        title: 'Clear account views reduce anxiety and support demand',
        body: 'Dashboards need to show status, movement and next actions without overwhelming customers.',
        imageMatch: 'banking dashboard design',
        reverse: true,
      },
    ],
    showcaseTitle: 'Banking proof with real transformation context',
    showcaseBody: 'Mapped assets show Tradition Capital Bank before and after alongside banking dashboard design.',
    outcomes: [
      { Icon: CheckCircle2, title: 'Higher adoption', body: 'Modern workflows help customers use digital channels instead of defaulting to support.' },
      { Icon: Activity, title: 'Fewer drop-offs', body: 'Onboarding and payment journeys become clearer at the moments users hesitate.' },
      { Icon: BadgeCheck, title: 'Stronger credibility', body: 'The bank feels modern without losing the seriousness users expect.' },
    ],
    ctaTitle: 'Modernising a banking experience?',
    ctaBody: 'We can help you prioritise the journeys that will improve customer confidence and reduce operational drag.',
    relatedLinks: [
      { label: 'Financial services UX design', href: '/financial-services-ux-design' },
      { label: 'Fintech UX design agency', href: '/fintech-ux-design-agency' },
      relatedLinkFallbacks.work,
    ],
  },
  'insurance-ux-design': {
    eyebrow: 'Insurance UX design',
    title: 'Insurance journeys that make policies, claims and cover easier to understand',
    intro:
      'We design policy portals, claims flows, broker tools and insurtech products that reduce confusion and build confidence.',
    chips: ['Claims UX', 'Policy portals', 'Broker tools', 'Insurtech products'],
    heroPresentation: 'photo',
    proof: [
      { Icon: FileCheck2, title: 'Policy clarity', body: 'Coverage, exclusions, limits and renewals are structured so customers know what they bought.' },
      { Icon: ClipboardCheck, title: 'Claims confidence', body: 'Claims flows show what is needed, what happens next and where the decision stands.' },
      { Icon: ShieldCheck, title: 'Compliant simplicity', body: 'Disclosure and regulation are designed into the journey instead of bolted on.' },
    ],
    challengeTitle: 'Insurance UX is most important when customers are stressed',
    challengeBody:
      'Customers engage with insurance infrequently, often during a claim or renewal. Clear digital journeys can protect trust when the relationship is most fragile.',
    challengeCards: [
      { Icon: Scale, title: 'Dense product rules', body: 'Insurance cannot be oversimplified, but it can be explained in better layers.' },
      { Icon: Activity, title: 'Low portal adoption', body: 'Self-service fails when it does not solve the moments customers actually care about.' },
      { Icon: Building2, title: 'Broker and agent complexity', body: 'Distribution teams need fast quoting, customer visibility and fewer admin loops.' },
    ],
    capabilityTitle: 'Insurance experiences we improve',
    capabilities: [
      { Icon: FileCheck2, title: 'Quote and buy journeys', body: 'Coverage selection, pricing clarity and purchase completion.' },
      { Icon: ClipboardCheck, title: 'Claims submission', body: 'Document capture, claim status, decisions and follow-up.' },
      { Icon: Smartphone, title: 'Customer portals', body: 'Policy management, renewals, billing and support.' },
      { Icon: Network, title: 'Broker platforms', body: 'Agent workflows, quoting tools and customer account views.' },
    ],
    processTitle: 'Insurance design that balances users and regulation',
    process: [
      { title: 'Journey audit', body: 'Identify friction in quotes, policy management, claims and renewal journeys.' },
      { title: 'Content architecture', body: 'Structure complex cover details, disclosures and support content clearly.' },
      { title: 'Prototype and test', body: 'Test stressful moments like claim filing and decision communication.' },
      { title: 'Pattern library', body: 'Document reusable insurance states, forms, alerts and explanation patterns.' },
    ],
    imageSections: [
      {
        eyebrow: 'Insurance platform design',
        title: 'A clearer policy view lowers the cost of confusion',
        body: 'Policy overview, claims status and next actions need to be visible before customers contact support.',
        imageMatch: 'insurance',
      },
    ],
    showcaseTitle: 'Insurance UX with focused product imagery',
    showcaseBody: 'The mapped insurance asset is used directly as UI proof, without a decorative card treatment.',
    outcomes: [
      { Icon: CheckCircle2, title: 'Clearer coverage', body: 'Customers understand what is covered, what is not and what to do next.' },
      { Icon: Activity, title: 'Lower claims friction', body: 'Status, evidence and decision points become easier to follow.' },
      { Icon: BadgeCheck, title: 'More self-service', body: 'Portals become useful enough to reduce repetitive support queries.' },
    ],
    ctaTitle: 'Improving an insurance journey?',
    ctaBody: 'We can help make policy, claims and portal experiences clearer for customers and teams.',
    relatedLinks: [
      { label: 'Financial services UX design', href: '/financial-services-ux-design' },
      { label: 'Healthcare UX design agency', href: '/healthcare-ux-design-agency' },
      relatedLinkFallbacks.work,
    ],
  },
  'healthcare-ux-design-agency': {
    eyebrow: 'Healthcare UX design agency',
    title: 'Healthcare UX that puts patients and clinicians first',
    intro:
      'We design patient apps, portals, clinical tools and health platforms where safety, accessibility and trust matter as much as conversion.',
    chips: ['Patient portals', 'Clinical workflows', 'Accessibility', 'Digital health'],
    heroVisualClassName: 'self-center lg:-translate-y-8',
    proof: [
      { Icon: HeartPulse, title: 'Safety-led design', body: 'Healthcare interfaces need to reduce cognitive load and prevent avoidable mistakes.' },
      { Icon: Activity, title: 'Real-world context', body: 'Patients, families and clinicians use products under pressure, with different levels of literacy.' },
      { Icon: BadgeCheck, title: 'Inclusive by default', body: 'Accessibility, plain language and mobile support are central to healthcare adoption.' },
    ],
    challengeTitle: 'Healthcare products fail when they ignore the stress of care',
    challengeBody:
      'Patients may be anxious or confused. Clinicians may be overloaded. Good healthcare UX reduces burden and helps people make the right next move.',
    challengeCards: [
      { Icon: HeartPulse, title: 'Patient safety', body: 'Critical workflows need clear hierarchy, confirmation and error prevention.' },
      { Icon: Smartphone, title: 'Mobile access', body: 'Patients often manage health tasks on phones, in waiting rooms or at home.' },
      { Icon: FileCheck2, title: 'Clinical governance', body: 'Design decisions need to respect compliance, security and clinical review.' },
    ],
    capabilityTitle: 'Healthcare experiences we design',
    capabilities: [
      { Icon: Smartphone, title: 'Patient apps', body: 'Appointments, results, medication, care plans and messaging.' },
      { Icon: HeartPulse, title: 'Clinical tools', body: 'Decision support, documentation and workflow interfaces for clinicians.' },
      { Icon: Network, title: 'Patient portals', body: 'Records, test results, scheduling and care-team communication.' },
      { Icon: ShieldCheck, title: 'Health insurance platforms', body: 'Benefits, claims and coverage explanation for members.' },
    ],
    processTitle: 'Healthcare UX with safety built in',
    process: [
      { title: 'Context research', body: 'Research with patients, families and clinicians around real workflows.' },
      { title: 'Clinical alignment', body: 'Align product strategy with care outcomes, governance and operations.' },
      { title: 'Accessible design', body: 'Design plain-language, inclusive journeys for different ages and abilities.' },
      { title: 'Usability validation', body: 'Test high-risk moments before release and refine after launch.' },
    ],
    imageSections: [
      {
        eyebrow: 'Patient app design',
        title: 'Mobile health experiences need to feel calm and actionable',
        body: 'Healthcare apps should help users understand appointments, results and care tasks without unnecessary friction.',
        imageMatch: 'Patient app',
      },
      {
        eyebrow: 'Responsive healthcare platforms',
        title: 'Care journeys continue across devices',
        body: 'Responsive design helps patients and teams move between mobile, tablet and desktop with less friction.',
        imageMatch: 'Responsive',
        reverse: true,
      },
    ],
    showcaseTitle: 'Digital health interfaces that make care easier to manage',
    showcaseBody:
      'Healthcare product design needs to reduce anxiety, clarify next steps and keep important information readable across mobile, tablet and desktop.',
    hideShowcase: true,
    outcomes: [
      { Icon: CheckCircle2, title: 'Safer flows', body: 'Important healthcare actions become harder to miss or misunderstand.' },
      { Icon: Activity, title: 'Better adoption', body: 'Patients and clinicians are more likely to use tools that respect their context.' },
      { Icon: BadgeCheck, title: 'Inclusive access', body: 'Accessibility and plain language improve reach across diverse populations.' },
    ],
    ctaTitle: 'Designing healthcare technology?',
    ctaBody: 'We can help make patient and clinician experiences clearer, safer and easier to adopt.',
    relatedLinks: [
      { label: 'Insurance UX design', href: '/insurance-ux-design' },
      { label: 'UX research agency', href: '/ux-research-agency' },
      relatedLinkFallbacks.work,
    ],
  },
  'nonprofit-and-ngo-website-design': {
    eyebrow: 'Nonprofit and NGO website design',
    title: 'Mission-driven websites that earn trust and move people to act',
    intro:
      'We design nonprofit and NGO websites that clarify impact, improve donation journeys and make it easier for supporters to get involved.',
    chips: ['Donation UX', 'Impact storytelling', 'Accessible websites', 'Supporter journeys'],
    heroPresentation: 'photo',
    proof: [
      { Icon: HeartPulse, title: 'Human impact first', body: 'Stories, evidence and calls to action are structured around the mission, not internal org charts.' },
      { Icon: CheckCircle2, title: 'Donation clarity', body: 'Supporters understand where funds go, why it matters and what happens after they give.' },
      { Icon: BadgeCheck, title: 'Accessible presence', body: 'Inclusive, fast and mobile-friendly design helps community audiences engage anywhere.' },
    ],
    challengeTitle: 'Nonprofit websites have to communicate trust quickly',
    challengeBody:
      'Supporters arrive with questions: is this organisation credible, what impact does it have, and how can I help? The website needs to answer before attention is lost.',
    challengeCards: [
      { Icon: Layers, title: 'Content overload', body: 'Programs, reports, stories and updates need structure so visitors do not get lost.' },
      { Icon: CreditCard, title: 'Donation friction', body: 'Giving flows need clear amounts, low friction and confidence around payment.' },
      { Icon: Smartphone, title: 'Mobile community access', body: 'Many supporters, volunteers and beneficiaries experience the organisation on phones first.' },
    ],
    capabilityTitle: 'Nonprofit website work we lead',
    capabilities: [
      { Icon: Network, title: 'Information architecture', body: 'Navigation and content models that make programs, impact and resources easier to find.' },
      { Icon: CreditCard, title: 'Donation journeys', body: 'Donation pages, recurring giving, payment clarity and confirmation moments.' },
      { Icon: HeartPulse, title: 'Impact storytelling', body: 'Pages and modules that communicate need, action and outcomes clearly.' },
      { Icon: BadgeCheck, title: 'Accessible design', body: 'WCAG-aware layouts, readable content and inclusive mobile experiences.' },
    ],
    processTitle: 'A website process built around action',
    process: [
      { title: 'Mission discovery', body: 'Understand audiences, impact, supporter behaviour and internal publishing needs.' },
      { title: 'Content strategy', body: 'Organise stories, programs, reports and calls to action around user intent.' },
      { title: 'Design and test', body: 'Create responsive page patterns and validate the paths to donate, volunteer or learn.' },
      { title: 'CMS handoff', body: 'Prepare designs and structure so the team can maintain the website sustainably.' },
    ],
    imageSections: [
      {
        eyebrow: 'Mobile-first nonprofit design',
        title: 'Supporters should be able to act from any device',
        body: 'Mobile layouts need the same clarity and credibility as desktop, especially for donations and urgent campaigns.',
        imageMatch: 'responsive',
        presentation: 'ui',
      },
      {
        eyebrow: 'Mission-driven design',
        title: 'Human stories make digital journeys feel real',
        body: 'Photography and impact storytelling help turn an organisation from abstract cause into trusted community work.',
        imageMatch: 'lifestyle',
        presentation: 'photo',
        reverse: true,
      },
    ],
    showcaseTitle: 'Nonprofit assets arranged around action and trust',
    showcaseBody: 'Desktop, mobile and lifestyle imagery support the story of a practical mission-driven web presence.',
    hideShowcase: true,
    outcomes: [
      { Icon: CheckCircle2, title: 'Clearer action', body: 'Visitors can donate, volunteer, sign up or learn without hunting.' },
      { Icon: Activity, title: 'Better credibility', body: 'Modern design and clear impact messaging build confidence fast.' },
      { Icon: BadgeCheck, title: 'Sustainable publishing', body: 'Content structure makes the site easier for small teams to keep alive.' },
    ],
    ctaTitle: 'Ready to make your nonprofit website work harder?',
    ctaBody: 'We can help turn your mission, impact and supporter journeys into a clearer digital experience.',
    relatedLinks: [
      { label: 'Website design and development', href: '/website-design-and-development' },
      { label: 'Nonprofit digital strategy and UX', href: '/nonprofit-digital-strategy-and-ux' },
      relatedLinkFallbacks.work,
    ],
  },
  'b2b-ecommerce-ux-design': {
    eyebrow: 'B2B e-commerce UX design',
    title: 'B2B commerce platforms built for real buyers, accounts and order complexity',
    intro:
      'We design wholesale, distribution and manufacturing commerce experiences that support bulk ordering, approvals and account workflows.',
    chips: ['Wholesale ordering', 'Account workflows', 'Bulk buying', 'B2B portals'],
    heroPresentation: 'photo',
    proof: [
      { Icon: ShoppingCart, title: 'Bulk ordering', body: 'Professional buyers need speed, repeat orders, saved carts and order confidence.' },
      { Icon: Building2, title: 'Multi-user accounts', body: 'Roles, permissions, locations and approval rules need to feel manageable.' },
      { Icon: Network, title: 'Operational integration', body: 'ERP, pricing, inventory and fulfilment constraints shape the interface.' },
    ],
    challengeTitle: 'B2B commerce is not consumer shopping with larger carts',
    challengeBody:
      'Trade buyers know what they need. The UX has to respect procurement behaviour, account rules, negotiated pricing and operational constraints.',
    challengeCards: [
      { Icon: ClipboardCheck, title: 'Approval workflows', body: 'Large orders need routing, status and decision clarity across teams.' },
      { Icon: Banknote, title: 'Custom pricing', body: 'Contract pricing, volume discounts and promotions must be visible without becoming confusing.' },
      { Icon: LineChart, title: 'Reporting and reordering', body: 'Buyers and account managers need dashboards that support repeat procurement.' },
    ],
    capabilityTitle: 'B2B commerce services we provide',
    capabilities: [
      { Icon: ShoppingCart, title: 'Ordering interfaces', body: 'Catalogues, quick order, bulk upload, cart and checkout flows.' },
      { Icon: Building2, title: 'Account management', body: 'Roles, permissions, addresses, payment terms and multi-location accounts.' },
      { Icon: Network, title: 'Marketplace platforms', body: 'Buyer, supplier and admin experiences for multi-party commerce.' },
      { Icon: FileCheck2, title: 'Integration UX', body: 'Data import, ERP connection, API-facing workflows and operational handoffs.' },
    ],
    processTitle: 'A B2B commerce process grounded in operations',
    process: [
      { title: 'Business model mapping', body: 'Understand buyers, sales teams, account rules, pricing and order fulfilment.' },
      { title: 'Workflow design', body: 'Map catalogue, approval, reorder, payment and account management flows.' },
      { title: 'Prototype key paths', body: 'Test ordering, pricing clarity and account controls with real trade users.' },
      { title: 'System handoff', body: 'Document patterns and edge cases for implementation against commerce and ERP systems.' },
    ],
    imageSections: [
      {
        eyebrow: 'Product catalogue UX',
        title: 'Trade buyers need fast discovery and repeat ordering',
        body: 'Catalogue experiences should support known-item search, filtering, bulk quantities and confidence around availability.',
        imageMatch: 'catalogue',
      },
      {
        eyebrow: 'Desktop-first B2B platform',
        title: 'Procurement depth belongs on desktop, without ignoring mobile',
        body: 'B2B platforms often need desktop depth for account work and responsive access for people on the move.',
        imageMatch: 'Desktop',
        reverse: true,
      },
    ],
    showcaseTitle: 'Heineken platform assets used as contextual B2B proof',
    showcaseBody: 'Product catalogue, order, account and responsive views show how trade commerce can become more usable.',
    outcomes: [
      { Icon: CheckCircle2, title: 'Faster ordering', body: 'Professional buyers can complete routine orders with fewer interruptions.' },
      { Icon: Activity, title: 'Higher self-service', body: 'Clearer workflows reduce manual sales and support dependency.' },
      { Icon: BadgeCheck, title: 'Better account control', body: 'Permissions, pricing and approvals become easier to manage.' },
    ],
    ctaTitle: 'Designing a B2B commerce platform?',
    ctaBody: 'We can help turn complex ordering, pricing and account workflows into a product buyers want to use.',
    relatedLinks: [relatedLinkFallbacks.caseStudy, relatedLinkFallbacks.services, relatedLinkFallbacks.work],
  },
  'telco-ux-design': {
    eyebrow: 'Telco UX design',
    title: 'Telco self-service experiences that reduce churn and support load',
    intro:
      'We design telecom apps, portals, billing interfaces and B2B platforms that make complex services easier to manage.',
    chips: ['Self-service portals', 'Billing UX', 'Mobile telco apps', 'B2B service platforms'],
    heroPresentation: 'photo',
    proof: [
      { Icon: RadioTower, title: 'Service complexity simplified', body: 'Plans, usage, roaming, devices and upgrades need clear customer-facing journeys.' },
      { Icon: Smartphone, title: 'Mobile-first support', body: 'Customers expect to manage their telco account without phoning a support line.' },
      { Icon: Activity, title: 'Churn reduction', body: 'Better self-service, billing clarity and issue resolution directly affect retention.' },
    ],
    challengeTitle: 'Telco customers leave when everyday service tasks feel hard',
    challengeBody:
      'In a commodity market, the app, bill and support journey become part of the product. Clear UX can turn frustration into retention.',
    challengeCards: [
      { Icon: Banknote, title: 'Billing confusion', body: 'Usage, bundles, surcharges and promotional pricing need transparent explanation.' },
      { Icon: Smartphone, title: 'App performance perception', body: 'Even good services feel poor when account management is slow or unclear.' },
      { Icon: Building2, title: 'Enterprise telco needs', body: 'B2B customers need multi-site management, cost controls and usage reporting.' },
    ],
    capabilityTitle: 'Telco journeys we design',
    capabilities: [
      { Icon: Smartphone, title: 'Mobile apps', body: 'Usage tracking, plan changes, support, payments and alerts.' },
      { Icon: Network, title: 'Self-service portals', body: 'Account management, service activation and issue resolution.' },
      { Icon: Banknote, title: 'Billing interfaces', body: 'Bills, charges, plan comparisons, payment and reminders.' },
      { Icon: RadioTower, title: 'B2B platforms', body: 'Enterprise service management, reporting and multi-site controls.' },
    ],
    processTitle: 'A telco UX process focused on retention',
    process: [
      { title: 'Customer journey audit', body: 'Identify where customers call support, churn or lose confidence.' },
      { title: 'Task prioritisation', body: 'Separate high-frequency self-service tasks from low-value feature clutter.' },
      { title: 'Prototype key flows', body: 'Design and test billing, usage, plan change and support journeys.' },
      { title: 'Design system', body: 'Create reusable account, usage, alert and service management patterns.' },
    ],
    imageSections: [
      {
        eyebrow: 'Light and dark mode design',
        title: 'Telco apps need to feel personal without losing clarity',
        body: 'Mode variants, account states and plan information should stay usable across everyday customer contexts.',
        imageMatch: 'Light',
      },
      {
        eyebrow: 'Telco web platform',
        title: 'Self-service needs more than a mobile app',
        body: 'Desktop portals support deeper account, billing and enterprise workflows while the mobile app handles fast tasks.',
        imageMatch: 'web platform',
        reverse: true,
      },
    ],
    showcaseTitle: 'A cross-device telco product story',
    showcaseBody: 'Mapped telco assets include app, desktop portal, browser mockup and additional mobile screen designs.',
    outcomes: [
      { Icon: CheckCircle2, title: 'More self-service', body: 'Customers can solve routine tasks without contacting support.' },
      { Icon: Activity, title: 'Lower churn pressure', body: 'Clearer billing and service control reduce frustration.' },
      { Icon: BadgeCheck, title: 'Better digital adoption', body: 'Apps and portals become credible channels for ongoing customer value.' },
    ],
    ctaTitle: 'Improving a telco app or portal?',
    ctaBody: 'We can help simplify account, billing and support journeys that drive retention.',
    relatedLinks: [relatedLinkFallbacks.services, relatedLinkFallbacks.strategy, relatedLinkFallbacks.work],
  },
};

function relatedLinksFor(data: MarketingPageContent, config: IndustryConfig): MarketingPageContent['internalLinks'] {
  const generatedLinks = data.internalLinks.filter((link) => {
    const label = link.label.toLowerCase();
    return !label.includes('hero:') && !label.includes('section images') && !label.includes('donation ux');
  });

  return generatedLinks.length ? generatedLinks : config.relatedLinks;
}

const IndustryPremiumPage: React.FC<{ data: MarketingPageContent; config: IndustryConfig }> = ({ data, config }) => {
  return (
    <PageShell showContact={false}>
      <PremiumIndustryHero data={data} config={config} />

      <section className="section-padding bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Sector context</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{config.challengeTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">{config.challengeBody}</p>
          </div>
          <CardGrid cards={config.proof} />
        </div>
      </section>

      <section className="section-padding bg-[#f8f5f1]">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">What gets in the way</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">The patterns we solve repeatedly</h2>
          </div>
          <CardGrid cards={config.challengeCards} />
        </div>
      </section>

      {config.imageSections.map((section) =>
        data.slug === 'banking-ux-consulting' && section.eyebrow.toLowerCase().includes('before') ? (
          <BeforeAfterSection
            key={section.title}
            eyebrow={section.eyebrow}
            title={section.title}
            body={section.body}
            before={beforeAfterImageByFilename(data, 'before')}
            after={beforeAfterImageByFilename(data, 'after')}
          />
        ) : (
          <SplitImageSection
            key={section.title}
            eyebrow={section.eyebrow}
            title={section.title}
            body={section.body}
            image={imageByMatch(data, section.imageMatch, section.fallbackIndex)}
            reverse={section.reverse}
            presentation={section.presentation}
          />
        ),
      )}

      <section className="section-padding bg-[#101113] text-white">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Capabilities</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{config.capabilityTitle}</h2>
          </div>
          <CardGrid cards={config.capabilities} dark columns="lg:grid-cols-4" />
        </div>
      </section>

      <ProcessSection config={config} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Outcomes</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">What changes after the redesign</h2>
          </div>
          <CardGrid cards={config.outcomes} />
        </div>
      </section>

      <IntegratedCta data={data} config={config} />
      <MarketingFAQ items={data.faqs} />
      <MarketingInternalLinks links={relatedLinksFor(data, config)} />
    </PageShell>
  );
};

export function renderIndustryPremiumPage(data: MarketingPageContent): React.ReactNode | null {
  if (data.category !== 'industry' || !INDUSTRY_PREMIUM_SLUGS.includes(data.slug)) return null;

  const config = INDUSTRY_CONFIGS[data.slug];
  if (!config) return null;

  return <IndustryPremiumPage data={data} config={config} />;
}
