import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OccasionGifts() {
  const containerRef = useRef(null);
  const { openProductModal } = useCart();

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
      img: '/images/home/occasion_birthday.png',
      gradient: 'from-amber-100/90 via-rose-100/70 to-orange-100/80',
      subColor: 'text-amber-800'
    },
    {
      id: 2,
      title: 'Send Rakhi Abroad',
      subtitle: 'INTERNATIONAL DISPATCH',
      img: '/images/home/occasion_rakhi_abroad.png',
      gradient: 'from-rose-100/90 via-pink-100/70 to-amber-100/80',
      subColor: 'text-rose-800'
    },
    {
      id: 3,
      title: 'Anniversary',
      subtitle: 'ROMANTIC SURPRISES',
      img: '/images/home/occasion_anniversary.png',
      gradient: 'from-purple-100/90 via-fuchsia-100/70 to-rose-100/80',
      subColor: 'text-purple-800'
    },
    {
      id: 4,
      title: 'Congratulations',
      subtitle: 'CELEBRATION COMBOS',
      img: '/images/home/flower_coll_4.png',
      gradient: 'from-emerald-100/90 via-teal-100/70 to-green-100/80',
      subColor: 'text-emerald-800'
    },
    {
      id: 5,
      title: 'Thank You',
      subtitle: 'GRATITUDE BUNDLES',
      img: '/images/home/flower_coll_2.png',
      gradient: 'from-sky-100/90 via-indigo-100/70 to-blue-100/80',
      subColor: 'text-sky-800'
    },
    {
      id: 6,
      title: 'Baby Shower',
      subtitle: 'NEWBORN HAMPERS',
      img: '/images/home/occasion_babyshower.png',
      gradient: 'from-pink-100/90 via-rose-100/70 to-peach-100/80',
      subColor: 'text-pink-800'
    },
    {
      id: 7,
      title: 'Housewarming',
      subtitle: 'HOME & PLANTS',
      img: '/images/home/occasion_housewarming.png',
      gradient: 'from-amber-100/90 via-orange-100/70 to-yellow-100/80',
      subColor: 'text-amber-800'
    },
    {
      id: 8,
      title: 'Retirement Gifts',
      subtitle: 'HONOR & RESPECT',
      img: '/images/home/flower_coll_5.png',
      gradient: 'from-stone-100/90 via-amber-50 to-stone-200/80',
      subColor: 'text-stone-700'
    }
  ];

  return (
    <div className="bg-white py-14 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 border border-rose-200 text-rose-900 text-xs font-semibold tracking-wide uppercase shadow-xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              Celebrate Every Moment
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
              Gifts For Every Occasion & Milestone
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-sans">
              Thoughtfully curated hampers, flowers & cakes for birthdays, anniversaries & everyday surprises ✨
            </p>
          </div>
        </div>

        {/* Slider Wrapper Container */}
        <div className="relative group">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-olive-600 hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Slider Content Row */}
          <div
            ref={containerRef}
            className="flex items-center gap-5 overflow-x-auto scrollbar-none pb-4 scroll-smooth"
          >
            {occasions.map((item) => (
              <div
                key={item.id}
                onClick={() => openProductModal({ id: item.id, name: `${item.title} Gift Box`, price: 999, img: item.img })}
                className={`bg-gradient-to-br ${item.gradient} w-[280px] h-[160px] rounded-[24px] overflow-hidden flex-shrink-0 relative flex p-5 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/60 group/card`}
              >
                {/* Left Text details */}
                <div className="flex flex-col justify-center w-[58%] text-left h-full pr-2">
                  {item.subtitle && (
                    <span className={`text-[9px] font-black tracking-wider uppercase mb-1.5 ${item.subColor} font-sans`}>
                      {item.subtitle}
                    </span>
                  )}
                  <h3 className="text-base font-extrabold text-gray-900 font-sans flex items-center gap-1 leading-snug group-hover/card:text-olive-750 transition-colors">
                    {item.title}
                    <span className="text-gray-500 font-normal ml-0.5 group-hover/card:translate-x-1 transition-transform">&gt;</span>
                  </h3>
                </div>

                {/* Right Image element */}
                <div className="w-[42%] h-full relative flex items-end justify-end">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[95%] object-cover rounded-2xl shadow-md border border-white/60 group-hover/card:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-olive-600 hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Scroll Right"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

      </div>
    </div>
  );
}
