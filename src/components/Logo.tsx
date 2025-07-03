
import React from 'react';
import { CircuitBoard, Lightbulb, Check } from 'lucide-react';

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
      <div className={`${sizeClasses[size]} relative flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg`}>
        {/* Circuit pattern background */}
        <div className="absolute inset-0 opacity-20">
          <CircuitBoard className="w-full h-full p-2 text-white" />
        </div>
        
        {/* Main icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Lightbulb className="w-1/2 h-1/2 text-white fill-current" />
          <Check className="w-1/4 h-1/4 text-yellow-300 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
        </div>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-gray-900 tracking-tight`}>
            Ace<span className="text-blue-600">Wise</span>
          </span>
          {size === 'lg' && (
            <span className="text-sm text-gray-500 font-medium tracking-wide">
              Smart IT Quizzes
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
