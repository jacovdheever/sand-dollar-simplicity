import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  Layers,
  MapPin,
  MonitorSmartphone,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import PageShell from '@/components/marketing/PageShell';
import MarketingFAQ from '@/components/marketing/MarketingFAQ';
import MarketingInternalLinks from '@/components/marketing/MarketingInternalLinks';
import { pageImageSrc } from '@/components/marketing/pageImageSrc';
import type { MarketingImageSpec, MarketingPageContent } from '@/types/marketing';

interface PremiumMarketingPageProps {
  data: MarketingPageContent;
}

type Card = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

const primaryCta = 'https://calendly.com/sanddollardesign/intro';

function getBodyImage(data: MarketingPageContent, match: string): MarketingImageSpec | undefined {
  return data.gallery?.find((image) => image.placement.toLowerCase().includes(match.toLowerCase()));
}

type MediaPresentation = 'auto' | 'photo' | 'ui';

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
  ].some((term) => text.includes(term));
}

function isUiShowcase(image: MarketingImageSpec): boolean {
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
    'style guide',
    'persona',
    'platform',
    'portal',
    'catalogue',
    'order flow',
    'account dashboard',
    'mobile app',
    'mockup',
  ].some((term) => text.includes(term));
}

const ShowcaseImage: React.FC<{
  image: MarketingImageSpec;
  aspect?: string;
  className?: string;
  presentation?: MediaPresentation;
}> = ({ image, aspect = 'aspect-[4/3]', className = '', presentation = 'auto' }) => {
  const ui = presentation === 'ui' || (presentation === 'auto' && isUiShowcase(image));

  if (ui) {
    return (
      <figure className={`relative ${className}`}>
        <img
          src={pageImageSrc(image.file)}
          alt={image.alt}
          className={`${aspect} w-full object-contain drop-shadow-[0_18px_35px_rgba(15,23,42,0.18)]`}
        />
      </figure>
    );
  }

  return (
    <figure className={`overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-100 shadow-2xl ${className}`}>
      <img src={pageImageSrc(image.file)} alt={image.alt} className={`${aspect} h-full w-full object-cover`} />
    </figure>
  );
};

