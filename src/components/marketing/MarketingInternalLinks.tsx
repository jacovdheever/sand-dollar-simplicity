import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { MarketingPageContent } from '@/types/marketing';
import { normalizeInternalHref, readableInternalLabel } from '@/data/marketingPages/normalizeInternalLink';
import { MARKETING_SLUGS } from '@/data/marketingPages/loadMarketingPage';

interface MarketingInternalLinksProps {
  links: MarketingPageContent['internalLinks'];
}

type RelatedCard = {
  href: string;
  label: string;
  description: string;
  external: boolean;
};

const STATIC_ROUTES = new Set(['/', '/work', '/projects', '/blog']);
const MARKETING_ROUTES = new Set(MARKETING_SLUGS.map((slug) => `/${slug}`));

const DESCRIPTIONS_BY_HREF: Record<string, string> = {
  '/ux-strategy-consulting': 'Strategic UX direction, journey mapping and product decision support.',
  '/ux-research-agency': 'Research, usability testing and insight-led product decisions.',
  '/ux-ui-design-services': 'UX design, UI design and prototypes for clearer digital products.',
  '/product-design-agency': 'End-to-end product strategy, UX/UI and launch-ready product design.',
  '/design-system-consulting': 'Scalable UI systems, reusable components and governance.',
  '/ai-development-agency': 'Design-led AI products, MVPs and intelligent workflow interfaces.',
  '/app-design-and-development': 'Mobile and web app design shaped before expensive build decisions.',
  '/digital-transformation-ux-consulting': 'Human-centred transformation planning for systems people can adopt.',
  '/design-maturity-and-capability-building': 'DesignOps, maturity assessment and stronger internal design capability.',
  '/website-design-and-development': 'Responsive websites built around clarity, credibility and conversion.',
  '/projects': 'Examples of our work across fintech, healthcare and enterprise software.',
  '/work': 'Selected case studies and product design work from Sand Dollar Design.',
  '/financial-services-ux-design': 'UX for dashboards, portals and regulated financial product journeys.',
  '/fintech-ux-design-agency': 'Fintech UX that improves onboarding, trust and transaction clarity.',
  '/banking-ux-consulting': 'Banking experiences for complex customer and internal workflows.',
  '/insurance-ux-design': 'Policy, claims and portal UX that makes insurance easier to understand.',
  '/healthcare-ux-design-agency': 'Patient, clinician and healthcare platform UX with safety and clarity.',
  '/nonprofit-and-ngo-website-design': 'Mission-driven websites that improve trust, donations and engagement.',
  '/b2b-ecommerce-ux-design': 'B2B commerce UX for ordering, accounts and operational complexity.',
  '/telco-ux-design': 'Telco apps and portals that simplify billing, support and self-service.',
  '/ux-ui-design-agency-usa': 'Remote-first UX/UI and product design for US teams.',
  '/ux-ui-design-agency-south-africa': 'Premium UX/UI design for South African digital product teams.',
  '/ux-design-agency-uk': 'Senior UX design support for UK product and service teams.',
  '/product-design-agency-netherlands': 'Product design for Dutch innovation and software teams.',
  '/ux-agency-belgium': 'UX design for Belgian and Benelux businesses.',
  '/minneapolis-ux-agency': 'UX/UI design for Minnesota healthcare, fintech and enterprise teams.',
  '/florida-ux-ui-design-agency': 'UX/UI design for Florida startups and growing digital teams.',
  '/jacksonville-ux-ui-design-agency': 'UX/UI design for Jacksonville fintech, healthcare and logistics teams.',
  '/chicago-ux-design-agency': 'UX design for Chicago fintech, insurance and enterprise products.',
  '/boston-product-design-agency': 'Product design for Boston healthcare, biotech and fintech teams.',
  '/texas-ai-development-company': 'AI product design and development support for Texas teams.',
  '/ai-product-development-for-startups': 'How to shape AI products around trust, validation and real use.',
  '/design-capability-building': 'Practical guidance for growing stronger product design capability.',
  '/design-maturity-model': 'A framework for understanding and improving design maturity.',
  '/digital-transformation-ux': 'UX thinking for digital transformation that people can actually adopt.',
  '/nonprofit-digital-strategy-and-ux': 'Digital strategy and UX for nonprofits that need clearer action paths.',
  '/heineken-b2b-ecommerce-ux-ui-design': 'A B2B e-commerce UX case study for trade and FMCG workflows.',
  '/mukuru-mobile-app-rebrand-and-redesign': 'A fintech mobile app redesign focused on trust and transaction clarity.',
  '/tradition-capital-bank-data-analytics-platform-redesign': 'A data analytics platform redesign for clearer enterprise reporting.',
};

function fallbackDescription(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes('case stud') || lower.includes('project') || lower.includes('work')) {
    return 'See examples of how strategy, UX and product design come together in practice.';
  }
  if (lower.includes('research')) {
    return 'Research and testing that help teams make better product decisions.';
  }
  if (lower.includes('design system')) {
    return 'Reusable product standards that help teams scale quality and speed.';
  }
  if (lower.includes('ai')) {
    return 'AI product experiences designed around trust, clarity and adoption.';
  }
  if (lower.includes('ux') || lower.includes('product') || lower.includes('design')) {
    return 'Explore a related service for designing, validating and scaling digital products.';
  }
  return 'Explore another relevant way Sand Dollar Design helps digital teams move forward.';
}

function isValidInternalHref(href: string): boolean {
  const pathOnly = href.split('?')[0].split('#')[0];
  if (!pathOnly.startsWith('/')) return false;
  return STATIC_ROUTES.has(pathOnly) || MARKETING_ROUTES.has(pathOnly);
}

function buildCards(links: MarketingPageContent['internalLinks']): RelatedCard[] {
  const seen = new Set<string>();

  return links
    .map((link) => {
      const href = normalizeInternalHref(link.href);
      const pathOnly = href.split('?')[0].split('#')[0];
      const external = href.startsWith('http');
      const label = readableInternalLabel(link.label, href);

      return {
        href,
        label,
        external,
        description: DESCRIPTIONS_BY_HREF[pathOnly] ?? fallbackDescription(label),
      };
    })
    .filter((card) => {
      if (seen.has(card.href)) return false;
      seen.add(card.href);
      return card.external || isValidInternalHref(card.href);
    })
    .slice(0, 3);
}

const MarketingInternalLinks: React.FC<MarketingInternalLinksProps> = ({ links }) => {
  const cards = buildCards(links);
  if (!cards.length) return null;

  return (
    <section className="bg-[#f8f5f1] py-12 md:py-16" aria-labelledby="related-services-heading">
      <div className="container-custom">
        <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm md:p-8 lg:p-10">
          <div className="mb-7 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Next steps</p>
            <h2 id="related-services-heading" className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-4xl">
              Explore related services
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600 md:text-lg">
              See more of how Sand Dollar Design helps teams design, validate and scale digital products.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => {
              const isCaseStudyLink = card.label.toLowerCase().includes('case') || card.label.toLowerCase().includes('project');
              const content = (
                <>
                  <div>
                    <h3 className="text-lg font-black leading-tight text-gray-950">{card.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{card.description}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center text-sm font-bold text-[#f97315]">
                    {isCaseStudyLink ? 'View case studies' : 'Explore page'}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </>
              );
              const className =
                'group flex min-h-[12rem] flex-col justify-between rounded-3xl border border-gray-100 bg-[#fbfaf8] p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#f97315]/25 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#f97315]/40';

              return card.external ? (
                <a key={card.href} href={card.href} className={className} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <Link key={card.href} to={card.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingInternalLinks;
