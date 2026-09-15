import React from 'react';
import { Sparkles, Gift, ShoppingBag, PartyPopper } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import FixedImage from './common/FixedImage';

export default function BirthdayGifts() {
  const { products: apiProducts, loading } = useProducts();
  const { openProductModal, addToCart } = useCart();

  const rawProducts = Array.isArray(apiProducts) ? apiProducts : [];

  // Dynamically extract curated celebration / featured products
  const celebrationProducts = rawProducts.filter(p => {
    const name = (p.name || '').toLowerCase();
    const cat = (p.category || '').toLowerCase();
    const hasOccasion = Array.isArray(p.occasions) && p.occasions.some(o => 
      (typeof o === 'object' ? (o.name || o.title || '') : String(o)).toLowerCase().includes('birthday')
    );
    return hasOccasion || name.includes('set') || name.includes('combo') || name.includes('gift') || cat.includes('set') || name.includes('mug');
  }).slice(0, 5);

  const displayList = celebrationProducts.length >= 5 ? celebrationProducts : rawProducts.slice(15, 20);

  if (loading && rawProducts.length === 0) {
    return (
      <div className="bg-stone-50/60 py-14 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-64 rounded-3xl bg-stone-200/60 animate-pulse mb-10" />
        </div>
      </div>
    );
  }

  if (displayList.length === 0) {
    return null;
  }

  return (
    <div className="bg-stone-50/60 py-14 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Premium Modern Hero Banner ── */}
        <div className="relative w-full rounded-3xl overflow-hidden mb-10 bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 border border-rose-200/80 p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Background Decorative Floral & Confetti Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-200/40 via-amber-200/30 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-amber-200/40 via-rose-100/30 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Left Text Content */}
          <div className="relative z-10 text-center md:text-left max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-rose-200/90 text-rose-900 text-xs font-extrabold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              Birthday & Celebration Gifts
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-[1.15]">
              Thoughtful Gifts To <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-olive-800 via-rose-700 to-amber-800 bg-clip-text text-transparent">Make Moments Unforgettable</span> 🎉
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm font-sans leading-relaxed max-w-md">
              From crystal tea sets and microwave-safe glassware to premium insulated travel gifts that last a lifetime.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="text-xs font-bold text-olive-800 bg-white/90 border border-olive-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-olive-600" />
                Premium Gift Box Packaging
              </span>
              <span className="text-xs font-bold text-rose-800 bg-white/90 border border-rose-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
                <PartyPopper className="w-3.5 h-3.5 text-rose-600" />
                Corporate & Personal Customization
              </span>
            </div>
          </div>

          {/* Right — Featured Highlight */}
          <div className="relative z-10 flex-shrink-0 w-full md:w-80 lg:w-96">
            {displayList[0] && (
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white aspect-[4/3] group cursor-pointer bg-white" 
                onClick={() => openProductModal(displayList[0])}
              >
                <FixedImage 
                  src={displayList[0].img || displayList[0].image} 
                  alt={displayList[0].name} 
                  type="product"
                  containerClassName="w-full h-full"
                  imageClassName="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-extrabold uppercase text-amber-300">Featured Gift</span>
                  <span className="font-extrabold text-sm truncate">{displayList[0].name}</span>
                  <span className="text-xs font-bold text-white">₹{Number(displayList[0].price).toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ── Product Grid — Real Product Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayList.map((card, idx) => (
            <div
              key={`bday-${card.id || 'card'}-${idx}`}
              onClick={() => openProductModal(card)}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer p-3"
            >
              <div>
                {/* Image Box */}
                <div className="relative aspect-square overflow-hidden bg-stone-50 rounded-2xl flex items-center justify-center">
                  <FixedImage
                    src={card.img || card.image}
                    alt={card.name}
                    type="product"
                    containerClassName="w-full h-full"
                    imageClassName="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  {card.brand && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-stone-900/80 backdrop-blur-xs text-white font-extrabold text-[9px] uppercase rounded-full shadow-xs">
                      {card.brand}
                    </span>
                  )}
                </div>

                {/* Card Details */}
                <div className="pt-3 space-y-1">
                  <h3 className="font-bold text-xs text-gray-900 group-hover:text-olive-700 transition-colors line-clamp-2">
                    {card.name}
                  </h3>
                  
                  <div className="pt-1.5 flex items-baseline justify-between">
                    <span className="font-extrabold text-xs text-olive-800">
                      ₹{Number(card.price).toLocaleString('en-IN')}
                    </span>
                    {card.originalPrice && card.originalPrice > card.price && (
                      <span className="text-[10px] text-stone-400 line-through">
                        ₹{Number(card.originalPrice).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Add CTA */}
              <div className="pt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(card, 1);
                  }}
                  className="w-full py-2 rounded-xl bg-stone-900 group-hover:bg-olive-700 text-white font-bold text-[11px] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add to Enquiry
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
