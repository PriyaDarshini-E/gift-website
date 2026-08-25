import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Scallop / arch wave border ──────────────────────────── */
function ScallopBorder({ bgColor = '#d6ecf8', archColor = '#ffffff', flip = false }) {
  const arcCount = 36;
  const arcWidth = 1440 / arcCount;
  const pathD = Array.from({ length: arcCount }, (_, i) => {
    const x1 = i * arcWidth;
    const x2 = x1 + arcWidth;
    const cx  = x1 + arcWidth / 2;
    return `M${x1},0 Q${cx},${arcWidth * 1.1} ${x2},0`;
  }).join(' ');

  return (
    <div style={{ backgroundColor: bgColor, lineHeight: 0 }} className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 1440 ${arcWidth * 1.1}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: '44px', transform: flip ? 'scaleY(-1)' : 'none', display: 'block' }}
      >
        <path d={pathD} fill={archColor} />
      </svg>
    </div>
  );
}

/* ── Flower collection cards with cropped images ──────────── */
const flowerCards = [
  { id: 1, name: 'Orchids',       img: '/images/home/flower_coll_1.png', gradient: 'from-violet-200 via-purple-100 to-fuchsia-100',  emoji: '🌸' },
  { id: 2, name: 'Crochet',       img: '/images/home/flower_coll_2.png', gradient: 'from-yellow-200 via-amber-100 to-orange-100',    emoji: '🌻' },
  { id: 3, name: 'Centerpiece',   img: '/images/home/flower_coll_3.png', gradient: 'from-rose-100 via-pink-100 to-peach-50',         emoji: '💐' },
  { id: 4, name: 'Sunny Blooms',  img: '/images/home/flower_coll_4.png', gradient: 'from-amber-200 via-yellow-100 to-lime-100',      emoji: '🌼' },
  { id: 5, name: 'Dried Flowers', img: '/images/home/flower_coll_5.png', gradient: 'from-orange-100 via-amber-50 to-stone-100',      emoji: '🌾' },
];

const BLUE     = '#d6ecf8';
const CARD_GAP = 20;
const VISIBLE  = 5;

export default function FlowersCollection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const maxIndex  = Math.max(flowerCards.length - VISIBLE, 0);
  const showLeft  = currentIndex > 0;
  const showRight = currentIndex < maxIndex;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const totalGap = CARD_GAP * (VISIBLE - 1);
        setCardWidth((containerRef.current.clientWidth - totalGap) / VISIBLE);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handlePrev = () => { if (showLeft)  setCurrentIndex(i => i - 1); };
  const handleNext = () => { if (showRight) setCurrentIndex(i => i + 1); };
  const translateX  = currentIndex * (cardWidth + CARD_GAP);

  return (
    <div>
  
      {/* Blue content area */}
      <div style={{ backgroundColor: BLUE }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 mb-6">
            Flowers Collection
          </h2>

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

            <div className="overflow-hidden">
              <div
                className="flex"
                style={{
                  gap: `${CARD_GAP}px`,
                  transform: cardWidth ? `translateX(-${translateX}px)` : 'none',
                  transition: 'transform 420ms ease-in-out',
                }}
              >
                {flowerCards.map(card => (
                  <div
                    key={card.id}
                    className="flex-shrink-0 flex flex-col items-center gap-3"
                    style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                  >
                    {/* Category name */}
                    <p className="text-[15px] font-semibold text-gray-800 font-sans text-center w-full">
                      {card.name}
                    </p>

                    {/* White card with image */}
                    <div
                      className="w-full bg-white rounded-[18px] shadow-sm overflow-hidden cursor-pointer
                        hover:shadow-md transition-all duration-200 flex items-center justify-center"
                      style={{ aspectRatio: '1 / 1' }}
                    >
                      {card.img ? (
                        <img
                          src={card.img}
                          alt={card.name}
                          className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-300 select-none"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${card.gradient}`}>
                          <span className="text-5xl select-none opacity-60">{card.emoji}</span>
                        </div>
                      )}
                    </div>

                    {/* Order Now button */}
                    <button
                      className="w-full flex items-center justify-center gap-1 bg-white border border-gray-200
                        rounded-full py-2 text-[13px] font-semibold text-gray-700 font-sans
                        hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
                    >
                      Order Now
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
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

    </div>
  );
}
