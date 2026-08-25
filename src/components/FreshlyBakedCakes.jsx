import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Cake Categories Data ────────────────────────────────── */
const cakes = [
  { id: 1, name: 'Chocolate',    img: '/images/home/chocolate.png',    gradient: 'from-[#4a2e1b] via-[#633b22] to-[#361e10]', emoji: '🍫' },
  { id: 2, name: 'Butterscotch', img: '/images/home/butterscoth.png',   gradient: 'from-[#f6c877] via-[#e8a848] to-[#d48b28]', emoji: '🍮' },
  { id: 3, name: 'Fresh Fruit',  img: '/images/home/fruits.png',       gradient: 'from-[#f9e0ae] via-[#f7a470] to-[#e66767]', emoji: '🍓' },
  { id: 4, name: 'Combos',       img: '/images/home/combos.png',       gradient: 'from-[#2d4d3a] via-[#3d6b52] to-[#1e3628]', emoji: '🎁' },
  { id: 5, name: 'Pineapple',    img: '/images/home/pineapple.png',    gradient: 'from-[#fef08a] via-[#fde047] to-[#eab308]', emoji: '🍍' },
  { id: 6, name: 'Red Velvet',   img: null,                             gradient: 'from-[#9f1239] via-[#881337] to-[#4c0519]', emoji: '🧁' },
  { id: 7, name: 'Black Forest', img: null,                             gradient: 'from-[#312e81] via-[#1e1b4b] to-[#0f172a]', emoji: '🍒' },
  { id: 8, name: 'Truffle',      img: null,                             gradient: 'from-[#581c87] via-[#3b0764] to-[#2e1065]', emoji: '🎂' },
];

const CARD_GAP = 20; // px between cards
const VISIBLE  = 5;  // cards visible on desktop

export default function FreshlyBakedCakes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const maxIndex  = Math.max(cakes.length - VISIBLE, 0);
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
    <div className="bg-[#faf7f2] py-10 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 mb-6">
          Freshly Baked Cakes
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
              {cakes.map((cake) => (
                <div
                  key={cake.id}
                  className="flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/* Portrait Card */}
                  <div
                    className={`w-full overflow-hidden rounded-[18px] bg-gradient-to-br ${cake.gradient}
                      shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-200
                      flex items-center justify-center relative`}
                    style={{ aspectRatio: '4/5' }}
                  >
                    {cake.img ? (
                      <img
                        src={cake.img}
                        alt={cake.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 select-none"
                      />
                    ) : (
                      <>
                        {/* Subtle background glow */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        
                        {/* Placeholder Emoji Icon */}
                        <span className="text-5xl sm:text-6xl select-none filter drop-shadow-md group-hover:scale-110 transition-transform duration-200">
                          {cake.emoji}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Cake Name Label */}
                  <p className="text-[14px] font-semibold text-gray-800 font-sans text-center group-hover:text-gray-900">
                    {cake.name}
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
