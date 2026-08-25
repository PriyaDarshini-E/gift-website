import React from 'react';

/* ── Trust Statistics Data ───────────────────────────────── */
const stats = [
  {
    id: 1,
    value: '30+',
    label: 'Years of Trust'
  },
  {
    id: 2,
    value: '50M+',
    label: 'Gifts Delivered'
  },
  {
    id: 3,
    value: '100+',
    label: 'Serving Countries'
  }
];

export default function TrustStats() {
  return (
    <div className="bg-[#eff3ea] py-12 sm:py-16 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center items-center">
          {stats.map((item) => (
            <div key={item.id} className="flex flex-col items-center justify-center">
              {/* Stat Value */}
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans text-[#6b7c45] tracking-tight leading-none">
                {item.value}
              </span>
              
              {/* Stat Label */}
              <span className="text-sm sm:text-base font-bold font-sans text-[#1e293b] mt-3">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
