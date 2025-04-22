
import React from 'react';

// Method 1: Using SVG directly in JSX
const InlineSvg = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className="text-blue-600"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

// Method 2: Using Lucide icons (already installed)
import { Star, Heart, Sun } from 'lucide-react';

const SvgExample = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Different ways to use SVGs in React</h2>
        
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center gap-2">
            <InlineSvg />
            <span className="text-sm">Inline SVG</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Star className="text-yellow-500" />
            <span className="text-sm">Lucide Icon</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Heart className="text-red-500" />
            <span className="text-sm">Another Icon</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Sun className="text-orange-500" />
            <span className="text-sm">Third Icon</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          Note: You can also import SVG files directly in React+Vite, but it requires 
          setting up proper Vite configurations. The easiest approach is to use inline SVGs 
          or the Lucide icon library that's already installed.
        </p>
      </div>
    </div>
  );
};

export default SvgExample;
