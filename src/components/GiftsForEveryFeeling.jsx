import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Send, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import FixedImage from './common/FixedImage';

const FEELINGS_DATA = [
  {
    id: 1,
    title: 'Love & Romance',
    slug: 'love-romance',
    tagline: 'Forever & Always',
    emoji: '🌹',
    img: '/images/home/GiftsforLove.png',
    bgGradient: 'from-rose-500/20 via-pink-400/10 to-rose-50/50',
    cardBg: 'from-rose-50 via-pink-50/60 to-rose-100/40',
    textColor: 'text-rose-950',
    subColor: 'text-rose-700',
    badgeBg: 'bg-rose-100/90 text-rose-800 border-rose-200/80',
    btnColor: 'bg-rose-600 hover:bg-rose-700 text-white',
    price: 1299,
  },
  {
    id: 2,
    title: 'Thinking of You',
    slug: 'thinking-of-you',
    tagline: 'Always on My Mind',
    emoji: '💜',
    img: '/images/home/Giftsforthinkingyou.png',
    bgGradient: 'from-purple-500/20 via-indigo-400/10 to-purple-50/50',
    cardBg: 'from-purple-50 via-indigo-50/60 to-purple-100/40',
    textColor: 'text-purple-950',
    subColor: 'text-purple-700',
    badgeBg: 'bg-purple-100/90 text-purple-800 border-purple-200/80',
    btnColor: 'bg-purple-600 hover:bg-purple-700 text-white',
    price: 1149,
  },
  {
    id: 3,
    title: 'Miss You',
    slug: 'miss-you',
    tagline: 'Wish You Were Here',
    emoji: '🧸',
    img: '/images/home/Giftsformissypu.png',
    bgGradient: 'from-amber-500/20 via-rose-300/10 to-amber-50/50',
    cardBg: 'from-amber-50 via-orange-50/60 to-amber-100/40',
    textColor: 'text-amber-950',
    subColor: 'text-amber-800',
    badgeBg: 'bg-amber-100/90 text-amber-900 border-amber-200/80',
    btnColor: 'bg-amber-700 hover:bg-amber-800 text-white',
    price: 1099,
  },
  {
    id: 4,
    title: 'I am Sorry',
    slug: 'i-am-sorry',
    tagline: 'Mending Hearts Gently',
    emoji: '🕊️',
    img: '/images/home/GiftsforSorry.png',
    bgGradient: 'from-teal-500/20 via-emerald-300/10 to-teal-50/50',
    cardBg: 'from-teal-50 via-emerald-50/60 to-teal-100/40',
    textColor: 'text-teal-950',
    subColor: 'text-teal-800',
    badgeBg: 'bg-teal-100/90 text-teal-900 border-teal-200/80',
    btnColor: 'bg-teal-700 hover:bg-teal-800 text-white',
    price: 999,
  },
  {
    id: 5,
    title: 'Sympathy & Care',
    slug: 'sympathy',
    tagline: 'Warm Comfort & Peace',
    emoji: '🕯️',
    img: '/images/home/Giftsforsympathy.png',
    bgGradient: 'from-stone-500/20 via-amber-200/10 to-stone-50/50',
    cardBg: 'from-stone-50 via-warm-gray-50/60 to-stone-100/40',
    textColor: 'text-stone-900',
    subColor: 'text-stone-700',
    badgeBg: 'bg-stone-100/90 text-stone-800 border-stone-200/80',
    btnColor: 'bg-stone-700 hover:bg-stone-800 text-white',
    price: 1199,
  },
  {
    id: 6,
    title: 'Congratulations',
    slug: 'congratulations',
    tagline: 'Cheers to Success!',
    emoji: '🎉',
    img: '/images/home/flower_coll_4.png',
    bgGradient: 'from-yellow-500/20 via-orange-400/10 to-yellow-50/50',
    cardBg: 'from-yellow-50 via-amber-50/60 to-orange-100/40',
    textColor: 'text-amber-950',
    subColor: 'text-amber-800',
    badgeBg: 'bg-yellow-100/90 text-yellow-900 border-yellow-200/80',
    btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
    price: 1399,
  },
  {
    id: 7,
    title: 'Get Well Soon',
    slug: 'get-well-soon',
    tagline: 'Bright Sunshine & Hugs',
    emoji: '🌻',
    img: '/images/home/flower_coll_2.png',
    bgGradient: 'from-emerald-500/20 via-lime-300/10 to-emerald-50/50',
    cardBg: 'from-emerald-50 via-lime-50/60 to-emerald-100/40',
    textColor: 'text-emerald-950',
    subColor: 'text-emerald-800',
    badgeBg: 'bg-emerald-100/90 text-emerald-900 border-emerald-200/80',
    btnColor: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    price: 1049,
  },
  {
    id: 8,
    title: 'Thank You',
    slug: 'thank-you',
    tagline: 'Heartfelt Gratitude',
    emoji: '✨',
    img: '/images/home/flower_coll_3.png',
    bgGradient: 'from-pink-500/20 via-rose-300/10 to-pink-50/50',
    cardBg: 'from-pink-50 via-rose-50/60 to-pink-100/40',
    textColor: 'text-rose-950',
    subColor: 'text-rose-700',
    badgeBg: 'bg-pink-100/90 text-pink-900 border-pink-200/80',
    btnColor: 'bg-rose-600 hover:bg-rose-700 text-white',
    price: 1199,
  },
];

