import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCompany } from '../context/CompanyContext';
import { useWebsite } from '../context/WebsiteContext';
import { useProducts } from '../context/ProductContext';
import { useCategories } from '../context/CategoryContext';
import FixedImage from './common/FixedImage';
import BrandLogo from './common/BrandLogo';
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
  const navigate = useNavigate();
  const { company } = useCompany();
  const { tags } = useWebsite();
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

  const { topCategories, getSubcategories } = useCategories();

  // --- States for Dropdown Toggles ---
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null);
  const navRef = useRef(null);

  // --- Live Search State ---
  const [searchVal, setSearchVal] = useState('');

  // --- Search Placeholder Rotation ---
  const placeholders = [
    'Search gifts, flowers, cakes, hampers...',
    'Search birthday roses & custom cakes...',
    'Search anniversary combos & chocolates...',
    'Search premium plants & personalized gifts...',
    'Search bulk corporate hampers...'
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const { products: apiProducts } = useProducts();
  const activeCatalog = Array.isArray(apiProducts) ? apiProducts : [];

  const filteredSuggestions = searchVal.trim() 
    ? activeCatalog.filter(p => 
        (p.name || p.title || '').toLowerCase().includes(searchVal.toLowerCase()) || 
        (p.category || '').toLowerCase().includes(searchVal.toLowerCase()) ||
        (p.subCategory || '').toLowerCase().includes(searchVal.toLowerCase()) ||
        (p.brand || '').toLowerCase().includes(searchVal.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
      setActiveDropdown(null);
    }
  };

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

  const [logoError, setLogoError] = useState(false);
  const companyName = company?.name || 'Giftora';

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* ================= LEFT SECTION ================= */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Logo */}
          <BrandLogo size="md" />

          <div className="hidden lg:block h-6 w-[1px] bg-stone-200"></div>

          {/* Sleek Delivery Location Selector Pill */}
          <button
            onClick={openLocationModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-50 hover:bg-stone-100/90 border border-stone-200 text-stone-700 hover:text-stone-900 transition-all duration-200 shadow-2xs group flex-shrink-0 cursor-pointer text-left"
            title="Select Delivery Location"
          >
            <MapPin className="w-3.5 h-3.5 text-olive-750 stroke-[2.2] flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400 leading-none">Deliver to</span>
              <span className="text-xs font-bold text-stone-900 leading-tight truncate max-w-[90px]">{selectedLocation}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-stone-700 transition-colors ml-0.5" />
          </button>
        </div>

        {/* ================= CENTER SEARCH SECTION (Spacious) ================= */}
        <div className="hidden md:flex flex-1 max-w-xl xl:max-w-2xl mx-2 lg:mx-4 items-center">
          {/* Search Input with Live Suggestions Overlay */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-stone-400" />
            </div>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-stone-50 hover:bg-stone-100/60 focus:bg-white border border-stone-200 focus:border-olive-600 rounded-full focus:outline-none focus:ring-2 focus:ring-olive-500/15 transition-all duration-200 shadow-2xs"
            />
            {searchVal && (
              <button 
                type="button" 
                onClick={() => setSearchVal('')} 
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Live Search Auto-Suggest Overlay */}
            {searchVal.trim().length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 animate-fade-in max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between px-2 mb-2">
                  <p className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">Search Suggestions ({filteredSuggestions.length})</p>
                  <button
                    type="submit"
                    className="text-[11px] font-bold text-olive-750 hover:underline cursor-pointer"
                  >
                    View all results &rarr;
                  </button>
                </div>

                {filteredSuggestions.length === 0 ? (
                  <p className="text-xs text-stone-500 p-3 italic">No matching gifts found. Press enter to search full catalog...</p>
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
                      <FixedImage
                        src={item.img || item.image}
                        alt={item.name}
                        type="product"
                        containerClassName="w-10 h-10 rounded-lg border border-stone-200 flex-shrink-0"
                        imageClassName="w-full h-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-olive-750 uppercase block">{item.category}</span>
                        <h5 className="font-bold text-xs text-gray-900 truncate">{item.name}</h5>
                      </div>
                      <span className="font-extrabold text-xs text-olive-750">{formatPrice(item.price)}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </form>
        </div>

        {/* ================= RIGHT STREAMLINED ACTIONS ================= */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          
          {/* 1. Gift Finder Button */}
          <button
            onClick={openFinder}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-rose-50 hover:from-amber-100 hover:to-rose-100 border border-amber-200/90 text-stone-800 text-xs font-bold shadow-2xs transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Finder</span>
          </button>

          {/* 2. Hi Guest / Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('profile')}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-stone-50 text-stone-700 hover:text-olive-800 transition-all duration-200 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700">
                <User className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[9px] font-medium text-stone-400 leading-none">Account</span>
                <span className="text-xs font-bold text-stone-800 leading-tight">Hi, Guest</span>
              </div>
              <ChevronDown className="w-3 h-3 text-stone-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {activeDropdown === 'profile' && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="px-3 py-2.5 border-b border-stone-100 mb-1 text-left">
                  <span className="text-xs text-stone-400 block font-medium">Welcome,</span>
                  <span className="text-sm font-bold text-stone-900 block">Gifting Guest</span>
                </div>
                <div className="space-y-0.5 text-left">
                  <button 
                    onClick={() => {
                      setActiveDropdown(null);
                      openTracker();
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-2.5"
                  >
                    <Bell className="w-4 h-4 text-olive-600" /> Track Order
                  </button>
                  <button 
                    onClick={() => {
                      setActiveDropdown(null);
                      openRemindersModal();
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-2.5"
                  >
                    <Calendar className="w-4 h-4 text-amber-600" /> Reminders
                  </button>
                  <Link
                    to="/corporate"
                    onClick={() => setActiveDropdown(null)}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-2.5"
                  >
                    <Briefcase className="w-4 h-4 text-olive-700" /> Corporate Gifting
                  </Link>
                  <div className="h-[1px] bg-stone-100 my-1"></div>
                  <button className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-2.5">
                    <LogOut className="w-4 h-4" /> Login / Register
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Luxury Dual-Tone Cart Pill */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-stone-50 hover:bg-stone-100/90 border border-stone-200 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer active:scale-95 group"
            aria-label="View Shopping Cart"
            title="View Shopping Cart"
          >
            {/* Emerald Icon Circle */}
            <div className="w-7 h-7 rounded-full bg-olive-750 group-hover:bg-olive-800 text-white flex items-center justify-center transition-colors shadow-2xs">
              <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>

            {/* Cart Label */}
            <span className="text-xs font-bold text-stone-800 font-sans tracking-wide">
              Cart
            </span>

            {/* Counter Badge */}
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-black leading-none transition-all ${
                cartCount > 0
                  ? 'bg-rose-500 text-white shadow-2xs animate-pulse'
                  : 'bg-stone-200/80 text-stone-600'
              }`}
            >
              {cartCount}
            </span>
          </button>

          {/* 4. More Options Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => toggleDropdown('more')}
              className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-all duration-200 cursor-pointer"
              title="More options & currency"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {/* Consolidated More Menu Dropdown */}
            {activeDropdown === 'more' && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-stone-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left">
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      openRemindersModal();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl hover:bg-stone-50 text-stone-700 font-semibold"
                  >
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>Occasion Reminders</span>
                  </button>

                  <Link
                    to="/corporate"
                    onClick={() => setActiveDropdown(null)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl hover:bg-stone-50 text-stone-700 font-semibold"
                  >
                    <Briefcase className="w-4 h-4 text-olive-700" />
                    <span>Corporate &amp; Bulk</span>
                    <span className="ml-auto text-[9px] font-extrabold bg-olive-100 text-olive-800 px-1.5 py-0.5 rounded-full">B2B</span>
                  </Link>

                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      openTracker();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl hover:bg-stone-50 text-stone-700 font-semibold"
                  >
                    <Bell className="w-4 h-4 text-emerald-600" />
                    <span>Track Your Order</span>
                  </button>

                  <div className="h-[1px] bg-stone-100 my-1"></div>

                  {/* Currency Selector */}
                  <div className="px-3 py-1.5">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Currency</span>
                    <div className="grid grid-cols-3 gap-1">
                      {['INR', 'USD', 'AED'].map((curr) => (
                        <button
                          key={curr}
                          onClick={() => {
                            setSelectedCurrency(curr);
                            setActiveDropdown(null);
                          }}
                          className={`py-1 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedCurrency === curr
                              ? 'bg-olive-750 text-white shadow-2xs'
                              : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {curr} ({curr === 'INR' ? '₹' : curr === 'USD' ? '$' : 'AED'})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-stone-100 text-stone-700 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE VIEWPORTS ================= */}
      {/* Mobile Inline Search Bar */}
      <div className="lg:hidden px-4 pb-3 border-b border-gray-100 flex gap-2">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder={placeholders[placeholderIndex]}
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-olive-500"
          />
        </form>
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

              {/* Categories Navigation in Mobile Menu */}
              {topCategories && topCategories.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Shop by Category
                  </span>
                  <div className="space-y-1 bg-stone-50/70 p-2 rounded-2xl border border-gray-100">
                    {topCategories.map((cat) => {
                      const subs = getSubcategories(cat);
                      const isExpanded = mobileExpandedCat === cat.id;

                      return (
                        <div key={cat.id} className="rounded-xl overflow-hidden bg-white border border-stone-100 mb-1.5 last:mb-0">
                          <div className="flex items-center justify-between p-2.5">
                            <Link
                              to={`/category/${cat.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-xs font-bold text-gray-800 hover:text-olive-700 flex-1"
                            >
                              {cat.name}
                            </Link>
                            {subs.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setMobileExpandedCat(isExpanded ? null : cat.id)}
                                className="p-1 text-gray-400 hover:text-olive-700"
                              >
                                <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            )}
                          </div>

                          {isExpanded && subs.length > 0 && (
                            <div className="bg-stone-50/60 px-3 py-2 border-t border-stone-100 space-y-1">
                              {subs.map((sub) => (
                                <Link
                                  key={sub.id}
                                  to={`/category/${sub.slug}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-1 text-[11px] font-medium text-stone-600 hover:text-olive-700"
                                >
                                  • {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Gifting Options</span>
                <div className="space-y-1">
                  {['Browse Gift Shop', 'Corporate Orders', 'Reminders & Alerts', 'My Cart'].map((l) => (
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
