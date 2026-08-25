import React, { useState, useEffect, useRef } from 'react';
import {
  Gift,
  MapPin,
  ChevronDown,
  Search,
  Sparkles,
  Calendar,
  Briefcase,
  ShoppingCart,
  User,
  MoreHorizontal,
  Menu,
  X,
  Plus,
  Trash2,
  Check,
  Bell,
  LogOut,
  Settings,
  Clock
} from 'lucide-react';

export default function Header() {
  // --- States for Dropdown Toggles ---
  const [activeDropdown, setActiveDropdown] = useState(null); // 'location' | 'finder' | 'reminders' | 'currency' | 'profile' | 'more' | 'cart'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  // Dropdown Reference for Click-Outside
  const navRef = useRef(null);

  // --- Search Placeholder Rotation ---
  const placeholders = [
    'Search gifts, flowers, cakes, hampers...',
    'Search birthday roses & custom cakes...',
    'Search anniversary combos & chocolates...',
    'Search premium plants & personalized gifts...',
    'Search bulk corporate hampers...'
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // --- Click Outside to Close ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (type) => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* ================= LEFT SECTION ================= */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-olive-50 flex items-center justify-center border border-gold-500/30 group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <Gift className="w-6 h-6 text-olive-500 stroke-[1.8] group-hover:text-gold-600 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-olive-800 to-olive-700 bg-clip-text text-transparent group-hover:from-olive-700 group-hover:to-gold-600 transition-all duration-300">
                Giftora
              </span>
              <span className="text-[9px] text-gold-600 uppercase font-bold tracking-widest -mt-1 font-sans animate-pulse">
                Curated Gifting
              </span>
            </div>
          </a>

          <div className="hidden md:block h-8 w-[1px] bg-gray-200"></div>

          {/* Delivery Location Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => toggleDropdown('location')}
              className="flex items-center gap-2 text-left hover:bg-gray-50 px-3 py-1.5 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-100"
            >
              <div className="text-xl leading-none bg-gray-100 p-1.5 rounded-lg flex items-center justify-center">
                🇮🇳
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500 font-sans leading-none">Where to deliver?</span>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-xs font-bold font-sans text-coral-500">
                    Location missing
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </button>

            {/* Location Selector Dropdown (Static Layout) */}
            {activeDropdown === 'location' && (
              <div className="absolute left-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm text-gray-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-olive-500" />
                    Delivery Destination
                  </h4>
                  <button onClick={() => setActiveDropdown(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Select Country</span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[{ code: 'IN', flag: '🇮🇳' }, { code: 'AE', flag: '🇦🇪' }, { code: 'SG', flag: '🇸🇬' }, { code: 'US', flag: '🇺🇸' }, { code: 'GB', flag: '🇬🇧' }].map((c) => (
                      <button
                        key={c.code}
                        onClick={() => setActiveDropdown(null)}
                        className={`flex flex-col items-center p-2 rounded-xl transition-all ${c.code === 'IN' ? 'bg-olive-50 border border-olive-500/40 text-olive-750 font-bold' : 'bg-gray-50 hover:bg-gray-100 border border-transparent'}`}
                      >
                        <span className="text-2xl mb-0.5">{c.flag}</span>
                        <span className="text-[10px] font-medium text-gray-600">{c.code}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Enter Details</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter City name"
                        className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-olive-500 bg-gray-50/50"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        className="w-24 text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-olive-500 bg-gray-50/50"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveDropdown(null)}
                    className="w-full bg-olive-500 hover:bg-olive-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors duration-200 shadow-sm"
                  >
                    Apply Address
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Popular Cities</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['New Delhi', 'Mumbai', 'Bengaluru', 'Dubai', 'Singapore', 'London'].map((city) => (
                      <button
                        key={city}
                        onClick={() => setActiveDropdown(null)}
                        className="text-[11px] font-medium bg-gray-50 hover:bg-olive-50 hover:text-olive-700 px-2.5 py-1 rounded-lg border border-gray-100 transition-all"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= CENTER SECTION ================= */}
        <div className="hidden lg:flex flex-1 max-w-xl items-center gap-2">
          {/* Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50/70 hover:bg-gray-50 focus:bg-white border border-gray-200 focus:border-olive-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-olive-500 transition-all duration-200"
            />
            {searchVal && (
              <button onClick={() => setSearchVal('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Finder Button */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('finder')}
              className="relative p-[1.5px] rounded-xl flex items-center justify-center overflow-hidden group shadow-sm transition-transform active:scale-95 flex-shrink-0"
            >
              <div className="absolute inset-0 animate-iridescent rounded-xl"></div>
              <div className="relative bg-white px-4 py-2 rounded-[11px] flex items-center gap-1.5 text-gray-800 font-bold text-xs tracking-wide group-hover:bg-opacity-90">
                <Gift className="w-3.5 h-3.5 text-olive-500" />
                <Sparkles className="w-3.5 h-3.5 text-gold-500 absolute -top-1 -right-1 animate-pulse" />
                <span>Finder</span>
              </div>
            </button>

            {/* Finder Popup Preview */}
            {activeDropdown === 'finder' && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-gold-600 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-500" />
                    Curated Gift Finder
                  </span>
                  <button onClick={() => setActiveDropdown(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-olive-50 flex items-center justify-center mx-auto">
                    <Gift className="w-6 h-6 text-olive-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-800">What are you looking for?</h5>
                    <p className="text-[11px] text-gray-500 mt-1">We will help you find the absolute best gift combo matching your exact occasion and budget.</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 text-left border border-gray-100 flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=60" className="w-10 h-10 rounded-lg object-cover" alt="Combo" />
                    <div className="flex-1">
                      <span className="text-[9px] font-bold text-gold-600 uppercase">Top Choice</span>
                      <span className="text-xs font-semibold text-gray-800 block truncate">Red Roses & Truffle Combo</span>
                      <span className="text-xs font-bold text-olive-750">₹1,999</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveDropdown(null)}
                    className="w-full bg-olive-500 hover:bg-olive-600 text-white text-xs font-semibold py-2 rounded-xl transition-all shadow-sm"
                  >
                    Launch Gift Finder
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* 1. Reminders */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('reminders')}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200"
            >
              <div className="relative">
                <Calendar className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-gold-500 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">Reminders</span>
            </button>

            {/* Reminders Dropdown (Static Layout) */}
            {activeDropdown === 'reminders' && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                  <h4 className="font-semibold text-sm text-gray-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-olive-500" />
                    Gifting Reminders
                  </h4>
                  <button onClick={() => setActiveDropdown(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto mb-4 pr-1">
                  {[{ id: 1, name: "Mom's Birthday", date: 'Sep 12', relation: 'Mother' }, { id: 2, name: 'Anniversary Celebration', date: 'Oct 05', relation: 'Partner' }].map((rem) => (
                    <div key={rem.id} className="flex items-center justify-between bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold text-gray-800">{rem.name}</span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {rem.date} &bull; <span className="text-olive-700 font-medium">{rem.relation}</span>
                        </span>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-coral-500 rounded-lg">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block text-left">Add Reminder</span>
                  <input
                    type="text"
                    placeholder="Sis Birthday"
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-olive-500 bg-gray-50/50"
                  />
                  <div className="flex gap-2">
                    <input
                      type="date"
                      className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-olive-500 bg-gray-50/50 text-gray-500"
                    />
                    <select className="text-xs px-2.5 py-1.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-olive-500 bg-gray-50/50 text-gray-500">
                      <option>Family</option>
                      <option>Partner</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setActiveDropdown(null)}
                    className="w-full bg-olive-500 hover:bg-olive-600 text-white text-xs font-semibold py-2 rounded-xl transition-colors duration-200 shadow-sm"
                  >
                    Add Reminder
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Currency Selector */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('currency')}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200"
            >
              <div className="w-5 h-5 flex items-center justify-center font-bold text-sm bg-gray-100 rounded-full border border-gray-200 text-gray-700">
                ₹
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">INR</span>
            </button>

            {/* Currency Dropdown (Static Layout) */}
            {activeDropdown === 'currency' && (
              <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block text-left">Select Currency</span>
                </div>
                <div className="space-y-0.5">
                  {[{ code: 'INR', symbol: '₹', label: 'Indian Rupee' }, { code: 'USD', symbol: '$', label: 'US Dollar' }, { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' }].map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => setActiveDropdown(null)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${curr.code === 'INR' ? 'bg-olive-50 text-olive-700 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xs text-gray-600">{curr.symbol}</span>
                        <span>{curr.code}</span>
                      </div>
                      {curr.code === 'INR' && <Check className="w-3.5 h-3.5 text-olive-650" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Corporate */}
          <a
            href="#"
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200 relative group"
          >
            <div className="relative">
              <Briefcase className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1 bg-olive-100 text-olive-800 text-[8px] font-bold px-1 rounded-full border border-white">B2B</span>
            </div>
            <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">Corporate</span>
          </a>

          {/* 4. Cart */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('cart')}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-coral-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  2
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">Cart</span>
            </button>

            {/* Cart Dropdown Preview (Static Layout) */}
            {activeDropdown === 'cart' && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                  <span className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                    <ShoppingCart className="w-4 h-4 text-olive-500" />
                    Shopping Cart (2)
                  </span>
                  <button onClick={() => setActiveDropdown(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto mb-3.5 pr-1">
                  {[
                    { id: 101, name: 'Midnight Red Roses Bouquet', qty: 1, price: '₹1,299', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=200' },
                    { id: 102, name: 'Chocolate Truffle Cake (Half Kg)', qty: 1, price: '₹749', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=200' }
                  ].map((item) => (
                    <div key={item.id} className="flex gap-3 bg-gray-50/50 p-2 rounded-xl border border-gray-100">
                      <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0 text-left">
                        <span className="text-xs font-semibold text-gray-800 block truncate">{item.name}</span>
                        <span className="text-xs font-bold text-olive-750 block mt-0.5">{item.price}</span>
                        <span className="text-[10px] text-gray-400 block mt-1">Qty: {item.qty}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-800">
                    <span>Subtotal</span>
                    <span className="text-sm font-extrabold text-olive-750">₹2,048</span>
                  </div>
                  <button className="w-full bg-olive-500 hover:bg-olive-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors duration-200 shadow-sm">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 5. Hi Guest */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('profile')}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200"
            >
              <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">Hi Guest</span>
            </button>

            {/* Profile Dropdown */}
            {activeDropdown === 'profile' && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="px-3 py-2.5 border-b border-gray-100 mb-1 text-left">
                  <span className="text-xs text-gray-500 block">Welcome,</span>
                  <span className="text-sm font-bold text-gray-800 block">Gifting Guest</span>
                </div>
                <div className="space-y-0.5 text-left">
                  <button className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-gray-50 text-gray-700 font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-olive-500" /> My Account
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-gray-50 text-gray-700 font-semibold flex items-center gap-2">
                    <Bell className="w-4 h-4 text-olive-500" /> Track Order
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-gray-50 text-gray-700 font-semibold flex items-center gap-2">
                    <Settings className="w-4 h-4 text-olive-500" /> Settings
                  </button>
                  <div className="h-[1px] bg-gray-100 my-1"></div>
                  <button className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-coral-50/50 text-coral-600 font-semibold flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Login / Register
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 6. More */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => toggleDropdown('more')}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200"
            >
              <MoreHorizontal className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">More</span>
            </button>

            {/* More Menu Dropdown */}
            {activeDropdown === 'more' && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left">
                <div className="space-y-0.5">
                  {['Find Stores', 'Gift Cards', 'Customer Care', 'Our Blog', 'Careers'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveDropdown(null)}
                      className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-gray-50 text-gray-750 font-medium"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-750 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE VIEWPORTS ================= */}
      {/* Mobile Inline Search Bar */}
      <div className="lg:hidden px-4 pb-3 border-b border-gray-100 flex gap-2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={placeholders[placeholderIndex]}
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-olive-500"
          />
        </div>
        <button
          onClick={() => toggleDropdown('finder')}
          className="relative p-[1px] rounded-xl flex items-center justify-center flex-shrink-0"
        >
          <div className="absolute inset-0 animate-iridescent rounded-xl"></div>
          <div className="relative bg-white px-3 py-1.5 rounded-[11px] flex items-center gap-1 text-gray-800 font-bold text-[10px]">
            <Gift className="w-3 h-3 text-olive-500" />
            <span>Finder</span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer (Static List Overlay) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-xs bg-white shadow-2xl p-6 flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <span className="font-display font-black text-xl text-olive-700">Giftora Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 space-y-6 text-left">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Delivery Location</span>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-3xl leading-none">🇮🇳</span>
                  <div>
                    <span className="text-[10px] font-semibold text-gray-400 block">Deliver to India</span>
                    <span className="text-xs font-bold text-coral-500">Location missing</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Gifting Options</span>
                <div className="space-y-1">
                  {['Browse Gift Shop', 'Corporate Orders', 'Reminders & Alerts', 'My Cart (2)'].map((l) => (
                    <button key={l} onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 text-left">
                      <span>{l}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
