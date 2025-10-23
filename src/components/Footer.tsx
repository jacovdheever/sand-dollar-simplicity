import React, { useEffect } from 'react';
import { Building2, Mail, Phone, Linkedin, Facebook, Instagram } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

const Footer = () => {
  useEffect(() => {
    // Initialize Clutch widget script
    const script = document.createElement('script');
    script.src = 'https://widget.clutch.co/static/js/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-black text-white py-16 md:py-20">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img 
              src={getAssetPath("Sand-Dollar-icon.png")}
              alt="Sand Dollar Design Logo" 
              className="h-10 mb-6"
            />
            <p className="text-gray-400 leading-relaxed mb-6">
              Serving forward-thinking businesses in USA, Europe and South Africa with UX Design, AI solutions and rapid prototyping.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/company/sand-dollar-design/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://www.facebook.com/sanddollarxd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://www.instagram.com/sanddollar.design/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://x.com/sanddollarxd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-400" size={20} />
                <a href="mailto:info@sanddollardesign.co.za" className="text-gray-400 hover:text-white transition-colors">
                  info@sanddollardesign.co.za
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="text-gray-400" size={20} />
                  <span className="text-gray-400">Pretoria, South Africa</span>
                </div>
                <div className="flex items-center gap-3 ml-8">
                  <Phone className="text-gray-400" size={20} />
                  <a href="tel:+27121411688" className="text-gray-400 hover:text-white transition-colors">
                    +27 1214 11688
                  </a>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="text-gray-400" size={20} />
                  <span className="text-gray-400">Delaware, United States of America</span>
                </div>
                <div className="flex items-center gap-3 ml-8">
                  <Phone className="text-gray-400" size={20} />
                  <a href="tel:+17866363972" className="text-gray-400 hover:text-white transition-colors">
                    +17 8663 63972
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Sand Dollar Design. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
