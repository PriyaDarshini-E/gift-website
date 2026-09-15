import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { useOccasions } from '../context/OccasionContext';
import FixedImage from './common/FixedImage';

const DEFAULT_OCCASIONS = [
  {
    id: 1,
    title: 'Anniversary',
    slug: 'anniversary',
    subtitle: 'LOVE & ROMANCE',
    tag: 'Most Loved',
    image: '/images/home/occasion_anniversary.png',
    gradient: 'from-rose-500/20 via-pink-400/10 to-amber-100/30',
    bgCard: 'from-rose-100/60 via-pink-50/40 to-amber-50/50',
    subColor: 'text-rose-700',
    badgeBg: 'bg-rose-100/90 text-rose-800 border-rose-200',
  },
  {
    id: 2,
    title: 'Birthday',
    slug: 'birthday',
    subtitle: 'PARTY & JOY',
    tag: 'Trending',
    image: '/images/home/occasion_birthday.png',
    gradient: 'from-amber-400/20 via-orange-300/10 to-yellow-100/30',
    bgCard: 'from-amber-100/60 via-orange-50/40 to-yellow-50/50',
    subColor: 'text-amber-800',
    badgeBg: 'bg-amber-100/90 text-amber-900 border-amber-200',
  },
  {
    id: 3,
    title: 'Wedding',
    slug: 'wedding',
    subtitle: 'EVERLASTING UNION',
    tag: 'Luxury',
    image: '/images/home/gift_personalised.png',
    gradient: 'from-amber-300/20 via-rose-200/10 to-stone-100/30',
    bgCard: 'from-orange-100/50 via-rose-50/40 to-stone-50/60',
    subColor: 'text-amber-900',
    badgeBg: 'bg-orange-100/90 text-orange-900 border-orange-200',
  },
  {
    id: 4,
    title: 'Rakhi',
    slug: 'rakhi',
    subtitle: 'SIBLING BOND',
    tag: 'Festive',
    image: '/images/home/occasion_rakhi_abroad.png',
    gradient: 'from-orange-500/20 via-red-400/10 to-amber-100/30',
    bgCard: 'from-orange-100/60 via-red-50/40 to-amber-50/50',
    subColor: 'text-orange-800',
    badgeBg: 'bg-orange-100/90 text-orange-900 border-orange-200',
  },
  {
    id: 5,
    title: 'Housewarming',
    slug: 'housewarming',
    subtitle: 'NEW BEGINNINGS',
    tag: 'Curated',
    image: '/images/home/occasion_housewarming.png',
    gradient: 'from-emerald-400/20 via-teal-300/10 to-lime-100/30',
    bgCard: 'from-emerald-100/60 via-teal-50/40 to-lime-50/50',
    subColor: 'text-emerald-800',
    badgeBg: 'bg-emerald-100/90 text-emerald-900 border-emerald-200',
  },
  {
    id: 6,
    title: 'Baby Shower',
    slug: 'baby-shower',
    subtitle: 'LITTLE BLESSINGS',
    tag: 'Sweet Joy',
    image: '/images/home/occasion_babyshower.png',
    gradient: 'from-sky-400/20 via-indigo-300/10 to-purple-100/30',
    bgCard: 'from-sky-100/60 via-indigo-50/40 to-purple-50/50',
    subColor: 'text-sky-800',
    badgeBg: 'bg-sky-100/90 text-sky-900 border-sky-200',
  },
  {
    id: 7,
    title: 'Congratulations',
    slug: 'congratulations',
    subtitle: 'CHEERS & SUCCESS',
    tag: 'Celebration',
    image: '/images/home/flower_coll_4.png',
    gradient: 'from-indigo-400/20 via-purple-300/10 to-amber-100/30',
    bgCard: 'from-indigo-100/60 via-purple-50/40 to-amber-50/50',
    subColor: 'text-indigo-800',
    badgeBg: 'bg-indigo-100/90 text-indigo-900 border-indigo-200',
  },
  {
    id: 8,
    title: 'Thank You',
    slug: 'thank-you',
    subtitle: 'HEARTFELT THANKS',
    tag: 'Gratitude',
    image: '/images/home/flower_coll_3.png',
    gradient: 'from-teal-400/20 via-cyan-300/10 to-rose-100/30',
    bgCard: 'from-teal-100/60 via-cyan-50/40 to-rose-50/50',
    subColor: 'text-teal-800',
    badgeBg: 'bg-teal-100/90 text-teal-900 border-teal-200',
  },
];

