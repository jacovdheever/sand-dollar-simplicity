
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const Stats = () => {
  const [visible, setVisible] = useState([false, false, false]);

  useEffect(() => {
    // Stagger the animations with delays
    const timeouts = [
      setTimeout(() => setVisible([true, false, false]), 500),
      setTimeout(() => setVisible([true, true, false]), 1000),
      setTimeout(() => setVisible([true, true, true]), 1500)
    ];

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
      {[
        { value: '80+', label: 'Projects completed' },
        { value: '2017', label: 'Year Founded' },
        {
          value: (
            <div className="flex gap-1 justify-center sm:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          ),
          label: 'Average client rating'
        }
      ].map((stat, index) => (
        <div
          key={index}
          className={`text-white transition-all duration-500 transform flex-1 text-center sm:text-left flex flex-col justify-start ${
            visible[index]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-2xl sm:text-3xl font-bold mb-1 min-h-[2.5rem] sm:min-h-[3rem] flex items-end justify-center sm:justify-start">
            {stat.value}
          </div>
          <div className="text-xs sm:text-sm text-white/80 leading-tight">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
