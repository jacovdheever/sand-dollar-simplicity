import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ContactModal from './ContactModal';
import { getAssetPath } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the work, blog, article, or project page
  const isWorkPage = location.pathname === '/work';
  const isBlogPage = location.pathname === '/blog';
  const isArticlePage = location.pathname.startsWith('/article/');
  const isProjectPage = location.pathname.startsWith('/project/');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu when navigating
    }
  };

  const handleNavigation = (sectionId: string) => {
    if ((isWorkPage || isBlogPage || isArticlePage || isProjectPage) && sectionId !== 'work-portfolio') {
      // If we're on the work, blog, article, or project page and it's not the work section, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    } else {
      // Otherwise, scroll to the section normally
      scrollToSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full", 
        scrolled || isWorkPage || isBlogPage || isArticlePage || isProjectPage
          ? "bg-black/90 backdrop-blur-md shadow-md py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom h-auto flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="/" 
            className="transition-opacity duration-200 hover:opacity-80"
            onClick={(e) => {
              e.preventDefault();
              if (isWorkPage || isBlogPage || isArticlePage || isProjectPage) {
                window.location.href = '/';
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img 
              src={getAssetPath("Sand-Dollar-icon.png")}
              alt="Sand Dollar Design Logo" 
              className="h-10 md:h-12"
            />
          </a>
        </div>
        {/* CTA Button and Burger Menu */}
        <div className="flex items-center space-x-4">
          {/* Get in touch CTA - always visible */}
          <button 
            onClick={() => handleNavigation('contact')}
            className="btn-primary py-2 px-4 text-sm font-bold"
          >
            Get in touch
          </button>
          
          {/* Animated Burger Menu Button with relative positioning */}
          <div className="relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
            
            {/* Animated Menu Dropdown - positioned relative to burger button - Desktop only */}
            {isMobileMenuOpen && (
              <div className="hidden md:block bg-black/90 backdrop-blur-md border border-white/10 rounded-lg animate-in slide-in-from-top-2 duration-300 absolute right-0 top-full w-[200px] mt-1">
                <div className="py-4 px-4">
                  <div className="flex flex-col space-y-3">
                    <button 
                      onClick={() => handleNavigation('home')}
                      className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-2 px-2 rounded-lg hover:bg-white/5 text-center"
                    >
                      Home
                    </button>
                    <Link 
                      to="/work"
                      className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-2 px-2 rounded-lg hover:bg-white/5 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Work
                    </Link>
                    <Link
                      to="/blog"
                      className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-2 px-2 rounded-lg hover:bg-white/5 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Blog
                    </Link>
                    <button 
                      onClick={() => handleNavigation('testimonials')}
                      className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-2 px-2 rounded-lg hover:bg-white/5 text-center"
                    >
                      Testimonials
                    </button>
                    <button 
                      onClick={() => handleNavigation('contact')}
                      className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-2 px-2 rounded-lg hover:bg-white/5 text-center"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown - only for mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 animate-in slide-in-from-top-2 duration-300">
          <div className="container-custom py-6">
            <div className="flex flex-col space-y-6">
              <button 
                onClick={() => handleNavigation('home')}
                className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Home
              </button>
              <Link 
                to="/work"
                className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-3 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Work
              </Link>
              <Link
                to="/blog"
                className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-3 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Blog
              </Link>
              <button 
                onClick={() => handleNavigation('testimonials')}
                className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Testimonials
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-white hover:text-gray-300 transition-all duration-200 font-bold text-left py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
