import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cards = [
  { id: 1, label: ['Rakhi Gift', 'Hampers'], img: '/images/home/raksha1.png' },
  { id: 2, label: ['Rakhi with', 'Sweets'],  img: '/images/home/raksha2.png' },
  { id: 3, label: ['Rakhi with', 'Chocolates'], img: '/images/home/raksha3.png' },
  { id: 4, label: ['Set-of-2', 'Rakhi'],     img: '/images/home/raksha4.png' },
  { id: 5, label: ['Rakhi', 'Gifts'],        img: '/images/home/raksha5.png' },
  { id: 6, label: ['Premium', 'Rakhi'],      img: '/images/home/raksha6.png' },
];

/* Decorative sunburst / flower — matches the subtle orange element in Image 1 */
function Sunburst() {
  return (
    <svg
      width="56" height="56" viewBox="0 0 56 56"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-2 left-3 pointer-events-none select-none"
      aria-hidden="true"
    >
      {[0,22.5,45,67.5,90,112.5,135,157.5].map((deg, i) => (
        <ellipse
          key={i}
          cx="28" cy="14" rx="5" ry="11"
          fill="#e07040"
          fillOpacity="0.18"
          transform={`rotate(${deg} 28 28)`}
        />
      ))}
      <circle cx="28" cy="28" r="7" fill="#e07040" fillOpacity="0.18" />
    </svg>
  );
}

const CARD_GAP    = 24;  // px gap between cards
const CARD_HEIGHT = 130; // px
const VISIBLE     = 3;   // cards fully visible on desktop

export default function RakshaBandhan() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const maxIndex = cards.length - VISIBLE;
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

  const translateX = currentIndex * (cardWidth + CARD_GAP);

  return (
    <div className="bg-white py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-7">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
            Celebrate Raksha Bandhan
          </h2>
          <p className="text-gray-500 text-sm mt-1 font-sans">
            Curated for every sibling&nbsp;✨
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative" ref={containerRef}>

          {/* ← Left Arrow — only visible when NOT at first card */}
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

          {/* Clip track — overflow-hidden prevents card images from bleeding out */}
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                gap: `${CARD_GAP}px`,
                transform: cardWidth ? `translateX(-${translateX}px)` : 'none',
                transition: 'transform 420ms ease-in-out',
              }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flex-shrink-0"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/*
                    ─────────────────────────────────────────────────
                    CARD: soft peach bg, rounded, overflow-hidden.
                    Direct layout — NO nested inner card.
                    Left: text centered vertically.
                    Right: large product image, no box around it.
                    Bottom-left: subtle sunburst decoration.
                    ─────────────────────────────────────────────────
                  */}
                  <div
                    className="relative overflow-hidden cursor-pointer rounded-[22px]
                      border border-[#f0b89a] bg-[#fde8da]
                      hover:shadow-lg transition-shadow duration-200"
                    style={{ height: `${CARD_HEIGHT}px` }}
                  >

                    {/* ── Sunburst decoration (bottom-left) ── */}
                    <Sunburst />

                    {/* ── Label — left side, vertically centred ── */}
                    <div
                      className="absolute left-5 top-1/2 -translate-y-1/2 z-10"
                      style={{ maxWidth: '48%' }}
                    >
                      <p
                        className="font-sans font-semibold leading-snug text-[#5c2d0a]"
                        style={{ fontSize: 'clamp(14px, 1.4vw, 20px)' }}
                      >
                        {card.label[0]}
                        <br />
                        {card.label[1]}
                        <span className="ml-0.5 text-[#5c2d0a]">›</span>
                      </p>
                    </div>

                    {/* ── Product image — right side, no box, no border ── */}
                    <div
                      className="absolute right-0 top-0 h-full"
                      style={{ width: '52%' }}
                    >
                      <img
                        src={card.img}
                        alt={card.label.join(' ')}
                        className="w-full h-full object-contain object-right select-none"
                        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}
                      />
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* → Right Arrow — only visible when NOT at last card */}
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
