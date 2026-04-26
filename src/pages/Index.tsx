/* TODO: verify robots.txt, generate/submit sitemap.xml, verify Organization schema, verify OG/Twitter metadata, compress homepage images */
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Logos from '@/components/Logos';
import Clients from '@/components/Clients';
import Media from '@/components/Media';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';


const Index = () => {
  useEffect(() => {
    // Add scroll reveal effect
    const sections = document.querySelectorAll('section:not([data-no-reveal])');
    const animatedElements = document.querySelectorAll('.section-animate');
    
    // Helper function to check if element is initially in viewport
    const isInViewport = (element: Element): boolean => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // Helper function to check if element is above the fold (visible on initial load)
    const isAboveFold = (element: Element): boolean => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };
    
    const revealSection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          (entry.target as HTMLElement).style.opacity = '1';
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
      threshold: 0.05, // Lower threshold for mobile
      rootMargin: '50px 0px', // Trigger 50px before element enters viewport
    });

    const animatedObserver = new IntersectionObserver(revealAnimatedElements, {
      root: null,
      threshold: 0.05, // Lower threshold for better mobile experience
      rootMargin: '50px 0px',
    });
    
    sections.forEach(section => {
      // Check if section is initially visible (above fold)
      if (isAboveFold(section)) {
        // Immediately show sections that are above the fold
        (section as HTMLElement).style.opacity = '1';
        section.classList.add('animate-fade-in');
      } else {
        // Hide sections below the fold initially
        (section as HTMLElement).style.opacity = '0';
      }
      sectionObserver.observe(section);
    });

    animatedElements.forEach(element => {
      // If parent section is visible, show animated elements immediately
      const parentSection = element.closest('section');
      if (parentSection && isAboveFold(parentSection)) {
        element.classList.add('in-view');
      }
      animatedObserver.observe(element);
    });

    // Fallback: Show all sections after a short delay if they haven't been revealed
    const fallbackTimeout = setTimeout(() => {
      sections.forEach(section => {
        if ((section as HTMLElement).style.opacity === '0') {
          (section as HTMLElement).style.opacity = '1';
          section.classList.add('animate-fade-in');
        }
      });
    }, 500);
    
    return () => {
      clearTimeout(fallbackTimeout);
      sections.forEach(section => {
        sectionObserver.unobserve(section);
      });
      animatedElements.forEach(element => {
        animatedObserver.unobserve(element);
      });
    };
  }, []);

  const homepageLocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sand Dollar Design',
    description:
      'UX/UI and product design agency delivering UX strategy, product design, and AI-powered development for startups, SMEs and enterprise teams.',
    url: 'https://www.sanddollardesign.com',
    areaServed: ['South Africa', 'United States', 'United Kingdom', 'Europe'],
    serviceType: ['UX Design', 'UI Design', 'Product Design', 'UX Strategy', 'AI Development'],
    priceRange: '$$',
  };

  return (
    <>
      <SEO
        title="UX Design & Product Design Agency | Sand Dollar Design"
        description="Sand Dollar Design is a UX/UI and product design agency helping startups, SMEs and enterprise teams build better digital products. Serving clients in the USA, Europe and South Africa."
        canonical="https://www.sanddollardesign.com/"
        includeStructuredData
        extraJsonLd={[homepageLocalBusinessSchema]}
      />
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
