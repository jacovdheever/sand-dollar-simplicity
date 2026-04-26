import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  MapPin,
  Network,
  PenLine,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import PageShell from '@/components/marketing/PageShell';
import SEO from '@/components/SEO';
import { absoluteUrl, getSiteOrigin } from '@/lib/siteOrigin';
import { getAssetPath, cn } from '@/lib/utils';

const CALENDLY = 'https://calendly.com/sanddollardesign/intro';

const META_DESCRIPTION =
  'Founded in 2017, Sand Dollar Design is a UX/UI design, product design and AI development agency serving startups, SMEs and enterprise teams across South Africa, the USA and Europe.';

const proofStats = [
  { label: 'Founded in 2017' },
  { label: '80+ projects delivered' },
  { label: '5-star rated on Clutch' },
  { label: 'Clients across South Africa, the USA and Europe' },
] as const;

const serviceMatrix: {
  num: string;
  title: string;
  blurb: string;
  href: string;
  Icon: typeof Search;
}[] = [
  {
    num: '01',
    title: 'UX Strategy & Research',
    blurb: 'Understand user needs, validate ideas and de-risk product decisions before delivery.',
    href: '/ux-strategy-consulting',
    Icon: Search,
  },
  {
    num: '02',
    title: 'UX/UI and Product Design',
    blurb: 'Websites, apps, platforms and tools that are clearer, more usable and aligned to goals.',
    href: '/ux-ui-design-services',
    Icon: PenLine,
  },
  {
    num: '03',
    title: 'Enterprise UX & Transformation',
    blurb: 'Modernise complex systems, improve internal experience and align stakeholders.',
    href: '/enterprise-ux-consulting',
    Icon: Network,
  },
  {
    num: '04',
    title: 'AI Development for Startups',
    blurb: 'Prototypes, copilots and practical AI products that solve real business problems.',
    href: '/ai-development-agency',
    Icon: Sparkles,
  },
  {
    num: '05',
    title: 'Design Capability Building',
    blurb: 'Maturity, practice and more consistent product delivery for in-house teams.',
    href: '/design-maturity-and-capability-building',
    Icon: Users,
  },
];

const trustedLogoStrip: { src: string; name: string; larger?: boolean }[] = [
  { src: 'Client Logo - Vodafone.png', name: 'Vodafone' },
  { src: 'Client Logo - heineken.png', name: 'Heineken', larger: true },
  { src: 'Client Logo - standard bank.png', name: 'Standard Bank', larger: true },
  { src: 'Client Logo - Toyota.png', name: 'Toyota' },
];

const industryBands: {
  label: string;
  name: string;
  body: string;
  services: string;
  href: string;
}[] = [
  {
    label: 'Fintech',
    name: 'Fintech',
    body: 'Designing trusted onboarding, account flows, dashboards and transaction journeys.',
    services: 'UX strategy · Research · Product design',
    href: '/fintech-ux-design-agency',
  },
  {
    label: 'Banking & services',
    name: 'Banking & financial services',
    body: 'Clarity in regulated environments—complex products made easier to use and support.',
    services: 'Research · Service design · Enterprise UX',
    href: '/financial-services-ux-design',
  },
  {
    label: 'Healthcare',
    name: 'Healthcare',
    body: 'Making sensitive health journeys clearer, more accessible and easier to complete.',
    services: 'UX/UI · Patient & clinician tools · Research',
    href: '/healthcare-ux-design-agency',
  },
  {
    label: 'NGOs & nonprofits',
    name: 'NGOs & Nonprofits',
    body: 'Mission storytelling, donor flows, volunteer journeys and better digital service delivery.',
    services: 'Web · Mobile · Content UX',
    href: '/nonprofit-and-ngo-website-design',
  },
  {
    label: 'Telco',
    name: 'Telco',
    body: 'Simpler self-service, support journeys and customer-facing portals.',
    services: 'Journey design · App & web UX',
    href: '/telco-ux-design',
  },
  {
    label: 'B2B e-commerce',
    name: 'B2B e-commerce',
    body: 'Better ordering, procurement and wholesale customer experiences for trade buyers.',
    services: 'UX/UI · Platform design · Research',
    href: '/b2b-ecommerce-ux-design',
  },
];

const tebeloImpacts = [
  'Education access',
  'Nutrition and holistic health',
  'Technology-enabled learning',
  'Coding, robotics and STEM exposure',
  'Pathways to self-sufficiency',
];

