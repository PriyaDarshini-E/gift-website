import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  '/images/home/banner1.png',
  '/images/home/banner2.png',
  '/images/home/banner3.png',
  '/images/home/banner4.png'
];

// Clone slides for seamless infinite loop wrap-around
// Array will be: [banner4, banner1, banner2, banner3, banner4, banner1]
const EXTENDED_BANNERS = [
  BANNERS[BANNERS.length - 1],
  ...BANNERS,
  BANNERS[0]
];

const TRANSITION_SPEED = 500; // ms
const AUTOPLAY_INTERVAL = 3000; // 3 seconds

export default function PromoBanners() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const transitionTimeoutRef = useRef(null);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Handle jump back/forward after transition finishes
  const handleTransitionEnd = useCallback(() => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(BANNERS.length);
    } else if (currentIndex === BANNERS.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  }, [currentIndex]);

  // Safety fallback timer if onTransitionEnd is skipped by browser engine
  useEffect(() => {
    if (currentIndex === 0 || currentIndex === BANNERS.length + 1) {
      transitionTimeoutRef.current = setTimeout(() => {
        handleTransitionEnd();
      }, TRANSITION_SPEED + 50);
    }
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentIndex, handleTransitionEnd]);

  // Re-enable transitions after instant jump reflow
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Autoplay Effect (auto-slides every 3s when active & visible)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        handleNext();
      }
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  // Mobile Touch Gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div 
      className="promo-carousel-container bg-white py-10 border-b border-gray-100 overflow-hidden relative group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-full relative">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Banner"
          className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-olive-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300"
          title="Previous Banner"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Carousel Track Container */}
        <div
          className="flex"
          style={{
            willChange: 'transform',
            transform: `translateX(calc(-${currentIndex} * var(--slide-width) + var(--slide-offset)))`,
            transition: isTransitioning ? `transform ${TRANSITION_SPEED}ms cubic-bezier(0.25, 1, 0.5, 1)` : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {EXTENDED_BANNERS.map((img, idx) => {
            const isInitialSlide = idx === 1;
            return (
              <div
                key={idx}
                className="w-[var(--slide-width)] px-2 md:px-4 flex-shrink-0"
              >
                <div className="aspect-[2.5/1] rounded-[24px] overflow-hidden shadow-md border border-gray-100/50 cursor-pointer">
                  <img
                    src={img}
                    alt={`Promo Banner ${((idx - 1 + BANNERS.length) % BANNERS.length) + 1}`}
                    loading={isInitialSlide ? 'eager' : 'lazy'}
                    fetchPriority={isInitialSlide ? 'high' : 'low'}
                    decoding="async"
                    width="880"
                    height="352"
                    className="w-full h-full object-cover select-none"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Banner"
          className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-olive-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300"
          title="Next Banner"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Pagination Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {BANNERS.map((_, i) => {
            const activeBannerIndex = ((currentIndex - 1 + BANNERS.length) % BANNERS.length);
            const isActive = activeBannerIndex === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(i + 1);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'w-6 bg-olive-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}


