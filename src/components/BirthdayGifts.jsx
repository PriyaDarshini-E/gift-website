import React from 'react';
import { Sparkles, ArrowRight, Gift, Star, ShoppingBag, Heart, Cake, PartyPopper } from 'lucide-react';
import { useCart } from '../context/CartContext';

/* ── Birthday Category Cards Data ─────────────────────────── */
const birthdayCategories = [
  { id: 1, label: 'Fresh Flowers', sub: 'Hand-picked Roses', price: 999, img: '/images/home/flower_coll_1.png', tag: 'Bestseller' },
  { id: 2, label: 'Artisanal Cakes', sub: 'Red Velvet & Truffle', price: 699, img: '/images/home/cake_red_velvet.png', tag: 'Fresh Baked' },
  { id: 3, label: 'Personalised Gifts', sub: 'Custom Keepsakes', price: 599, img: '/images/home/gift_personalised.png', tag: 'Custom' },
  { id: 4, label: 'Exotic Plants', sub: 'Monstera & Bonsai', price: 899, img: '/images/home/occasion_housewarming.png', tag: 'Air Purifying' },
  { id: 5, label: 'Luxury Hampers', sub: 'Gourmet Sweets', price: 1499, img: '/images/home/bday_card_5.png', tag: 'Luxe Combo' },
];

export default function BirthdayGifts() {
  const { openProductModal, formatPrice, addToCart } = useCart();

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
              Birthday Special Collection
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-[1.15]">
              Joyful Gifts To <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-olive-800 via-rose-700 to-amber-800 bg-clip-text text-transparent">Make It Special</span> 🎉
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm font-sans leading-relaxed max-w-md">
              Surprise your loved ones with express same-day birthday cakes, fresh floral arrangements & personalized keepsake hampers.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="text-xs font-bold text-olive-800 bg-white/90 border border-olive-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
                <Cake className="w-3.5 h-3.5 text-olive-600" />
                Same-Day Delivery
              </span>
              <span className="text-xs font-bold text-rose-800 bg-white/90 border border-rose-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
                <PartyPopper className="w-3.5 h-3.5 text-rose-600" />
                Free Message Card
              </span>
            </div>
          </div>

          {/* Right — High-Res Studio Cake & Gifts Hero Showcase */}
          <div className="relative z-10 flex-shrink-0 w-full md:w-80 lg:w-96">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white aspect-[4/3] group cursor-pointer" onClick={() => openProductModal({ id: 101, name: 'Birthday Celebration Cake & Rose Combo', price: 1699, img: '/images/home/occasion_birthday.png' })}>
              <img 
                src="/images/home/occasion_birthday.png" 
                alt="Birthday Celebration" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-extrabold uppercase text-amber-300">Featured Surprise</span>
                <span className="font-extrabold text-sm truncate">Luxury Birthday Cake & Gifts</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Product Grid — 5 Elevated Category Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {birthdayCategories.map(card => (
            <div
              key={card.id}
              onClick={() => openProductModal(card)}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image Box */}
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={card.img}
                    alt={card.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-amber-500 text-white font-extrabold text-[9px] uppercase rounded-full shadow-xs">
                    {card.tag}
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-xs text-gray-900 group-hover:text-olive-700 transition-colors truncate">
                    {card.label}
                  </h3>
                  <p className="text-[10px] text-stone-500 font-medium truncate">{card.sub}</p>
                  
                  <div className="pt-1.5 flex items-baseline justify-between">
                    <span className="font-extrabold text-xs text-olive-700">{formatPrice(card.price)}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">4.9 ★</span>
                  </div>
                </div>
              </div>

              {/* Quick Add CTA */}
              <div className="p-4 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(card);
                  }}
                  className="w-full py-2 rounded-xl bg-stone-900 group-hover:bg-olive-600 text-white font-bold text-[11px] shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Quick Add
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
