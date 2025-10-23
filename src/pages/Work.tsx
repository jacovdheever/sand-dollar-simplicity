import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import WorkPageContent from '@/components/WorkPageContent';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import SEO from '@/components/SEO';


const WorkPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
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
      <SEO
        title="Our Work - Portfolio of UX/UI Design & AI Development Projects"
        description="Explore our portfolio of successful UX/UI design and AI development projects. See how we've helped businesses across various industries with digital transformation, rapid prototyping, and innovation consulting."
        keywords="portfolio, UX design projects, UI design projects, AI development projects, digital transformation, rapid prototyping, case studies, design agency portfolio, South Africa, USA"
        url="https://sanddollardesign.co.za/work"
        type="website"
      />
      <div className="smooth-scroll flex flex-col min-h-screen">
        <Navbar />
        <main>
          <WorkPageContent />
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

export default WorkPage;
