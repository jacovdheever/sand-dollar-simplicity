import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Star } from 'lucide-react';
import PageShell from '@/components/marketing/PageShell';
import SEO from '@/components/SEO';
import { absoluteUrl } from '@/lib/siteOrigin';

const CALENDLY = 'https://calendly.com/sanddollardesign/intro';
const WIDGET_SCRIPT = 'https://widget.clutch.co/static/js/widget.js';

function useClutchWidgetScript() {
  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SCRIPT}"]`)) return;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = WIDGET_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, []);
}

const valueCards = [
  {
    title: 'Strategic clarity',
    body: 'We help teams move from vague product or platform challenges to clearer priorities, journeys and decisions.',
  },
  {
    title: 'Research-led recommendations',
    body: 'Our UX research and usability testing help teams understand user needs before committing to costly delivery decisions.',
  },
  {
    title: 'Strong UX/UI and product design execution',
    body: 'We design websites, apps, internal tools and platforms that are easier to use, clearer to navigate and better aligned to business goals.',
  },
  {
    title: 'Cross-functional collaboration',
    body: 'We work well with founders, executives, product teams, developers, marketers and operational stakeholders.',
  },
  {
    title: 'Practical delivery support',
    body: 'Where needed, we help clients move beyond design into prototyping, AI development, website development and implementation support.',
  },
  {
    title: 'Experience in complex industries',
    body: 'Our work spans fintech, banking, healthcare, telco, FMCG, B2B e-commerce and nonprofit organisations.',
  },
] as const;

const serviceLinks = [
  { href: '/ux-strategy-consulting', title: 'UX Strategy Consulting', body: 'Align teams, define priorities and reduce wasted delivery effort.' },
  { href: '/ux-research-agency', title: 'UX Research & Usability Testing', body: 'Validate ideas, uncover friction and turn insights into practical recommendations.' },
  { href: '/ux-ui-design-services', title: 'UX/UI Design Services', body: 'Design clearer user interfaces and more intuitive customer journeys.' },
  { href: '/product-design-agency', title: 'Product Design Agency', body: 'Shape digital products from idea to launch and improvement.' },
  { href: '/enterprise-ux-consulting', title: 'Enterprise UX Consulting', body: 'Improve complex workflows, internal tools and digital platforms.' },
  { href: '/ai-development-agency', title: 'AI Development Agency', body: 'Prototype and build AI-powered MVPs, copilots and workflow tools.' },
] as const;

const industryLinks = [
  { href: '/fintech-ux-design-agency', label: 'Fintech UX Design' },
  { href: '/financial-services-ux-design', label: 'Financial Services UX Design' },
  { href: '/healthcare-ux-design-agency', label: 'Healthcare UX Design' },
  { href: '/nonprofit-and-ngo-website-design', label: 'Nonprofit & NGO Website Design' },
  { href: '/telco-ux-design', label: 'Telco UX Design' },
  { href: '/b2b-ecommerce-ux-design', label: 'B2B E-commerce UX Design' },
] as const;

const caseStudyLinks = [
  {
    href: '/mukuru-mobile-app-rebrand-and-redesign',
    name: 'Mukuru',
    title: 'Mobile App Rebrand and Redesign',
    body: 'Fintech UX/UI design, product design, branding and user testing.',
  },
  {
    href: '/tradition-capital-bank-data-analytics-platform-redesign',
    name: 'Tradition Capital Bank',
    title: 'Employee Experience Redesign on Data Analytics Platform',
    body: 'Enterprise UX, data analytics platform redesign and improved internal user journeys.',
  },
  {
    href: '/heineken-b2b-ecommerce-ux-ui-design',
    name: 'Heineken',
    title: 'B2B E-Commerce UX/UI Design',
    body: 'B2B e-commerce UX/UI design for an SAP commerce platform.',
  },
] as const;

