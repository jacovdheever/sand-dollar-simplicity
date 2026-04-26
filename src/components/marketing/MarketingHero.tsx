import React from 'react';
import { pageImageSrc } from './pageImageSrc';

interface MarketingHeroProps {
  title: string;
  subtitle?: string;
  imageFile?: string;
  imageAlt?: string;
}

const MarketingHero: React.FC<MarketingHeroProps> = ({ title, subtitle, imageFile, imageAlt }) => {
  const src = imageFile ? pageImageSrc(imageFile) : null;

  return (
    <section className="relative min-h-[320px] md:min-h-[420px] flex items-end text-white overflow-hidden">
      {src ? (
        <>
          <img src={src} alt={imageAlt || ''} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#0c0d10]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,21,0.18),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.62)_48%,rgba(0,0,0,0.28))]" />
        </>
      )}
      <div className="relative z-10 container-custom w-full pb-12 pt-32 md:pb-16 md:pt-36">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl drop-shadow-sm">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-3xl leading-relaxed">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
};

export default MarketingHero;
