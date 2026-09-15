import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import FixedImage from '../common/FixedImage';
import { 
  X, 
  Star, 
  ShoppingBag, 
  MapPin,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ProductModal() {
  const { selectedProduct, closeProductModal, addToCart, selectedLocation } = useCart();
  
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('Today (Express)');
  const [cardMessage, setCardMessage] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeValid, setPincodeValid] = useState(null);

  const hasVariants = Boolean(selectedProduct?.hasVariants && Array.isArray(selectedProduct?.variants) && selectedProduct.variants.length > 0);
  const variants = hasVariants ? selectedProduct.variants : [];
  const currentVariant = variants[selectedVariantIndex] || null;

  // Consolidate images from product and current variant (always call hook unconditionally)
  const productImages = useMemo(() => {
    if (!selectedProduct) return [];
    let list = [];
    if (currentVariant && Array.isArray(currentVariant.images) && currentVariant.images.length > 0) {
      list = [...currentVariant.images];
    }
    if (Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0) {
      selectedProduct.images.forEach(img => {
        if (!list.includes(img)) list.push(img);
      });
    }
    if (list.length === 0) {
      list = [selectedProduct.img || selectedProduct.image || 'https://memorycreators.in/crmapi/public/assets/images/no_image.jpg'];
    }
    return list;
  }, [selectedProduct, currentVariant]);

  if (!selectedProduct) return null;

  const title = selectedProduct.name || selectedProduct.title || 'Curated Gift';
  const price = Number(currentVariant?.price || selectedProduct.price || 0);
  const originalPrice = Number(currentVariant?.originalPrice || selectedProduct.originalPrice || Math.round(price * 1.25));
  const rating = selectedProduct.rating || 4.9;
  const reviewsCount = selectedProduct.reviewsCount || selectedProduct.reviews_count || 120;
  const description = selectedProduct.description || selectedProduct.shortDescription || selectedProduct.longDescription || '';

  const activeImage = productImages[activeImageIndex] || productImages[0];

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 6) {
      setPincodeValid(true);
    } else {
      setPincodeValid(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, {
      quantity: 1,
      variant: currentVariant,
      variantId: currentVariant?.id || selectedProduct.variantId || 1,
      price,
      deliveryDate,
      cardMessage
    });
    closeProductModal();
  };

  const discount = (originalPrice > price)
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={closeProductModal}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative z-10 animate-fade-in border border-stone-200 max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={closeProductModal}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200 aspect-square bg-stone-50">
              <FixedImage
                src={activeImage}
                alt={title}
                type="product"
                containerClassName="w-full h-full"
                imageClassName="w-full h-full object-contain p-3"
              />
              {selectedProduct.brand && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-stone-900/80 backdrop-blur-xs text-white font-extrabold text-[10px] uppercase rounded-full shadow-xs">
                  {selectedProduct.brand}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {productImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-14 h-14 rounded-xl border-2 overflow-hidden cursor-pointer flex-shrink-0 bg-stone-50 transition-all ${
                      activeImageIndex === i ? 'border-olive-600 shadow-sm' : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-contain p-1" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Options */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-xs font-bold text-gray-900">{rating} ★</span>
                <span className="text-[11px] text-stone-400 font-medium">({reviewsCount}+ Reviews)</span>
              </div>
              
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-gray-900 leading-snug">
                {title}
              </h2>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display font-extrabold text-2xl text-olive-700">₹{price.toLocaleString('en-IN')}</span>
                {originalPrice > price && (
                  <span className="text-sm text-stone-400 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
                )}
                {discount > 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save {discount}%
                  </span>
                )}
              </div>

              {description && (
                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* Dynamic Variants Selector (Color, Size, Material, Weight, etc.) */}
            {hasVariants && (
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="block text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-olive-600" />
                  Available Options & Variants ({variants.length})
                </label>
                
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant, vIdx) => {
                    const isSelected = selectedVariantIndex === vIdx;
                    // Format attributes label (e.g. "Red / 500ml")
                    const attrLabel = variant.attributes && variant.attributes.length > 0
                      ? variant.attributes.map(a => `${a.name}: ${a.value}`).join(' • ')
                      : variant.sku || `Option ${vIdx + 1}`;

                    return (
                      <button
                        key={variant.id || vIdx}
                        type="button"
                        onClick={() => {
                          setSelectedVariantIndex(vIdx);
                          if (variant.images && variant.images.length > 0) {
                            setActiveImageIndex(0);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-olive-700 text-white border-olive-700 shadow-xs'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        <span>{attrLabel}</span>
                        {variant.price ? <span className="ml-1.5 opacity-90 font-bold">₹{variant.price}</span> : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pincode Serviceability Check */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-olive-600" />
                Check Delivery Pincode for {selectedLocation}
              </label>
              
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode..."
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-white"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeValid !== null && (
                <p className={`text-[11px] font-semibold mt-1.5 ${pincodeValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {pincodeValid ? '✓ Eligible for Express Delivery!' : '❌ Please enter a valid 6-digit Pincode.'}
                </p>
              )}
            </div>

            {/* Delivery Date Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">Select Delivery Date</label>
              <div className="grid grid-cols-2 gap-2">
                {['Today (Express)', 'Tomorrow'].map((date) => (
                  <button
                    key={date}
                    onClick={() => setDeliveryDate(date)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      deliveryDate === date
                        ? 'bg-olive-600 text-white border-olive-600 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Message Card */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Free Personalized Message Card</label>
              <textarea
                rows={2}
                placeholder="Write your note here..."
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-stone-50"
              />
            </div>

            {/* Add to Cart Action */}
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-2xl bg-olive-600 hover:bg-olive-700 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Enquiry • ₹{price.toLocaleString('en-IN')}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
