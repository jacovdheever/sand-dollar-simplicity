import React, { useState } from 'react';
import { Brain, Layout, Rocket, Code } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';
import Work from './Work';

const services = [
  {
    title: "Strategy",
    description: "• Digital transformation\n• Trends analysis and scenario mapping\n• Strategic advisory on experience improvements and opportunities\n• Facilitation and ideation of creative and strategic outcomes\n• Customer Journey Conceptualisation and Execution",
    Icon: Brain
  },
  {
    title: "Research and insights",
    description: "• User research\n(with customers and staff)\n• User testing \n(validation of proposed solutions)\n• Competitor and Market Research\n• Expert reviews \n(Heuristic reviews) & Accessibility Audits",
    Icon: Layout
  },
  {
    title: "Digital Solutions Design",
    description: "• Information Architecture and Task Flow Analysis\n• Service Design / Customer Experience Design\n• User Experience Design\n• User Interface Design & Design Systems\n• Rapid Prototyping of Digital Solutions",
    Icon: Rocket
  },
  {
    title: "Technology implementation",
    description: "• Website and Mobile App Development + AI Driven Development\n• SEO, Analytics\n• Maintenance, Design and \nDev Ops\n• Advisory Services, \nFractional CXO / CDO",
    Icon: Code
  }
];

const clientLogos = [
  { name: "Heineken", image: "Client Logo - heineken.png" },
  { name: "Standard Bank", image: "Client Logo - standard bank.png" },
  { name: "Pathcare", image: "Client Logo - Pathcare.png" },
  { name: "Vodafone", image: "Client Logo - Vodafone.png" },
  { name: "Tradition Bank", image: "Client Logo - Tradition Bank.png" },
  { name: "Mukuru", image: "Client Logo - Mukuru.png" },
  { name: "Toyota", image: "Client Logo - Toyota.png" },
  { name: "North West University", image: "Client Logo - NWU.png" }
];

const serviceWords = [
  "Information Architecture",
  "Business Analysis",
  "UX&UI Design", 
  "Service Design",
  "Brand Design",
  "Visual Design",
  "SEO",
  "Copywriting",
  "Development"
];

const Services = () => {

  return (
    <section id="work" className="pt-8 md:pt-20" style={{backgroundColor: '#f9fafb'}}>
      <div className="container-custom">
        <div className="text-center max-w-6xl mx-auto mb-16 section-animate">
          <h2 className="section-title mb-8 from-left font-black">
            <span className="gradient-text">Our Services.</span>
          </h2>
          <div className="text-gray-600 mb-[3.875rem] from-right">
            <p className="text-[1.25rem]">
              We're a full-service design and innovation firm that solves complex business challenges through Strategy, Digital Transformation, Customer Experience (CX), UX, Business Process Optimization, <br />and Digital Solution Design & Development.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start text-left">
            <div className="text-gray-600 from-right md:pr-[0.875rem]">
              <p>
                Exceptional digital experiences stem from a deep understanding of both user needs and business objectives. Our approach merges strategic thinking with beautiful aesthetics to create solutions that deliver measurable results.
              </p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
              <div className="md:pl-[3.75rem]">
                <p className="text-gray-600 from-right">
                  We deliver exceptional outcomes in Strategy,<br />
                  Research, Service and Product Design, and Solution Development to clients across the globe.
<br />
</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service cards */}
        <div className="container-custom mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 section-animate items-stretch">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`relative text-center flex flex-col ${
                  index % 2 === 0 ? 'from-left' : 'from-right'
                }`}
              >
                {/* Icon positioned to overlap with grey background */}
                <div className="flex justify-center mb-0">
                  <div className="h-20 w-20 rounded-full flex items-center justify-center coral-gradient relative z-10 -mb-10">
                    <service.Icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* White background starting at halfway point of icon */}
                <div className="bg-white border border-gray-100 rounded-2xl pt-16 pb-6 px-6 shadow-lg flex-1 flex flex-col">
                  <h3 className="text-lg font-black mb-3" style={{color: '#19191a'}}>{service.title}</h3>
                  <p className="text-gray-600 text-sm font-normal leading-relaxed whitespace-pre-line text-left w-full">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Work />

      
    </section>
  );
};

export default Services;
