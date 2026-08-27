import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
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
  const { 
    openCart, 
    cartCount, 
    selectedLocation, 
    openLocationModal, 
    openRemindersModal,
    openFinder,
    openTracker,
    selectedCurrency,
    setSelectedCurrency,
    formatPrice,
    openProductModal
  } = useCart();

  // --- States for Dropdown Toggles ---
  const [activeDropdown, setActiveDropdown] = useState(null); 
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

  // Mock products database for Search Auto-Suggest
  const searchCatalog = [
    { id: 1, name: 'Royal Red Roses & Truffle Hamper', price: 1999, category: 'Flowers & Cakes', img: '/images/home/flower_coll_1.png' },
    { id: 2, name: 'Designer Kundan Rakhi Set', price: 599, category: 'Rakhi', img: '/images/home/raksha1.png' },
    { id: 3, name: 'Belgian Truffle Chocolate Cake', price: 699, category: 'Cakes', img: '/images/home/chocolate.png' },
    { id: 4, name: 'Fresh Red Velvet Heart Cake', price: 799, category: 'Cakes', img: '/images/home/cake_red_velvet.png' },
    { id: 5, name: 'Monstera Houseplant in Ceramic Pot', price: 899, category: 'Plants', img: '/images/home/occasion_housewarming.png' }
  ];

  const filteredSuggestions = searchVal.trim() 
    ? searchCatalog.filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()) || p.category.toLowerCase().includes(searchVal.toLowerCase()))
    : [];

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
          <Link to="/" className="flex items-center gap-2 group">
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
          </Link>

          <div className="hidden md:block h-8 w-[1px] bg-gray-200"></div>

          {/* Delivery Location Selector Button */}
          <div className="relative hidden md:block">
            <button
              onClick={openLocationModal}
              className="flex items-center gap-2 text-left hover:bg-gray-50 px-3 py-1.5 rounded-xl transition-all duration-200 border border-gray-100 shadow-2xs"
            >
              <div className="text-xl leading-none bg-gray-100 p-1.5 rounded-lg flex items-center justify-center">
                🇮🇳
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-gray-500 font-sans leading-none">Where to deliver?</span>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-xs font-extrabold font-sans text-olive-700">
                    {selectedLocation}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ================= CENTER SECTION ================= */}
        <div className="hidden lg:flex flex-1 max-w-xl items-center gap-2">
          {/* Search Input with Live Suggestions Overlay */}
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

            {/* Live Search Auto-Suggest Overlay */}
            {searchVal.trim().length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-50 animate-fade-in max-h-80 overflow-y-auto">
                <p className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider px-2 mb-2">Search Suggestions ({filteredSuggestions.length})</p>
                {filteredSuggestions.length === 0 ? (
                  <p className="text-xs text-stone-500 p-3 italic">No matching gifts found. Try searching 'cakes', 'rakhi', or 'flowers'...</p>
                ) : (
                  filteredSuggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        openProductModal(item);
                        setSearchVal('');
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-stone-200" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-olive-700 uppercase block">{item.category}</span>
                        <h5 className="font-bold text-xs text-gray-900 truncate">{item.name}</h5>
                      </div>
                      <span className="font-extrabold text-xs text-olive-700">{formatPrice(item.price)}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Finder Button */}
          <button
            onClick={openFinder}
            className="relative p-[1.5px] rounded-xl flex items-center justify-center overflow-hidden group shadow-sm transition-transform active:scale-95 flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-rose-400 to-olive-500 rounded-xl"></div>
            <div className="relative bg-white px-3.5 py-2 rounded-[11px] flex items-center gap-1.5 text-gray-800 font-bold text-xs tracking-wide group-hover:bg-opacity-90">
              <Gift className="w-3.5 h-3.5 text-olive-600" />
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Finder</span>
            </div>
          </button>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* 1. Reminders */}
          <button
            onClick={openRemindersModal}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200"
          >
            <div className="relative">
              <Calendar className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-amber-500 border-2 border-white rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">Reminders</span>
          </button>

          {/* 2. Currency Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('currency')}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200"
            >
              <div className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-gray-100 rounded-full border border-gray-200 text-gray-700">
                {selectedCurrency === 'INR' ? '₹' : selectedCurrency === 'USD' ? '$' : 'AED'}
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">{selectedCurrency}</span>
            </button>

            {activeDropdown === 'currency' && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-fade-in z-50">
                <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Currency</span>
                </div>
                {['INR', 'USD', 'AED'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setSelectedCurrency(curr);
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                      selectedCurrency === curr ? 'bg-olive-50 text-olive-700 font-bold' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{curr} ({curr === 'INR' ? '₹' : curr === 'USD' ? '$' : 'AED'})</span>
                    {selectedCurrency === curr && <Check className="w-3.5 h-3.5 text-olive-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Corporate */}
          <Link
            to="/corporate"
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200 relative group"
          >
            <div className="relative">
              <Briefcase className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1 bg-olive-100 text-olive-800 text-[8px] font-bold px-1 rounded-full border border-white">B2B</span>
            </div>
            <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">Corporate</span>
          </Link>

          {/* 4. Cart */}
          <button
            onClick={openCart}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-olive-700 transition-all duration-200 relative"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-wide mt-1 font-sans">Cart</span>
          </button>

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
                  <button 
                    onClick={() => {
                      setActiveDropdown(null);
                      openTracker();
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-gray-50 text-gray-700 font-semibold flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4 text-olive-500" /> Track Order
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-gray-50 text-gray-700 font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-olive-500" /> My Account
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
