import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Category tabs ─────────────────────────────────────── */
const categories = [
  { id: 'flowers',      label: 'Flowers',      emoji: '🌸' },
  { id: 'cakes',        label: 'Cakes',         emoji: '🎂' },
  { id: 'personalised', label: 'Personalised',  emoji: '🎁' },
  { id: 'hampers',      label: 'Hampers',       emoji: '🧺' },
  { id: 'chocolates',   label: 'Chocolates',    emoji: '🍫' },
];

/* ─── Placeholder gradients per category ────────────────── */
const categoryGradients = {
  flowers:      ['from-pink-100 via-rose-50 to-fuchsia-100',   'from-violet-100 via-purple-50 to-pink-100',  'from-rose-100 via-pink-50 to-red-50',        'from-fuchsia-100 via-pink-50 to-rose-100',  'from-pink-50 via-fuchsia-50 to-violet-100',  'from-rose-50 via-pink-100 to-fuchsia-50'  ],
  cakes:        ['from-amber-100 via-yellow-50 to-orange-100', 'from-red-100 via-rose-50 to-pink-100',       'from-orange-100 via-amber-50 to-yellow-100', 'from-brown-50 via-amber-100 to-orange-50',  'from-blue-100 via-indigo-50 to-purple-100',  'from-yellow-100 via-amber-50 to-orange-50'],
  personalised: ['from-sky-100 via-blue-50 to-indigo-100',    'from-teal-100 via-cyan-50 to-sky-100',       'from-indigo-100 via-blue-50 to-sky-100',     'from-cyan-100 via-teal-50 to-green-100',    'from-purple-100 via-violet-50 to-indigo-100','from-sky-50 via-blue-100 to-cyan-50'      ],
  hampers:      ['from-orange-100 via-amber-50 to-yellow-100','from-lime-100 via-green-50 to-teal-100',     'from-emerald-100 via-teal-50 to-cyan-100',  'from-yellow-100 via-lime-50 to-green-100',  'from-amber-50 via-orange-100 to-red-50',     'from-green-50 via-emerald-100 to-teal-50' ],
  chocolates:   ['from-amber-200 via-yellow-100 to-orange-100','from-stone-200 via-amber-100 to-yellow-50', 'from-orange-200 via-amber-100 to-yellow-100','from-yellow-100 via-amber-200 to-orange-50','from-rose-100 via-pink-50 to-amber-50',       'from-amber-100 via-orange-50 to-red-50'   ],
};
const categoryEmoji = { flowers:'🌸', cakes:'🎂', personalised:'🎁', hampers:'🧺', chocolates:'🍫' };

/* ─── Static product data per category ──────────────────── */
const products = {
  flowers: [
    { id: 1, name: 'Blue Horizon Ribbons', price: '₹2,199', mrp: '₹2,999', badge: 'Bestseller', img: '/images/home/bestseller_flower_1.png' },
    { id: 2, name: 'Sunlit Charm Sunflower Bouquet', price: '₹2,999', mrp: '₹3,499', badge: 'Bestseller', img: '/images/home/bestseller_flower_2.png' },
    { id: 3, name: 'Pastel Flora Celebration Arrangement', price: '₹2,899', mrp: null, badge: 'LUXE', img: '/images/home/bestseller_flower_3.png' },
    { id: 4, name: 'Rosy Orchid Celebration Bouquet', price: '₹749', mrp: '₹1,099', badge: 'Bestseller', img: '/images/home/bestseller_flower_4.png' },
  ],
  cakes: [
    { id: 1, name: 'Chocolate Truffle Cake',   price: '₹699',  mrp: '₹899',  badge: 'Bestseller', img: '/images/home/chocolate.png' },
    { id: 2, name: 'Strawberry Dream Cake',    price: '₹749',  mrp: '₹999',  badge: 'Bestseller', img: '/images/home/fruits.png' },
    { id: 3, name: 'Red Velvet Classic',       price: '₹849',  mrp: null,    badge: null,         img: '/images/home/cake_red_velvet.png' },
    { id: 4, name: 'Black Forest Cake',        price: '₹799',  mrp: '₹999',  badge: 'Bestseller', img: '/images/home/cake_black_forest.png' },
    { id: 5, name: 'Blueberry Cheesecake',     price: '₹899',  mrp: '₹1,199',badge: null,         img: '/images/home/banner1.png' },
    { id: 6, name: 'Mango Cream Cake',         price: '₹749',  mrp: '₹899',  badge: 'Bestseller', img: '/images/home/pineapple.png' },
  ],
  personalised: [
    { id: 1, name: 'Photo Frame Gift',         price: '₹599',  mrp: '₹799',  badge: 'Bestseller', img: '/images/home/gift_personalised.png' },
    { id: 2, name: 'Custom Name Cushion',      price: '₹449',  mrp: '₹599',  badge: null,         img: '/images/home/raksha2.png' },
    { id: 3, name: 'Engraved Keychain Set',    price: '₹349',  mrp: '₹499',  badge: 'Bestseller', img: '/images/home/combos.png' },
    { id: 4, name: 'Name Printed Mug',         price: '₹299',  mrp: null,    badge: null,         img: '/images/home/flower_coll_3.png' },
    { id: 5, name: 'Custom LED Night Lamp',    price: '₹699',  mrp: '₹899',  badge: 'Bestseller', img: '/images/home/gift_personalised.png' },
    { id: 6, name: 'Personalised Photo Book',  price: '₹799',  mrp: '₹1,099',badge: null,         img: '/images/home/raksha4.png' },
  ],
  hampers: [
    { id: 1, name: 'Festive Dry Fruits Hamper',price: '₹1,299',mrp: '₹1,699',badge: 'Bestseller', img: '/images/home/combos.png' },
    { id: 2, name: 'Tea & Honey Gift Box',     price: '₹899',  mrp: '₹1,199',badge: null,         img: '/images/home/flower_coll_2.png' },
    { id: 3, name: 'Luxury Spa Hamper',        price: '₹1,599',mrp: '₹2,099',badge: 'Bestseller', img: '/images/home/flower_coll_1.png' },
    { id: 4, name: 'Gourmet Snack Basket',     price: '₹999',  mrp: '₹1,299',badge: 'Bestseller', img: '/images/home/combos.png' },
    { id: 5, name: 'Coffee & Cookies Combo',   price: '₹699',  mrp: '₹899',  badge: null,         img: '/images/home/flower_coll_3.png' },
    { id: 6, name: 'Wellness Gift Set',        price: '₹1,199',mrp: '₹1,499',badge: 'Bestseller', img: '/images/home/gift_personalised.png' },
  ],
  chocolates: [
    { id: 1, name: 'Belgian Truffle Box',      price: '₹599',  mrp: '₹799',  badge: 'Bestseller', img: '/images/home/chocolate.png' },
    { id: 2, name: 'Dark Chocolate Assortment',price: '₹449',  mrp: '₹599',  badge: null,         img: '/images/home/combos.png' },
    { id: 3, name: 'Ferrero Rocher Gift Pack', price: '₹699',  mrp: '₹899',  badge: 'Bestseller', img: '/images/home/chocolate.png' },
    { id: 4, name: 'Milk Chocolate Tower',        price: '₹549',  mrp: '₹749',  badge: null,         img: '/images/home/butterscoth.png' },
    { id: 5, name: 'Praline Selection Box',        price: '₹799',  mrp: '₹999',  badge: 'Bestseller', img: '/images/home/raksha3.png' },
    { id: 6, name: 'White Chocolate Dipped Fruit', price: '₹649',  mrp: '₹849',  badge: null,         img: '/images/home/raksha5.png' },
  ],
};

