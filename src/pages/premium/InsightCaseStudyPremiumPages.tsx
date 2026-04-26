/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Compass,
  Gauge,
  HeartHandshake,
  Layers,
  Lightbulb,
  MonitorSmartphone,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import PageShell from '@/components/marketing/PageShell';
import { beforeAfterImageByFilename, BeforeAfterSection } from '@/components/marketing/BeforeAfterSection';
import MarketingFAQ from '@/components/marketing/MarketingFAQ';
import MarketingInternalLinks from '@/components/marketing/MarketingInternalLinks';
import { pageImageSrc } from '@/components/marketing/pageImageSrc';
import type { MarketingImageSpec, MarketingPageContent } from '@/types/marketing';

export const INSIGHT_CASE_STUDY_PREMIUM_SLUGS: string[] = [
  'ai-product-development-for-startups',
  'design-capability-building',
  'design-maturity-model',
  'digital-transformation-ux',
  'nonprofit-digital-strategy-and-ux',
  'mukuru-mobile-app-rebrand-and-redesign',
  'tradition-capital-bank-data-analytics-platform-redesign',
];

type MediaPresentation = 'auto' | 'photo' | 'ui';

interface PremiumCard {
  title: string;
  body: string;
  Icon: LucideIcon;
}

interface PremiumStep {
  title: string;
  body: string;
}

interface RelatedLink {
  label: string;
  href: string;
}

interface InsightConfig {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  thesis: string;
  chips: string[];
  heroAsBackground?: boolean;
  takeaways: PremiumCard[];
  firstSection: {
    eyebrow: string;
    title: string;
    body: string;
    imageTerms: string[];
    presentation?: MediaPresentation;
  };
  stepsTitle: string;
  steps: PremiumStep[];
  darkSection: {
    eyebrow: string;
    title: string;
    body: string;
    cards: PremiumCard[];
  };
  secondSection: {
    eyebrow: string;
    title: string;
    body: string;
    imageTerms: string[];
    presentation?: MediaPresentation;
  };
  ctaTitle: string;
  ctaBody: string;
  relatedLinks: RelatedLink[];
}

interface CaseStudyConfig {
  slug: string;
  title: string;
  intro: string;
  chips: string[];
  contextCards: PremiumCard[];
  challenge: {
    eyebrow: string;
    title: string;
    body: string;
    imageTerms: string[];
  };
  approachTitle: string;
  approach: PremiumStep[];
  outputTitle: string;
  outputBody: string;
  /** Used when `outputPresentation` is `grid` (default). */
  outputImageTerms?: string[][];
  /** `beforeAfter` uses the same layout as the banking-ux-consulting before/after block. */
  outputPresentation?: 'grid' | 'beforeAfter';
  outcomeCards: PremiumCard[];
  ctaTitle: string;
  ctaBody: string;
  relatedLinks: RelatedLink[];
  /** Full-bleed hero image behind title (same treatment as the AI insight). */
  heroAsBackground?: boolean;
}

const calendarHref = 'https://calendly.com/sanddollardesign/intro';

function isValidImage(image: MarketingImageSpec | undefined): image is MarketingImageSpec {
  if (!image) return false;
  const invalidFiles = ['Filename', 'Production Notes', 'Alt text guidelines', 'Video assets'];
  const invalidAlts = ['PNG', 'JPG', 'Type'];
  return Boolean(image.file) && !image.file.startsWith('•') && !invalidFiles.includes(image.file) && !invalidAlts.includes(image.alt);
}

function cleanImages(data: MarketingPageContent): MarketingImageSpec[] {
  const images = data.gallery?.filter(isValidImage) || [];
  if (data.heroImage) {
    images.unshift({
      file: data.heroImage,
      placement: 'Hero image',
      alt: data.heroImageAlt || data.h1,
    });
  }
  return images;
}

function getImage(data: MarketingPageContent, terms: string[]): MarketingImageSpec | undefined {
  const normalizedTerms = terms.map((term) => term.toLowerCase());
  return cleanImages(data).find((image) => {
    const haystack = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
    return normalizedTerms.some((term) => haystack.includes(term));
  });
}

function imageFromHero(data: MarketingPageContent): MarketingImageSpec | undefined {
  if (!data.heroImage) return undefined;
  return {
    file: data.heroImage,
    placement: 'Hero image',
    alt: data.heroImageAlt || data.h1,
  };
}

function isPhotoAsset(image: MarketingImageSpec): boolean {
  const text = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
  return ['team', 'workshop', 'studio', 'office', 'whiteboard', 'collaborating', 'community', 'volunteer', 'donor', 'researcher', 'coding', 'engineer'].some((term) =>
    text.includes(term),
  );
}

function isUiAsset(image: MarketingImageSpec): boolean {
  if (isPhotoAsset(image)) return false;
  const text = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
  return [
    'app',
    'dashboard',
    'design system',
    'interface',
    'mobile',
    'model',
    'platform',
    'prototype',
    'report',
    'screen',
    'ui',
    'wireframe',
  ].some((term) => text.includes(term));
}