const internCards = [
  { title: 'UX research', body: 'Interviews, testing and evidence-led recommendations.' },
  { title: 'Product design', body: 'UX/UI, systems and prototyping in real engagements.' },
  { title: 'AI-supported delivery', body: 'Exposure to modern AI-enabled product workflows.' },
  { title: 'Client communication', body: 'How teams align, present and deliver work with clients.' },
];

const founderChips = ['UX Strategy', 'Product Design', 'Design Leadership', 'AI Product Development'];

const principlesList = [
  {
    n: '01',
    title: 'Human-centred, business-aware',
    body: 'The best digital products serve both user needs and business goals. Good UX is a practical way to reduce friction and create measurable value.',
  },
  {
    n: '02',
    title: 'Research before assumptions',
    body: 'We use research, testing and stakeholder alignment to reduce guesswork and make better decisions.',
  },
  {
    n: '03',
    title: 'Design that can be built',
    body: 'We design with feasibility in mind, with development and operations in the room.',
  },
  {
    n: '04',
    title: 'Capability over dependency',
    body: 'We help teams build better ways of working so progress continues long after a project ends.',
  },
  {
    n: '05',
    title: 'Innovation with responsibility',
    body: 'From AI to healthcare, we care about the human consequences of digital decisions.',
  },
] as const;

const marketChips: { href: string; label: string }[] = [
  { href: '/ux-ui-design-agency-south-africa', label: 'South Africa' },
  { href: '/ux-ui-design-agency-usa', label: 'USA' },
  { href: '/ux-design-agency-uk', label: 'UK' },
  { href: '/product-design-agency-netherlands', label: 'Netherlands' },
  { href: '/ux-agency-belgium', label: 'Belgium' },
  { href: '/florida-ux-ui-design-agency', label: 'Florida' },
  { href: '/jacksonville-ux-ui-design-agency', label: 'Jacksonville' },
  { href: '/minneapolis-ux-agency', label: 'Minneapolis' },
];

