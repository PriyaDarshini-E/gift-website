import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Building2, 
  Gift, 
  Award, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  Users, 
  Briefcase, 
  Truck, 
  BadgeCheck 
} from 'lucide-react';

const corporateBenefits = [
  {
    icon: Gift,
    title: 'Custom Brand Packaging',
    desc: 'Personalize hampers with your company logo, custom ribbons, and branded greeting cards.'
  },
  {
    icon: Truck,
    title: 'Pan-India Multi-Address Dispatch',
    desc: 'Distribute 50 to 5,000 gifts directly to employee homes or client offices simultaneously.'
  },
  {
    icon: Award,
    title: 'Dedicated Account Manager',
    desc: 'Single point of contact to manage custom curation, invoicing, and logistics SLAs.'
  },
  {
    icon: BadgeCheck,
    title: 'GST Invoice & Credit Options',
    desc: 'GST tax credit invoices with flexible corporate payment credit terms for enterprise clients.'
  }
];

export default function CorporateGifting() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    quantity: '50-200 Gifts',
    budget: '₹1,000 - ₹2,500 per gift',
    details: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        company: '',
        contactName: '',
        email: '',
        phone: '',
        quantity: '50-200 Gifts',
        budget: '₹1,000 - ₹2,500 per gift',
        details: ''
      });
    }, 3000);
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-gray-800 animate-fade-in pb-20">
      
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-amber-50/90 via-rose-50/70 to-orange-50/80 text-gray-900 py-16 px-4 sm:px-6 lg:px-8 border-b border-rose-200/80 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <nav className="flex items-center justify-center md:justify-start gap-2 text-xs text-stone-500 mb-6">
            <Link to="/" className="hover:text-olive-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-olive-800 font-semibold">Corporate Gifting</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-extrabold tracking-wider uppercase mb-4 shadow-xs">
                <Building2 className="w-4 h-4 text-rose-600 animate-pulse" />
                Enterprise Bulk Solutions
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.15]">
                Elevate Your <span className="bg-gradient-to-r from-olive-700 via-rose-600 to-amber-700 bg-clip-text text-transparent">Corporate Relationships</span> 💼
              </h1>
              <p className="text-stone-600 text-sm sm:text-base lg:text-lg mt-4 font-normal leading-relaxed">
                Custom gourmet hampers, executive gift boxes, employee rewards, and festive bulk dispatches tailored for India's leading organizations.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xl space-y-4">
                <img src="/images/home/banner3.png" alt="Corporate Hampers" className="w-full h-48 object-cover rounded-2xl" />
                <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                  <span>Delivered to 500+ Corporate Clients</span>
                  <span className="text-olive-700 font-extrabold">GST Invoicing Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Benefits Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corporateBenefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-2">{b.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bulk Inquiry Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-12 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-olive-600 uppercase tracking-wider">Instant Quote Request</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight mt-1">
              Request Corporate Bulk Quote
            </h2>
            <p className="text-xs text-stone-500 mt-1">Fill out the form below and our corporate gifting team will respond within 2 hours.</p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
              <h3 className="font-bold text-xl text-gray-900">Inquiry Received!</h3>
              <p className="text-xs text-stone-600 mt-2">Our corporate Account Executive will email your customized catalog and price quotation shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Company Name *</label>
                  <input required type="text" placeholder="Acme Technologies" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-stone-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Contact Person Name *</label>
                  <input required type="text" placeholder="Rahul Sharma" value={formData.contactName} onChange={(e) => setFormData({...formData, contactName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-stone-50" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Official Work Email *</label>
                  <input required type="email" placeholder="rahul@acme.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-stone-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Phone / WhatsApp Number *</label>
                  <input required type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-stone-50" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Estimated Quantity</label>
                  <select value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none bg-stone-50 font-medium">
                    <option value="20-50 Gifts">20 - 50 Gifts</option>
                    <option value="50-200 Gifts">50 - 200 Gifts</option>
                    <option value="200-1000 Gifts">200 - 1,000 Gifts</option>
                    <option value="1000+ Gifts">1,000+ Gifts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Budget Per Gift</label>
                  <select value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none bg-stone-50 font-medium">
                    <option value="Under ₹1,000">Under ₹1,000</option>
                    <option value="₹1,000 - ₹2,500 per gift">₹1,000 - ₹2,500 per gift</option>
                    <option value="₹2,500 - ₹5,000 per gift">₹2,500 - ₹5,000 per gift</option>
                    <option value="₹5,000+ Luxury">₹5,000+ Luxury</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Special Curation Requirements</label>
                <textarea rows={3} placeholder="Tell us about the occasion (Diwali, New Year, Employee Appreciation) or specific items needed..." value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 bg-stone-50" />
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-olive-600 hover:bg-olive-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Submit Bulk Quote Request
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
