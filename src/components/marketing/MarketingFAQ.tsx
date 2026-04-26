import React from 'react';
import type { MarketingFAQ } from '@/types/marketing';

interface MarketingFAQProps {
  items: MarketingFAQ[];
}

const MarketingFAQ: React.FC<MarketingFAQProps> = ({ items }) => {
  if (!items.length) return null;
  return (
    <section className="section-padding bg-[#f9fafb] border-y border-gray-100">
      <div className="container-custom max-w-3xl mx-auto">
        <h2 className="section-title mb-8 font-black text-center text-gray-900">Frequently asked questions</h2>
        <div className="space-y-3">
          {items.map((faq, i) => (
            <details
              key={i}
              className="marketing-details group rounded-xl border border-gray-200 bg-white shadow-sm open:shadow-md transition-shadow"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900">
                <span>{faq.question}</span>
                <span className="text-[#f97315] text-xl leading-none group-open:rotate-45 transition-transform select-none">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 leading-relaxed text-base border-t border-gray-100 pt-3">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingFAQ;
