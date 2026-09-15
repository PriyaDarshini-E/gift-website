import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBrands } from '../context/BrandContext';
import { useProducts } from '../context/ProductContext';
import FixedImage from './common/FixedImage';

const CARD_GAP = 20; // px between cards
const VISIBLE = 4;  // cards visible on desktop

export default function ShopByBrands() {
  const { brands, loading } = useBrands();
  const { products } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef(null);

  const rawBrands = Array.isArray(brands) && brands.length > 0 ? brands : [];
  const rawProducts = Array.isArray(products) ? products : [];

  // Count products for each brand dynamically
  const brandList = rawBrands.map((b) => {
    const bName = (b.name || '').trim().toUpperCase();
    const count = rawProducts.filter(p => {
      const pBrand = (p.brand || '').trim().toUpperCase();
      return pBrand === bName || pBrand.includes(bName) || String(p.brandId) === String(b.id);
    }).length;

    return {
      ...b,
      productCount: count,
    };
  });

  const maxIndex = Math.max(brandList.length - VISIBLE, 0);
  const showLeft = currentIndex > 0;
  const showRight = currentIndex < maxIndex;

  const measure = useCallback(() => {
    if (containerRef.current) {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const visibleCount = isMobile ? 1.5 : isTablet ? 2.5 : VISIBLE;
      const totalGap = CARD_GAP * (Math.floor(visibleCount) - 1);
      setCardWidth((containerRef.current.clientWidth - totalGap) / visibleCount);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const handlePrev = () => { if (showLeft) setCurrentIndex((i) => i - 1); };
  const handleNext = () => { if (showRight) setCurrentIndex((i) => i + 1); };
  const translateX = currentIndex * (cardWidth + CARD_GAP);

  if (loading && brandList.length === 0) {
    return null;
  }

  if (brandList.length === 0) return null;

  return (
    <div className="bg-white py-14 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-olive-700 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Brand Partners</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
              Shop by Trusted Brands
            </h2>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm mt-1 sm:mt-0 font-sans">
            100% genuine products directly sourced from iconic household brands
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>

          {/* ← Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-lg border border-gray-200 flex items-center justify-center
              text-gray-700 hover:text-gray-900 transition-all duration-200 cursor-pointer
              ${showLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Track Container */}
          <div className="overflow-hidden py-2">
            <div
              className="flex"
              style={{
                gap: `${CARD_GAP}px`,
                transform: cardWidth ? `translateX(-${translateX}px)` : 'none',
                transition: 'transform 420ms ease-in-out',
              }}
            >
              {brandList.map((item) => {
                const hasValidLogo = item.logo && !item.logo.includes('no_image.jpg');

                return (
                  <Link
                    to={`/category/all?brand=${encodeURIComponent(item.name)}`}
                    key={item.id}
                    className="flex-shrink-0 group select-none block"
                    style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                  >
                    {/* Brand Card Container */}
                    <div
                      className={`w-full ${item.bgColor || 'bg-stone-50'} rounded-2xl overflow-hidden border ${item.borderColor || 'border-stone-200'} shadow-xs hover:shadow-lg group-hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between p-6 h-full min-h-[170px] relative`}
                    >
                      {/* Top Brand Logo / Title */}
                      <div className="flex flex-col items-center justify-center flex-1 text-center py-2">
                        {hasValidLogo ? (
                          <div className="max-h-14 max-w-[85%] flex items-center justify-center">
                            <FixedImage
                              src={item.logo}
                              alt={item.name}
                              type="brand"
                              containerClassName="w-full h-14"
                              imageClassName="max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span 
                              className="font-serif font-black text-2xl sm:text-3xl tracking-wider uppercase"
                              style={{ color: item.themeColor || '#334155' }}
                            >
                              {item.name}
                            </span>
                          </div>
                        )}

                        <p className="text-[12px] font-sans font-medium text-stone-500 mt-2 line-clamp-1">
                          {item.tagline || 'Quality Homeware & Gifts'}
                        </p>
                      </div>

                      {/* Bottom Footer with Item Count & Arrow */}
                      <div className="flex items-center justify-between pt-4 border-t border-stone-200/50 mt-2">
                        <span className="text-xs font-extrabold text-stone-700 bg-white/80 px-2.5 py-1 rounded-full border border-stone-200/60 shadow-2xs">
                          {item.productCount > 0 ? `${item.productCount} Products` : 'Curated Range'}
                        </span>

                        <span className="text-xs font-bold text-olive-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* → Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next"
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-lg border border-gray-200 flex items-center justify-center
              text-gray-700 hover:text-gray-900 transition-all duration-200 cursor-pointer
              ${showRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

      </div>
    </div>
  );
}