/* ─── Constants ──────────────────────────────────────────── */
const CARD_GAP = 16; // px between cards
const VISIBLE  = 5;  // cards visible at once

export default function BestSellers() {
  const [activeTab, setActiveTab]     = useState('flowers');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]     = useState(0);
  const containerRef = useRef(null);

  const items    = products[activeTab] || [];
  const maxIndex = Math.max(items.length - VISIBLE, 0);
  const showLeft  = currentIndex > 0;
  const showRight = currentIndex < maxIndex;

  /* measure card width from container */
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const totalGap = CARD_GAP * (VISIBLE - 1);
        setCardWidth((containerRef.current.clientWidth - totalGap) / VISIBLE);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* reset scroll on tab change */
  const handleTabChange = (id) => {
    setActiveTab(id);
    setCurrentIndex(0);
  };

  const handlePrev = () => { if (showLeft)  setCurrentIndex(i => i - 1); };
  const handleNext = () => { if (showRight) setCurrentIndex(i => i + 1); };

  const translateX = currentIndex * (cardWidth + CARD_GAP);

  return (
    <div className="bg-[#faf8f5] py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <div className="mb-5">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
            Shop By Bestsellers
          </h2>
          <p className="text-gray-500 text-sm mt-1 font-sans max-w-xl">
            Discover India's favourite gifting options, curated bestsellers that make every celebration extra special
          </p>
        </div>

        {/* ── Category filter tabs ── */}
        <div className="flex gap-2 sm:gap-3 mb-6 overflow-x-auto scrollbar-none pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleTabChange(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold font-sans whitespace-nowrap border transition-all duration-200
                ${activeTab === cat.id
                  ? 'bg-white border-red-400 text-red-500 shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
            >
              <span className="text-base leading-none">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Carousel ── */}
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
              {items.map(product => (
                <div
                  key={product.id}
                  className="flex-shrink-0 cursor-pointer group"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/* Product image container */}
                  <div
                    className="w-full overflow-hidden rounded-[12px] mb-3 flex items-center justify-center bg-gray-50 group-hover:scale-[1.02] transition-transform duration-200"
                    style={{ aspectRatio: '3/4' }}
                  >
                    {product.img ? (
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 select-none"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${(categoryGradients[activeTab] || [])[product.id - 1] || 'from-gray-100 to-gray-200'}`}>
                        <span className="text-4xl opacity-50 select-none">{categoryEmoji[activeTab]}</span>
                      </div>
                    )}
                  </div>

                  {/* Product info below image */}
                  <div className="px-0.5">
                    <p className="text-[12px] text-gray-700 font-sans font-medium leading-snug line-clamp-2 mb-1">
                      {product.name}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-bold text-gray-900 font-sans">
                        {product.price}
                      </span>
                      {product.mrp && (
                        <span className="text-[11px] text-gray-400 line-through font-sans">
                          {product.mrp}
                        </span>
                      )}
                    </div>

                    {product.badge && (
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold font-sans rounded-sm tracking-wide uppercase">
                        {product.badge}
                      </span>
                    )}
                  </div>
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

        {/* ── View All link ── */}
        <div className="flex justify-center mt-8">
          <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-6 py-2 hover:bg-gray-50 transition-colors duration-200 font-sans">
            View All {categories.find(c => c.id === activeTab)?.label}
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}
