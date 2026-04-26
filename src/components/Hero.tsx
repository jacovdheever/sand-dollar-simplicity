import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAssetPath } from '@/lib/utils';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#101113] pb-16 pt-32 text-white md:pt-36 lg:pt-32"
      data-no-reveal
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source
          src={getAssetPath('images/pages/slow-cinematic-camera-pan-circling-around-the-tabl.mp4')}
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(249,115,22,0.2),transparent_32%),linear-gradient(90deg,rgba(5,6,8,0.96),rgba(8,9,12,0.84)_44%,rgba(10,11,14,0.56)_62%,rgba(10,11,14,0.28))]" />
      <div className="absolute inset-0 bg-black/12" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)]">
          <div className="max-w-[860px]">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#fb923c]">
              UX Strategy · Product Design · AI Delivery
            </p>
            <h1 className="max-w-[860px] text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              UX & Product Design for Digital Products That Scale
            </h1>
            <p className="mt-7 max-w-[740px] text-lg leading-relaxed text-white/80 md:text-xl">
              Sand Dollar Design helps startups, SMEs and enterprise teams improve customer journeys, validate ideas and launch better products — through UX strategy, product design, and AI-powered development.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://calendly.com/sanddollardesign/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/70 sm:w-auto"
              >
                Book a free strategy call
              </a>
              <Link
                to="/projects"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 sm:w-auto"
              >
                View case studies
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </div>

            <p className="mt-8 max-w-[740px] text-sm font-medium leading-relaxed text-white/72">
              80+ Projects Delivered | Award-winning team | Senior Global Expertise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
