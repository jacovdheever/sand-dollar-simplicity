
import React from 'react';

const ClientsMarquee = () => {
  return (
    <div className="py-16 bg-white overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        <div className="animate-marquee flex items-center space-x-16 mx-8">
          {Array(2).fill(0).map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-4xl font-light text-gray-300">Heineken</span>
              <span className="text-4xl font-light text-gray-300">Standard Bank</span>
              <span className="text-4xl font-light text-gray-300">Absa</span>
              <span className="text-4xl font-light text-gray-300">Vodafone</span>
              <span className="text-4xl font-light text-gray-300">Tradition Capital Bank</span>
              <span className="text-4xl font-light text-gray-300">MPact Recycling</span>
              <span className="text-4xl font-light text-gray-300">Toyota</span>
              <span className="text-4xl font-light text-gray-300">North West University</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsMarquee;
