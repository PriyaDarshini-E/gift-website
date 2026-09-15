import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCategories } from '../context/CategoryContext';
import { useCart } from '../context/CartContext';
import FixedImage from './common/FixedImage';

const CARD_GAP = 16; // px between cards
const VISIBLE  = 5;  // cards visible at once

export default function BestSellers() {
  const { products: apiProducts, loading } = useProducts();
  const { categories: apiCategories } = useCategories();
  const { openProductModal, addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef(null);

  const rawProducts = Array.isArray(apiProducts) ? apiProducts : [];

  // Filter strictly products that are tagged as Bestseller from backend CRM
  const bestsellerProducts = useMemo(() => {
    return rawProducts.filter((p) => {
      const tagStr = typeof p.tag === 'string' ? p.tag : (p.tag?.name || p.tag?.tags_name || '');
      const hasTagInArray = Array.isArray(p.tags) && p.tags.some(t => {
        const tName = typeof t === 'string' ? t : (t?.name || t?.tags_name || '');
        return tName.toLowerCase().includes('best');
      });
      return tagStr.toLowerCase().includes('best') || hasTagInArray || Boolean(p.isBestseller);
    });
  }, [rawProducts]);

  // Generate dynamic category tabs from the actual bestseller products
  const categoryTabs = useMemo(() => {
    const tabs = [{ id: 'all', label: 'All Bestsellers', emoji: '🔥' }];
    const uniqueCats = [...new Set(bestsellerProducts.map(p => p.category).filter(Boolean))];
    
    uniqueCats.forEach((catName) => {
      tabs.push({
        id: catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: catName,
        emoji: '✨',
        name: catName,
      });
    });
    return tabs;
  }, [bestsellerProducts]);

  // Filter bestseller products by selected tab
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return bestsellerProducts;
    const tabObj = categoryTabs.find(t => t.id === activeTab);
    const query = (tabObj?.name || tabObj?.label || activeTab).toLowerCase();
    return bestsellerProducts.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const subCat = (p.subCategory || '').toLowerCase();
      const name = (p.name || '').toLowerCase();
      return cat.includes(query) || subCat.includes(query) || name.includes(query);
    });
  }, [activeTab, categoryTabs, bestsellerProducts]);

  const displayItems = filteredProducts.slice(0, 20);

  const maxIndex = Math.max(displayItems.length - VISIBLE, 0);
  const showLeft  = currentIndex > 0;
  const showRight = currentIndex < maxIndex;

  /* Measure card width from container */
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
        const visibleCount = isMobile ? 2 : isTablet ? 3 : VISIBLE;
        const totalGap = CARD_GAP * (visibleCount - 1);
        setCardWidth((containerRef.current.clientWidth - totalGap) / visibleCount);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* Reset scroll on tab change */
  const handleTabChange = (id) => {
    setActiveTab(id);
    setCurrentIndex(0);
  };

  const handlePrev = () => { if (showLeft) setCurrentIndex(i => i - 1); };
  const handleNext = () => { if (showRight) setCurrentIndex(i => i + 1); };

  const translateX = currentIndex * (cardWidth + CARD_GAP);

  if (loading && rawProducts.length === 0) {
    return (
      <div className="bg-[#faf8f5] py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-64 bg-stone-200/60 rounded-xl animate-pulse mb-6" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-1 h-72 bg-white rounded-2xl p-3 border border-stone-100 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#faf8f5] py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-100 text-amber-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Curated Collection
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
              Shop Bestselling Gifts & Homeware
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-sans max-w-xl">
              Handpicked premium gifts, homeware & hampers for every special celebration
            </p>
          </div>

          <div className="mt-3 sm:mt-0 text-xs text-stone-500 font-medium">
            Showing <strong className="text-gray-900">{displayItems.length}</strong> bestselling items
          </div>
        </div>

        {/* ── Category filter tabs ── */}
        {categoryTabs.length > 1 && (
          <div className="flex gap-2 sm:gap-3 mb-6 overflow-x-auto scrollbar-none pb-1">
            {categoryTabs.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold font-sans whitespace-nowrap border transition-all duration-200 cursor-pointer
                  ${activeTab === cat.id
                    ? 'bg-olive-800 border-olive-800 text-white shadow-sm'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-olive-400'
                  }`}
              >
                <span className="text-base leading-none">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Carousel ── */}
        <div className="relative" ref={containerRef}>

          {/* ← Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className={`absolute -left-4 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-lg border border-gray-200 flex items-center justify-center
              text-gray-700 hover:text-gray-900 transition-all duration-200 cursor-pointer
              ${showLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Clip track */}
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                gap: `${CARD_GAP}px`,
                transform: cardWidth ? `translateX(-${translateX}px)` : 'none',
                transition: 'transform 420ms ease-in-out',
              }}
            >
              {displayItems.map((product) => {
                const discount = product.originalPrice && product.originalPrice > product.price
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="flex-shrink-0 group flex flex-col justify-between bg-white rounded-2xl p-3 border border-stone-100 shadow-xs hover:shadow-md transition-all duration-300"
                    style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                  >
                    {/* Product image container */}
                    <div
                      onClick={() => openProductModal(product)}
                      className="w-full overflow-hidden rounded-xl mb-3 flex items-center justify-center bg-stone-50 group-hover:scale-[1.01] transition-transform duration-200 relative cursor-pointer aspect-square"
                    >
                      <FixedImage
                        src={product.img || product.image}
                        alt={product.name}
                        type="product"
                        containerClassName="w-full h-full"
                        imageClassName="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Brand Pill */}
                      {product.brand && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-stone-900/80 backdrop-blur-xs text-white text-[9px] font-bold rounded-full uppercase tracking-wider">
                          {product.brand}
                        </span>
                      )}

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-rose-600 text-white text-[9px] font-extrabold rounded-md shadow-xs">
                          {discount}% OFF
                        </span>
                      )}

                      {/* Quick view button overlay */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductModal(product);
                        }}
                        className="absolute bottom-2 inset-x-2 py-1.5 bg-white/95 backdrop-blur-xs text-gray-900 rounded-lg text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 hover:bg-white cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-olive-700" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Product info below image */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <p 
                          onClick={() => openProductModal(product)}
                          className="text-[13px] text-gray-800 font-sans font-semibold leading-snug line-clamp-2 mb-1.5 cursor-pointer hover:text-olive-700 transition-colors"
                        >
                          {product.name}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-baseline gap-2 mb-2.5">
                          <span className="text-[14px] font-extrabold text-gray-900 font-sans">
                            ₹{Number(product.price).toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-[11px] text-gray-400 line-through font-sans">
                              ₹{Number(product.originalPrice).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="w-full py-2 bg-olive-50 hover:bg-olive-700 text-olive-800 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Enquiry</span>
                        </button>
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
            className={`absolute -right-4 top-[45%] -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-lg border border-gray-200 flex items-center justify-center
              text-gray-700 hover:text-gray-900 transition-all duration-200 cursor-pointer
              ${showRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

        {/* ── View All link ── */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => handleTabChange('all')}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-6 py-2 hover:bg-gray-50 transition-colors duration-200 font-sans cursor-pointer"
          >
            View All {categoryTabs.find(c => c.id === activeTab)?.label}
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}
