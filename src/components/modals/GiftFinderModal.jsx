import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Sparkles, Gift, Check, ArrowRight, Heart, Star, ShoppingBag } from 'lucide-react';

const mockRecommendations = [
  { id: 901, name: 'Royal Red Roses & Truffle Hamper', price: 1999, originalPrice: 2499, img: '/images/home/flower_coll_1.png', tag: 'Top Recommended' },
  { id: 902, name: 'Personalized Photo LED Lamp & Chocolates', price: 1499, originalPrice: 1899, img: '/images/home/banner3.png', tag: 'Best Seller' },
  { id: 903, name: 'Gourmet Artisanal Sweets & Dry Fruits Box', price: 1799, originalPrice: 2199, img: '/images/home/banner4.png', tag: 'Luxe Choice' }
];

export default function GiftFinderModal() {
  const { isFinderOpen, closeFinder, openProductModal, formatPrice } = useCart();
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('Partner / Spouse');
  const [occasion, setOccasion] = useState('Birthday');
  const [budget, setBudget] = useState('₹1,000 - ₹2,000');

  if (!isFinderOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={closeFinder}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative z-10 animate-fade-in border border-stone-200">
        
        <button 
          onClick={closeFinder}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-100">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 border border-rose-200 flex items-center justify-center text-rose-700">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-gray-900">Curated Gift Finder</h3>
            <p className="text-xs text-stone-500">Answer 3 questions to find the absolute perfect surprise</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-olive-600' : 'bg-stone-200'
              }`} 
            />
          ))}
        </div>

        {/* Step 1: Recipient */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-bold text-sm text-gray-900">Step 1: Who is this gift for?</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {['Partner / Spouse', 'Parents / In-Laws', 'Best Friend', 'Brother / Sister', 'Colleague / Boss'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRecipient(r)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                    recipient === r 
                      ? 'bg-olive-50 border-olive-500 text-olive-900 shadow-xs' 
                      : 'bg-stone-50 border-stone-200 hover:bg-white text-stone-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3.5 mt-4 bg-olive-600 hover:bg-olive-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              Next: Select Occasion
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Occasion */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="font-bold text-sm text-gray-900">Step 2: What is the special occasion?</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {['Birthday', 'Anniversary', 'Congratulations', 'Express Gratitude', 'Housewarming'].map((o) => (
                <button
                  key={o}
                  onClick={() => setOccasion(o)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                    occasion === o 
                      ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs' 
                      : 'bg-stone-50 border-stone-200 hover:bg-white text-stone-700'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3.5 bg-olive-600 hover:bg-olive-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                Next: Select Budget
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Recommendations */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-gray-900">Top Recommended Matches for {recipient}</h4>
              <button onClick={handleReset} className="text-xs text-olive-700 font-bold hover:underline">
                Re-filter
              </button>
            </div>

            <div className="space-y-3">
              {mockRecommendations.map((item) => (
                <div key={item.id} className="bg-stone-50 p-3 rounded-2xl border border-stone-200 flex gap-3 items-center">
                  <img src={item.img} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-stone-200 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md uppercase">
                      {item.tag}
                    </span>
                    <h5 className="font-bold text-xs text-gray-900 truncate mt-1">{item.name}</h5>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-extrabold text-xs text-olive-700">{formatPrice(item.price)}</span>
                      <span className="text-[10px] text-stone-400 line-through">{formatPrice(item.originalPrice)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      closeFinder();
                      openProductModal(item);
                    }}
                    className="px-3 py-2 bg-olive-600 hover:bg-olive-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex-shrink-0"
                  >
                    View Gift
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
