import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Search, Layout, Cpu } from 'lucide-react';
import FeaturedCaseStudiesGrid from '@/components/marketing/FeaturedCaseStudiesGrid';

const services = [
  {
    title: 'UX Strategy Consulting',
    body: 'Clarify priorities, align teams, and reduce wasted build effort.',
    bullets: [
      'Journey mapping and service blueprints',
      'Product strategy and roadmap alignment',
      'Design maturity and capability building',
    ],
    linkText: 'Learn more',
    linkTarget: '/ux-strategy-consulting',
    Icon: Brain,
  },
  {
    title: 'UX Research & Usability Testing',
    body: 'Make better decisions before and during delivery.',
    bullets: [
      'Discovery research and stakeholder interviews',
      'Usability testing and UX audits',
      'Insight synthesis and prioritised recommendations',
    ],
    linkText: 'Learn more',
    linkTarget: '/ux-research-agency',
    Icon: Search,
  },
  {
    title: 'UX/UI and Product Design',
    body: 'Design digital experiences people can actually use and adopt.',
    bullets: [
      'UX flows, wireframes and prototypes',
      'UI design and design systems',
      'Product design for websites, apps and internal tools',
    ],
    footerLinks: [
      { text: 'More about UX/UI Design', to: '/ux-ui-design-services' },
      { text: 'More about Product Design', to: '/product-design-agency' },
    ],
    Icon: Layout,
  },
  {
    title: 'AI Development & Implementation',
    body: 'Build AI-powered MVPs and practical digital solutions.',
    bullets: [
      'AI MVPs and startup prototyping',
      'Workflow tools and copilots',
      'Website and app implementation when needed',
    ],
    linkText: 'Learn more',
    linkTarget: '/ai-development-agency',
    Icon: Cpu,
  },
];

const organisationChips = [
  { label: 'Startups' },
  { label: 'SMEs' },
  { label: 'Enterprise teams' },
];

const industryChips = [
  { label: 'Fintech', to: '/fintech-ux-design-agency' },
  { label: 'Banking', to: '/financial-services-ux-design' },
  { label: 'Healthcare', to: '/healthcare-ux-design-agency' },
  { label: 'NGOs', to: '/nonprofit-and-ngo-website-design' },
  // TODO: Add link when a dedicated Telco page is ready for this chip.
  { label: 'Telco' },
  { label: 'FMCG', to: '/b2b-ecommerce-ux-design' },
  { label: 'B2B e-commerce', to: '/b2b-ecommerce-ux-design' },
];

const ChipGroup: React.FC<{ label: string; chips: Array<{ label: string; to?: string }> }> = ({ label, chips }) => (
  <div>
    <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-gray-500">{label}</p>
    <div className="flex flex-wrap gap-2.5">
      {chips.map((chip) => {
        const className =
          'rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-[#f97315]/35 hover:bg-[#fff8f3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97315]/35';

        return chip.to ? (
          <Link key={chip.label} to={chip.to} className={className}>
            {chip.label}
          </Link>
        ) : (
          <span key={chip.label} className={className}>
            {chip.label}
          </span>
        );
      })}
    </div>
  </div>
);

const Services = () => {
  return (
    <section id="work" className="pt-8 md:pt-20" style={{ backgroundColor: '#f9fafb' }}>
      <div className="container-custom">
        <div className="text-center max-w-6xl mx-auto mb-12 section-animate">
          <h2 className="section-title mb-6 from-left font-black">
            <span className="gradient-text">UX Strategy, Research, UX/UI and Product Design Services</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4 from-right">
            We partner with startups, SMEs and enterprise teams to solve complex digital challenges through UX strategy, UX research, UX/UI design,
            product design, AI development and implementation when needed.
          </p>
        </div>

        {/* Service cards */}
        <div className="container-custom mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 section-animate items-stretch">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative text-center flex flex-col ${
                  index % 2 === 0 ? 'from-left' : 'from-right'
                }`}
              >
                <div className="flex justify-center mb-0">
                  <div className="h-20 w-20 rounded-full flex items-center justify-center coral-gradient relative z-10 -mb-10">
                    <service.Icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl pt-16 pb-6 px-6 shadow-lg flex-1 flex flex-col">
                  <h3 className="text-lg font-black mb-3" style={{ color: '#19191a' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-normal leading-relaxed text-left w-full mb-4">
                    {service.body}
                  </p>
                  <ul className="text-gray-600 text-sm text-left space-y-1 mb-6 flex-1">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#f97315] mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-2 items-start w-full">
                    {'footerLinks' in service && service.footerLinks ? (
                      service.footerLinks.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="text-[#f97315] font-semibold text-sm hover:underline inline-flex items-center gap-1"
                        >
                          {item.text}
                          <span>→</span>
                        </Link>
                      ))
                    ) : (
                      <Link
                        to={service.linkTarget}
                        className="text-[#f97315] font-semibold text-sm hover:underline inline-flex items-center gap-1"
                      >
                        {service.linkText}
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who we help */}
        <div className="max-w-5xl mx-auto mb-20 section-animate">
          <div className="from-right rounded-[2rem] border border-gray-100 bg-white/85 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="grid gap-7 md:grid-cols-[0.38fr_0.62fr] md:items-start">
              <div className="from-left">
                <h3 className="text-2xl font-black leading-tight tracking-tight text-gray-950 md:text-3xl">Who we help</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
                  We work with teams that need clearer digital journeys, better product decisions and more usable platforms.
                </p>
              </div>
              <div className="space-y-5">
                <ChipGroup label="By organisation:" chips={organisationChips} />
                <ChipGroup label="By industry:" chips={industryChips} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeaturedCaseStudiesGrid id="featured-work" variant="home" />
    </section>
  );
};

export default Services;
