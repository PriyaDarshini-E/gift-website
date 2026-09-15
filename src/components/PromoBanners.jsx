import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useBanners } from '../context/BannerContext';
import FixedImage from './common/FixedImage';

const TRANSITION_SPEED = 500; // ms
const AUTOPLAY_INTERVAL = 3500; // 3.5 seconds

export default function PromoBanners({ position = 'Top', type = null, className = '' }) {
  const { banners: rawBanners, getBannersByPosition, loading } = useBanners();

  const rawList = useMemo(() => {
    let list = getBannersByPosition(position);
    if (type) {
      list = list.filter(b => (b.type || '').toLowerCase() === type.toLowerCase());
    }
    return list;
  }, [getBannersByPosition, position, type]);

  // Ensure there are at least 3 slides so carousel can loop continuously and infinitely without stopping
  const bannerList = useMemo(() => {
    if (!rawList || rawList.length === 0) return [];
    if (rawList.length === 1) {
      return [
        { ...rawList[0], _uniqueKey: 'b-1' },
        { ...rawList[0], _uniqueKey: 'b-2' },
        { ...rawList[0], _uniqueKey: 'b-3' },
        { ...rawList[0], _uniqueKey: 'b-4' },
      ];
    }
    if (rawList.length === 2) {
      return [
        { ...rawList[0], _uniqueKey: 'b-1' },
        { ...rawList[1], _uniqueKey: 'b-2' },
        { ...rawList[0], _uniqueKey: 'b-3' },
        { ...rawList[1], _uniqueKey: 'b-4' },
      ];
    }
    return rawList.map((b, i) => ({ ...b, _uniqueKey: `b-${b.id || i}` }));
  }, [rawList]);

  // Extended banners with boundary clones for infinite seamless looping
  const extendedBanners = useMemo(() => {
    if (bannerList.length === 0) return [];
    return [
      bannerList[bannerList.length - 1],
      ...bannerList,
      bannerList[0]
    ];
  }, [bannerList]);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const transitionTimeoutRef = useRef(null);

  const handleNext = useCallback(() => {
    if (bannerList.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [bannerList.length]);

  const handlePrev = useCallback(() => {
    if (bannerList.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [bannerList.length]);

  const handleTransitionEnd = useCallback(() => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(bannerList.length);
    } else if (currentIndex === bannerList.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  }, [currentIndex, bannerList.length]);

  useEffect(() => {
    if (currentIndex === 0 || currentIndex === bannerList.length + 1) {
      transitionTimeoutRef.current = setTimeout(() => {
        handleTransitionEnd();
      }, TRANSITION_SPEED + 50);
    }
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentIndex, handleTransitionEnd, bannerList.length]);

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

  // Continuous Auto-moving timer
  useEffect(() => {
    if (isHovered || bannerList.length === 0) return;

    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        handleNext();
      }
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isHovered, handleNext, bannerList.length]);

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

  if (loading && position.toLowerCase() === 'top') {
    return (
      <div className={`bg-white py-8 md:py-10 border-b border-gray-100 overflow-hidden ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-[880px] aspect-[2.5/1] rounded-[24px] bg-stone-100 animate-pulse border border-stone-200/60 flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-stone-300 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (bannerList.length === 0) {
    return null;
  }

  // Active indicator index (0 to bannerList.length - 1)
  const activeDotIndex = ((currentIndex - 1 + bannerList.length) % bannerList.length);

  return (
    <div 
      className={`promo-carousel-container bg-white py-8 md:py-10 border-b border-gray-100 overflow-hidden relative group select-none ${className}`}
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
          className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-olive-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300 cursor-pointer hover:scale-110 active:scale-95"
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
          {extendedBanners.map((item, idx) => {
            const bannerLink = item.link;
            const isExternal = bannerLink && (bannerLink.startsWith('http://') || bannerLink.startsWith('https://'));

            const card = (
              <div className="aspect-[2.5/1] rounded-[24px] overflow-hidden shadow-md border border-gray-100/50 cursor-pointer hover:shadow-xl transition-shadow duration-300">
                <FixedImage
                  src={item.image}
                  alt={item.title || `Promo Banner ${idx}`}
                  type="banner"
                  containerClassName="w-full h-full"
                  imageClassName="w-full h-full object-cover select-none"
                />
              </div>
            );

            return (
              <div
                key={`slide-${item._uniqueKey || idx}-${idx}`}
                className="w-[var(--slide-width)] px-2 md:px-4 flex-shrink-0"
              >
                {bannerLink ? (
                  isExternal ? (
                    <a href={bannerLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                      {card}
                    </a>
                  ) : (
                    <Link to={bannerLink} className="block w-full h-full">
                      {card}
                    </Link>
                  )
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Banner"
          className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-olive-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300 cursor-pointer hover:scale-110 active:scale-95"
          title="Next Banner"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Linear Progress / Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {bannerList.map((_, i) => {
            const isActive = activeDotIndex === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(i + 1);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'w-7 bg-olive-600 shadow-xs' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}


