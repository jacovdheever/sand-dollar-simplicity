
import React from 'react';
import { getAssetPath } from '@/lib/utils';

const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 md:order-1">
            <h2 className="section-title mb-6">Where <span className="gradient-text">design</span> meets purpose</h2>
            <p className="text-gray-600 mb-6">
              At Sand Dollar Design, we believe exceptional digital experiences stem from a deep understanding of both user needs and business objectives.
            </p>
            <p className="text-gray-600 mb-6">
              Our approach merges strategic thinking with beautiful aesthetics to create designs that not only look stunning but deliver measurable results.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div>
                <h3 className="text-3xl font-bold text-coral mb-2">12+</h3>
                <p className="text-gray-600">Years of experience</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-coral mb-2">200+</h3>
                <p className="text-gray-600">Projects completed</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-coral mb-2">98%</h3>
                <p className="text-gray-600">Client satisfaction</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-coral mb-2">8</h3>
                <p className="text-gray-600">Design awards</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 aspect-square rounded-2xl overflow-hidden coral-gradient flex items-center justify-center">
            <div className="p-8">
              <img 
                src={getAssetPath("Sand-Dollar_Logo.png")} 
                alt="Sand Dollar Design" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