function mergeRelatedLinks(data: MarketingPageContent, curated: RelatedLink[]): RelatedLink[] {
  const generated = data.internalLinks.filter((link) => {
    const label = link.label.toLowerCase();
    return !label.includes('hero image') && !label.includes('section images') && !label.includes('related pages:');
  });
  const links = [...curated, ...generated];
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

const ShowcaseImage: React.FC<{
  image?: MarketingImageSpec;
  aspect?: string;
  className?: string;
  presentation?: MediaPresentation;
}> = ({ image, aspect = 'aspect-[4/3]', className = '', presentation = 'auto' }) => {
  if (!image) return null;

  const ui = presentation === 'ui' || (presentation === 'auto' && isUiAsset(image));

  if (ui) {
    return (
      <figure className={`relative ${className}`}>
        <img
          src={pageImageSrc(image.file)}
          alt={image.alt}
          className={`${aspect} w-full object-contain drop-shadow-[0_18px_38px_rgba(15,23,42,0.16)]`}
        />
      </figure>
    );
  }

  return (
    <figure className={`overflow-hidden rounded-[2rem] border border-white/60 bg-gray-100 shadow-2xl ${className}`}>
      <img src={pageImageSrc(image.file)} alt={image.alt} className={`${aspect} h-full w-full object-cover`} />
    </figure>
  );
};

const PremiumHero: React.FC<{
  eyebrow: string;
  title: string;
  intro: string;
  image?: MarketingImageSpec;
  chips: string[];
  imageAsBackground?: boolean;
}> = ({ eyebrow, title, intro, image, chips, imageAsBackground = false }) => {
  const imageIsUi = image ? isUiAsset(image) : false;
  const showBackgroundImage = imageAsBackground && image;

  return (
    <section className="relative overflow-hidden bg-[#0c0d10] text-white">
      {showBackgroundImage ? (
        <img src={pageImageSrc(image.file)} alt={image.alt} className="absolute inset-0 h-full w-full object-cover opacity-60" />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(249,115,21,0.2),transparent_32%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,0.09),transparent_28%)]" />
      {showBackgroundImage ? (
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.95),rgba(0,0,0,0.76)_48%,rgba(0,0,0,0.38)_72%)]" />
      ) : null}
      <div
        className={`relative z-10 container-custom grid ${
          showBackgroundImage
            ? 'min-h-0 items-center gap-8 pb-12 pt-24 sm:min-h-[min(88vh,720px)] sm:pb-10 sm:pt-20 md:pb-16 md:pt-24 lg:grid-cols-1'
            : 'min-h-[650px] items-end gap-12 pb-14 pt-36 md:pt-40 lg:grid-cols-[1.05fr_0.95fr]'
        }`}
      >
        <div className={showBackgroundImage ? 'max-w-6xl' : 'max-w-4xl'}>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-white/65">{eyebrow}</p>
          <h1
            className={`font-black leading-[0.98] tracking-tight ${
              showBackgroundImage ? 'text-4xl sm:text-5xl md:text-6xl lg:text-[3.15rem] xl:text-7xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-7 text-lg leading-relaxed text-white/78 md:mt-6 md:text-xl ${
              showBackgroundImage ? 'max-w-5xl' : 'max-w-2xl'
            }`}
          >
            {intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={calendarHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
            >
              Book a free strategy call
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View our work
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                {chip}
              </span>
            ))}
          </div>
        </div>

        {image && !showBackgroundImage ? (
          <div className="hidden lg:block">
            <ShowcaseImage
              image={image}
              aspect={imageIsUi ? 'aspect-[5/4]' : 'aspect-[4/5]'}
              presentation={imageIsUi ? 'ui' : 'photo'}
              className="translate-y-4"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

const CardGrid: React.FC<{ cards: PremiumCard[]; dark?: boolean; columns?: string }> = ({ cards, dark = false, columns = 'md:grid-cols-3' }) => (
  <div className={`grid gap-5 ${columns}`}>
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

const ThesisStrip: React.FC<{ thesis: string }> = ({ thesis }) => (
  <section className="bg-white py-8">
    <div className="container-custom">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-[#101113] p-8 text-white shadow-2xl md:p-10 lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(249,115,22,0.26),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.1),transparent_42%)]" />
        <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-[#fb923c] backdrop-blur md:right-8 md:top-8">
          <Sparkles className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
        </div>
        <p className="relative max-w-5xl pr-12 text-2xl font-black leading-tight tracking-tight text-white md:pr-20 md:text-4xl">{thesis}</p>
        <div className="relative mt-8 h-px max-w-2xl bg-gradient-to-r from-[#f97315] via-white/20 to-transparent" />
        <p className="relative mt-5 max-w-2xl text-sm font-semibold uppercase tracking-[0.22em] text-white/50">
          Design-led AI product principle
        </p>
      </div>
    </div>
  </section>
);

const SplitSection: React.FC<{
  eyebrow: string;
  title: string;
  body: string;
  image?: MarketingImageSpec;
  reverse?: boolean;
  tone?: 'white' | 'warm';
  presentation?: MediaPresentation;
}> = ({ eyebrow, title, body, image, reverse = false, tone = 'white', presentation = 'auto' }) => (
  <section className={`section-padding ${tone === 'warm' ? 'bg-[#f8f5f1]' : 'bg-white'}`}>
    <div className={`container-custom grid items-center gap-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">{eyebrow}</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{title}</h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">{body}</p>
      </div>
      <ShowcaseImage image={image} presentation={presentation} />
    </div>
  </section>
);

const StepSection: React.FC<{ eyebrow?: string; title: string; steps: PremiumStep[] }> = ({ eyebrow = 'How it works', title, steps }) => (
  <section className="section-padding bg-[#f8f5f1]">
    <div className="container-custom">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">{eyebrow}</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
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

const DarkInsightSection: React.FC<InsightConfig['darkSection']> = ({ eyebrow, title, body, cards }) => (
  <section className="section-padding bg-[#101113] text-white">
    <div className="container-custom grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">{eyebrow}</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{title}</h2>
        <p className="mt-6 text-lg leading-relaxed text-white/65">{body}</p>
      </div>
      <CardGrid cards={cards} dark columns="md:grid-cols-3" />
    </div>
  </section>
);

const ConversionBand: React.FC<{ title: string; body: string; href?: string }> = ({ title, body, href = calendarHref }) => (
  <section className="bg-white py-8">
    <div className="container-custom">
      <div className="overflow-hidden rounded-[2rem] bg-[#101113] p-8 text-white shadow-2xl md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.25fr_auto]">
          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-white/70">{body}</p>
          </div>
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
          >
            Book a free strategy call
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const ImageStoryGrid: React.FC<{ title: string; body: string; images: MarketingImageSpec[] }> = ({ title, body, images }) => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="mb-10 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Outputs</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{title}</h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">{body}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {images.map((image, index) => (
          <ShowcaseImage key={`${image.file}-${index}`} image={image} presentation="ui" aspect={index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'} />
        ))}
      </div>
    </div>
  </section>
);

const insightConfigs: Record<string, InsightConfig> = {
  'ai-product-development-for-startups': {
    slug: 'ai-product-development-for-startups',
    eyebrow: 'Insight',
    title: 'AI products need trust before they need features',
    intro:
      'A practical guide for startup teams building AI products that users can understand, evaluate and return to after the first demo excitement fades.',
    thesis:
      'The winning AI product is not the cleverest model in the room. It is the product that makes uncertainty visible, gives users control, and solves a real job better than the non-AI alternative.',
    chips: ['AI UX', 'Startup MVPs', 'Trust and explainability', 'Product validation'],
    heroAsBackground: true,
    takeaways: [
      { Icon: Target, title: 'Start with the user problem', body: 'AI earns its place only when it solves the job better than a simpler workflow.' },
      { Icon: ShieldCheck, title: 'Design for trust', body: 'Confidence, explanations, corrections and graceful failures need to be designed into the interface.' },
      { Icon: Gauge, title: 'Prototype before build', body: 'Wizard-of-Oz and high-fidelity prototypes let teams test the experience before expensive model work.' },
    ],
    firstSection: {
      eyebrow: 'The product challenge',
      title: 'Engineering-first AI often creates confusing products',
      body:
        'Founders can have strong models and still struggle with adoption. Users need to understand what the AI is doing, when to trust it, what to do when it is wrong, and how it fits into their existing workflow.',
      imageTerms: ['what ai startup products', 'ai development dashboard image'],
      presentation: 'ui',
    },
    stepsTitle: 'A design-led AI product rhythm',
    steps: [
      { title: 'Problem before AI', body: 'Define the user job, the decision being supported and the point where AI adds real leverage.' },
      { title: 'UX before model lock-in', body: 'Shape inputs, outputs, explanations and controls before the technical architecture is frozen.' },
      { title: 'Trust mechanics', body: 'Show confidence, uncertainty, source signals and correction paths in language users can act on.' },
      { title: 'Failure states', body: 'Plan for bad outputs, missing data, edge cases and human escalation before launch.' },
      { title: 'Prototype and test', body: 'Validate comprehension, perceived value and trust with real users before scaling engineering effort.' },
      { title: 'Handoff to build', body: 'Document flows, components, states and AI behavior so product and engineering stay aligned.' },
    ],
    darkSection: {
      eyebrow: 'Common failure modes',
      title: 'The mistakes that kill AI adoption',
      body: 'Most AI UX problems are not visual polish problems. They are expectation, transparency and workflow problems.',
      cards: [
        { Icon: BrainCircuit, title: 'Black-box outputs', body: 'The product gives an answer without showing why it matters or how reliable it is.' },
        { Icon: Users, title: 'Weak onboarding', body: 'Users arrive without a mental model for what the AI can do or where they fit in.' },
        { Icon: Workflow, title: 'Over-automation', body: 'The product removes useful human control and creates more anxiety than speed.' },
      ],
    },
    secondSection: {
      eyebrow: 'Validation',
      title: 'Test usefulness, not novelty',
      body:
        'The goal is not to prove that users are impressed by AI. It is to learn whether the product reduces effort, clarifies a decision, and earns enough trust to become part of regular behavior.',
      imageTerms: ['ai ux design for startups', 'dashboard mockup'],
      presentation: 'ui',
    },
    ctaTitle: 'Building an AI product users can trust?',
    ctaBody: 'We help early-stage teams turn AI capability into clear, testable product experiences before the build gets expensive.',
    relatedLinks: [
      { label: 'AI Development Agency', href: '/ai-development-agency' },
      { label: 'Product Design Agency', href: '/product-design-agency' },
      { label: 'UX Strategy Consulting', href: '/ux-strategy-consulting' },
    ],
  },
  'design-capability-building': {
    slug: 'design-capability-building',
    eyebrow: 'Insight',
    title: 'Design capability is built into how teams work',
    intro: 'A practical guide to building the people, process, tools and culture that let design quality scale beyond one strong practitioner.',
    thesis:
      'Organisations do not scale through one brilliant designer. They scale when design becomes a repeatable capability inside product decisions, team rituals and leadership expectations.',
    chips: ['Design ops', 'Team coaching', 'Design systems', 'Research culture'],
    takeaways: [
      { Icon: Users, title: 'People and skills', body: 'Capability includes designers, product managers, engineers and leaders who understand design decisions.' },
      { Icon: Workflow, title: 'Process and rituals', body: 'Research, critique, handoff and feedback loops make design quality repeatable.' },
      { Icon: Layers, title: 'Tools and systems', body: 'Design systems, documentation and component libraries help teams move faster without losing coherence.' },
    ],
    firstSection: {
      eyebrow: 'Capability, not headcount',
      title: 'Design maturity depends on the system around the team',
      body:
        'Hiring designers helps, but it is not enough. Teams need shared language, clear standards, a research practice, useful critique rituals and leaders who value evidence over opinion.',
      imageTerms: ['building a research practice', 'user testing observation'],
      presentation: 'photo',
    },
    stepsTitle: 'How design capability grows',
    steps: [
      { title: 'Assess the current state', body: 'Interview teams, review workflows and identify where design breaks down today.' },
      { title: 'Set a realistic direction', body: 'Define the next capability level and the constraints around budget, hiring and delivery.' },
      { title: 'Build skills and roles', body: 'Coach teams, shape hiring, clarify responsibilities and support mentoring.' },
      { title: 'Codify processes', body: 'Create rituals for discovery, research, critique, handoff and decision-making.' },
      { title: 'Build infrastructure', body: 'Establish design systems, documentation, tokens and implementation workflows.' },
      { title: 'Measure and iterate', body: 'Track adoption, usability, design system use and team confidence over time.' },
    ],
    darkSection: {
      eyebrow: 'Blockers',
      title: 'Most design teams stall for organisational reasons',
      body: 'Capability gaps show up as slow delivery, inconsistent products and exhausted teams. The fix is usually structural, not motivational.',
      cards: [
        { Icon: Building2, title: 'Low leadership buy-in', body: 'Design is treated as aesthetics instead of a business capability.' },
        { Icon: Network, title: 'Siloed teams', body: 'Design, product and engineering work in sequence instead of solving together.' },
        { Icon: Search, title: 'Weak research practice', body: 'Important decisions are made from opinion because teams lack usable evidence.' },
      ],
    },
    secondSection: {
      eyebrow: 'Standards',
      title: 'Documentation turns good judgment into shared practice',
      body:
        'Reports, patterns, playbooks and component guidance make it easier for teams to make consistent decisions when senior designers are not in every meeting.',
      imageTerms: ['documentation standards', 'user testing report'],
      presentation: 'ui',
    },
    ctaTitle: 'Ready to strengthen your design practice?',
    ctaBody: 'We can assess where your team is today and shape a practical roadmap for stronger design capability.',
    relatedLinks: [
      { label: 'Design Maturity Model', href: '/design-maturity-model' },
      { label: 'Design System Consulting', href: '/design-system-consulting' },
      { label: 'UX Strategy Consulting', href: '/ux-strategy-consulting' },
    ],
  },
  'design-maturity-model': {
    slug: 'design-maturity-model',
    eyebrow: 'Insight',
    title: 'Where does your organisation sit on the design maturity curve?',
    intro: 'A strategic model for diagnosing whether design is reactive, managed, integrated or truly driving product and business decisions.',
    thesis:
      'Design maturity is a business capability. It affects speed, rework, adoption, consistency and the quality of decisions made before teams commit to build.',
    chips: ['Maturity assessment', 'Design strategy', 'Research practice', 'Design leadership'],
    takeaways: [
      { Icon: Compass, title: 'Diagnose honestly', body: 'Identify whether design is reactive, defined, managed, integrated or design-led.' },
      { Icon: BarChart3, title: 'Connect to outcomes', body: 'Maturity matters because it changes delivery speed, product quality and measurable adoption.' },
      { Icon: Sparkles, title: 'Move one level at a time', body: 'The next level usually requires leadership support, better rituals and stronger standards.' },
    ],
    firstSection: {
      eyebrow: 'The model',
      title: 'Five levels from ad hoc to design-led',
      body:
        'Low-maturity organisations treat design as decoration or late-stage execution. Mature organisations embed design from day one, use research to reduce risk and give teams reusable systems for quality at speed.',
      imageTerms: ['design maturity model'],
      presentation: 'ui',
    },
    stepsTitle: 'The five levels of design maturity',
    steps: [
      { title: 'Ad hoc', body: 'Design is reactive, inconsistent and often brought in after key product decisions are already made.' },
      { title: 'Defined', body: 'The organisation recognises design value and starts establishing basic standards and processes.' },
      { title: 'Managed', body: 'Research, design systems, governance and product collaboration become normal practice.' },
      { title: 'Integrated', body: 'Design shapes strategy, product planning and cross-functional problem solving.' },
      { title: 'Design-led', body: 'Experience quality becomes a core competitive advantage and board-level concern.' },
      { title: 'Continuous improvement', body: 'The organisation measures design impact and invests in capability over time.' },
    ],
    darkSection: {
      eyebrow: 'Symptoms',
      title: 'Signs you have a maturity gap',
      body: 'Design maturity problems are visible in delivery pain long before they show up in brand perception.',
      cards: [
        { Icon: Gauge, title: 'Rework cycles', body: 'Product launches slow down because design decisions are made too late.' },
        { Icon: Layers, title: 'Inconsistent standards', body: 'Each team creates its own patterns, language and UI decisions.' },
        { Icon: Users, title: 'Weak adoption', body: 'Users need support because the product does not reflect how they work.' },
      ],
    },
    secondSection: {
      eyebrow: 'Research-led practice',
      title: 'Higher maturity starts with better evidence',
      body:
        'The shift from opinion-led to evidence-led design requires user research rituals, usable documentation and a culture that rewards learning before building.',
      imageTerms: ['stage 3', 'user testing observation'],
      presentation: 'photo',
    },
    ctaTitle: 'Want to assess your design maturity?',
    ctaBody: 'We can help you diagnose the current state and identify the practical next moves toward stronger design capability.',
    relatedLinks: [
      { label: 'Design Capability Building', href: '/design-capability-building' },
      { label: 'Enterprise UX Consulting', href: '/enterprise-ux-consulting' },
      { label: 'UX Strategy Consulting', href: '/ux-strategy-consulting' },
    ],
  },
  'digital-transformation-ux': {
    slug: 'digital-transformation-ux',
    eyebrow: 'Insight',
    title: 'Digital transformation fails when users are treated as an afterthought',
    intro: 'A practical argument for embedding UX into transformation programmes before technical architecture and change plans harden.',
    thesis:
      'If a transformation programme ships a system people avoid, route around or need constant support to use, the transformation has not happened. UX is adoption infrastructure.',
    chips: ['Transformation UX', 'Adoption risk', 'Enterprise systems', 'Change readiness'],
    takeaways: [
      { Icon: Users, title: 'Understand real work', body: 'Research reveals workflows, workarounds and adoption risks before they become launch problems.' },
      { Icon: Compass, title: 'Design the journey', body: 'Transformation succeeds when the new system makes the end-to-end job clearer than the old one.' },
      { Icon: ShieldCheck, title: 'De-risk go-live', body: 'Prototypes and usability testing expose issues when teams still have time to fix them.' },
    ],
    firstSection: {
      eyebrow: 'The adoption problem',
      title: 'Technology deployment is not transformation',
      body:
        'A modern platform can still fail if the interface makes daily work harder. Users resist, support costs rise, workarounds return and the expected ROI disappears into operational friction.',
      imageTerms: ['case example', 'tradition bank case study after'],
      presentation: 'ui',
    },
    stepsTitle: 'How to embed UX into transformation',
    steps: [
      { title: 'Start in discovery', body: 'Map current journeys and user needs before the technical roadmap is locked.' },
      { title: 'Include UX in governance', body: 'Review experience risk alongside architecture, delivery and business risk.' },
      { title: 'Form product teams', body: 'Keep UX, product and engineering in continuous collaboration instead of late handoff.' },
      { title: 'Build shared systems', body: 'Use design systems and component libraries to create consistent transformation experiences.' },
      { title: 'Test early', body: 'Run usability sessions on prototypes and working software before go-live.' },
      { title: 'Support change', body: 'Design onboarding, training and support around how users will actually adopt the new system.' },
    ],
    darkSection: {
      eyebrow: 'Programme risks',
      title: 'The quiet mistakes that sink transformation',
      body: 'Transformation risk often hides in the space between business ambition, technical delivery and user behavior.',
      cards: [
        { Icon: Lightbulb, title: 'UX added too late', body: 'The architecture is set before anyone has understood the daily user journey.' },
        { Icon: Search, title: 'No research budget', body: 'Teams save money early and pay for it later in rework and support.' },
        { Icon: Workflow, title: 'Disconnected teams', body: 'Siloed delivery creates interfaces that look modern but do not fit real operations.' },
      ],
    },
    secondSection: {
      eyebrow: 'Maturity lens',
      title: 'Transformation improves when design capability grows with it',
      body:
        'The strongest programmes leave behind better research habits, clearer standards, stronger design governance and a shared way of making product decisions.',
      imageTerms: ['maturity as a transformation lens', 'design maturity model'],
      presentation: 'ui',
    },
    ctaTitle: 'Is your transformation carrying UX risk?',
    ctaBody: 'We can audit the experience, identify adoption risks and help your programme move from technology rollout to real behavior change.',
    relatedLinks: [
      { label: 'Enterprise UX Consulting', href: '/enterprise-ux-consulting' },
      { label: 'Design Maturity Model', href: '/design-maturity-model' },
      { label: 'Tradition Capital Bank Case Study', href: '/tradition-capital-bank-data-analytics-platform-redesign' },
    ],
  },
  'nonprofit-digital-strategy-and-ux': {
    slug: 'nonprofit-digital-strategy-and-ux',
    eyebrow: 'Insight',
    title: 'Nonprofit digital strategy should make impact easier to act on',
    intro: 'A premium UX guide for mission-driven organisations that need better websites, donation journeys, content strategy and supporter engagement.',
    thesis:
      'For nonprofits, digital experience is not cosmetic. It affects donations, volunteer engagement, trust, advocacy and how clearly the mission reaches the people who can support it.',
    chips: ['Nonprofit UX', 'Digital fundraising', 'Supporter journeys', 'Impact storytelling'],
    takeaways: [
      { Icon: HeartHandshake, title: 'Design around supporters', body: 'Donors, volunteers, beneficiaries and partners arrive with different needs and levels of trust.' },
      { Icon: Target, title: 'Make action obvious', body: 'Donation, volunteer and contact journeys should be fast, clear and emotionally coherent.' },
      { Icon: BarChart3, title: 'Show impact clearly', body: 'Impact data and stories build confidence and give supporters a reason to return.' },
    ],
    firstSection: {
      eyebrow: 'Mission meets usability',
      title: 'Outdated digital experiences cost nonprofits real support',
      body:
        'When information is buried, donation flows feel generic or mobile pages break, supporters drift away. Digital strategy turns scattered tools and stories into a coherent journey.',
      imageTerms: ['why digital strategy matters', 'lifestyle'],
      presentation: 'photo',
    },
    stepsTitle: 'A better nonprofit digital strategy',
    steps: [
      { title: 'Map audiences', body: 'Understand what donors, volunteers, beneficiaries and partners need from the digital experience.' },
      { title: 'Clarify the narrative', body: 'Define the mission story, proof points and impact messages that should guide content.' },
      { title: 'Design conversion journeys', body: 'Reduce friction in donation, volunteer sign-up, event registration and contact flows.' },
      { title: 'Choose tools deliberately', body: 'Audit CRMs, donation systems, email tools and CMS choices against the mission.' },
      { title: 'Plan content rhythm', body: 'Create reusable formats for impact stories, updates, reports and campaigns.' },
      { title: 'Measure what matters', body: 'Track donation conversion, sign-ups, engagement and content performance.' },
    ],
    darkSection: {
      eyebrow: 'Digital mistakes',
      title: 'Common gaps that weaken supporter trust',
      body: 'Nonprofit sites often fail because the experience is organised around internal structure instead of supporter intent.',
      cards: [
        { Icon: MonitorSmartphone, title: 'Poor mobile experience', body: 'Supporters cannot act quickly from the device they already use.' },
        { Icon: ShieldCheck, title: 'Low trust signals', body: 'Donation flows lack clarity, reassurance and impact context.' },
        { Icon: Network, title: 'Fragmented tools', body: 'CRM, email, donation and content platforms do not support one coherent journey.' },
      ],
    },
    secondSection: {
      eyebrow: 'Mobile-first access',
      title: 'Mission-led design still needs product discipline',
      body:
        'The best nonprofit digital work combines empathy with the same rigorous UX standards used for high-performing products: clear hierarchy, accessible UI, fast pages and measurable actions.',
      imageTerms: ['mobile-first nonprofit', 'tebelo mobile'],
      presentation: 'ui',
    },
    ctaTitle: 'Ready to make your mission easier to support?',
    ctaBody: 'We help nonprofits turn digital presence into clearer action, stronger trust and more measurable impact.',
    relatedLinks: [
      { label: 'Nonprofit and NGO Website Design', href: '/nonprofit-and-ngo-website-design' },
      { label: 'Website Design and Development', href: '/website-design-and-development' },
      { label: 'UX Strategy Consulting', href: '/ux-strategy-consulting' },
    ],
  },
};

const caseStudyConfigs: Record<string, CaseStudyConfig> = {
  'mukuru-mobile-app-rebrand-and-redesign': {
    slug: 'mukuru-mobile-app-rebrand-and-redesign',
    title: 'Mukuru mobile app rebrand and UX redesign',
    intro:
      'A fintech mobile app redesign that translated a refreshed brand into clearer money-transfer journeys for a diverse African customer base.',
    chips: ['Fintech', 'Mobile app', 'UX research', 'Brand alignment', 'Design system'],
    contextCards: [
      { Icon: MonitorSmartphone, title: 'High-frequency app', body: 'Daily money transfers, payments and account tasks needed to stay fast and familiar.' },
      { Icon: ShieldCheck, title: 'Regulated flows', body: 'The redesign had to support sensitive financial actions with clarity and trust.' },
      { Icon: Users, title: 'Diverse users', body: 'Different markets and levels of digital literacy shaped the interaction decisions.' },
    ],
    challenge: {
      eyebrow: 'The challenge',
      title: 'A rebrand could not come at the cost of usability',
      body:
        'Mukuru needed the new identity to feel fresh across the app while preserving confidence in critical money-transfer workflows. The work had to improve visual consistency, readability and journey clarity without disrupting established behavior.',
      imageTerms: ['onboarding flow', 'send money'],
    },
    approachTitle: 'Research-led redesign for critical financial journeys',
    approach: [
      { title: 'User research', body: 'Interviewed and observed active customers to understand habits, pain points and confidence triggers.' },
      { title: 'Journey mapping', body: 'Mapped money transfers, bill payments, account management and transaction history.' },
      { title: 'Design system', body: 'Built mobile-first components that joined the new brand with usable financial patterns.' },
      { title: 'UI redesign', body: 'Refined typography, colour, iconography and hierarchy across the app experience.' },
      { title: 'User testing', body: 'Validated key flows with customers and refined CTA placement and interaction patterns.' },
      { title: 'Handoff', body: 'Delivered Figma specs, components and implementation guidance for engineering.' },
    ],
    outputTitle: 'A branded app experience built around transaction clarity',
    outputBody:
      'The final experience brought the refreshed Mukuru identity into a cleaner, more legible mobile UI while keeping attention on the actions customers use most.',
    outputImageTerms: [
      ['light and dark mode', 'ux ui redesign'],
      ['send money'],
      ['welcome tour 1'],
      ['style guide'],
    ],
    outcomeCards: [
      { Icon: CheckCircle2, title: 'Clearer transfer flows', body: 'Users could move through critical money-transfer journeys with fewer points of confusion.' },
      { Icon: Sparkles, title: 'Stronger brand alignment', body: 'The app reflected the refreshed identity without losing functional clarity.' },
      { Icon: Gauge, title: 'Faster time-to-transaction', body: 'Streamlined layouts reduced friction in high-frequency user actions.' },
    ],
    ctaTitle: 'Redesigning a regulated mobile product?',
    ctaBody: 'We help fintech teams modernise mobile experiences without weakening trust, compliance or critical user journeys.',
    relatedLinks: [
      { label: 'Fintech UX Design Agency', href: '/fintech-ux-design-agency' },
      { label: 'App Design and Development', href: '/app-design-and-development' },
      { label: 'Financial Services UX Design', href: '/financial-services-ux-design' },
    ],
  },
  'tradition-capital-bank-data-analytics-platform-redesign': {
    slug: 'tradition-capital-bank-data-analytics-platform-redesign',
    title: 'Tradition Capital Bank data analytics platform redesign',
    intro:
      'A legacy WebFocus analytics platform modernisation that improved navigation, visual hierarchy and internal reporting workflows without requiring a full rebuild.',
    chips: ['Enterprise UX', 'Legacy systems', 'Data analytics', 'Internal tools', 'Platform modernisation'],
    heroAsBackground: true,
    contextCards: [
      { Icon: Building2, title: 'Legacy platform', body: 'The system delivered data, but the interface made reporting harder than it needed to be.' },
      { Icon: Search, title: 'Information architecture', body: 'Navigation and grouping had to match how internal users thought about reports.' },
      { Icon: Gauge, title: 'Operational continuity', body: 'The redesign had to modernise UX without disrupting daily analytics work.' },
    ],
    challenge: {
      eyebrow: 'The challenge',
      title: 'A powerful internal system felt harder to use than it should',
      body:
        'Internal users relied on the platform for analytics and reporting, but dated UI, unclear navigation and confusing workflows created support burden and slowed everyday work.',
      imageTerms: ['problem statement', 'tradition bank problem statement'],
    },
    approachTitle: 'Pragmatic UX modernisation for a working enterprise platform',
    approach: [
      { title: 'Internal research', body: 'Interviewed and shadowed finance, risk and operations users to understand real reporting workflows.' },
      { title: 'Heuristic evaluation', body: 'Reviewed navigation, labels, hierarchy and workflow friction against usability principles.' },
      { title: 'IA redesign', body: 'Regrouped reports and data around user mental models instead of database structure.' },
      { title: 'Visual modernisation', body: 'Updated colour, typography, layout and hierarchy while respecting WebFocus constraints.' },
      { title: 'Prototype testing', body: 'Validated redesign directions with internal users before finalising implementation specs.' },
      { title: 'Implementation guide', body: 'Delivered specs and guidance that helped the team modernise without a full rebuild.' },
    ],
    outputTitle: 'Before-and-after clarity for internal analytics workflows',
    outputBody:
      'The redesigned platform made the data experience feel modern, easier to navigate and more aligned to how internal teams actually find and use reports.',
    outputPresentation: 'beforeAfter',
    outcomeCards: [
      { Icon: Compass, title: 'Better navigation', body: 'Users could find reports and analytics more intuitively.' },
      { Icon: BarChart3, title: 'Faster task completion', body: 'Analytics workflows became clearer and took less time to complete.' },
      { Icon: ShieldCheck, title: 'Lower support burden', body: 'Teams handled fewer how-to questions as the interface became easier to understand.' },
    ],
    ctaTitle: 'Have a legacy platform that needs modernising?',
    ctaBody: 'We can improve the user experience of complex internal tools without forcing a risky full-system rebuild.',
    relatedLinks: [
      { label: 'Enterprise UX Consulting', href: '/enterprise-ux-consulting' },
      { label: 'Banking UX Consulting', href: '/banking-ux-consulting' },
      { label: 'Digital Transformation UX', href: '/digital-transformation-ux' },
    ],
  },
};

const InsightPremiumPage: React.FC<{ data: MarketingPageContent; config: InsightConfig }> = ({ data, config }) => {
  const firstImage = getImage(data, config.firstSection.imageTerms);
  const secondImage = getImage(data, config.secondSection.imageTerms);

  return (
    <PageShell showContact={false}>
      <PremiumHero
        eyebrow={config.eyebrow}
        title={config.title}
        intro={config.intro}
        image={imageFromHero(data)}
        chips={config.chips}
        imageAsBackground={config.heroAsBackground}
      />
      <ThesisStrip thesis={config.thesis} />

      <section className="section-padding bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Key takeaways</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">What leaders should take from this</h2>
          </div>
          <CardGrid cards={config.takeaways} />
        </div>
      </section>

      <SplitSection
        eyebrow={config.firstSection.eyebrow}
        title={config.firstSection.title}
        body={config.firstSection.body}
        image={firstImage}
        presentation={config.firstSection.presentation}
      />
      <StepSection title={config.stepsTitle} steps={config.steps} />
      <DarkInsightSection {...config.darkSection} />
      <SplitSection
        reverse
        tone="warm"
        eyebrow={config.secondSection.eyebrow}
        title={config.secondSection.title}
        body={config.secondSection.body}
        image={secondImage}
        presentation={config.secondSection.presentation}
      />
      <ConversionBand title={config.ctaTitle} body={config.ctaBody} href={data.primaryCta.href} />
      <MarketingFAQ items={data.faqs} />
      <MarketingInternalLinks links={mergeRelatedLinks(data, config.relatedLinks)} />
    </PageShell>
  );
};

const CaseStudyPremiumPage: React.FC<{ data: MarketingPageContent; config: CaseStudyConfig }> = ({ data, config }) => {
  const challengeImage = getImage(data, config.challenge.imageTerms) || imageFromHero(data);
  const useBeforeAfter = config.outputPresentation === 'beforeAfter';
  const outputImages = (config.outputImageTerms ?? [])
    .map((terms) => getImage(data, terms))
    .filter(isValidImage);

  return (
    <PageShell showContact={false}>
      <PremiumHero
        eyebrow="Case study"
        title={config.title}
        intro={config.intro}
        image={imageFromHero(data)}
        chips={config.chips}
        imageAsBackground={config.heroAsBackground}
      />

      <section className="section-padding bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Project context</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">What made this work matter</h2>
          </div>
          <CardGrid cards={config.contextCards} />
        </div>
      </section>

      <SplitSection
        eyebrow={config.challenge.eyebrow}
        title={config.challenge.title}
        body={config.challenge.body}
        image={challengeImage}
        presentation="ui"
      />
      <StepSection eyebrow="Approach" title={config.approachTitle} steps={config.approach} />
      {useBeforeAfter ? (
        <BeforeAfterSection
          eyebrow="Before and after"
          title={config.outputTitle}
          body={config.outputBody}
          before={beforeAfterImageByFilename(data, 'before')}
          after={beforeAfterImageByFilename(data, 'after')}
        />
      ) : (
        <ImageStoryGrid title={config.outputTitle} body={config.outputBody} images={outputImages} />
      )}

      <section className="section-padding bg-[#101113] text-white">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Outcomes</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">What changed after the redesign</h2>
          </div>
          <CardGrid cards={config.outcomeCards} dark />
        </div>
      </section>

      <ConversionBand title={config.ctaTitle} body={config.ctaBody} href={data.primaryCta.href} />
      <MarketingFAQ items={data.faqs} />
      <MarketingInternalLinks links={mergeRelatedLinks(data, config.relatedLinks)} />
    </PageShell>
  );
};

export function renderInsightCaseStudyPremiumPage(data: MarketingPageContent): React.ReactNode | null {
  if (!INSIGHT_CASE_STUDY_PREMIUM_SLUGS.includes(data.slug)) return null;

  const insightConfig = insightConfigs[data.slug];
  if (insightConfig && data.category === 'insight') {
    return <InsightPremiumPage data={data} config={insightConfig} />;
  }

  const caseStudyConfig = caseStudyConfigs[data.slug];
  if (caseStudyConfig && data.category === 'case_study') {
    return <CaseStudyPremiumPage data={data} config={caseStudyConfig} />;
  }

  return null;
}
