import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, CookingPot, ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import FixedImage from './common/FixedImage';

const CARD_GAP = 20; // px between cards
const VISIBLE  = 5;  // cards visible on desktop

export default function FreshlyBakedCakes({ 
  title = "Freshly Baked Custom & Celebration Cakes", 
  subtitle = "Chocolate Truffle, Red Velvet, Black Forest & gourmet artisan cakes crafted fresh daily", 
  categorySlug = "cakes" 
}) {
  const { products: apiProducts, loading } = useProducts();
  const { openProductModal, addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const rawProducts = Array.isArray(apiProducts) ? apiProducts : [];

  // Dynamically filter cake products
  const cakeProducts = rawProducts.filter(p => {
    const name = (p.name || '').toLowerCase();
    const cat = (p.category || '').toLowerCase();
    const subCat = (p.subCategory || '').toLowerCase();
    return (
      cat.includes('cake') || 
      subCat.includes('cake') || 
      name.includes('cake') || 
      name.includes('velvet') || 
      name.includes('truffle') ||
      name.includes('pineapple')
    );
  }).slice(0, 15);

  const displayList = cakeProducts.length > 0 ? cakeProducts : rawProducts.slice(0, 10);

  const maxIndex  = Math.max(displayList.length - VISIBLE, 0);
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

  if (loading && rawProducts.length === 0) {
    return null;
  }

  if (displayList.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#fcf8f5] py-14 border-b border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">
              <CookingPot className="w-3.5 h-3.5 text-amber-600" />
              <span>Chef's Choice Collection</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
              {title}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 font-sans">
              {subtitle}
            </p>
          </div>

          <Link 
            to={`/category/${categorySlug}`}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-amber-900 hover:text-amber-700 transition-colors group/header"
          >
            Explore All Cookware
            <ArrowRight className="w-4 h-4 group-hover/header:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>

          {/* ← Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className={`absolute -left-4 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-lg border border-amber-200 flex items-center justify-center
              text-gray-700 hover:text-amber-900 transition-all duration-200 cursor-pointer
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
              {displayList.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 group"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  <div className="bg-white rounded-2xl p-3 shadow-xs hover:shadow-md transition-all duration-300 border border-amber-100 flex flex-col justify-between h-full">
                    
                    {/* Image Area */}
                    <div 
                      onClick={() => openProductModal(item)}
                      className="w-full aspect-square bg-amber-50/50 rounded-xl overflow-hidden flex items-center justify-center relative cursor-pointer"
                    >
                      <FixedImage
                        src={item.img || item.image}
                        alt={item.name}
                        type="product"
                        containerClassName="w-full h-full"
                        imageClassName="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />

                      {item.brand && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-amber-950/80 backdrop-blur-xs text-white text-[9px] font-bold rounded-full uppercase tracking-wider">
                          {item.brand}
                        </span>
                      )}

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductModal(item);
                        }}
                        className="absolute bottom-2 inset-x-2 py-1.5 bg-white/95 backdrop-blur-xs text-gray-900 rounded-lg text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 hover:bg-white cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-700" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Details */}
                    <div className="pt-3 flex flex-col justify-between flex-1">
                      <p 
                        onClick={() => openProductModal(item)}
                        className="text-[13px] font-semibold text-gray-800 font-sans line-clamp-2 hover:text-amber-700 transition-colors cursor-pointer mb-1.5"
                      >
                        {item.name}
                      </p>

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
                          className="w-full py-2 bg-amber-50 hover:bg-amber-700 text-amber-900 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Enquiry</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* → Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next"
            className={`absolute -right-4 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-lg border border-amber-200 flex items-center justify-center
              text-gray-700 hover:text-amber-900 transition-all duration-200 cursor-pointer
              ${showRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

      </div>
    </div>
  );
}
