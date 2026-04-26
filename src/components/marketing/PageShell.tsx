import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import BackToTop from '@/components/BackToTop';

interface PageShellProps {
  children: React.ReactNode;
  showContact?: boolean;
}

const PageShell: React.FC<PageShellProps> = ({ children, showContact = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <div className="mt-auto">
        {showContact ? <Contact /> : null}
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default PageShell;
