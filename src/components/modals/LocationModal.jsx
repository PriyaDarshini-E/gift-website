import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, MapPin, Search, Check, Navigation } from 'lucide-react';

const popularCities = [
  { name: 'Delhi NCR', icon: '🏛️' },
  { name: 'Mumbai', icon: '🌊' },
  { name: 'Bengaluru', icon: '💻' },
  { name: 'Hyderabad', icon: '🏰' },
  { name: 'Pune', icon: '⛰️' },
  { name: 'Kolkata', icon: '🌉' },
  { name: 'Chennai', icon: '🛕' },
  { name: 'Ahmedabad', icon: '🕌' },
  { name: 'Jaipur', icon: '👑' },
  { name: 'Chandigarh', icon: '🌿' }
];

export default function LocationModal() {
  const { isLocationModalOpen, closeLocationModal, selectedLocation, setSelectedLocation } = useCart();
  const [searchInput, setSearchInput] = useState('');

  if (!isLocationModalOpen) return null;

  const handleSelect = (cityName) => {
    setSelectedLocation(cityName);
    closeLocationModal();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSelectedLocation(searchInput.trim());
    closeLocationModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={closeLocationModal}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative z-10 animate-fade-in border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-olive-100 border border-olive-300 flex items-center justify-center text-olive-700">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-gray-900">Select Delivery Location</h3>
              <p className="text-[11px] text-stone-500 font-medium">To check product availability & express slots</p>
            </div>
          </div>
          <button 
            onClick={closeLocationModal}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pincode & City Search Input */}
        <form onSubmit={handleCustomSubmit} className="mt-5 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Enter city or 6-digit Pincode (e.g. 110001)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-600 bg-stone-50"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-olive-600 hover:bg-olive-700 text-white font-bold text-[11px] rounded-lg transition-colors"
          >
            Apply
          </button>
        </form>

        {/* Popular Cities Grid */}
        <div className="mt-6">
          <p className="text-xs font-bold text-stone-700 mb-3 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-olive-600" />
            Popular Delivery Cities
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {popularCities.map((city) => {
              const isSelected = selectedLocation.toLowerCase() === city.name.toLowerCase();
              return (
                <button
                  key={city.name}
                  onClick={() => handleSelect(city.name)}
                  className={`p-2.5 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-olive-50 border-olive-500 text-olive-900 shadow-xs'
                      : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{city.icon}</span>
                    <span className="truncate">{city.name}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-olive-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
