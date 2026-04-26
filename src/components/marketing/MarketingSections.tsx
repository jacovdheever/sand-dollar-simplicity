import React from 'react';
import type { MarketingPageContent } from '@/types/marketing';
import { pageImageSrc } from './pageImageSrc';

interface MarketingSectionsProps {
  sections: MarketingPageContent['sections'];
  gallery?: MarketingPageContent['gallery'];
}

function isUiShowcase(img: NonNullable<MarketingPageContent['gallery']>[number]): boolean {
  const text = `${img.file} ${img.placement} ${img.alt}`.toLowerCase();
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
    'mockup',
    'mobile app',
  ].some((term) => text.includes(term));
}

function imageAspect(img: NonNullable<MarketingPageContent['gallery']>[number]): string {
  const text = `${img.file} ${img.placement}`.toLowerCase();
  if (text.includes('mobile') && !text.includes('desktop')) return 'aspect-[9/16]';
  return 'aspect-[4/3]';
}

const ShowcaseFigure: React.FC<{ img: NonNullable<MarketingPageContent['gallery']>[number] }> = ({ img }) => {
  const ui = isUiShowcase(img);
  const aspect = imageAspect(img);

  if (ui) {
    return (
      <figure className="group">
        <img
          src={pageImageSrc(img.file)}
          alt={img.alt}
          className={`${aspect} w-full object-contain drop-shadow-[0_16px_30px_rgba(15,23,42,0.14)] transition-transform duration-300 group-hover:translate-y-[-2px]`}
        />
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-100 shadow-xl">
      <img src={pageImageSrc(img.file)} alt={img.alt} className={`${aspect} h-full w-full object-cover`} />
    </figure>
  );
};

const MarketingSections: React.FC<MarketingSectionsProps> = ({ sections, gallery }) => {
  return (
    <>
      {sections.map((section, index) => {
        const bg = index % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]';
        const HeadingTag = section.level === 3 ? 'h3' : 'h2';
        return (
          <section key={section.id} className={`section-padding ${bg}`}>
            <div className="container-custom max-w-4xl mx-auto">
              {section.heading ? (
                <HeadingTag className="section-title mb-6 font-black text-gray-900">{section.heading}</HeadingTag>
              ) : null}
              {section.body?.length ? (
                <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
                  {section.body.map((para, i) => {
                    const isBullet = para.trim().startsWith('•') || para.includes('\t•');
                    if (isBullet) {
                      return (
                        <p key={i} className="pl-2 border-l-2 border-[#f97315]/60">
                          {para.replace(/^•\s*/, '').replace(/^\t•\s*/, '')}
                        </p>
                      );
                    }
                    return <p key={i}>{para}</p>;
                  })}
                </div>
              ) : null}
              {section.images?.length ? (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {section.images.map((img) => (
                    <ShowcaseFigure key={img.file} img={img} />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      {gallery && gallery.length > 0 ? (
        <section className="section-padding bg-white">
          <div className="container-custom max-w-6xl mx-auto">
            <h2 className="section-title mb-8 font-black text-center text-gray-900">Project imagery</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((img) => (
                <ShowcaseFigure key={`${img.file}-${img.placement}`} img={img} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default MarketingSections;