const AboutPage: React.FC = () => {
  const origin = getSiteOrigin();
  const canonical = absoluteUrl('/about');
  const pageTitle = 'About Sand Dollar Design | UX/UI Design, Product Design & AI Development Agency';
  const ogImage = absoluteUrl('/images/pages/sand-dollar-design-team.png');

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Sand Dollar Design',
    description: META_DESCRIPTION,
    url: canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Sand Dollar Design',
      url: origin,
    },
  };

  const organizationAboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}#about-organization`,
    name: 'Sand Dollar Design',
    url: origin,
    logo: `${origin}/Sand-Dollar_Logo.png`,
    foundingDate: '2017',
    description: META_DESCRIPTION,
    areaServed: [
      { '@type': 'Country', name: 'South Africa' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Belgium' },
    ],
    sameAs: [
      'https://www.linkedin.com/company/sand-dollar-design',
      'https://clutch.co/profile/sand-dollar-design-pty',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'jaco@sanddollardesign.co.za',
    },
  };

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jaco van den Heever',
    jobTitle: 'Founder & CEO',
    worksFor: { '@type': 'Organization', name: 'Sand Dollar Design', url: origin },
    url: 'https://www.thedxleader.com',
    sameAs: ['https://www.linkedin.com/in/jacovdh/'],
    knowsAbout: [
      'UX Strategy',
      'Product Design',
      'UX Research',
      'Design Leadership',
      'AI Product Development',
      'Healthcare UX',
      'Financial Services UX',
    ],
  };

  return (
    <PageShell showContact={false}>
      <SEO
        title={pageTitle}
        description={META_DESCRIPTION}
        keywords="Sand Dollar Design, about, UX strategy, UX research, UX UI design, product design, AI development agency, South Africa, USA, Europe, fintech, healthcare, enterprise UX"
        canonical={canonical}
        type="website"
        image={ogImage}
        openGraphTitle="About Sand Dollar Design"
        openGraphDescription="Learn about Sand Dollar Design, a UX strategy, UX research, UX/UI design, product design and AI development agency helping teams build better digital products, platforms and customer journeys."
        organizationSameAs={['https://clutch.co/profile/sand-dollar-design-pty']}
        extraJsonLd={[aboutPageJsonLd, organizationAboutJsonLd, personJsonLd]}
      />

      <article>
        {/* HERO — unchanged pattern */}
        <section
          className="relative overflow-hidden border-b border-white/10 bg-[#0c0d10] text-white"
          aria-labelledby="about-hero-heading"
        >
          <img
            src={getAssetPath('images/pages/sand-dollar-design-team.png')}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top opacity-55"
            fetchPriority="high"
            width={1920}
            height={1080}
            aria-hidden
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(249,115,21,0.24),transparent_34%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.1),transparent_28%),linear-gradient(110deg,rgba(0,0,0,0.94),rgba(0,0,0,0.72)_52%,rgba(0,0,0,0.38))]" />
          <div className="relative z-10 container-custom flex min-h-0 w-full flex-col justify-center py-10 pt-24 sm:min-h-[min(88dvh,640px)] sm:py-12 sm:pt-20 md:py-14 md:pt-24">
            <div className="w-full max-w-6xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/65 sm:mb-4">About Sand Dollar Design</p>
              <h1
                id="about-hero-heading"
                className="text-balance text-3xl font-black leading-[0.98] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              >
                A UX, product design and AI development agency built for complex digital challenges
              </h1>
              <p className="mt-4 max-w-5xl text-base leading-relaxed text-white/78 sm:mt-5 sm:text-lg md:text-xl">
                Founded in 2017, we help startups, SMEs and enterprise teams improve products, platforms and customer journeys through UX strategy, UX
                research, UX/UI design, product design and AI-powered development—across fintech, banking, healthcare, telco, FMCG, B2B e-commerce and
                nonprofits, in South Africa, the USA, the UK, the Netherlands and Belgium.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  View our work
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
                >
                  Book a free strategy call
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </a>
              </div>
              <p className="mt-4 text-sm text-white/60 sm:mt-5">
                <span className="text-white/50">Explore more</span> —{' '}
                <Link to="/testimonials" className="font-semibold text-white/90 underline-offset-2 hover:underline">
                  client testimonials
                </Link>
                ,{' '}
                <Link to="/contact" className="font-semibold text-white/90 underline-offset-2 hover:underline">
                  contact
                </Link>
                ,{' '}
                <Link to="/ux-ui-design-services" className="font-semibold text-white/90 underline-offset-2 hover:underline">
                  UX/UI design services
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Proof strip — stronger typographic moment */}
        <section className="border-b border-gray-200 bg-gray-50 py-10 md:py-12" aria-label="Firm proof points">
          <div className="container-custom">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0" role="list">
              {proofStats.map((s) => (
                <li
                  key={s.label}
                  className="flex items-start gap-3 border-gray-200 lg:border-l lg:pl-8 first:lg:border-l-0 first:lg:pl-0"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f97315]" aria-hidden />
                  <p className="text-base font-bold leading-snug text-gray-900 md:text-lg">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Timeline / history — light editorial */}
        <section className="border-b border-gray-100 bg-white py-6" aria-label="Firm history">
          <div className="container-custom">
            <div className="flex flex-col items-start gap-2 text-sm text-gray-500 md:flex-row md:items-center md:justify-center md:gap-2 md:text-center">
              <span className="font-semibold text-gray-900">2017</span>
              <span className="hidden text-gray-300 md:inline" aria-hidden>
                ·
              </span>
              <span>Founded in South Africa, remote-first from day one</span>
              <span className="hidden text-gray-300 md:inline" aria-hidden>
                ·
              </span>
              <span className="font-semibold text-gray-900">80+</span>
              <span>projects for teams in SA, the USA, UK, EU and beyond</span>
            </div>
          </div>
        </section>

        {/* Global partner — keep */}
        <section className="relative w-full overflow-hidden" aria-labelledby="company-story">
          <div className="absolute inset-0" aria-hidden>
            <img
              src={getAssetPath('images/pages/global-design-partner.png')}
              alt=""
              className="h-full w-full object-cover object-center"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d10]/80 via-[#0c0d10]/70 to-[#0c0d10]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_15%_30%,rgba(0,0,0,0.5),transparent_55%)]" />
          </div>
          <div className="relative z-10 section-padding container-custom max-w-3xl">
            <h2
              id="company-story"
              className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl"
            >
              From a South African design studio to a global digital product partner
            </h2>
            <div className="mt-6 max-w-none space-y-4 text-base leading-relaxed text-white/90 md:text-lg">
              <p>
                Sand Dollar Design was founded in 2017 with a simple belief: better digital products start with a deeper understanding of people.
              </p>
              <p>
                Since then, we’ve grown into a remote-first UX and product design partner for teams solving complex digital problems — from multinational
                brands and financial institutions to startups, healthtech companies and community-focused organisations.
              </p>
              <p>
                Our work has included major brands and organisations such as Vodafone, Heineken and Standard Bank, as well as specialist and high-growth
                companies such as Effect Healthcare in the Netherlands and Tradition Capital Bank in Minneapolis, USA.
              </p>
              <p>
                Across these engagements, our role is rarely just to make screens look better. We help teams understand users, clarify product decisions,
                simplify journeys, and design experiences that are easier to use, adopt and scale.
              </p>
            </div>
          </div>
        </section>

        {/* Service matrix */}
        <section
          className="relative overflow-hidden border-y border-gray-200/80 bg-[#f0ebe4]"
          aria-labelledby="service-matrix"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:40px_40px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#f97315]/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-slate-300/20 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 section-padding">
            <div className="container-custom grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">What we do</p>
                <h2
                  id="service-matrix"
                  className="mt-3 text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl lg:text-5xl"
                >
                  We help teams move from product uncertainty to digital clarity.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
                  Our work combines research, strategy, design and practical implementation support — helping teams improve the products, platforms and
                  journeys their users rely on.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {serviceMatrix.map((s, i) => (
                  <div
                    key={s.num}
                    className={cn(
                      'group relative flex flex-col rounded-2xl border border-gray-200/90 bg-white/95 p-6 shadow-sm transition',
                      'hover:-translate-y-0.5 hover:border-[#f97315]/45 hover:shadow-md',
                      i === 4 && 'sm:col-span-2',
                    )}
                  >
                    <span
                      className="absolute right-4 top-4 text-3xl font-black tabular-nums text-gray-100 transition group-hover:text-[#f97315]/25"
                      aria-hidden
                    >
                      {s.num}
                    </span>
                    <div className="h-0.5 w-12 bg-[#f97315]" />
                    <div className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                      <s.Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </div>
                    <h3 className="mt-4 text-lg font-black text-gray-950">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{s.blurb}</p>
                    <Link
                      to={s.href}
                      className="mt-4 inline-flex items-center text-sm font-bold text-gray-900 transition group-hover:text-[#f97315]"
                    >
                      Explore service
                      <ArrowRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <p className="container-custom mt-10 text-center text-sm text-gray-500">
              Related:{' '}
              <Link to="/ux-research-agency" className="font-semibold text-gray-700 underline-offset-2 hover:underline">
                UX Research Agency
              </Link>
              ,{' '}
              <Link to="/product-design-agency" className="font-semibold text-gray-700 underline-offset-2 hover:underline">
                Product Design Agency
              </Link>
              ,{' '}
              <Link to="/digital-transformation-ux-consulting" className="font-semibold text-gray-700 underline-offset-2 hover:underline">
                Digital Transformation
              </Link>
            </p>
          </div>
        </section>

        {/* Client logo strip */}
        <section
          className="border-b border-white/10 bg-[#0b0b0d] py-12 text-white md:py-14"
          aria-labelledby="client-cred"
        >
          <div className="container-custom">
            <h2
              id="client-cred"
              className="text-center text-2xl font-black leading-tight tracking-tight text-white md:text-3xl"
            >
              Trusted by global brands, banks, startups and mission-led teams
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-white/85 md:mt-5 md:text-lg">
              From multinational enterprises to early-stage startups, our work is built for teams solving complex digital problems.
            </p>
            <ul
              className="mx-auto mt-8 flex w-full max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12 md:gap-x-16"
              role="list"
            >
              {trustedLogoStrip.map((logo) => (
                <li key={logo.name} className="flex shrink-0 grow-0 basis-auto items-center justify-center">
                  <img
                    src={getAssetPath(logo.src)}
                    alt={logo.name}
                    className={cn(
                      'w-auto object-contain brightness-0 invert opacity-90',
                      logo.larger
                        ? 'h-24 max-w-[30rem] sm:h-28 sm:max-w-[34rem]'
                        : 'h-12 max-w-[15rem] sm:h-14 sm:max-w-[17rem]',
                    )}
                    loading="lazy"
                    height={logo.larger ? 112 : 56}
                    width={logo.larger ? 480 : 240}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Industry bands */}
        <section className="bg-[#060607] text-white" aria-labelledby="industries-deep">
          <div className="container-custom section-padding">
            <h2
              id="industries-deep"
              className="max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-4xl"
            >
              Deep experience in high-trust industries
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/60">
              We are often brought in where trust, clarity and stakeholder alignment matter. Each sector has different pressure points — the work stays
              practical and evidence-led.
            </p>
            <div className="mt-10 border-t border-white/10" role="list">
              {industryBands.map((ind) => (
                <div
                  key={ind.href}
                  className="group border-b border-white/10 py-8 transition first:pt-2 hover:bg-white/[0.02]"
                  role="listitem"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
                    <div className="max-w-2xl">
                      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#f97315]">{ind.label}</p>
                      <h3 className="mt-2 text-xl font-black md:text-2xl">{ind.name}</h3>
                      <p className="mt-3 text-base leading-relaxed text-white/75">{ind.body}</p>
                      <p className="mt-2 text-sm text-white/40">{ind.services}</p>
                    </div>
                    <Link
                      to={ind.href}
                      className="inline-flex shrink-0 items-center gap-1 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:border-[#f97315]/40"
                    >
                      View sector
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tebelo — storytelling band */}
        <section className="relative w-full overflow-hidden bg-[#1c1917]" aria-labelledby="tebelo">
          <div className="relative h-[min(50vh,28rem)] w-full md:h-[32rem]">
            <img
              src={getAssetPath('images/pages/tebelo-training-centre.jpg')}
              alt="Tebelo community and learning programmes"
              className="h-full w-full object-cover object-center"
              width={1920}
              height={800}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/60 to-black/20" />
          </div>
          <div className="container-custom relative z-10 -mt-4 pb-12 md:-mt-16 md:pb-16">
            <div className="mx-auto max-w-2xl rounded-2xl border border-amber-200/20 bg-amber-50/[0.97] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-9">
              <h2
                id="tebelo"
                className="text-2xl font-black leading-tight tracking-tight text-gray-950 md:text-3xl"
              >
                Design with a responsibility beyond client work
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                Sand Dollar Design believes design and technology should improve more than commercial outcomes. We actively support Tebelo Community
                Development NPC — working in vulnerable communities through education, health, nutrition and skills development. Tebelo’s Lighthouse
                initiative supports children, families and young people, and the Matter Innovation Hub in Plettenberg Bay opens coding, robotics, STEM
                and technology-enabled learning to learners.
              </p>
              <p className="mt-5 text-sm font-bold uppercase tracking-wider text-gray-500">Through Tebelo, we support</p>
              <ul className="mt-3 grid list-none gap-2 text-sm text-gray-800 sm:grid-cols-1" role="list">
                {tebeloImpacts.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f97315]" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.tebelo.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#101113] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                Visit Tebelo
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* Internship — talent strip */}
        <section
          className="border-y border-gray-200 bg-gradient-to-b from-white to-slate-50 section-padding"
          aria-labelledby="internship"
        >
          <div className="container-custom">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <h2
                  id="internship"
                  className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl"
                >
                  Building future digital talent through internships
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Every year, our internship programme gives emerging digital talent real-world exposure to research, design, product thinking and
                  AI-enabled delivery. Interns work remotely with teams across time zones.
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 text-[#f97315]" aria-hidden />
                  Remote programme · global cohort
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
                <img
                  src={getAssetPath('images/pages/internship-screenshot.png')}
                  alt="Sand Dollar Design internship programme — remote collaboration and learning"
                  className="h-full w-full object-cover object-top"
                  width={960}
                  height={640}
                  loading="lazy"
                />
              </div>
            </div>
            <ul
              className="mt-10 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-4"
              role="list"
              aria-label="What interns experience"
            >
              {internCards.map((c) => (
                <li
                  key={c.title}
                  className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-sm font-black text-gray-950">{c.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Founder — large profile */}
        <section className="section-padding bg-white" aria-labelledby="leadership">
          <div className="container-custom">
            <h2 id="leadership" className="sr-only">
              Leadership
            </h2>
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
              <div className="lg:col-span-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Founder &amp; CEO</p>
                <div className="mt-3 overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-xl">
                  <img
                    src={getAssetPath('images/pages/jaco-van-den-heever.png')}
                    alt="Jaco van den Heever, Founder and CEO of Sand Dollar Design"
                    className="h-full w-full min-h-[22rem] object-cover object-top lg:min-h-full lg:object-center"
                    width={800}
                    height={960}
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-gray-900">
                  Jaco van den Heever{' '}
                  <span className="font-normal text-gray-600">(MBA, CUA, CXA)</span>
                </p>
              </div>
              <div className="lg:col-span-7">
                <h3 className="text-2xl font-black leading-tight text-gray-950 md:text-3xl lg:text-4xl">
                  Led by a UX and digital product leader with 18+ years of experience
                </h3>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Jaco is the Founder and CEO of Sand Dollar Design, with a career spanning design leadership, UX strategy, product design, healthcare
                  technology, financial services and digital innovation. His work has covered startups, corporate digital teams and complex enterprise
                  environments—with a focus on human-centred design and practical impact.
                </p>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  Through <span className="font-semibold text-gray-800">The DX Leader</span>, he writes on design leadership, mentorship and the role
                  of UX in better digital products.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {founderChips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-gray-200 bg-[#f8f5f1] px-3 py-1.5 text-xs font-bold text-gray-800"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <figure className="mt-8 border-l-4 border-[#f97315] pl-5">
                  <blockquote className="text-lg font-medium leading-relaxed text-gray-800">
                    &ldquo;Designing simple solutions is one of the hardest challenges we face — because true simplicity emerges only when business goals,
                    technology, and human needs align. Design is the bridge that brings clarity from complexity.&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-gray-500">— Design philosophy</figcaption>
                </figure>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="https://www.thedxleader.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#101113] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
                  >
                    Visit The DX Leader
                    <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jacovdh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-gray-50"
                  >
                    Connect on LinkedIn
                    <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principles manifesto */}
        <section className="bg-[#0a0a0b] text-white" aria-labelledby="principles">
          <div className="container-custom section-padding">
            <h2
              id="principles"
              className="text-3xl font-black leading-tight tracking-tight md:max-w-xl md:text-4xl"
            >
              How we approach the work
            </h2>
            <div className="mt-10 border-t border-white/10" role="list">
              {principlesList.map((p) => (
                <div
                  key={p.n}
                  className="grid gap-4 border-b border-white/10 py-8 md:grid-cols-[minmax(0,6rem)_1fr] md:items-start md:gap-8 md:py-10"
                  role="listitem"
                >
                  <span
                    className="font-black tabular-nums text-4xl text-white/15 sm:text-5xl md:text-6xl"
                    aria-hidden
                  >
                    {p.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-black md:text-2xl">{p.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Markets — lighter, visual */}
        <section
          className="relative overflow-hidden border-t border-gray-100 bg-gradient-to-b from-slate-50 to-white"
          aria-labelledby="markets"
        >
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]"
            aria-hidden
          >
            <Globe2 className="h-[min(40rem,80vw)] w-[min(40rem,80vw)]" strokeWidth={0.4} />
          </div>
          <div className="relative z-10 section-padding">
            <div className="container-custom max-w-3xl text-center">
              <h2
                id="markets"
                className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl"
              >
                Remote-first, globally connected
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                We are headquartered in South Africa and work remotely with clients across the USA, UK, Netherlands and Belgium — with a growing focus
                on Florida, Jacksonville, Minneapolis, Boston, Chicago and Texas.
              </p>
            </div>
            <ul
              className="relative z-10 mx-auto mt-8 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2.5 sm:max-w-5xl"
              role="list"
            >
              {marketChips.map((m) => (
                <li key={m.href}>
                  <Link
                    to={m.href}
                    className="inline-flex min-h-9 min-w-0 max-w-full items-center justify-center rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 text-center text-sm font-semibold text-gray-800 transition hover:border-[#f97315]/40"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="relative z-10 mt-4 text-center text-sm text-gray-500">
              Prefer a conversation?{' '}
              <Link to="/contact" className="font-semibold text-gray-800 underline-offset-2 hover:underline">
                Contact
              </Link>
              {' · '}
              <Link to="/testimonials" className="font-semibold text-gray-800 underline-offset-2 hover:underline">
                Testimonials
              </Link>
            </p>
          </div>
        </section>

        {/* Single closing CTA — no contact form on this page */}
        <section className="section-padding bg-[#101113] text-white" aria-labelledby="final-cta">
          <div className="container-custom max-w-3xl text-center">
            <h2
              id="final-cta"
              className="text-3xl font-black leading-tight tracking-tight md:text-4xl"
            >
              Want to work with a UX and product design partner who understands complexity?
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Book a free strategy call and let’s explore how we can help improve your website, app, platform, customer journey or AI product idea.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
              >
                Book a free strategy call
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View our work
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/50">
              Read{' '}
              <Link to="/testimonials" className="font-semibold text-white/90 underline-offset-2 hover:underline">
                testimonials
              </Link>
              {' or '}
              <Link to="/contact" className="font-semibold text-white/90 underline-offset-2 hover:underline">
                get in touch
              </Link>
              .
            </p>
          </div>
        </section>
      </article>
    </PageShell>
  );
};

export default AboutPage;
