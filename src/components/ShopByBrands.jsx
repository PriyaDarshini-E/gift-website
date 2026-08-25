import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Brands Data ─────────────────────────────────────────── */
const brands = [
  {
    id: 1,
    name: 'Cadbury',
    logoType: 'cadbury',
    accentColor: 'bg-[#3d2375]', // Cadbury Purple
  },
  {
    id: 2,
    name: 'nuyug',
    logoType: 'nuyug',
    accentColor: 'bg-[#8c2323]', // Burgundy
  },
  {
    id: 3,
    name: 'CARLTON LONDON',
    logoType: 'carlton',
    accentColor: 'bg-[#111111]', // Black
  },
  {
    id: 4,
    name: 'Ritualistic',
    logoType: 'ritualistic',
    accentColor: 'bg-[#612626]', // Dark Brown
  },
  {
    id: 5,
    name: 'Ferrero Rocher',
    logoType: 'ferrero',
    accentColor: 'bg-[#b8860b]', // Gold
  },
  {
    id: 6,
    name: 'Lindt',
    logoType: 'lindt',
    accentColor: 'bg-[#002366]', // Navy Blue
  }
];

const CARD_GAP = 20; // px between cards
const VISIBLE  = 4;  // cards visible on desktop

export default function ShopByBrands() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const maxIndex  = Math.max(brands.length - VISIBLE, 0);
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
    <div className="bg-white py-10 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 mb-6">
          Shop by Brands
        </h2>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>

          {/* ← Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className={`absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-md border border-gray-200 flex items-center justify-center
              text-gray-600 hover:text-gray-900 transition-all duration-200
              ${showLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Track Container */}
          <div className="overflow-hidden py-2">
            <div
              className="flex"
              style={{
                gap: `${CARD_GAP}px`,
                transform: cardWidth ? `translateX(-${translateX}px)` : 'none',
                transition: 'transform 420ms ease-in-out',
              }}
            >
              {brands.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 cursor-pointer group select-none"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/* Brand Card Container */}
                  <div
                    className="w-full bg-[#f2f2f2] rounded-[18px] overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between"
                    style={{ aspectRatio: '16/10' }}
                  >
                    {/* Brand Logo Center Area */}
                    <div className="flex-1 flex items-center justify-center p-6 text-center">
                      {item.logoType === 'cadbury' && (
                        <span className="font-serif italic font-extrabold text-3xl sm:text-4xl text-[#3d2375] tracking-tight">
                          Cadbury
                        </span>
                      )}

                      {item.logoType === 'nuyug' && (
                        <span className="font-serif font-bold text-3xl sm:text-4xl text-[#1e1e1e] tracking-tight">
                          nuyug
                        </span>
                      )}

                      {item.logoType === 'carlton' && (
                        <div className="flex flex-col items-center">
                          <span className="font-serif font-black text-xl sm:text-2xl text-[#111111] tracking-wider uppercase leading-none">
                            CARLTON
                          </span>
                          <span className="font-serif text-[11px] sm:text-[12px] text-[#111111] tracking-[0.25em] uppercase mt-1">
                            LONDON
                          </span>
                        </div>
                      )}

                      {item.logoType === 'ritualistic' && (
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col items-center text-[#1e1e1e]">
                            <span className="text-xl">🕯️</span>
                          </div>
                          <span className="font-serif italic font-bold text-xl sm:text-2xl text-[#1e1e1e] tracking-tight">
                            Ritualistic
                          </span>
                        </div>
                      )}

                      {item.logoType === 'ferrero' && (
                        <div className="flex flex-col items-center">
                          <span className="font-serif font-bold text-lg sm:text-xl text-[#855812] tracking-wider uppercase">
                            FERRERO ROCHER
                          </span>
                        </div>
                      )}

                      {item.logoType === 'lindt' && (
                        <span className="font-serif italic font-black text-2xl sm:text-3xl text-[#002366] tracking-tight">
                          Lindt
                        </span>
                      )}
                    </div>

                    {/* Bottom Colored Brand Accent Bar */}
                    <div className={`w-full h-4 sm:h-5 ${item.accentColor}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* → Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next"
            className={`absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-md border border-gray-200 flex items-center justify-center
              text-gray-600 hover:text-gray-900 transition-all duration-200
              ${showRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

      </div>
    </div>
  );
}
