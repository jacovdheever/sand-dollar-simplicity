import React from 'react';
import { pageImageSrc } from '@/components/marketing/pageImageSrc';
import type { MarketingImageSpec, MarketingPageContent } from '@/types/marketing';

/** Before/after pairs often share a placement; match on filename, not a generic "after" substring that hits "before" rows first. */
export function beforeAfterImageByFilename(data: MarketingPageContent, role: 'before' | 'after'): MarketingImageSpec | undefined {
  if (!data.gallery?.length) return undefined;
  if (role === 'after') {
    return data.gallery.find((image) => image.file.toLowerCase().includes('after'));
  }
  return data.gallery.find((image) => {
    const f = image.file.toLowerCase();
    return f.includes('before') && !f.includes('after');
  });
}

export const BeforeAfterSection: React.FC<{
  eyebrow: string;
  title: string;
  body: string;
  before?: MarketingImageSpec;
  after?: MarketingImageSpec;
}> = ({ eyebrow, title, body, before, after }) => {
  const items = [
    before ? { label: 'Before', image: before } : null,
    after ? { label: 'After', image: after } : null,
  ].filter(Boolean) as Array<{ label: string; image: MarketingImageSpec }>;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-10 max-w-5xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">{eyebrow}</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{title}</h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-gray-600">{body}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {items.map(({ label, image }) => (
            <figure key={label} className="relative rounded-[1.5rem] bg-[#f8f5f1] p-4">
              <span className="absolute right-7 top-7 z-10 rounded-full bg-gray-950 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg">
                {label}
              </span>
              <img
                src={pageImageSrc(image.file)}
                alt={image.alt}
                className="aspect-[16/10] w-full object-contain drop-shadow-[0_18px_38px_rgba(15,23,42,0.16)]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
