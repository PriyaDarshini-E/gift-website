import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Luxury Crest & Ribbon Monogram Brand Logo
 * Features a crafted gold & emerald insignia with 'MC' monogram, ribbon bow, and refined typography.
 */
export default function BrandLogo({
  size = 'md', // 'sm', 'md', 'lg'
  variant = 'default', // 'default', 'light', 'monochrome'
  showTagline = true,
  to = '/',
  className = '',
}) {
  // Sizing configurations
  const sizes = {
    sm: {
      emblem: 'w-7 h-7',
      title: 'text-base',
      tagline: 'text-[7px]',
      gap: 'gap-1.5',
    },
    md: {
      emblem: 'w-8 h-8 sm:w-9 sm:h-9',
      title: 'text-base sm:text-lg',
      tagline: 'text-[7.5px] sm:text-[8px]',
      gap: 'gap-2 sm:gap-2.5',
    },
    lg: {
      emblem: 'w-12 h-12',
      title: 'text-xl sm:text-2xl',
      tagline: 'text-[9.5px]',
      gap: 'gap-3',
    },
  };

  const currentSize = sizes[size] || sizes.md;

  const LogoContent = (
    <div className={`flex items-center ${currentSize.gap} group cursor-pointer select-none ${className}`}>
      
      {/* Luxury Crest & Monogram Emblem */}
      <div className={`relative ${currentSize.emblem} flex-shrink-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105`}>
        {/* Ambient Glow behind crest */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/30 via-emerald-400/20 to-amber-200/40 rounded-xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Outer Shield / Faceted Badge */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-stone-900 via-olive-950 to-emerald-950 p-[1.5px] shadow-[0_2px_8px_rgba(28,68,42,0.18)] group-hover:shadow-[0_4px_14px_rgba(217,119,6,0.25)] transition-shadow duration-300">
          <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#1c3a26] via-[#14281b] to-[#0c1a11] flex items-center justify-center relative overflow-hidden border border-amber-400/30">
            
            {/* Shimmer line shine overlay on hover */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-amber-200/20 to-transparent rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />

            {/* Bespoke Luxury Vector Crest SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-[82%] h-[82%] drop-shadow-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gold Gradient */}
                <linearGradient id="mcGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF1B8" />
                  <stop offset="35%" stopColor="#F5D061" />
                  <stop offset="70%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#AA7C11" />
                </linearGradient>

                {/* Soft Gold Gradient */}
                <linearGradient id="mcSoftGold" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#FFEAA7" />
                </linearGradient>
              </defs>

              {/* Decorative Geometric Octagon / Crest Frame */}
              <polygon
                points="50,6 88,22 94,62 68,92 32,92 6,62 12,22"
                stroke="url(#mcGoldGrad)"
                strokeWidth="2.2"
                strokeDasharray="2 1.5"
                opacity="0.45"
              />

              {/* Ribbon Bow Crown at the Top */}
              <path
                d="M50 22 C42 12, 28 14, 34 24 C38 30, 48 26, 50 24 Z"
                fill="url(#mcGoldGrad)"
                opacity="0.95"
              />
              <path
                d="M50 22 C58 12, 72 14, 66 24 C62 30, 52 26, 50 24 Z"
                fill="url(#mcGoldGrad)"
                opacity="0.95"
              />
              <circle cx="50" cy="23" r="3.2" fill="#FFEAA7" stroke="#996515" strokeWidth="1" />

              {/* Stylized Interlocking Monogram 'M' & 'C' */}
              <path
                d="M28 72 V38 L50 56 L72 38 V72"
                stroke="url(#mcGoldGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M66 45 C60 37, 40 37, 36 54 C32 68, 52 75, 64 68"
                stroke="url(#mcSoftGold)"
                strokeWidth="3.2"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Central Diamond Sparkle Jewel */}
              <path
                d="M50 63 L52.5 68 L50 73 L47.5 68 Z"
                fill="url(#mcGoldGrad)"
              />

              {/* Sparkle Star at the Top */}
              <path
                d="M50 8 L51.2 12.5 L55.5 13.7 L51.2 15 L50 19.5 L48.8 15 L44.5 13.7 L48.8 12.5 Z"
                fill="#FFF1B8"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Typography & Tagline */}
      <div className="flex flex-col text-left justify-center">
        {/* Primary Brand Name */}
        <div className="flex items-center gap-0.5 leading-tight">
          <span className={`font-display font-black ${currentSize.title} tracking-tight text-gray-900 group-hover:text-emerald-950 transition-colors duration-200`}>
            Memory
          </span>
          <span className={`font-display font-black ${currentSize.title} tracking-tight bg-gradient-to-r from-olive-800 via-emerald-800 to-amber-700 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-amber-600 transition-all duration-200`}>
            Creators
          </span>
          <span className="text-amber-500 text-[10px] sm:text-xs font-bold opacity-80 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300 ml-0.5">
            ✦
          </span>
        </div>

        {/* Subtitle / Tagline Badge */}
        {showTagline && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className="h-[1px] w-1.5 sm:w-2 bg-gradient-to-r from-transparent to-amber-500/70" />
            <span className={`${currentSize.tagline} font-extrabold uppercase tracking-[0.2em] text-amber-700/90 font-sans group-hover:text-amber-600 transition-colors duration-200`}>
              Curated Gifting
            </span>
            <span className="h-[1px] w-1.5 sm:w-2 bg-gradient-to-l from-transparent to-amber-500/70" />
          </div>
        )}
      </div>

    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg">
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
}