const processSteps = [
  { title: 'Understand the problem', body: 'We start by clarifying the business goals, user needs, constraints and success measures.' },
  { title: 'Align the team', body: 'We help stakeholders agree on priorities, journeys and trade-offs before teams commit to delivery.' },
  { title: 'Design and validate', body: 'We create practical UX/UI and product design solutions, then test and refine them where possible.' },
  { title: 'Support implementation', body: 'We work with development teams or support implementation directly when needed.' },
] as const;

const faqItems = [
  {
    q: 'Are Sand Dollar Design reviews verified?',
    a: 'Our Clutch reviews are collected through Clutch’s review process and displayed through the Clutch widget on this page.',
  },
  {
    q: 'What kinds of clients do you work with?',
    a: 'We work with startups, SMEs and enterprise teams across fintech, banking, healthcare, telco, FMCG, B2B e-commerce and nonprofit organisations.',
  },
  {
    q: 'What services do clients usually review you for?',
    a: 'Clients typically work with us on UX strategy, UX research, UX/UI design, product design, website and app design, AI development and implementation support.',
  },
  {
    q: 'Do you work with clients outside South Africa?',
    a: 'Yes. Sand Dollar Design works with clients in South Africa, the USA, the UK, the Netherlands and Belgium.',
  },
  {
    q: 'Can we speak to Sand Dollar Design before committing to a project?',
    a: 'Yes. You can book a free strategy call to discuss your product, platform, website or AI idea before deciding on next steps.',
  },
] as const;

