import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

const DEFAULT_STATS = [
  { id: 1, value: '30+', label: 'Years of Trust' },
  { id: 2, value: '50M+', label: 'Gifts Delivered' },
  { id: 3, value: '100+', label: 'Serving Countries' }
];

export default function TrustStats() {
  const { uniqueStats, loading } = useWebsite();
  const statsList = uniqueStats && uniqueStats.length > 0 ? uniqueStats : DEFAULT_STATS;

  if (loading) {
    return (
      <div className="bg-[#eff3ea] py-12 sm:py-16 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center justify-center animate-pulse gap-3">
                <div className="h-12 w-28 bg-[#dbe5d1] rounded-xl" />
                <div className="h-4 w-36 bg-[#dbe5d1] rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#eff3ea] py-12 sm:py-16 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center items-center">
          {statsList.map((item, idx) => (
            <div key={item.id || idx} className="flex flex-col items-center justify-center">
              {/* Stat Value */}
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans text-[#6b7c45] tracking-tight leading-none">
                {item.value || item.title}
              </span>
              
              {/* Stat Label */}
              <span className="text-sm sm:text-base font-bold font-sans text-[#1e293b] mt-3">
                {item.label || item.description || item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
