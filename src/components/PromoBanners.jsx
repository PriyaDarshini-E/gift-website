import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PromoBanners() {
  const banners = [
    '/images/home/banner1.png',
    '/images/home/banner2.png',
    '/images/home/banner3.png',
    '/images/home/banner4.png'
  ];

  // Clone slides for seamless infinite loop wrap-around
  // Array will be: [banner4, banner1, banner2, banner3, banner4, banner1]
  const extendedBanners = [
    banners[banners.length - 1],
    ...banners,
    banners[0]
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const transitionSpeed = 500; // ms

  // Autoplay Effect
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 2000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  // Handle jump back/forward after transition finishes
  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(banners.length);
    } else if (currentIndex === banners.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  // Re-enable transitions after instant jump reflow
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const handleNext = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div 
      className="bg-white py-10 border-b border-gray-100 overflow-hidden relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-full relative">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-olive-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300"
          title="Previous Banner"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* CSS Custom Variables for centering and peeking slides */}
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --slide-width: 80vw;
            --slide-offset: 10vw;
          }
          @media (min-width: 768px) {
            :root {
              --slide-width: 70vw;
              --slide-offset: 15vw;
            }
          }
          @media (min-width: 1024px) {
            :root {
              --slide-width: 880px;
              --slide-offset: calc((100vw - 880px) / 2);
            }
          }
        `}} />

        {/* Carousel Track Container */}
        <div
          className="flex"
          style={{
            transform: `translateX(calc(-${currentIndex} * var(--slide-width) + var(--slide-offset)))`,
            transition: isTransitioning ? `transform ${transitionSpeed}ms ease-in-out` : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedBanners.map((img, idx) => (
            <div
              key={idx}
              className="w-[var(--slide-width)] px-2 md:px-4 flex-shrink-0"
            >
              <div className="aspect-[2.5/1] rounded-[24px] overflow-hidden shadow-md border border-gray-100/50 cursor-pointer">
                <img
                  src={img}
                  alt={`Promo Banner ${idx}`}
                  className="w-full h-full object-cover select-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-olive-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300"
          title="Next Banner"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

      </div>
    </div>
  );
}