const TestimonialsPage: React.FC = () => {
  useClutchWidgetScript();
  const canonical = absoluteUrl('/testimonials');
  const metaDesc =
    'Read client testimonials for Sand Dollar Design, a 5-star rated UX/UI design, product design, UX research and AI development agency serving South Africa, the USA and Europe.';

  return (
    <PageShell>
      <SEO
        title="Client Testimonials | 5-Star UX/UI Design & Product Design Agency"
        description={metaDesc}
        keywords="client testimonials, UX design reviews, UI design agency, product design, Sand Dollar Design, Clutch reviews, UX research, AI development, South Africa, USA, Europe"
        canonical={canonical}
        type="website"
        openGraphTitle="Client Testimonials | Sand Dollar Design"
        openGraphDescription="See what clients say about working with Sand Dollar Design across UX strategy, UX research, UX/UI design, product design and digital product delivery."
        organizationSameAs={['https://clutch.co/profile/sand-dollar-design-pty']}
        faq={faqItems.map(({ q, a }) => ({ question: q, answer: a }))}
      />

      <article>
        <section className="relative border-b border-gray-200 bg-gradient-to-b from-[#f8f5f1] to-white pt-24 pb-16 md:pt-28 md:pb-20">
          <div className="container-custom max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Client testimonials</p>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">
              Trusted by teams building better digital products
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 md:text-xl">
              Sand Dollar Design partners with startups, SMEs and enterprise teams to improve websites, apps, platforms and customer journeys through UX
              strategy, UX research, UX/UI design, product design and AI development. Here’s what clients say about working with us.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Star className="h-4 w-4 text-[#f97315] fill-[#f97315]" aria-hidden />
              5-star rated on Clutch
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#101113] px-7 py-4 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                Book a free strategy call
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-4 text-sm font-semibold text-gray-950 transition hover:bg-gray-50"
              >
                View our projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white" aria-labelledby="clutch-reviews">
          <div className="container-custom">
            <h2 id="clutch-reviews" className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl">
              Verified client reviews
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
              Our Clutch profile includes verified client feedback across digital product design, UX/UI design, research-led strategy and implementation
              support. Many review widgets load content in an iframe, so the copy on this page is written to be fully indexable for search engines.
            </p>
            <div
              className="clutch-widget mt-10 min-h-[200px] w-full"
              data-url="https://widget.clutch.co"
              data-widget-type="5"
              data-height="auto"
              data-nofollow="false"
              data-expandifr="true"
              data-scale="100"
              data-clutchcompany-id="1333314"
            />
          </div>
        </section>

        <section className="section-padding bg-[#f8f5f1]" aria-labelledby="what-clients-value">
          <div className="container-custom">
            <h2 id="what-clients-value" className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl">
              What clients value about working with Sand Dollar Design
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-600">Themes we hear from teams across research, design and delivery engagements.</p>
            <ul className="mt-10 grid list-none gap-5 md:grid-cols-2">
              {valueCards.map((card) => (
                <li
                  key={card.title}
                  className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-black text-gray-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{card.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-padding bg-white" aria-labelledby="core-services">
          <div className="container-custom">
            <h2 id="core-services" className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl">
              Reviewed across UX, product design and digital delivery work
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-600">
              Client feedback reflects the breadth of our work across strategy, research, design and implementation.
            </p>
            <ul className="mt-10 grid list-none gap-4 md:grid-cols-2">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-[#f8f5f1] p-5 transition hover:border-[#f97315]/50 hover:shadow-md"
                  >
                    <div>
                      <h3 className="text-base font-bold text-gray-950 group-hover:text-[#f97315]">{s.title}</h3>
                      <p className="mt-2 text-sm text-gray-600">{s.body}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#f97315]">
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-padding bg-[#101113] text-white" aria-labelledby="industries">
          <div className="container-custom">
            <h2 id="industries" className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
              Trusted across high-trust and complex industries
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-white/75">
              We are often brought into projects where usability, trust, clarity and stakeholder alignment matter. Our experience spans regulated,
              complex and mission-driven sectors.
            </p>
            <ul className="mt-10 flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {industryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="inline-flex w-full items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#f97315]/50 hover:bg-white/[0.1]"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#f97315] shrink-0" aria-hidden />
                      {item.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/50 shrink-0" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-padding bg-white" aria-labelledby="work-behind">
          <div className="container-custom">
            <h2 id="work-behind" className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl">
              See the work behind the reviews
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-600">Case studies and project write-ups that show how we approach complex product and UX work.</p>
            <ul className="mt-10 grid list-none gap-6 md:grid-cols-3">
              {caseStudyLinks.map((cs) => (
                <li key={cs.href} className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#f8f5f1]">
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#f97315]">{cs.name}</p>
                    <h3 className="mt-2 text-lg font-black text-gray-950">{cs.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{cs.body}</p>
                  </div>
                  <div className="mt-auto border-t border-gray-200 p-4">
                    <Link to={cs.href} className="inline-flex items-center text-sm font-bold text-gray-950 hover:text-[#f97315]">
                      View case study
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-padding bg-[#f8f5f1]" aria-labelledby="how-we-work">
          <div className="container-custom">
            <h2 id="how-we-work" className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl">
              How we make the collaboration work
            </h2>
            <ol className="mt-10 grid list-none gap-6 md:grid-cols-2">
              {processSteps.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                  <span className="text-sm font-black text-[#f97315]">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-lg font-black text-gray-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-padding bg-white" aria-labelledby="testimonials-faq">
          <div className="container-custom max-w-3xl">
            <h2 id="testimonials-faq" className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl">
              Testimonials FAQ
            </h2>
            <dl className="mt-8 space-y-6">
              {faqItems.map((item) => (
                <div key={item.q} className="border-b border-gray-200 pb-6 last:border-0">
                  <dt className="text-lg font-bold text-gray-950">{item.q}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-gray-600">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section-padding bg-[#f8f5f1]">
          <div className="container-custom">
            <div className="overflow-hidden rounded-[2rem] bg-[#101113] p-8 text-center text-white shadow-2xl md:p-12">
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">Want to improve your digital product or customer journey?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
                Book a free strategy call and we’ll help you identify the biggest friction points, opportunities and practical next steps.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full max-w-sm items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100 sm:w-auto"
                >
                  Book a free strategy call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link
                  to="/projects"
                  className="inline-flex w-full max-w-sm items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  View our projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
};

export default TestimonialsPage;
