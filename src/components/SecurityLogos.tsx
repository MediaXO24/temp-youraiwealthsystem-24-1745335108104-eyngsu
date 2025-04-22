
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const SecurityLogos = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mt-6 py-4 border-t border-slate-700">
      <div className="flex flex-col items-center text-gray-400 hover:text-gray-300 transition-colors">
        <ShieldCheck className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">SECURE</span>
      </div>
      
      <div className="flex flex-col items-center text-gray-400 hover:text-gray-300 transition-colors">
        <div className="w-16 text-center mb-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6 2.25v4.7z"/>
          </svg>
        </div>
        <span className="text-xs font-medium">VERIFIED</span>
      </div>
      
      <div className="flex flex-col items-center text-gray-400 hover:text-gray-300 transition-colors">
        <div className="w-16 text-center mb-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.96-7 10.12c-3.87-1.16-7-5.45-7-10.12V6.3l7-3.12z"/>
          </svg>
        </div>
        <span className="text-xs font-medium">PROTECTED</span>
      </div>
      
      <div className="flex flex-col items-center text-gray-400 hover:text-gray-300 transition-colors">
        <div className="w-16 text-center mb-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6 2.25v4.7zm-6 1.66c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"/>
          </svg>
        </div>
        <span className="text-xs font-medium">SSL SECURE</span>
      </div>
      
      <div className="flex flex-col items-center text-gray-400 hover:text-gray-300 transition-colors">
        <div className="w-16 text-center mb-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1c1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
        <span className="text-xs font-medium">TRUSTED</span>
      </div>
    </div>
  );
};

export default SecurityLogos;
