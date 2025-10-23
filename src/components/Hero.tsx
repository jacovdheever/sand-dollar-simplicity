import React, { useState } from 'react';
import Stats from './Stats';
import ContactModal from './ContactModal';
import { getAssetPath } from '@/lib/utils';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="home" className="min-h-screen pt-28 md:pt-0 flex items-center text-white overflow-hidden relative" data-no-reveal>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={getAssetPath("5923296-hd_1920_1080_30fps.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Content */}
      <div className="container-custom relative z-20">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-tight section-animate from-left md:whitespace-nowrap">
            We Design Solutions.
          </h1>
          <p className="text-xl text-gray-100 mb-12 leading-relaxed">
          At Sand Dollar Design, we approach your business goals and challenges holistically. We leverage innovation consulting, flawless UX/UI design, rapid-prototyping, and AI development to build powerful solutions. We combine human-centred focus with technical expertise to turn business challenges into opportunities.
          </p>
          
          {/* Stats component - positioned above the button */}
          <div className="w-full md:w-auto md:max-w-[400px] mb-12">
            <div className="p-4 md:p-6 bg-black/30 backdrop-blur rounded-2xl">
              <Stats />
            </div>
          </div>
          
          <div className="flex justify-start mb-8">
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="py-4 px-8 rounded-full border border-white/30 text-white font-light transition-all hover:bg-white/10"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;
