
import React from 'react';
import { Infinity, Check } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center bg-blue-600 rounded-lg shadow-md`}>
        {/* Main infinity icon */}
        <Infinity className="w-3/5 h-3/5 text-white" />
        
        {/* Check mark overlay */}
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
          <Check className="w-3 h-3 text-blue-600" />
        </div>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-gray-900 tracking-tight`}>
            Ace<span className="text-blue-600">Wise</span>
          </span>
          {size === 'lg' && (
            <span className="text-xs text-gray-500 font-medium tracking-wide">
              Smart AI Quizzes for Tech Skills
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
