import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FixedImage from './common/FixedImage';

const DEFAULT_RECIPIENTS = [
  { id: 1,  label: 'Him',        img: '/images/home/GiftsForHim.png' },
  { id: 2,  label: 'Her',        img: '/images/home/GiftsForHer.png' },
  { id: 3,  label: 'Kids',       img: '/images/home/GiftsForkids.png' },
  { id: 4,  label: 'Friend',     img: '/images/home/GiftsForFriends.png' },
  { id: 5,  label: 'Brother',    img: '/images/home/GiftsForbrother.png' },
  { id: 6,  label: 'Sister',     img: '/images/home/GiftsForsister.png' },
  { id: 7,  label: 'Girlfriend', img: '/images/home/GiftsForgf.png' },
  { id: 8,  label: 'Boyfriend',  img: '/images/home/GiftsForbf.png' },
  { id: 9,  label: 'Mother',     img: '/images/home/GiftsFormm.png' },
  { id: 10, label: 'Father',     img: '/images/home/GiftsForfather.png' },
];

const CARD_GAP = 16;
const VISIBLE  = 6;

export default function GiftsForEveryone({ data = DEFAULT_RECIPIENTS }) {
  const recipients = Array.isArray(data) && data.length > 0 ? data : DEFAULT_RECIPIENTS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const maxIndex  = Math.max(recipients.length - VISIBLE, 0);
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

  /* progress bar width as % */
  const progressPct = maxIndex === 0 ? 100 : Math.round(((VISIBLE + currentIndex) / recipients.length) * 100);

  return (
    <div className="bg-white py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="font-display font-bold text-xl sm:text-2xl text-gray-900 mb-6">
          Gifts for Everyone
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
              {recipients.map(person => (
                <div
                  key={person.id || person.label}
                  className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/* Card */}
                  <div
                    className="relative w-full overflow-hidden rounded-[16px] group-hover:scale-[1.03]
                      group-hover:shadow-md transition-all duration-200 bg-gray-50 flex items-center justify-center aspect-square"
                  >
                    <FixedImage
                      src={person.img || person.image}
                      alt={person.label}
                      type="avatar"
                      containerClassName="w-full h-full"
                      imageClassName="w-full h-full object-cover select-none"
                    />
                  </div>

                  {/* Label */}
                  <p className="text-[13px] font-medium text-gray-600 font-sans text-center group-hover:text-gray-900 transition-colors">
                    {person.label}
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

        {/* ── Scroll progress bar ── */}
        <div className="mt-8 max-w-md mx-auto h-[3px] bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#6b7c45] rounded-full transition-all duration-420 ease-in-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

      </div>
    </div>
  );
}
