import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Flower2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

/* ── Flower collection cards ──────────── */
const flowerCards = [
  { id: 1, name: 'Orchids',       img: '/images/home/flower_coll_1.png', gradient: 'from-violet-200 via-purple-100 to-fuchsia-100',  emoji: '🌸' },
  { id: 2, name: 'Crochet',       img: '/images/home/flower_coll_2.png', gradient: 'from-yellow-200 via-amber-100 to-orange-100',    emoji: '🌻' },
  { id: 3, name: 'Centerpiece',   img: '/images/home/flower_coll_3.png', gradient: 'from-rose-100 via-pink-100 to-peach-50',         emoji: '💐' },
  { id: 4, name: 'Sunny Blooms',  img: '/images/home/flower_coll_4.png', gradient: 'from-amber-200 via-yellow-100 to-lime-100',      emoji: '🌼' },
  { id: 5, name: 'Dried Flowers', img: '/images/home/flower_coll_5.png', gradient: 'from-orange-100 via-amber-50 to-stone-100',      emoji: '🌾' },
];

const BLUE     = '#d6ecf8';
const CARD_GAP = 20;

export default function FlowersCollection() {
  const { openProductModal } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive breakpoint tracking
  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVisibleCount(2);
      } else if (w < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(5);
      }
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, flowerCards.length - visibleCount);
  const safeCurrentIndex = Math.min(currentIndex, maxIndex);

  const showLeft = safeCurrentIndex > 0;
  const showRight = safeCurrentIndex < maxIndex;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40 && showRight) {
      handleNext();
    } else if (distance < -40 && showLeft) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="bg-[#d6ecf8] py-14 border-b border-sky-100 relative overflow-hidden">
      {/* Floating Petal Particles Background */}
      <div className="absolute top-4 left-10 text-2xl animate-float-slow opacity-50 pointer-events-none select-none">🌸</div>
      <div className="absolute bottom-6 right-20 text-3xl animate-float-slow opacity-40 pointer-events-none select-none" style={{ animationDelay: '2s' }}>💐</div>
      <div className="absolute top-12 right-1/3 text-xl animate-float-slow opacity-50 pointer-events-none select-none" style={{ animationDelay: '1s' }}>✨</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight flex items-center gap-2">
              Flowers Collection
              <Flower2 className="w-6 h-6 text-pink-500 animate-spin-slow" />
            </h2>
            <p className="text-gray-600 text-sm mt-1 font-sans">
              Handpicked floral arrangements for moments that matter ✨
            </p>
          </div>

          <button className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-olive-700 hover:text-olive-800 transition-colors group/header">
            Explore All Flowers
            <ArrowRight className="w-4 h-4 group-hover/header:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Slider Container */}
        <div 
          className="relative group/slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Flowers"
            className={`absolute -left-4 sm:-left-5 top-[40%] -translate-y-1/2 z-20 w-11 h-11 rounded-full
              bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 flex items-center justify-center
              text-gray-700 hover:text-olive-600 hover:border-olive-300 hover:scale-105 transition-all duration-300
              ${showLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Clip track container */}
          <div className="overflow-hidden py-3 px-1 -my-2 -mx-0.5">
            <div
              className="flex transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1)"
              style={{
                gap: `${CARD_GAP}px`,
                willChange: 'transform',
                transform: `translate3d(calc(-${safeCurrentIndex} * (100% / ${visibleCount} + ${CARD_GAP / visibleCount}px)), 0, 0)`,
              }}
            >
              {flowerCards.map((card, idx) => (
                <div
                  key={card.id}
                  className="flex-shrink-0"
                  style={{ 
                    width: `calc((100% - ${(visibleCount - 1) * CARD_GAP}px) / ${visibleCount})`
                  }}
                >
                  <div className="group/flower flex flex-col items-center gap-3 cursor-pointer">
                    
                    {/* Category name */}
                    <p className="text-[15px] font-bold text-gray-800 font-sans text-center w-full group-hover/flower:text-rose-600 transition-colors">
                      {card.name}
                    </p>

                    {/* Image Container Card */}
                    <div
                      className="w-full bg-white rounded-[22px] shadow-sm overflow-hidden border border-gray-200/80
                        group-hover/flower:border-rose-300 group-hover/flower:shadow-xl transition-all duration-300
                        transform group-hover/flower:-translate-y-1 flex items-center justify-center"
                      style={{ aspectRatio: '1 / 1' }}
                    >
                      {card.img ? (
                        <img
                          src={card.img}
                          alt={card.name}
                          loading={idx < 4 ? 'eager' : 'lazy'}
                          decoding="async"
                          width="240"
                          height="240"
                          className="w-full h-full object-cover group-hover/flower:scale-105 transition-transform duration-500 ease-out select-none"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${card.gradient}`}>
                          <span className="text-5xl select-none opacity-60">{card.emoji}</span>
                        </div>
                      )}
                    </div>

                    {/* Order Now Button */}
                    <button
                      onClick={() => openProductModal({ id: card.id, name: `${card.name} Arrangement`, price: 999, img: card.img })}
                      className="w-full flex items-center justify-center gap-1 bg-white border border-gray-200
                        rounded-full py-2.5 text-[13px] font-semibold text-gray-700 font-sans
                        group-hover/flower:bg-olive-600 group-hover/flower:text-white group-hover/flower:border-olive-600
                        transition-all duration-300 shadow-xs"
                    >
                      Order Now
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] group-hover/flower:translate-x-1 transition-transform" />
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Flowers"
            className={`absolute -right-4 sm:-right-5 top-[40%] -translate-y-1/2 z-20 w-11 h-11 rounded-full
              bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 flex items-center justify-center
              text-gray-700 hover:text-olive-600 hover:border-olive-300 hover:scale-105 transition-all duration-300
              ${showRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center items-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  safeCurrentIndex === i ? 'w-6 bg-olive-600' : 'w-2 bg-sky-200 hover:bg-sky-300'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