export default function GiftsForEveryFeeling({ data }) {
  const { openProductModal } = useCart();
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const feelings = (Array.isArray(data) && data.length > 0)
    ? data
    : FEELINGS_DATA;

  const updateScrollState = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      updateScrollState();
      el.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
      return () => {
        el.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }
  }, [feelings]);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white py-14 border-b border-gray-100 relative overflow-hidden">
      {/* Soft ambient mood lights */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-pink-800 text-xs font-semibold tracking-wider uppercase shadow-xs mb-2.5">
              <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-500/30 animate-pulse" />
              Emotional Expressions
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-900 tracking-tight">
              Gifts For Every{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600">
                Feeling & Emotion
              </span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1.5 font-sans max-w-2xl">
              When words aren't enough, express love, care, comfort, and celebration with gifts straight from the heart ✨
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'bg-white shadow-md border-gray-200 text-gray-800 hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:scale-105 cursor-pointer'
                  : 'bg-gray-100/70 border-gray-200/60 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Previous Feelings"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'bg-white shadow-md border-gray-200 text-gray-800 hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:scale-105 cursor-pointer'
                  : 'bg-gray-100/70 border-gray-200/60 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Next Feelings"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Glowing Mood Capsule Carousel */}
        <div className="relative">
          <div
            ref={containerRef}
            className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth snap-x snap-mandatory"
          >
            {feelings.map((item, idx) => {
              const title = item.title || `Feeling ${idx + 1}`;
              const tagline = item.tagline || 'Expressed With Love';
              const emoji = item.emoji || '🎁';
              const cardBg = item.cardBg || 'from-rose-50 via-pink-50/60 to-rose-100/40';
              const subColor = item.subColor || 'text-rose-700';
              const badgeBg = item.badgeBg || 'bg-white/90 text-gray-800 border-gray-200';
              const btnColor = item.btnColor || 'bg-rose-600 hover:bg-rose-700 text-white';

              return (
                <div
                  key={item.id || idx}
                  className="group flex-shrink-0 w-[230px] sm:w-[260px] snap-start"
                >
                  {/* Glowing Mood Capsule Card */}
                  <div
                    className={`relative h-[360px] sm:h-[390px] rounded-[32px] overflow-hidden bg-gradient-to-b ${cardBg} border border-white/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.12)] group-hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between p-3.5`}
                  >
                    {/* Floating Animated Sentiment Emoji Pill */}
                    <div className="flex items-center justify-between gap-2 z-20 px-1 pt-1">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md border shadow-2xs ${badgeBg}`}>
                        <span className="text-base group-hover:scale-125 transition-transform duration-300 inline-block">{emoji}</span>
                        <span>{title}</span>
                      </span>

                      <div className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-rose-500 shadow-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Visual Photo Window */}
                    <div className="relative w-full h-[185px] sm:h-[200px] my-2 rounded-2xl overflow-hidden bg-white/70 shadow-inner flex items-center justify-center p-2">
                      <FixedImage
                        src={item.img}
                        alt={title}
                        type="occasion"
                        containerClassName="w-full h-full rounded-xl overflow-hidden"
                        imageClassName="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Emotive Caption & Action Plate */}
                    <div className="p-3.5 rounded-[22px] bg-white/90 backdrop-blur-md border border-white shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <div className="text-left mb-2.5">
                        <p className={`text-[11px] font-semibold italic ${subColor} font-sans truncate flex items-center gap-1`}>
                          <span>"{tagline}"</span>
                        </p>
                        <h3 className="text-base font-extrabold text-gray-900 font-sans tracking-tight truncate">
                          {title}
                        </h3>
                      </div>

                      {/* Quick Send Gift Button */}
                      <button
                        onClick={() => openProductModal({
                          id: item.id || idx + 100,
                          name: `${title} Curated Gift Box`,
                          price: item.price || 1199,
                          originalPrice: Math.round((item.price || 1199) * 1.3),
                          img: item.img || '/images/home/GiftsforLove.png',
                          category: 'Gifts For Feelings',
                        })}
                        className={`w-full py-2 px-3 rounded-xl ${btnColor} text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer`}
                      >
                        <span>Send Gift</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
