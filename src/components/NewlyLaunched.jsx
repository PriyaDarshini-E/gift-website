import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Newly Launched Products Data ────────────────────────── */
const products = [
  {
    id: 1,
    name: 'Scarlet Bloom Chocolate Tier Cake',
    price: '₹1,975',
    mrp: '₹2,375',
    badge: '17% OFF',
    badgeType: 'discount',
    img: '/images/home/newLaunched1.png'
  },
  {
    id: 2,
    name: 'House of Orchids',
    price: '₹2,899',
    mrp: '₹3,249',
    badge: '11% OFF',
    badgeType: 'discount',
    img: '/images/home/newLaunched2.png'
  },
  {
    id: 3,
    name: 'Urban Edge Photo Frame',
    price: '₹999',
    mrp: null,
    badge: 'Bee Special',
    badgeType: 'special',
    img: '/images/home/newLaunched3.png'
  },
  {
    id: 4,
    name: 'Personalised Birthday Table Top with Rose',
    price: '₹699',
    mrp: null,
    badge: 'PERSONALISE IT',
    badgeType: 'custom',
    img: '/images/home/newLaunched4.png'
  },
  {
    id: 5,
    name: 'Elara Floral Arrangement',
    price: '₹4,799',
    mrp: '₹5,299',
    badge: 'NEW',
    badgeType: 'new',
    img: '/images/home/newLaunched5.png'
  },
  {
    id: 6,
    name: 'Golden Horizon Plant & Pot',
    price: '₹1,299',
    mrp: '₹1,599',
    badge: '18% OFF',
    badgeType: 'discount',
    img: '/images/home/newLaunched6.png'
  },
  {
    id: 7,
    name: 'Gourmet Artisan Chocolate Box',
    price: '₹899',
    mrp: '₹1,099',
    badge: 'NEW',
    badgeType: 'new',
    img: '/images/home/newLaunched7.png'
  }
];

const CARD_GAP = 20; // px between cards
const VISIBLE  = 5;  // cards visible on desktop

export default function NewlyLaunched() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const maxIndex  = Math.max(products.length - VISIBLE, 0);
  const showLeft  = currentIndex > 0;
  const showRight = currentIndex < maxIndex;

  const measure = useCallback(() => {
    if (containerRef.current) {
      const totalGap = CARD_GAP * (VISIBLE - 1);
      setCardWidth((containerRef.current.clientWidth - totalGap) / VISIBLE);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const handlePrev = () => { if (showLeft)  setCurrentIndex(i => i - 1); };
  const handleNext = () => { if (showRight) setCurrentIndex(i => i + 1); };
  const translateX  = currentIndex * (cardWidth + CARD_GAP);

  return (
    <div className="bg-[#f0f4f9] py-10 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 mb-6">
          Newly Launched
        </h2>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>

          {/* ← Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className={`absolute -left-5 top-[42%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-md border border-gray-200 flex items-center justify-center
              text-gray-600 hover:text-gray-900 transition-all duration-200
              ${showLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Track Container */}
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                gap: `${CARD_GAP}px`,
                transform: cardWidth ? `translateX(-${translateX}px)` : 'none',
                transition: 'transform 420ms ease-in-out',
              }}
            >
              {products.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 cursor-pointer group"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/* White Card Container */}
                  <div className="bg-white rounded-[16px] overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-200 flex flex-col">
                    
                    {/* Square Image Container */}
                    <div className="w-full aspect-square bg-gray-50 flex items-center justify-center relative overflow-hidden">
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 select-none"
                        />
                      ) : (
                        <span className="text-5xl sm:text-6xl select-none filter drop-shadow-md group-hover:scale-110 transition-transform duration-200">
                          {item.emoji}
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-3 sm:p-4 flex flex-col justify-between min-h-[90px]">
                      {/* Product Name */}
                      <p className="text-[12px] sm:text-[13px] font-semibold text-gray-800 font-sans line-clamp-1 group-hover:text-gray-900">
                        {item.name}
                      </p>

                      {/* Price & Badge Row */}
                      <div className="mt-2 flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[13px] sm:text-[14px] font-bold text-gray-900 font-sans">
                            {item.price}
                          </span>
                          {item.mrp && (
                            <span className="text-[11px] text-gray-400 line-through font-sans">
                              {item.mrp}
                            </span>
                          )}
                        </div>

                        {/* Badge Tag */}
                        {item.badge && (
                          <div className="mt-0.5">
                            {item.badgeType === 'discount' && (
                              <span className="text-[10px] font-bold text-emerald-600 font-sans">
                                {item.badge}
                              </span>
                            )}
                            {item.badgeType === 'special' && (
                              <span className="inline-block bg-pink-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm font-sans uppercase">
                                {item.badge}
                              </span>
                            )}
                            {item.badgeType === 'custom' && (
                              <span className="inline-block bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm font-sans uppercase">
                                {item.badge}
                              </span>
                            )}
                            {item.badgeType === 'new' && (
                              <span className="text-[10px] font-bold text-purple-600 font-sans uppercase">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* → Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next"
            className={`absolute -right-5 top-[42%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-md border border-gray-200 flex items-center justify-center
              text-gray-600 hover:text-gray-900 transition-all duration-200
              ${showRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

        {/* View All Launches Button */}
        <div className="flex justify-center mt-8">
          <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-6 py-2 hover:bg-gray-50 transition-colors duration-200 font-sans shadow-sm">
            View All Launches
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}
