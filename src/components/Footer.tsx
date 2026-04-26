import React, { useEffect } from 'react';
import { Building2, Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetPath } from '@/lib/utils';

const calendarHref = 'https://calendly.com/sanddollardesign/intro';

const serviceLinks = [
  { label: 'UX Strategy Consulting', href: '/ux-strategy-consulting' },
  { label: 'UX Research Agency', href: '/ux-research-agency' },
  { label: 'UX/UI Design Services', href: '/ux-ui-design-services' },
  { label: 'Product Design Agency', href: '/product-design-agency' },
  { label: 'Enterprise UX Consulting', href: '/enterprise-ux-consulting' },
  { label: 'AI Development Agency', href: '/ai-development-agency' },
  { label: 'Website Design & Development', href: '/website-design-and-development' },
  { label: 'App Design & Development', href: '/app-design-and-development' },
  { label: 'Design System Consulting', href: '/design-system-consulting' },
  { label: 'Design Maturity & Capability Building', href: '/design-maturity-and-capability-building' },
  { label: 'Digital Transformation UX Consulting', href: '/digital-transformation-ux-consulting' },
];

const industryLinks = [
  { label: 'Financial Services UX Design', href: '/financial-services-ux-design' },
  { label: 'Fintech UX Design', href: '/fintech-ux-design-agency' },
  { label: 'Banking UX Consulting', href: '/banking-ux-consulting' },
  { label: 'Insurance UX Design', href: '/insurance-ux-design' },
  { label: 'Healthcare UX Design', href: '/healthcare-ux-design-agency' },
  { label: 'Telco UX Design', href: '/telco-ux-design' },
  { label: 'B2B E-commerce UX Design', href: '/b2b-ecommerce-ux-design' },
  { label: 'Nonprofit & NGO Website Design', href: '/nonprofit-and-ngo-website-design' },
];

const marketLinks = [
  { label: 'UX/UI Design Agency USA', href: '/ux-ui-design-agency-usa' },
  { label: 'UX Agency Minneapolis', href: '/minneapolis-ux-agency' },
  { label: 'UX/UI Design Agency Florida', href: '/florida-ux-ui-design-agency' },
  { label: 'UX/UI Design Agency Jacksonville', href: '/jacksonville-ux-ui-design-agency' },
  { label: 'Product Design Agency Boston', href: '/boston-product-design-agency' },
  { label: 'UX Design Agency Chicago', href: '/chicago-ux-design-agency' },
  { label: 'AI Development Company Texas', href: '/texas-ai-development-company' },
  { label: 'UX Design Agency UK', href: '/ux-design-agency-uk' },
  { label: 'Product Design Agency Netherlands', href: '/product-design-agency-netherlands' },
  { label: 'UX Agency Belgium', href: '/ux-agency-belgium' },
  { label: 'UX/UI Design Agency South Africa', href: '/ux-ui-design-agency-south-africa' },
];

const companyLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Insights', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

const FooterLinkList: React.FC<{
  title: string;
  links: { label: string; href: string }[];
}> = ({ title, links }) => (
  <div>
    <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">{title}</h3>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link to={link.href} className="text-sm leading-relaxed text-white/58 transition hover:text-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.clutch.co/static/js/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-black py-16 text-white md:py-20" aria-label="Site footer">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr_1fr_1fr_1.1fr]">
          <div>
            <img
              src={getAssetPath('Sand-Dollar_Logo.png')}
              alt="Sand Dollar Design Logo"
              className="mb-6 h-10"
            />
            <p className="mb-4 max-w-sm text-sm leading-relaxed text-white/62">
              UX strategy, UX research, UX/UI design, product design and AI development for startups, SMEs and enterprise teams.
            </p>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/45">
              Serving clients in South Africa, the USA, the UK, Netherlands and Belgium.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/sand-dollar-design/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/48 transition-colors duration-200 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.facebook.com/sanddollarxd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/48 transition-colors duration-200 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/sanddollar.design/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/48 transition-colors duration-200 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://x.com/sanddollarxd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/48 transition-colors duration-200 hover:text-white"
                aria-label="X (Twitter)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <FooterLinkList title="Services" links={serviceLinks} />
          <FooterLinkList title="Industries" links={industryLinks} />
          <FooterLinkList title="Markets" links={marketLinks} />

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">Company</h3>
            <ul className="mb-6 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm leading-relaxed text-white/58 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={calendarHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold leading-relaxed text-[#fb923c] transition hover:text-white"
                >
                  Book a Free Strategy Call
                </a>
              </li>
            </ul>

            <div className="space-y-3 border-t border-white/10 pt-5">
              <a href="mailto:info@sanddollardesign.co.za" className="flex items-center gap-3 text-sm text-white/58 transition hover:text-white">
                <Mail className="text-white/35" size={18} aria-hidden="true" />
                <span>info@sanddollardesign.co.za</span>
              </a>
              <a href="tel:+27728244888" className="flex items-center gap-3 text-sm text-white/58 transition hover:text-white">
                <Phone className="text-white/35" size={18} aria-hidden="true" />
                <span>South Africa: +27 72 824 4888</span>
              </a>
              <a href="tel:+17866363972" className="flex items-center gap-3 text-sm text-white/58 transition hover:text-white">
                <Phone className="text-white/35" size={18} aria-hidden="true" />
                <span>USA: +1 786 636 3972</span>
              </a>
              <div className="flex items-start gap-3 text-sm leading-relaxed text-white/48">
                <Building2 className="mt-0.5 text-white/35" size={18} aria-hidden="true" />
                <span>
                  Pretoria, South Africa
                  <br />
                  Smyrna, Delaware, United States
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm text-white/45">&copy; 2026 Sand Dollar Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
