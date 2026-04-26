import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getAssetPath } from '@/lib/utils';
import { ChevronDown, Menu, X } from 'lucide-react';
import { MARKETING_SLUGS } from '@/data/marketingPages/loadMarketingPage';

const calendarHref = 'https://calendly.com/sanddollardesign/intro';

const serviceLinks = [
  {
    label: 'UX Strategy Consulting',
    href: '/ux-strategy-consulting',
    description: 'Align teams, clarify priorities and reduce wasted build effort.',
  },
  {
    label: 'UX Research & Usability Testing',
    href: '/ux-research-agency',
    description: 'Validate decisions before and during delivery.',
  },
  {
    label: 'UX/UI Design Services',
    href: '/ux-ui-design-services',
    description: 'Design clearer web, mobile and platform experiences.',
  },
  {
    label: 'Product Design',
    href: '/product-design-agency',
    description: 'Shape better digital products from idea to launch.',
  },
  {
    label: 'Enterprise UX Consulting',
    href: '/enterprise-ux-consulting',
    description: 'Improve complex workflows, platforms and internal tools.',
  },
  {
    label: 'AI Development',
    href: '/ai-development-agency',
    description: 'Build AI-powered MVPs, copilots and workflow tools.',
  },
  {
    label: 'Website & App Development',
    href: '/website-design-and-development',
    description: 'Design and implement websites, apps and digital products.',
  },
  {
    label: 'Design Maturity & Capability Building',
    href: '/design-maturity-and-capability-building',
    description: 'Build stronger design systems, rituals and internal capability.',
  },
];

const industryLinks = [
  {
    label: 'Fintech',
    href: '/fintech-ux-design-agency',
    description: 'UX and product design for financial products and customer journeys.',
  },
  {
    label: 'Banking & Financial Services',
    href: '/financial-services-ux-design',
    description: 'Improve banking, insurance and financial service experiences.',
  },
  {
    label: 'Healthcare',
    href: '/healthcare-ux-design-agency',
    description: 'Design clearer patient, provider and healthcare product journeys.',
  },
  {
    label: 'Nonprofits & NGOs',
    href: '/nonprofit-and-ngo-website-design',
    description: 'Improve mission storytelling, donor journeys and digital impact.',
  },
  {
    label: 'Telco',
    href: '/telco-ux-design',
    description: 'Improve digital self-service, portals and customer experiences.',
  },
  {
    label: 'FMCG / B2B E-commerce',
    href: '/b2b-ecommerce-ux-design',
    description: 'Design better ordering, commerce and wholesale customer journeys.',
  },
];

const directLinks = [
  { label: 'Work', href: '/projects' },
  { label: 'Insights', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

type DropdownLink = {
  label: string;
  href: string;
  description: string;
};

const DesktopDropdown: React.FC<{ label: string; links: DropdownLink[] }> = ({ label, links }) => (
  <div className="group relative">
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      aria-haspopup="true"
    >
      {label}
      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
    </button>
    <div className="invisible absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
      <div className="rounded-[1.5rem] border border-white/10 bg-[#101113]/95 p-3 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-1 md:grid-cols-2">
          {links.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="rounded-2xl p-4 text-left transition hover:bg-white/[0.07] focus:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97315]/60"
            >
              <span className="block text-sm font-black text-white">{item.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-white/60">{item.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MobileAccordion: React.FC<{
  label: string;
  links: DropdownLink[];
  onNavigate: () => void;
}> = ({ label, links, onNavigate }) => (
  <details className="group rounded-2xl border border-white/10 bg-white/[0.04]">
    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-base font-black text-white marker:hidden">
      {label}
      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <div className="grid gap-1 px-2 pb-3">
      {links.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          onClick={onNavigate}
          className="rounded-xl px-3 py-3 text-left transition hover:bg-white/[0.07] focus:bg-white/[0.07] focus:outline-none"
        >
          <span className="block text-sm font-bold text-white">{item.label}</span>
          <span className="mt-1 block text-xs leading-relaxed text-white/60">{item.description}</span>
        </Link>
      ))}
    </div>
  </details>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isWorkPage = location.pathname === '/work';
  const isBlogPage = location.pathname === '/blog';
  const isArticlePage = location.pathname.startsWith('/article/');
  const isProjectPage = location.pathname.startsWith('/project/');
  const isCompanyPage = ['/about', '/contact', '/testimonials'].includes(location.pathname);
  const firstSegment = location.pathname.replace(/^\//, '').split('/')[0] || '';
  const isMarketingPage = MARKETING_SLUGS.includes(firstSegment);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const solidNav = scrolled || isWorkPage || isBlogPage || isArticlePage || isProjectPage || isCompanyPage || isMarketingPage || isMobileMenuOpen;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        solidNav ? "bg-black/90 py-3 shadow-md backdrop-blur-md" : "bg-transparent py-5"
      )}
      aria-label="Primary navigation"
    >
      <div className="container-custom h-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="transition-opacity duration-200 hover:opacity-80"
            aria-label="Sand Dollar Design home"
          >
            <img
              src={getAssetPath("Sand-Dollar_Logo.png")}
              alt="Sand Dollar Design Logo"
              className="h-10 md:h-12"
            />
          </Link>
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <DesktopDropdown label="Services" links={serviceLinks} />
          <DesktopDropdown label="Industries" links={industryLinks} />
          {directLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={calendarHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-black text-gray-950 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:inline-flex"
          >
            Book a free strategy call
          </a>

          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-full p-2 text-white transition hover:bg-white/10 hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 lg:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden">
          <div className="container-custom py-6">
            <div className="flex flex-col gap-3">
              <MobileAccordion label="Services" links={serviceLinks} onNavigate={() => setIsMobileMenuOpen(false)} />
              <MobileAccordion label="Industries" links={industryLinks} onNavigate={() => setIsMobileMenuOpen(false)} />
              <div className="grid gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
                {directLinks.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="rounded-xl px-3 py-3 text-base font-black text-white transition hover:bg-white/[0.07] focus:bg-white/[0.07] focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <a
                href={calendarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-gray-950 transition hover:bg-gray-100"
              >
                Book a free strategy call
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
