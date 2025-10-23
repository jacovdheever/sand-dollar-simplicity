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
      
      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default Index;
