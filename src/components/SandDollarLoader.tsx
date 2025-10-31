import React from 'react';

interface SandDollarLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
}

const SandDollarLoader: React.FC<SandDollarLoaderProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <div 
          className="w-full h-full animate-spin coral-gradient rounded-full flex items-center justify-center"
          style={{
            animationDuration: '2s',
            animationTimingFunction: 'ease-in-out'
          }}
        >
          <img
            src="/Sand-Dollar-icon.png"
            alt="Sand Dollar Design"
            className="w-3/4 h-3/4 object-contain filter brightness-0 invert"
          />
        </div>
      </div>
      {text && (
        <p className={`mt-3 text-gray-600 ${textSizeClasses[size]} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default SandDollarLoader;
