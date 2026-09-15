import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, ShoppingBag, Truck, Tag } from 'lucide-react';
import { useBanners } from '../context/BannerContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import FixedImage from './common/FixedImage';

export default function SideBannerSection({ 
  position = 'Left', 
  bannerIndex = 0,
  customTitle = '',
  customSubtitle = '',
  className = ''
}) {
  const { getBannersByPosition, loading } = useBanners();
  const { products: allProducts } = useProducts();
  const { openProductModal, addToCart, formatPrice } = useCart();

  const isLeft = position.toLowerCase() === 'left';
  const isRight = position.toLowerCase() === 'right';

  const banners = useMemo(() => {
    return getBannersByPosition(position);
  }, [getBannersByPosition, position]);

  const activeBanner = banners[bannerIndex] || banners[0] || null;

  // Curate 4 related products based on banner keywords or category
  const relatedProducts = useMemo(() => {
    if (!activeBanner || !Array.isArray(allProducts) || allProducts.length === 0) return [];
    
    const bannerText = `${activeBanner.title || ''} ${activeBanner.alt || ''} ${activeBanner.subtitle || ''}`.toLowerCase();
    
    // Keyword match
    let matched = allProducts.filter((p) => {
      const name = (p.name || '').toLowerCase();
      const cat = (p.category || '').toLowerCase();
      const subCat = (p.subCategory || '').toLowerCase();
      const tag = (p.tag || '').toLowerCase();

      if (bannerText.includes('personalized') || bannerText.includes('photo') || bannerText.includes('keepsake')) {
        return cat.includes('frame') || subCat.includes('frame') || name.includes('frame') || name.includes('custom') || name.includes('photo');
      }
      if (bannerText.includes('trending') || bannerText.includes('collection') || bannerText.includes('express')) {
        return tag.includes('trending') || tag.includes('bestseller') || cat.includes('cake') || cat.includes('flower');
      }
      if (bannerText.includes('diwali') || bannerText.includes('festive')) {
        return cat.includes('chocolate') || name.includes('sweet') || name.includes('combo') || cat.includes('flower');
      }
      if (bannerText.includes('wedding') || bannerText.includes('anniversary')) {
        return cat.includes('flower') || cat.includes('cake') || cat.includes('chocolate') || name.includes('rose');
      }
      return false;
    });

    if (matched.length >= 4) {
      return matched.slice(0, 4);
    }

    // Fallback: mix of best rated products
    const remaining = allProducts.filter(p => !matched.some(m => m.id === p.id));
    return [...matched, ...remaining].slice(0, 4);
  }, [activeBanner, allProducts]);

  if (!activeBanner) {
    return null;
  }

  // Derive target navigation link from CRM banner_link or smart category fallback
  const rawLink = activeBanner.link || (
    activeBanner.title?.toLowerCase().includes('personalized') || activeBanner.title?.toLowerCase().includes('photo')
      ? '/category/frames'
      : activeBanner.title?.toLowerCase().includes('trending')
      ? '/category/cakes'
      : '/category/chocolates'
  );

  const isExternal = rawLink.startsWith('http://') || rawLink.startsWith('https://');
  const bannerLink = rawLink;

  const heading = customTitle || activeBanner.title || (isLeft ? 'Curated Trends' : 'Special Collection');
  const subHeading = customSubtitle || activeBanner.subtitle || 'Handpicked gifts paired perfectly with this collection';

  const bannerCardContent = (
    <div className="w-full h-full flex flex-col justify-between rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-stone-200/90 bg-white transition-all duration-300 group relative cursor-pointer">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-stone-100 min-h-[260px] sm:min-h-[320px]">
        <FixedImage
          src={activeBanner.image}
          alt={activeBanner.title || 'Featured Banner'}
          type="banner"
          containerClassName="w-full h-full"
          imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay for Text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-transparent" />

        {/* Bottom Banner Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Featured Offer
          </span>

          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug drop-shadow-sm">
            {activeBanner.title}
          </h3>

          <div className="inline-flex items-center gap-2 text-xs font-bold text-white bg-olive-700 hover:bg-olive-800 px-4 py-2 rounded-xl transition-all shadow-md group-hover:gap-3">
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );

  const bannerCard = isExternal ? (
    <a href={bannerLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
      {bannerCardContent}
    </a>
  ) : (
    <Link to={bannerLink} className="block w-full h-full">
      {bannerCardContent}
    </Link>
  );

  const productGrid = (
    <div className="flex flex-col justify-between h-full space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-olive-700 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended Pairings</span>
          </div>
          <h4 className="font-display font-extrabold text-xl sm:text-2xl text-gray-900 tracking-tight">
            {heading}
          </h4>
        </div>

        <Link
          to={bannerLink}
          className="text-xs font-bold text-olive-700 hover:text-olive-800 flex items-center gap-1 group transition-colors bg-olive-50/80 hover:bg-olive-100 px-3 py-1.5 rounded-xl flex-shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 2x2 Grid of Related Product / Offer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {relatedProducts.map((p) => {
          const name = p.name || p.title || 'Curated Gift';
          const price = Number(p.price || 0);
          const originalPrice = Number(p.originalPrice || Math.round(price * 1.25));
          const image = p.img || p.image;
          const rating = p.rating || 4.8;
          const tag = p.tag || 'Trending';
          const category = p.category || 'Gifts';

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-stone-200/80 p-3 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div 
                onClick={() => openProductModal(p)}
                className="flex items-center gap-3 cursor-pointer"
              >
                {/* Product Thumbnail */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-100">
                  <FixedImage
                    src={image}
                    alt={name}
                    type="product"
                    containerClassName="w-full h-full"
                    imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {tag && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-stone-900/80 text-white font-extrabold text-[8px] uppercase rounded-sm">
                      {tag}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold text-olive-700 uppercase tracking-wide block truncate">
                    {category}
                  </span>
                  <h5 className="font-bold text-xs text-gray-900 group-hover:text-olive-700 transition-colors line-clamp-2 leading-snug">
                    {name}
                  </h5>

                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-gray-900">{rating}</span>
                  </div>

                  <div className="flex items-baseline gap-1.5 pt-0.5">
                    <span className="font-extrabold text-xs text-gray-900">{formatPrice(price)}</span>
                    {originalPrice > price && (
                      <span className="text-[10px] text-stone-400 line-through">{formatPrice(originalPrice)}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Same Day
                </span>
                <button
                  type="button"
                  onClick={() => addToCart(p, 1)}
                  className="px-2.5 py-1 rounded-lg bg-olive-50 hover:bg-olive-700 text-olive-700 hover:text-white font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className={`py-8 md:py-12 bg-stone-50/70 border-b border-stone-200/80 select-none ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          
          {isLeft ? (
            <>
              {/* Left Column: Banner */}
              <div className="lg:col-span-5 flex">
                {bannerCard}
              </div>

              {/* Right Column: Product Cards */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                {productGrid}
              </div>
            </>
          ) : (
            <>
              {/* Left Column: Product Cards */}
              <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-between">
                {productGrid}
              </div>

              {/* Right Column: Banner */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex">
                {bannerCard}
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
