import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function CategoryNav() {
  const categories = [
    'Rakhi',
    'Global',
    'Birthday',
    'Occasions',
    'Anniversary',
    'Flowers',
    'Cakes',
    'Personalised',
    'Plants',
    'Chocolates',
    'Lifestyle',
    'Hatke',
    'LUXE',
    'Hampers'
  ];

  return (
    <div className="hidden lg:block border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between overflow-x-auto py-3.5 gap-2 scrollbar-none text-[13px] text-gray-700">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-0.5 cursor-pointer hover:text-olive-600 transition-colors whitespace-nowrap group py-0.5">
              <span className="group-hover:text-olive-600 font-semibold tracking-wide font-sans">{cat}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-olive-500 transition-colors" />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
