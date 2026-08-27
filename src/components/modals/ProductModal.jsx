import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  Star, 
  Truck, 
  Clock, 
  ShieldCheck, 
  ShoppingBag, 
  Heart, 
  Check, 
  Calendar,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function ProductModal() {
  const { selectedProduct, closeProductModal, addToCart, selectedLocation } = useCart();
  
  const [deliveryDate, setDeliveryDate] = useState('Today (Express)');
  const [deliverySlot, setDeliverySlot] = useState('Standard Free Delivery');
  const [cardMessage, setCardMessage] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeValid, setPincodeValid] = useState(null);

  if (!selectedProduct) return null;

  const title = selectedProduct.name || selectedProduct.title || 'Curated Gift';
  const price = selectedProduct.price || 999;
  const originalPrice = selectedProduct.originalPrice || Math.round(price * 1.25);
  const image = selectedProduct.img || selectedProduct.image || '/images/home/flower_coll_1.png';
  const rating = selectedProduct.rating || 4.9;

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
      deliveryDate,
      deliverySlot,
      cardMessage
    });
    closeProductModal();
  };

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
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200 aspect-square">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white font-extrabold text-[10px] uppercase rounded-full shadow-xs">
                Fresh & Express
              </span>
            </div>

            <div className="flex gap-2">
              <div className="w-14 h-14 rounded-xl border-2 border-olive-600 overflow-hidden cursor-pointer">
                <img src={image} alt="Thumbnail 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 rounded-xl border border-stone-200 overflow-hidden opacity-60 cursor-pointer hover:opacity-100">
                <img src="/images/home/flower_coll_2.png" alt="Thumbnail 2" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 rounded-xl border border-stone-200 overflow-hidden opacity-60 cursor-pointer hover:opacity-100">
                <img src="/images/home/banner1.png" alt="Thumbnail 3" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Product Details & Options */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-xs font-bold text-gray-900">{rating} ★</span>
                <span className="text-[11px] text-stone-400 font-medium">(250+ Reviews)</span>
              </div>
              
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-gray-900 leading-snug">
                {title}
              </h2>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display font-extrabold text-2xl text-olive-700">₹{price}</span>
                <span className="text-sm text-stone-400 line-through">₹{originalPrice}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Save {Math.round(((originalPrice - price) / originalPrice) * 100)}%
                </span>
              </div>
            </div>

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
                  className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeValid !== null && (
                <p className={`text-[11px] font-semibold mt-1.5 ${pincodeValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {pincodeValid ? '✓ Eligible for Express Same-Day & Midnight Delivery!' : '❌ Please enter a valid 6-digit Pincode.'}
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
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
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
                placeholder="Write your note of love here..."
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-stone-50"
              />
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 rounded-2xl bg-olive-600 hover:bg-olive-700 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart • ₹{price}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