const PremiumHero: React.FC<{
  eyebrow: string;
  title: string;
  intro: string;
  imageFile?: string;
  imageAlt?: string;
  focal?: string;
  chips?: string[];
}> = ({ eyebrow, title, intro, imageFile, imageAlt, focal = 'center center', chips = [] }) => {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#0c0d10] text-white">
      {imageFile ? (
        <img
          src={pageImageSrc(imageFile)}
          alt={imageAlt || ''}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          style={{ objectPosition: focal }}
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,21,0.18),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.62)_48%,rgba(0,0,0,0.28))]" />
      <div className="relative z-10 container-custom flex min-h-[620px] items-end pb-14 pt-36 md:pt-40">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-white/70">{eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={primaryCta}
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
          {chips.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

const ValueCards: React.FC<{ cards: Card[]; dark?: boolean }> = ({ cards, dark = false }) => {
  return (
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
};

const SplitImageSection: React.FC<{
  eyebrow?: string;
  title: string;
  body: string;
  image?: MarketingImageSpec;
  reverse?: boolean;
  presentation?: MediaPresentation;
}> = ({ eyebrow, title, body, image, reverse = false, presentation = 'auto' }) => {
  return (
    <section className="section-padding bg-white">
      <div className={`container-custom grid items-center gap-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          {eyebrow ? <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">{eyebrow}</p> : null}
          <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">{body}</p>
        </div>
        {image ? <ShowcaseImage image={image} presentation={presentation} /> : null}
      </div>
    </section>
  );
};

const ProcessSection: React.FC<{ steps: { title: string; body: string }[]; title?: string }> = ({ steps, title = 'How the work moves' }) => {
  return (
    <section className="section-padding bg-[#f8f5f1]">
      <div className="container-custom">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Process</p>
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
};

const IntegratedCta: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <section className="bg-white py-8">
    <div className="container-custom">
      <div className="overflow-hidden rounded-[2rem] bg-[#101113] p-8 text-white shadow-2xl md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_auto]">
          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-white/70">{body}</p>
          </div>
          <a
            href={primaryCta}
            target="_blank"
            rel="noopener noreferrer"
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

const UxStrategyPage: React.FC<{ data: MarketingPageContent }> = ({ data }) => {
  const sprintOne = getBodyImage(data, 'Sprint process') || data.gallery?.[0];
  const sprintTwo = getBodyImage(data, 'Process steps') || data.gallery?.[1];

  return (
    <PageShell showContact={false}>
      <PremiumHero
        eyebrow="UX strategy consulting"
        title="Align design decisions with business outcomes"
        intro="We help product, design and leadership teams turn research, business goals and constraints into a clear product direction before expensive build decisions are made."
        imageFile={data.heroImage}
        imageAlt={data.heroImageAlt}
        focal="center 30%"
        chips={['Roadmaps', 'Journey mapping', 'Design principles', 'Product alignment']}
      />

      <section className="section-padding bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Why it matters</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">
              Strategy is the bridge between business intent and usable products.
            </h2>
          </div>
          <ValueCards
            cards={[
              {
                Icon: Compass,
                title: 'Clearer direction',
                body: 'Define who you are designing for, what matters to them and where design effort creates the most business value.',
              },
              {
                Icon: ShieldCheck,
                title: 'Lower risk',
                body: 'Ground major product decisions in evidence before teams invest weeks of design and engineering effort.',
              },
              {
                Icon: Users,
                title: 'Better alignment',
                body: 'Give stakeholders shared principles, language and priorities so product decisions move faster.',
              },
            ]}
          />
        </div>
      </section>

      <SplitImageSection
        eyebrow="Workshop-led"
        title="From scattered inputs to a prioritised roadmap"
        body="We talk to stakeholders, review existing research, audit the current product and identify the real problem to solve. The output is a strategic roadmap your team can act on, not a slide deck that disappears after a workshop."
        image={sprintOne}
      />

      <ProcessSection
        title="A practical strategy engagement"
        steps={[
          { title: 'Discovery', body: 'Stakeholder interviews, product audit, constraints and competitive landscape.' },
          { title: 'Research synthesis', body: 'Personas, journeys and opportunity statements built from existing or new research.' },
          { title: 'Roadmap', body: 'A phased plan that separates strategic gold from low-value noise.' },
          { title: 'Principles', body: 'Specific design principles that guide future UX and UI decisions.' },
          { title: 'Patterns', body: 'Component and interaction standards that help the product scale.' },
          { title: 'Handoff', body: 'A documented strategy and briefing for the next design or build phase.' },
        ]}
      />

      <SplitImageSection
        reverse
        eyebrow="Deliverables"
        title="Tangible outputs your team can use immediately"
        body="You leave with research synthesis, competitive context, design principles, a prioritised roadmap, implementation briefing and - where needed - design system foundations for faster delivery."
        image={sprintTwo}
      />

      <section className="section-padding bg-[#101113] text-white">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Outcomes</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">What changes after UX strategy</h2>
          </div>
          <ValueCards
            dark
            cards={[
              { Icon: Rocket, title: 'Faster launches', body: 'Design decisions are pre-aligned before delivery ramps up.' },
              { Icon: BarChart3, title: 'Better adoption', body: 'Journeys and priorities are grounded in what users actually need.' },
              { Icon: Layers, title: 'Less rework', body: 'Scope, principles and priorities are clear before teams start designing screens.' },
            ]}
          />
        </div>
      </section>

      <IntegratedCta
        title="Ready to build your UX strategy?"
        body="Tell us about your product, users and timeline. We will help you identify where strategy can create the most leverage."
      />
      <MarketingFAQ items={data.faqs} />
      <MarketingInternalLinks links={data.internalLinks} />
    </PageShell>
  );
};

const HeinekenPage: React.FC<{ data: MarketingPageContent }> = ({ data }) => {
  const persona = getBodyImage(data, 'Research') || data.gallery?.[0];
  const styleGuide = getBodyImage(data, 'Design system') || data.gallery?.[1];
  const contentGuide = getBodyImage(data, 'Content strategy') || data.gallery?.[2];
  const catalogue = getBodyImage(data, 'Product catalogue') || data.gallery?.[3];
  const orderFlow = getBodyImage(data, 'Order flow') || data.gallery?.[4];
  const dashboard = getBodyImage(data, 'Account dashboard') || data.gallery?.[5];
  const mobile = getBodyImage(data, 'Mobile') || data.gallery?.[6];
  const desktop = getBodyImage(data, 'Desktop') || data.gallery?.[7];

  const tags = ['B2B E-Commerce', 'FMCG', 'UX Strategy', 'UX Research', 'Product Design', 'Headless UI'];

  return (
    <PageShell showContact={false}>
      <PremiumHero
        eyebrow="Case study"
        title="Heineken B2B e-commerce UX/UI design"
        intro="A custom headless interface for wholesale trade buyers - designed around volume ordering, account workflows and SAP-backed enterprise complexity."
        imageFile={data.heroImage}
        imageAlt={data.heroImageAlt}
        focal="center top"
        chips={tags}
      />

      <section className="section-padding bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">The challenge</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">
              Wholesale ordering is not retail e-commerce.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Heineken needed the power of an SAP platform with an interface that matched how bars, restaurants, hotels and bottle shops actually buy.
            </p>
          </div>
          <ValueCards
            cards={[
              { Icon: ShoppingCart, title: 'Volume buying', body: 'Buyers manage bulk orders, negotiated pricing and repeated procurement patterns.' },
              { Icon: Building2, title: 'Complex accounts', body: 'Multiple locations, account rules and order histories needed to feel simple.' },
              { Icon: MonitorSmartphone, title: 'Responsive use', body: 'The experience had to support desktop procurement and mobile buyer workflows.' },
            ]}
          />
        </div>
      </section>

      <ProcessSection
        title="Discovery, design and SAP-ready handoff"
        steps={[
          { title: 'Research', body: 'Interviews and shadowing with wholesale customers across buying segments.' },
          { title: 'Comparison', body: 'B2B platform analysis to identify useful patterns and gaps.' },
          { title: 'Journeys', body: 'Order, account, product discovery and delivery flows translated into product requirements.' },
          { title: 'Interface design', body: 'Desktop and mobile UI for catalogue, cart, checkout, account management and order tracking.' },
          { title: 'Testing', body: 'Two rounds of customer validation to refine the critical flows.' },
          { title: 'Integration', body: 'API-aware design specs for implementation against the SAP backend.' },
        ]}
      />

      <SplitImageSection
        eyebrow="Research"
        title="Understanding the trade buyer"
        body="The design direction was shaped by real wholesale buying behaviour: repeat orders, rapid product discovery, delivery certainty and account-specific needs."
        image={persona}
      />

      <section className="section-padding bg-[#101113] text-white">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Design system</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">A branded system for a serious trade platform</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {[styleGuide, contentGuide].filter(Boolean).map((image) => (
              <ShowcaseImage key={image!.file} image={image!} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Final design</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">Interfaces for the full buying journey</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[catalogue, orderFlow, dashboard].filter(Boolean).map((image) => (
              <ShowcaseImage key={image!.file} image={image!} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f8f5f1]">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Responsive platform</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">Desktop depth, mobile access</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Procurement workflows were optimised for desktop while mobile screens supported trade buyers on the go.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-[0.65fr_1fr]">
            {mobile ? (
              <ShowcaseImage image={mobile} aspect="aspect-[9/16]" />
            ) : null}
            {desktop ? (
              <ShowcaseImage image={desktop} className="self-center" />
            ) : null}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <ValueCards
            cards={[
              { Icon: CheckCircle2, title: 'Fewer steps', body: 'Wholesale customers could complete orders with less friction.' },
              { Icon: Search, title: 'Better discovery', body: 'Product browsing and filtering supported how buyers actually search.' },
              { Icon: BarChart3, title: 'Reduced support', body: 'A clearer interface lowered confusion around placing and managing orders.' },
            ]}
          />
        </div>
      </section>

      <IntegratedCta
        title="Designing a B2B digital experience?"
        body="If your platform needs to serve wholesale, enterprise or operational customers, we can help turn complex requirements into a usable product."
      />
      <MarketingFAQ items={data.faqs} />
      <MarketingInternalLinks links={data.internalLinks} />
    </PageShell>
  );
};

const UsaPage: React.FC<{ data: MarketingPageContent }> = ({ data }) => {
  const clientWork = getBodyImage(data, 'Our US client work') || data.gallery?.[0];
  const featuredProject = getBodyImage(data, 'Featured US project') || data.gallery?.[1];
  const marketImage = data.heroImage
    ? {
        file: data.heroImage,
        placement: 'BODY — US market positioning section',
        alt: data.heroImageAlt || 'UX/UI design agency USA — American-market design team delivering world-class digital products',
      }
    : undefined;

  return (
    <PageShell showContact={false}>
      <PremiumHero
        eyebrow="UX/UI design for US teams"
        title="World-class UX/UI design for US companies"
        intro="Senior product design, UX research and AI interface design for US teams in fintech, healthcare, enterprise software and emerging technology."
        focal="center 35%"
        chips={['Remote-first', 'Senior talent', 'US business-hour overlap', 'B2B and AI products']}
      />

      <section className="section-padding bg-white">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Our value proposition</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">
              Senior design partnership without local hiring overhead.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              We are based in South Africa and work remote-first with US companies that need experienced UX/UI and product design support.
            </p>
          </div>
          <ValueCards
            cards={[
              { Icon: Users, title: 'Senior talent', body: '15+ years of product, UX and UI experience - no junior-heavy delivery team.' },
              { Icon: Clock, title: 'Timezone fit', body: 'Core availability overlaps with EST, CST and PST for reviews and decision-making.' },
              { Icon: ShieldCheck, title: 'Enterprise aware', body: 'Experience with regulated, complex and B2B product environments.' },
            ]}
          />
        </div>
      </section>

      <SplitImageSection
        reverse
        eyebrow="Our skillset"
        title="Digital product design for demanding markets"
        body="Our work spans product strategy, research, UX/UI design, design systems, prototypes and design-to-development handoff for teams that need clarity and quality fast."
        image={clientWork}
        presentation="photo"
      />

      <SplitImageSection
        eyebrow="A good fit for the US market"
        title="A remote-first design partner with American-market context"
        body="You get senior UX/UI and product design capability without adding local hiring overhead. We work across US business hours, design for American user expectations, and keep collaboration structured from the first kickoff."
        image={marketImage}
        presentation="photo"
      />

      <section className="section-padding bg-[#101113] text-white">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Capabilities</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">What US teams bring us in to do</h2>
          </div>
          <ValueCards
            dark
            cards={[
              { Icon: Compass, title: 'Product strategy', body: 'Shape roadmap decisions and reduce uncertainty before build.' },
              { Icon: Search, title: 'UX research', body: 'Test assumptions, understand users and improve product confidence.' },
              { Icon: MonitorSmartphone, title: 'UX/UI design', body: 'Design web, mobile, desktop and AI interfaces that are ready for development.' },
              { Icon: Layers, title: 'Design systems', body: 'Create component libraries and standards that help teams scale.' },
              { Icon: Workflow, title: 'Handoff', body: 'Detailed design documents, prototypes and implementation-ready specs.' },
              { Icon: Rocket, title: 'AI MVPs', body: 'Design and prototype AI-powered workflows that users can understand and trust.' },
            ]}
          />
        </div>
      </section>

      <section className="section-padding bg-[#f8f5f1]">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Industry focus</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">Designed for US B2B buyers and regulated markets</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Fintech', 'Payment platforms, trading software and compliance tools.'],
              ['Healthcare', 'Patient apps, provider tools and clinical dashboards.'],
              ['Enterprise SaaS', 'Workflow automation, analytics and internal tools.'],
              ['AI products', 'LLM interfaces, assistants and emerging product patterns.'],
            ].map(([title, body]) => (
              <article key={title} className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black text-gray-950">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {featuredProject ? (
        <SplitImageSection
          reverse
          eyebrow="The Sand Dollar Design difference"
          title="Interface quality that can stand up to enterprise buyers"
          body="For US-based client teams, our credibility shows up in the details: clear hierarchy, confident workflows, responsive UI and product decisions that make complex tools easier to adopt."
          image={featuredProject}
        />
      ) : null}

      <section className="section-padding bg-white">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Remote model</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">Clear, senior-led collaboration</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Weekly touchpoints, async Loom walkthroughs, Figma collaboration and structured feedback loops keep work moving without timezone friction.
            </p>
          </div>
          <div className="rounded-[2rem] bg-gray-950 p-8 text-white shadow-2xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ['Figma', 'Live design collaboration and handoff.'],
                ['Loom', 'Async walkthroughs for faster reviews.'],
                ['Slack / email', 'Clear updates and decision trails.'],
                ['US overlap', 'Meetings during your business day.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#101113] text-white">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">US coverage</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">Serving client teams across the USA</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['Minneapolis', 'Florida', 'Boston', 'Chicago', 'Texas', 'Wider USA'].map((location) => (
              <div key={location} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <MapPin className="h-5 w-5 text-[#f97315]" />
                <span className="font-semibold">{location}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IntegratedCta
        title="Let’s talk about your US product"
        body="Whether you are scaling a startup, redesigning enterprise software or launching a new AI product, we can help you make the experience clearer and more credible."
      />
      <MarketingFAQ items={data.faqs} />
      <MarketingInternalLinks links={data.internalLinks} />
    </PageShell>
  );
};

const PremiumMarketingPage: React.FC<PremiumMarketingPageProps> = ({ data }) => {
  if (data.slug === 'ux-strategy-consulting') return <UxStrategyPage data={data} />;
  if (data.slug === 'heineken-b2b-ecommerce-ux-ui-design') return <HeinekenPage data={data} />;
  if (data.slug === 'ux-ui-design-agency-usa') return <UsaPage data={data} />;
  return null;
};

export default PremiumMarketingPage;