export default function OccasionGifts() {
  const containerRef = useRef(null);
  const { occasions, loading } = useOccasions();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const displayList = Array.isArray(occasions) && occasions.length > 0 
    ? occasions 
    : DEFAULT_OCCASIONS;

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
  }, [displayList]);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading && displayList.length === 0) {
    return (
      <div className="bg-stone-50/50 py-12 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 overflow-hidden pb-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="w-[260px] h-[360px] rounded-t-[72px] rounded-b-[28px] bg-stone-100 animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-stone-50/40 py-14 border-b border-gray-100 relative overflow-hidden">
      {/* Decorative ambient background blur lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-semibold tracking-wider uppercase shadow-xs mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              Celebrate Every Moment
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-900 tracking-tight">
              Gifts For Every Occasion{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-olive-750 via-amber-700 to-rose-600">
                & Milestone
              </span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1.5 font-sans max-w-2xl">
              Thoughtfully curated hampers, blooming flowers & gourmet delights handcrafted for life's unforgettable chapters ✨
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'bg-white shadow-md border-gray-200 text-gray-800 hover:bg-olive-750 hover:text-white hover:border-olive-750 hover:scale-105 cursor-pointer'
                  : 'bg-gray-100/70 border-gray-200/60 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Previous Occasions"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'bg-white shadow-md border-gray-200 text-gray-800 hover:bg-olive-750 hover:text-white hover:border-olive-750 hover:scale-105 cursor-pointer'
                  : 'bg-gray-100/70 border-gray-200/60 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Next Occasions"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Arched Cards Slider Row */}
        <div className="relative">
          <div
            ref={containerRef}
            className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth snap-x snap-mandatory"
          >
            {displayList.map((item, idx) => {
              const title = item.title || item.name || `Occasion ${idx + 1}`;
              const slug = item.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const subtitle = item.subtitle || 'CELEBRATION SPECIAL';
              const tag = item.tag || 'Special';
              const bgCard = item.bgCard || 'from-rose-50/70 via-pink-50/40 to-amber-50/50';
              const subColor = item.subColor || 'text-rose-700';
              const badgeBg = item.badgeBg || 'bg-white/90 text-gray-800 border-white/60';

              return (
                <Link
                  to={`/category/${slug}`}
                  key={item.id || slug || idx}
                  className="group flex-shrink-0 w-[240px] sm:w-[270px] snap-start focus:outline-none"
                >
                  {/* Arched Architectural Window Card */}
                  <div
                    className={`relative h-[350px] sm:h-[380px] rounded-t-[80px] sm:rounded-t-[90px] rounded-b-[28px] overflow-hidden bg-gradient-to-b ${bgCard} border border-white/90 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.12)] group-hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between`}
                  >
                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border shadow-xs ${badgeBg}`}>
                        {tag}
                      </span>
                    </div>

                    {/* Arched Image Showcase Area */}
                    <div className="relative w-full h-[220px] sm:h-[240px] pt-10 px-4 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full rounded-t-[60px] rounded-b-2xl overflow-hidden relative shadow-inner">
                        <FixedImage
                          src={item.image}
                          alt={title}
                          type="occasion"
                          containerClassName="w-full h-full"
                          imageClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Bottom Frosted Glassmorphism Plate */}
                    <div className="p-3.5 sm:p-4 m-2.5 rounded-[22px] bg-white/90 backdrop-blur-md border border-white shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300 z-10">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <span className={`block text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase mb-0.5 ${subColor} font-sans truncate`}>
                            {subtitle}
                          </span>
                          <h3 className="text-base sm:text-lg font-extrabold text-gray-900 font-sans tracking-tight group-hover:text-olive-750 transition-colors truncate">
                            {title}
                          </h3>
                        </div>

                        {/* Interactive Circle Action Pill */}
                        <div className="w-8 h-8 rounded-full bg-stone-100 text-gray-700 flex items-center justify-center flex-shrink-0 group-hover:bg-olive-750 group-hover:text-white group-hover:scale-105 group-hover:rotate-45 transition-all duration-300 shadow-2xs">
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
