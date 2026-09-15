import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Eye, ShoppingBag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import FixedImage from './common/FixedImage';

const CARD_GAP = 20; // px between cards
const VISIBLE  = 5;  // cards visible on desktop

export default function NewlyLaunched() {
  const { products: apiProducts, getNewArrivals, loading } = useProducts();
  const { openProductModal, addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const rawProducts = Array.isArray(apiProducts) ? apiProducts : [];
  
  // Dynamically query new arrivals or slice
  const products = (getNewArrivals && getNewArrivals.length > 0) ? getNewArrivals : rawProducts.slice(0, 16);

  const maxIndex  = Math.max(products.length - VISIBLE, 0);
  const showLeft  = currentIndex > 0;
  const showRight = currentIndex < maxIndex;

  const measure = useCallback(() => {
    if (containerRef.current) {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const visibleCount = isMobile ? 2 : isTablet ? 3 : VISIBLE;
      const totalGap = CARD_GAP * (visibleCount - 1);
      setCardWidth((containerRef.current.clientWidth - totalGap) / visibleCount);
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

  if (products.length === 0 && !loading) return null;

  return (
    <div className="bg-[#f0f4f9] py-12 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Additions</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
              Newly Launched Gifts
            </h2>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm mt-1 sm:mt-0 font-sans">
            Explore the latest premium corporate & personal gifting arrivals
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>

          {/* ← Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className={`absolute -left-4 top-[42%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-lg border border-gray-200 flex items-center justify-center
              text-gray-700 hover:text-gray-900 transition-all duration-200 cursor-pointer
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
              {products.map((item) => {
                const discount = item.originalPrice && item.originalPrice > item.price
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={item.id}
                    className="flex-shrink-0 group"
                    style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                  >
                    {/* White Card Container */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-3 border border-stone-100">
                      
                      {/* Square Image Container */}
                      <div 
                        onClick={() => openProductModal(item)}
                        className="w-full aspect-square bg-stone-50 rounded-xl flex items-center justify-center relative overflow-hidden cursor-pointer group-hover:scale-[1.01] transition-transform"
                      >
                        <FixedImage
                          src={item.img || item.image}
                          alt={item.name}
                          type="product"
                          containerClassName="w-full h-full"
                          imageClassName="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Brand Pill */}
                        {item.brand && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-stone-900/80 backdrop-blur-xs text-white text-[9px] font-bold rounded-full uppercase tracking-wider">
                            {item.brand}
                          </span>
                        )}

                        {/* Badge */}
                        <div className="absolute top-2 right-2">
                          {discount > 0 ? (
                            <span className="inline-block bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs">
                              {discount}% OFF
                            </span>
                          ) : (
                            <span className="inline-block bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs uppercase">
                              NEW
                            </span>
                          )}
                        </div>

                        {/* Quick View Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openProductModal(item);
                          }}
                          className="absolute bottom-2 inset-x-2 py-1.5 bg-white/95 backdrop-blur-xs text-gray-900 rounded-lg text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 hover:bg-white cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-700" />
                          <span>Quick View</span>
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="pt-3 flex flex-col justify-between flex-1">
                        <div>
                          <p 
                            onClick={() => openProductModal(item)}
                            className="text-[13px] font-semibold text-gray-800 font-sans line-clamp-2 hover:text-blue-700 transition-colors cursor-pointer mb-1.5"
                          >
                            {item.name}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-baseline gap-2 mb-2.5">
                            <span className="text-[14px] font-extrabold text-gray-900 font-sans">
                              ₹{Number(item.price).toLocaleString('en-IN')}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-[11px] text-gray-400 line-through font-sans">
                                ₹{Number(item.originalPrice).toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => addToCart(item, 1)}
                            className="w-full py-2 bg-blue-50 hover:bg-blue-700 text-blue-800 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Enquiry</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* → Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next"
            className={`absolute -right-4 top-[42%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
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
