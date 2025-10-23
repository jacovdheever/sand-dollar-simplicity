import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Logos from '@/components/Logos';
import Clients from '@/components/Clients';
import Media from '@/components/Media';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const serviceWords = [
  "Information Architecture",
  "UX Design", 
  "UI Design",
  "Brand Design",
  "Visual Design",
  "SEO",
  "Copywriting",
  "Development"
];

const Index = () => {
  useEffect(() => {
    // Add scroll reveal effect
    const sections = document.querySelectorAll('section:not([data-no-reveal])');
    const animatedElements = document.querySelectorAll('.section-animate');
    
    const revealSection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const revealAnimatedElements = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    const animatedObserver = new IntersectionObserver(revealAnimatedElements, {
      root: null,
      threshold: 0.1, // Reduced from 0.7 to 0.1 for better mobile experience
    });
    
    sections.forEach(section => {
      section.style.opacity = '0';
      sectionObserver.observe(section);
    });

    animatedElements.forEach(element => {
      animatedObserver.observe(element);
    });
    
    return () => {
      sections.forEach(section => {
        sectionObserver.unobserve(section);
      });
      animatedElements.forEach(element => {
        animatedObserver.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <div className="smooth-scroll flex flex-col min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Logos />
          <Clients />
          <Media />
        </main>
        <div className="mt-auto">
          <Contact />
          <Footer />
        </div>
      </div>
      
      {/* Service words carousel - positioned at bottom of screen */}
      <div className="overflow-hidden bg-black">
        <div className="flex items-center justify-center">
          <div className="clients-marquee-no-hover">
            <div className="clients-marquee-track-no-hover">
              {[...serviceWords, ...serviceWords].map((word, index) => (
                <div key={`service-words-${index}`} className="p-0">
                  <div className="h-[60px] md:h-[70px] lg:h-[80px] flex items-center justify-center">
                    <span className="text-[3.55rem] md:text-[4.19rem] lg:text-[4.83rem] font-black whitespace-nowrap mr-6 uppercase text-white">
                      {word}
                    </span>
                    <div className="ml-6 flex items-center justify-center">
                      <img 
                        src="/Sand-Dollar-icon.png" 
                        alt="Sand Dollar Design Icon - Service separator" 
                        className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default Index;
