import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Feelings Categories Data ───────────────────────────── */
const feelings = [
  {
    id: 1,
    title: 'Love & Romance',
    img: '/images/home/GiftsforLove.png',
    bgColor: 'bg-[#fde2e4]',
    textColor: 'text-[#8b263e]',
    gradient: 'from-[#fde2e4] to-[#ffccd5]',
    emoji: '🌹'
  },
  {
    id: 2,
    title: 'Thinking of You',
    img: '/images/home/Giftsforthinkingyou.png',
    bgColor: 'bg-[#e2daf8]',
    textColor: 'text-[#4c3b71]',
    gradient: 'from-[#e2daf8] to-[#d6c7ff]',
    emoji: '💜'
  },
  {
    id: 3,
    title: 'Miss You',
    img: '/images/home/Giftsformissypu.png',
    bgColor: 'bg-[#f8d7da]',
    textColor: 'text-[#721c24]',
    gradient: 'from-[#f8d7da] to-[#f5c6cb]',
    emoji: '🧸'
  },
  {
    id: 4,
    title: 'I am Sorry',
    img: '/images/home/GiftsforSorry.png',
    bgColor: 'bg-[#d8e2dc]',
    textColor: 'text-[#2b4c3f]',
    gradient: 'from-[#d8e2dc] to-[#c4d4cc]',
    emoji: '🕊️'
  },
  {
    id: 5,
    title: 'Sympathy',
    img: '/images/home/Giftsforsympathy.png',
    bgColor: 'bg-[#e9ecef]',
    textColor: 'text-[#495057]',
    gradient: 'from-[#ece4db] to-[#decbc0]',
    emoji: '🕯️'
  },
  {
    id: 6,
    title: 'Congratulations',
    img: null,
    bgColor: 'bg-[#fff3cd]',
    textColor: 'text-[#856404]',
    gradient: 'from-[#fff3cd] to-[#ffe8a1]',
    emoji: '🎉'
  },
  {
    id: 7,
    title: 'Get Well Soon',
    img: null,
    bgColor: 'bg-[#e0f2fe]',
    textColor: 'text-[#0369a1]',
    gradient: 'from-[#e0f2fe] to-[#bae6fd]',
    emoji: '☀️'
  },
  {
    id: 8,
    title: 'Thank You',
    img: null,
    bgColor: 'bg-[#fae1dd]',
    textColor: 'text-[#9c413b]',
    gradient: 'from-[#fae1dd] to-[#f8edeb]',
    emoji: '✨'
  }
];

const CARD_GAP = 20; // px between cards
const VISIBLE  = 5;  // cards visible on desktop

export default function GiftsForEveryFeeling() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const maxIndex  = Math.max(feelings.length - VISIBLE, 0);
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
    <div className="bg-white py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Subtitle */}
        <div className="mb-6">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
            Gifts for Every Feeling
          </h2>
          <p className="text-gray-500 text-sm mt-1 font-sans">
            When emotions matter most, send a gift that speaks from the heart.
          </p>
        </div>

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
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                gap: `${CARD_GAP}px`,
                transform: cardWidth ? `translateX(-${translateX}px)` : 'none',
                transition: 'transform 420ms ease-in-out',
              }}
            >
              {feelings.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 cursor-pointer group"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/* Card Container */}
                  <div
                    className={`w-full overflow-hidden rounded-[20px] bg-gradient-to-b ${item.gradient}
                      shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-200
                      relative flex flex-col justify-between`}
                    style={{ aspectRatio: '3/4' }}
                  >
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover select-none"
                      />
                    ) : (
                      <>
                        {/* Placeholder graphic (Center Emoji) */}
                        <div className="flex-1 flex items-center justify-center">
                          <span className="text-5xl sm:text-6xl select-none filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                            {item.emoji}
                          </span>
                        </div>

                        {/* Feeling Title - Centered inside card at the bottom */}
                        <div className="text-center pb-3">
                          <p className={`text-[13px] sm:text-[14px] font-semibold font-sans ${item.textColor}`}>
                            {item.title}
                          </p>
                        </div>
                      </>
                    )}
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
