import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';

// Only include the active catalog categories + Same Day delivery
const ACTIVE_CATEGORIES = [
  {
    id: 'same-day',
    name: 'Same Day',
    slug: 'same-day',
    image: '/images/home/image2.png',
    bgGradient: 'from-amber-50 to-amber-100/60',
    borderColor: 'border-amber-300/80 group-hover:border-amber-400 group-hover:shadow-amber-100',
    textColor: 'group-hover:text-amber-700',
  },
  {
    id: 'flowers',
    name: 'Flowers',
    slug: 'flowers',
    image: '/images/home/image3.png',
    bgGradient: 'from-rose-50 to-rose-100/60',
    borderColor: 'border-rose-300/80 group-hover:border-rose-400 group-hover:shadow-rose-100',
    textColor: 'group-hover:text-rose-700',
  },
  {
    id: 'cakes',
    name: 'Cakes',
    slug: 'cakes',
    image: '/images/home/image4.png',
    bgGradient: 'from-orange-50 to-orange-100/60',
    borderColor: 'border-orange-300/80 group-hover:border-orange-400 group-hover:shadow-orange-100',
    textColor: 'group-hover:text-orange-700',
  },
  {
    id: 'frames',
    name: 'Frames',
    slug: 'frames',
    image: '/images/home/image5.png',
    bgGradient: 'from-purple-50 to-purple-100/60',
    borderColor: 'border-purple-300/80 group-hover:border-purple-400 group-hover:shadow-purple-100',
    textColor: 'group-hover:text-purple-700',
  },
  {
    id: 'chocolates',
    name: 'Chocolates',
    slug: 'chocolates',
    image: '/images/home/image7.png',
    bgGradient: 'from-rose-50 to-pink-100/60',
    borderColor: 'border-rose-300/80 group-hover:border-rose-400 group-hover:shadow-rose-100',
    textColor: 'group-hover:text-rose-700',
  },
];

export default function CategoryStrip() {
  const { topCategories } = useCategories();

  // If CRM categories exist, map active top category slugs dynamically (while preserving same-day)
  const displayItems = ACTIVE_CATEGORIES.map((item) => {
    if (item.id === 'same-day') {
      return item;
    }

    const matchedTop = (topCategories || []).find((c) => {
      const name = (c.name || '').toLowerCase();
      const slug = (c.slug || '').toLowerCase();
      return name.includes(item.name.toLowerCase()) || slug.includes(item.slug.toLowerCase());
    });

    return {
      ...item,
      slug: matchedTop?.slug || item.slug,
      name: matchedTop?.name || item.name,
    };
  });

  return (
    <div className="bg-white py-5 sm:py-7 border-b border-gray-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center overflow-x-auto gap-6 sm:gap-10 md:gap-14 lg:gap-16 justify-center scrollbar-none pb-2 pt-1">
          {displayItems.map((item) => (
            <Link
              to={`/category/${item.slug}`}
              key={item.id}
              className="flex flex-col items-center text-center group cursor-pointer flex-shrink-0 transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Circular 3D Icon Card with Pastel Glow Ring */}
              <div
                className={`w-[72px] h-[72px] sm:w-[82px] sm:h-[82px] lg:w-[90px] lg:h-[90px] rounded-full bg-gradient-to-b ${item.bgGradient} border-2 ${item.borderColor} p-2.5 flex items-center justify-center shadow-xs group-hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-contain filter group-hover:scale-110 group-hover:drop-shadow-sm transition-transform duration-300 select-none"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Label Underneath */}
              <span
                className={`text-[12px] sm:text-[13px] font-bold text-gray-800 mt-2.5 font-sans tracking-tight transition-colors duration-200 line-clamp-1 max-w-[90px] ${item.textColor}`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

