import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── City data ───────────────────────────────────────────── */
const cities = [
  { id: 1, name: 'Delhi',     emoji: '🏛️',  landmark: 'India Gate'         },
  { id: 2, name: 'Mumbai',    emoji: '🌉',  landmark: 'Gateway of India'    },
  { id: 3, name: 'Bengaluru', emoji: '🏛️',  landmark: 'Vidhana Soudha'     },
  { id: 4, name: 'Hyderabad', emoji: '🕌',  landmark: 'Charminar'           },
  { id: 5, name: 'Chennai',   emoji: '🏖️',  landmark: 'Marina Beach'        },
  { id: 6, name: 'Kolkata',   emoji: '🌁',  landmark: 'Howrah Bridge'       },
  { id: 7, name: 'Pune',      emoji: '🏰',  landmark: 'Shaniwarwada'        },
  { id: 8, name: 'Ahmedabad', emoji: '🕍',  landmark: 'Sabarmati Ashram'    },
];

/* ── Sparkle positions per card (deterministic, not random) ─ */
const sparkles = [
  { top: '10%', left: '12%',  size: 18, opacity: 0.90 },
  { top: '12%', left: '72%',  size: 14, opacity: 0.80 },
  { top: '45%', left: '82%',  size: 10, opacity: 0.65 },
  { top: '70%', left: '8%',   size: 10, opacity: 0.65 },
  { top: '28%', left: '48%',  size:  8, opacity: 0.50 },
];

/* ── 8-pointed star SVG ─────────────────────────────────── */
function Star({ size = 16 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="white" xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
    </svg>
  );
}

const CARD_GAP = 20;
const VISIBLE  = 4;

export default function SendRakhiCity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const maxIndex  = Math.max(cities.length - VISIBLE, 0);
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
    <div className="bg-white py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="font-display font-bold text-xl sm:text-2xl text-gray-900 mb-6">
          Send Rakhi to Their City
        </h2>

        {/* Carousel */}
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

          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                gap: `${CARD_GAP}px`,
                transform: cardWidth ? `translateX(-${translateX}px)` : 'none',
                transition: 'transform 420ms ease-in-out',
              }}
            >
              {cities.map(city => (
                <div
                  key={city.id}
                  className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/* Card — orange gradient + sparkles + landmark placeholder */}
                  <div
                    className="relative w-full overflow-hidden rounded-[18px] group-hover:scale-[1.02] transition-transform duration-200"
                    style={{
                      aspectRatio: '1 / 1',
                      background: 'linear-gradient(160deg, #f5a97c 0%, #ef8c58 45%, #e07035 100%)',
                    }}
                  >
                    {/* Sparkle stars scattered across card */}
                    {sparkles.map((s, i) => (
                      <div
                        key={i}
                        className="absolute pointer-events-none"
                        style={{ top: s.top, left: s.left, opacity: s.opacity }}
                      >
                        <Star size={s.size} />
                      </div>
                    ))}

                    {/* Monument / landmark placeholder — bottom-center, large emoji */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-2">
                      <span
                        className="select-none"
                        style={{
                          fontSize: '90px',
                          lineHeight: 1,
                          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.25)) sepia(0.15)',
                        }}
                      >
                        {city.emoji}
                      </span>
                    </div>

                    {/* Subtle ground shadow at bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(180,90,30,0.25) 0%, transparent 100%)',
                      }}
                    />
                  </div>

                  {/* City name below */}
                  <p className="text-[13px] font-semibold font-sans text-[#e07035] group-hover:underline text-center">
                    {city.name}
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
