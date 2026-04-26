import React from 'react';
import { Link } from 'react-router-dom';
import type { MarketingPageContent } from '@/types/marketing';

interface MarketingCTAsProps {
  primary: MarketingPageContent['primaryCta'];
  secondary?: MarketingPageContent['secondaryCta'];
}

const MarketingCTAs: React.FC<MarketingCTAsProps> = ({ primary, secondary }) => {
  const isExternal = primary.href.startsWith('http');
  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-4xl mx-auto text-center">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
          {isExternal ? (
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#f97315] text-white font-bold px-8 py-4 text-lg hover:opacity-95 transition-opacity shadow-md"
            >
              {primary.label}
            </a>
          ) : (
            <Link
              to={primary.href}
              className="inline-flex items-center justify-center rounded-full bg-[#f97315] text-white font-bold px-8 py-4 text-lg hover:opacity-95 transition-opacity shadow-md"
            >
              {primary.label}
            </Link>
          )}
          {secondary ? (
            <Link
              to={secondary.href}
              className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-900 font-semibold px-8 py-4 text-lg hover:border-[#f97315] hover:text-[#f97315] transition-colors"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default MarketingCTAs;
