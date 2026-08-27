import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Offers Data ─────────────────────────────────────────── */
const offers = [
  {
    id: 1,
    partner: 'Airtel Payments Bank',
    partnerType: 'airtel',
    tagline: 'ENJOY UP TO ₹200',
    title: 'Flat 10% Off',
    tnc: 'T&C Apply | On minimum order of ₹1999',
    bgColor: 'bg-[#fff0bd]',
    borderColor: 'border-[#ffe494]',
  },
  {
    id: 2,
    partner: 'MobiKwik',
    partnerType: 'mobikwik',
    tagline: 'ENJOY UP TO',
    title: '₹300 Cashback',
    tnc: 'T&C Apply | On Minimum Transaction of ₹699',
    bgColor: 'bg-[#fff0bd]',
    borderColor: 'border-[#ffe494]',
  },
  {
    id: 3,
    partner: 'Paytm UPI',
    partnerType: 'paytm',
    tagline: 'ENJOY UP TO',
    title: '₹300 Cashback',
    tnc: 'T&C Apply | On Payments using Paytm UPI',
    bgColor: 'bg-[#fff0bd]',
    borderColor: 'border-[#ffe494]',
  },
  {
    id: 4,
    partner: 'CRED Pay',
    partnerType: 'cred',
    tagline: 'ASSURED CASHBACK UP TO',
    title: '₹250 Cashback',
    tnc: 'T&C Apply | On minimum order of ₹1299',
    bgColor: 'bg-[#fff0bd]',
    borderColor: 'border-[#ffe494]',
  },
  {
    id: 5,
    partner: 'PhonePe',
    partnerType: 'phonepe',
    tagline: 'ENJOY UP TO',
    title: 'Flat ₹150 Off',
    tnc: 'T&C Apply | On minimum order of ₹899',
    bgColor: 'bg-[#fff0bd]',
    borderColor: 'border-[#ffe494]',
  }
];

const CARD_GAP = 20; // px between cards
const VISIBLE  = 3;  // cards visible on desktop

export default function SaveMoreOffers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth]       = useState(0);
  const containerRef = useRef(null);

  const maxIndex  = Math.max(offers.length - VISIBLE, 0);
  const showLeft  = currentIndex > 0;
  const showRight = currentIndex < maxIndex;

  const measure = useCallback(() => {
    if (containerRef.current) {
      const totalGap = CARD_GAP * (VISIBLE - 1);
      setCardWidth((containerRef.current.clientWidth - totalGap) / VISIBLE);
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

  return (
    <div className="bg-white py-10 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 mb-6">
          Save More with Offers
        </h2>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>

          {/* ← Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className={`absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-md border border-gray-200 flex items-center justify-center
              text-gray-600 hover:text-gray-900 transition-all duration-200
              ${showLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Track Container */}
          <div className="overflow-hidden py-3">
            <div
              className="flex"
              style={{
                gap: `${CARD_GAP}px`,
                transform: cardWidth ? `translateX(-${translateX}px)` : 'none',
                transition: 'transform 420ms ease-in-out',
              }}
            >
              {offers.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 cursor-pointer group"
                  style={{ width: cardWidth || `${100 / VISIBLE}%` }}
                >
                  {/* Ticket Card Wrapper */}
                  <div
                    className={`w-full ${item.bgColor} border ${item.borderColor} rounded-[20px] relative overflow-hidden
                      p-5 sm:p-6 min-h-[175px] sm:min-h-[190px] flex flex-col justify-between
                      group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 select-none`}
                  >
                    {/* Metallic Sheen Pass on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

                    {/* Top Notch Cutout */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-b border-gray-200/50" />

                    {/* Bottom Notch Cutout */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-t border-gray-200/50" />

                    {/* Watermark Percentage Badge (Top Right) */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fde68a]/40 flex items-center justify-center pointer-events-none">
                      <span className="text-[#d97706]/35 font-black text-2xl sm:text-3xl font-sans">%</span>
                    </div>

                    {/* Top Row: Partner Logo / Brand Name */}
                    <div className="relative z-10">
                      {item.partnerType === 'airtel' && (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xs">
                            a
                          </div>
                          <div>
                            <span className="text-red-600 font-extrabold text-sm sm:text-base leading-none block">
                              Payments
                            </span>
                            <span className="text-red-600 font-bold text-xs leading-none block">
                              Bank
                            </span>
                          </div>
                        </div>
                      )}

                      {item.partnerType === 'mobikwik' && (
                        <div className="flex items-center gap-1 text-[#0073e6] font-black text-xl sm:text-2xl font-sans italic tracking-tighter">
                          <span>MobiKwik</span>
                        </div>
                      )}

                      {item.partnerType === 'paytm' && (
                        <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base font-sans">
                          <span className="text-[#002e6e] font-black text-lg sm:text-xl">paytm</span>
                          <span className="text-gray-700 text-xs sm:text-sm font-semibold">से</span>
                          <span className="text-[#002e6e] font-black text-lg sm:text-xl tracking-tight">UPI</span>
                        </div>
                      )}

                      {item.partnerType === 'cred' && (
                        <div className="flex items-center gap-1 text-gray-900 font-black text-lg sm:text-xl font-sans tracking-wider uppercase">
                          <span>CRED</span>
                          <span className="text-xs font-normal text-gray-500">pay</span>
                        </div>
                      )}

                      {item.partnerType === 'phonepe' && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-xs">
                            पे
                          </div>
                          <span className="text-[#5f259f] font-black text-base sm:text-lg font-sans">
                            PhonePe
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Middle Row: Offer Headline */}
                    <div className="relative z-10 my-2">
                      <p className="text-[10px] sm:text-[11px] font-extrabold text-gray-700 tracking-wider font-sans uppercase">
                        {item.tagline}
                      </p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 font-sans tracking-tight leading-tight mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    {/* Bottom Row: T&C Footer */}
                    <div className="relative z-10 border-t border-gray-900/10 pt-2 mt-1">
                      <p className="text-[9px] sm:text-[10px] text-gray-600 font-sans font-medium">
                        {item.tnc}
                      </p>
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
            className={`absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
              bg-white shadow-md border border-gray-200 flex items-center justify-center
              text-gray-600 hover:text-gray-900 transition-all duration-200
              ${showRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

      </div>
    </div>
  );
}
