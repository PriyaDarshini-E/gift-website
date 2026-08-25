import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OccasionGifts() {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 320;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const occasions = [
    {
      id: 1,
      title: 'Birthday',
      subtitle: 'PERSONALISED GIFTS',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      bgColor: 'bg-[#f5e2cc]',
      subColor: 'text-[#aa6e2b]'
    },
    {
      id: 2,
      title: 'Send Rakhi Abroad',
      badge: '28TH AUG',
      img: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=250',
      bgColor: 'bg-[#fca881]'
    },
    {
      id: 3,
      title: 'Anniversary',
      img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=250',
      bgColor: 'bg-[#f0df81]'
    },
    {
      id: 4,
      title: 'Congratulations',
      img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=250',
      bgColor: 'bg-[#a3c3e2]'
    },
    {
      id: 5,
      title: 'Thank You',
      img: 'https://images.unsplash.com/photo-1590005354167-6da97870c913?auto=format&fit=crop&q=80&w=250',
      bgColor: 'bg-[#d5c7f0]'
    },
    {
      id: 6,
      title: 'Baby Shower',
      img: 'https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&q=80&w=250',
      bgColor: 'bg-[#bae9cf]'
    },
    {
      id: 7,
      title: 'Housewarming',
      img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=250',
      bgColor: 'bg-[#ebd38c]'
    },
    {
      id: 8,
      title: 'Retirement Gifts',
      img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=250',
      bgColor: 'bg-[#e9aaa1]'
    }
  ];

  return (
    <div className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-left mb-6">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
            Gifts For Every Occasion
          </h2>
        </div>

        {/* Slider Wrapper Container */}
        <div className="relative group">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-olive-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
            title="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Slider Content Row */}
          <div
            ref={containerRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-none pb-4 scroll-smooth"
          >
            {occasions.map((item) => (
              <div
                key={item.id}
                className={`${item.bgColor} w-[280px] h-[160px] rounded-[24px] overflow-hidden flex-shrink-0 relative flex p-5 cursor-pointer hover:shadow-md transition-all duration-300`}
              >
                {/* Badge Overlay */}
                {item.badge && (
                  <span className="absolute top-3.5 right-3.5 bg-white text-gray-800 text-[8px] font-black px-2 py-0.5 rounded border border-gray-100 shadow-sm font-sans tracking-wide">
                    {item.badge}
                  </span>
                )}

                {/* Left Text details */}
                <div className="flex flex-col justify-center w-[58%] text-left h-full pr-2">
                  {item.subtitle && (
                    <span className={`text-[9px] font-black tracking-wider uppercase mb-1.5 ${item.subColor || 'text-gray-500'} font-sans`}>
                      {item.subtitle}
                    </span>
                  )}
                  <h3 className="text-base font-extrabold text-gray-900 font-sans flex items-center gap-1 leading-snug">
                    {item.title}
                    <span className="text-gray-400 font-normal ml-0.5">&gt;</span>
                  </h3>
                </div>

                {/* Right Image element */}
                <div className="w-[42%] h-full relative flex items-end justify-end">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[95%] object-cover rounded-xl shadow-sm border border-white/40"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-olive-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
            title="Scroll Right"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

      </div>
    </div>
  );
}
