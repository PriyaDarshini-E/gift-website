import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

/* ── Plants Categories Data ──────────────────────────────── */
const plantCategories = [
  { id: 1, name: 'Indoor Plants', img: '/images/home/indoorplants.png', gradient: 'from-[#dcfce7] via-[#bbf7d0] to-[#86efac]', emoji: '🪴' },
  { id: 2, name: 'Money Plants', img: '/images/home/moneyplants.png', gradient: 'from-[#ecfdf5] via-[#a7f3d0] to-[#6ee7b7]', emoji: '🌿' },
  { id: 3, name: 'Lucky Bamboo', img: '/images/home/luckyplants.png', gradient: 'from-[#f0fdf4] via-[#bbf7d0] to-[#4ade80]', emoji: '🎍' },
  { id: 4, name: 'Peace Lily', img: '/images/home/peacelilyplants.png', gradient: 'from-[#f0fdfa] via-[#ccfbf1] to-[#5eead4]', emoji: '🌱' },
  { id: 5, name: 'All Plants', img: '/images/home/allplants.png', gradient: 'from-[#fef3c7] via-[#fde68a] to-[#f59e0b]', emoji: '🍃' },
  { id: 6, name: 'Succulents', img: '/images/home/occasion_housewarming.png', gradient: 'from-[#d1fae5] via-[#6ee7b7] to-[#10b981]', emoji: '🌵' },
  { id: 7, name: 'Air Purifying Plants', img: '/images/home/indoorplants.png', gradient: 'from-[#e0e7ff] via-[#c7d2fe] to-[#818cf8]', emoji: '🌴' },
  { id: 8, name: 'Bonsai Plants', img: '/images/home/flower_coll_5.png', gradient: 'from-[#fef3c7] via-[#fcd34d] to-[#d97706]', emoji: '🌾' },
];

const CARD_GAP = 20; // px between cards
const VISIBLE = 5;  // cards visible on desktop

export default function PlantsForEveryVibe() {
  const { openProductModal } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef(null);

  const maxIndex = Math.max(plantCategories.length - VISIBLE, 0);
  const showLeft = currentIndex > 0;
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

  const handlePrev = () => { if (showLeft) setCurrentIndex(i => i - 1); };
  const handleNext = () => { if (showRight) setCurrentIndex(i => i + 1); };
  const translateX = currentIndex * (cardWidth + CARD_GAP);

  return (
    <div className="bg-[#faf8f5] py-10 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 mb-6">
          Plants for Every Vibe
        </h2>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>

          {/* ← Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className={`absolute -left-5 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
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
              {plantCategories.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openProductModal({ id: item.id, name: item.name, price: 899, img: item.img || '/images/home/indoorplants.png' })}
                  className="flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/* Portrait Card */}
                  <div
                    className={`w-full overflow-hidden rounded-[18px] bg-gradient-to-br ${item.gradient}
                      shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-200
                      flex items-center justify-center relative`}
                    style={{ aspectRatio: '4/5' }}
                  >
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 select-none"
                      />
                    ) : (
                      <>
                        {/* Subtle hover overlay */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                        {/* Plant Emoji Placeholder */}
                        <span className="text-5xl sm:text-6xl select-none filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                          {item.emoji}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Plant Name Label */}
                  <p className="text-[14px] font-semibold text-gray-800 font-sans text-center group-hover:text-gray-900">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* → Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next"
            className={`absolute -right-5 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
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
