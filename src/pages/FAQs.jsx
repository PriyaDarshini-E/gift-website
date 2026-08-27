import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Truck, 
  CreditCard, 
  RefreshCw, 
  Smile, 
  Gift, 
  PhoneCall
} from 'lucide-react';

const faqCategories = [
  { id: 'all', name: 'All Questions', icon: HelpCircle },
  { id: 'delivery', name: 'Delivery & Shipping', icon: Truck },
  { id: 'payments', name: 'Ordering & Payments', icon: CreditCard },
  { id: 'refunds', name: 'Cancellations & Refunds', icon: RefreshCw },
  { id: 'freshness', name: 'Freshness & Products', icon: Smile },
  { id: 'corporate', name: 'Corporate Gifting', icon: Gift }
];

const faqsData = [
  {
    id: 1,
    category: 'delivery',
    question: 'How fast can Giftora deliver flowers and cakes?',
    answer: 'Giftora offers same-day express delivery across 400+ cities in India. Orders placed before 6:00 PM are eligible for express 2-hour delivery or evening delivery slots. We also offer fixed-time and midnight delivery options (11:00 PM - 12:30 AM).'
  },
  {
    id: 2,
    category: 'delivery',
    question: 'How do I track my live order status?',
    answer: 'Once your order is dispatched, you will receive an SMS and WhatsApp notification containing a live tracking link. You can also track your order anytime by visiting our Track Order page or entering your Order ID in customer support chat.'
  },
  {
    id: 3,
    category: 'payments',
    question: 'What payment methods does Giftora accept?',
    answer: 'We accept all major credit cards, debit cards, Net Banking, UPI (Google Pay, PhonePe, Paytm, BHIM), Razorpay, Cred, Apple Pay, and international cards (Visa, MasterCard, Amex) for international customers.'
  },
  {
    id: 4,
    category: 'refunds',
    question: 'What is Giftora’s cancellation and refund policy?',
    answer: 'Orders can be cancelled free of charge up to 4 hours before the scheduled delivery slot. If your order arrives damaged or unsatisfactory, please notify our 24/7 care team within 24 hours with a photo for an immediate replacement or 100% refund.'
  },
  {
    id: 5,
    category: 'freshness',
    question: 'How do you ensure flowers and cakes stay fresh during transport?',
    answer: 'All our cakes are baked fresh on the day of delivery by certified master bakeries. Flowers are harvested fresh from temperature-controlled farms and transported using insulated cold-chain boxes to preserve pristine bloom quality.'
  },
  {
    id: 6,
    category: 'corporate',
    question: 'Does Giftora offer corporate gifting and custom bulk orders?',
    answer: 'Yes! Giftora has a dedicated corporate gifting division providing custom logo branding, personalized gift boxes, gourmet hampers, employee onboarding kits, and multi-location bulk dispatch. Email corporate@giftora.com for a custom quote.'
  },
  {
    id: 7,
    category: 'delivery',
    question: 'Do you deliver on Sundays and National Holidays?',
    answer: 'Yes! Giftora operates 365 days a year, including Sundays, festivals, and national holidays, ensuring your special celebrations are never delayed.'
  },
  {
    id: 8,
    category: 'payments',
    question: 'Can I send a gift anonymously without showing my name?',
    answer: 'Yes! During checkout, simply uncheck the "Include Sender Name on Card" option. The recipient will receive your gift with only your card message without exposing your billing address or identity.'
  }
];

export default function FAQs() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqId, setOpenFaqId] = useState(1);

  const filteredFaqs = faqsData.filter(faq => {
    const matchesCat = selectedCat === 'all' || faq.category === selectedCat;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-gray-800 animate-fade-in pb-20">
      
      {/* ── Hero Header ── */}
      <div className="relative bg-gradient-to-br from-amber-50/90 via-rose-50/70 to-orange-50/80 text-gray-900 py-16 px-4 sm:px-6 lg:px-8 border-b border-rose-200/80 shadow-sm overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <nav className="flex items-center justify-center md:justify-start gap-2 text-xs text-stone-500 mb-6">
            <Link to="/" className="hover:text-olive-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-olive-800 font-semibold">FAQs</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-extrabold tracking-wider uppercase mb-4 shadow-xs">
              <HelpCircle className="w-4 h-4 text-rose-600 animate-bounce" />
              Instant Answer Hub
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.15]">
              Frequently Asked <span className="bg-gradient-to-r from-olive-700 via-rose-600 to-amber-700 bg-clip-text text-transparent">Questions</span> ❓
            </h1>
            <p className="text-stone-600 text-sm sm:text-base lg:text-lg mt-4 font-normal leading-relaxed">
              Find quick answers regarding express deliveries, payments, product freshness, and order modifications.
            </p>

            {/* Live Search Bar */}
            <div className="mt-8 relative max-w-xl">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions (e.g. delivery, midnight, refund)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-600 bg-white shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ Categories & Accordions ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 justify-center">
          {faqCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-xs ${
                  isActive
                    ? 'bg-olive-600 text-white ring-4 ring-olive-200 scale-105 shadow-md'
                    : 'bg-white text-stone-700 hover:bg-rose-50 border border-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Accordions List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
              <HelpCircle className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <p className="font-bold text-gray-800">No questions found</p>
              <p className="text-xs text-stone-500 mt-1">Try searching a different word or browse categories above.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-display font-extrabold text-base sm:text-lg text-gray-900 pr-2">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'bg-olive-100 border-olive-300 text-olive-700 rotate-180' : 'bg-stone-50 border-stone-200 text-stone-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-100 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 rounded-3xl p-8 sm:p-10 border border-rose-200/80 text-center flex flex-col items-center">
          <PhoneCall className="w-10 h-10 text-olive-600 mb-3" />
          <h3 className="font-display font-extrabold text-2xl text-gray-900">Still Have Questions?</h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md">
            Can’t find the answer you’re looking for? Reach out to our 24/7 customer care team directly.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-olive-600 hover:bg-olive-700 text-white font-extrabold text-xs shadow-md transition-all"
          >
            Contact Customer Support
          </Link>
        </div>

      </div>

    </div>
  );
}
