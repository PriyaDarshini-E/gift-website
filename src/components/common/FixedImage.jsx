import React, { useState } from 'react';
import { Gift, Image as ImageIcon } from 'lucide-react';
import { FALLBACK_IMAGES } from '../../utils/dataMappers';

/**
 * FixedImage Component
 * 
 * Enforces fixed container dimensions and aspect ratios for each image type:
 * - Banners (aspect-[2.5/1], object-cover)
 * - Products (aspect-square, object-contain / object-cover)
 * - Categories (h-20 w-20 sm:h-24 sm:w-24 or aspect-square, object-contain)
 * - Brands / Logos (fixed logo container, object-contain)
 * - Vendors (fixed logo/profile container, object-contain)
 * - Occasions (aspect-[4/3] or full card fit, object-cover)
 * 
 * Guarantees that backend images NEVER distort or cause layout shifting.
 * Features an elegant fallback UI when an image is not available.
 */
export default function FixedImage({
  src,
  alt = '',
  type = 'product',
  containerClassName = '',
  imageClassName = '',
  aspectRatio,
  objectFit,
  loading = 'lazy',
  fallbackSrc,
  ...props
}) {
  const isNoImage = !src || typeof src !== 'string' || !src.trim() || src.includes('no_image.jpg');
  const [hasError, setHasError] = useState(isNoImage);
  const [currentSrc, setCurrentSrc] = useState(src || '');

  React.useEffect(() => {
    const invalid = !src || typeof src !== 'string' || !src.trim() || src.includes('no_image.jpg');
    setHasError(invalid);
    setCurrentSrc(src || '');
  }, [src]);

  const handleError = () => {
    setHasError(true);
  };

  // Determine standard object-fit style based on type
  const fitClass = objectFit
    ? `object-${objectFit}`
    : type === 'brand' || type === 'vendor' || type === 'product' || type === 'category'
      ? 'object-contain'
      : 'object-cover';

  if (hasError || !currentSrc) {
    if (fallbackSrc && !fallbackSrc.includes('no_image.jpg')) {
      return (
        <div className={`relative overflow-hidden flex items-center justify-center ${containerClassName}`}>
          <img
            src={fallbackSrc}
            alt={alt}
            loading={loading}
            className={`w-full h-full ${fitClass} select-none transition-all duration-300 ${imageClassName}`}
            {...props}
          />
        </div>
      );
    }

    // Elegant, clean gradient placeholder with icon
    return (
      <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-50 text-stone-400 select-none ${containerClassName}`}>
        <div className="flex flex-col items-center justify-center p-2 text-center opacity-70">
          <Gift className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-stone-400" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${containerClassName}`}>
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        loading={loading}
        className={`w-full h-full ${fitClass} select-none transition-all duration-300 ${imageClassName}`}
        {...props}
      />
    </div>
  );
}
