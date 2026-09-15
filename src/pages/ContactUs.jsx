import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import { createEnquiry } from '../services/enquiryService';
import { 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  HelpCircle,
  Headphones,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ContactUs() {
  const { company } = useCompany();
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    category: 'General Query',
    message: ''
  });

  const contactCards = [
    {
      icon: Phone,
      title: 'Customer Hotline',
      detail: company?.phone || '+91 98765 43210',
      sub: 'Toll-free 24/7 Support',
      color: 'bg-rose-100 text-rose-700 border-rose-200'
    },
    {
      icon: Mail,
      title: 'Email Support',
      detail: company?.email || 'support@giftora.com',
      sub: 'Quick response under 2 hours',
      color: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    {
      icon: MapPin,
      title: 'Corporate Headquarters',
      detail: company?.name || 'Giftora E-Retail Pvt Ltd',
      sub: company?.address || 'Sector 44, Gurugram, Haryana 122003',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      detail: '24 Hours / 7 Days a Week',
      sub: '365 Days Express Delivery',
      color: 'bg-sky-100 text-sky-700 border-sky-200'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    const res = await createEnquiry({
      name: formData.name,
      mobile: formData.phone,
      address: `Email: ${formData.email} | Category: ${formData.category} | OrderID: ${formData.orderId || 'N/A'} | Note: ${formData.message}`,
      items: [
        {
          productId: '1',
          variantId: '1',
          quantity: 1,
          price: 999,
          originalPrice: 999,
          bulkPrice: 999,
        }
      ]
    });

    setSubmitting(false);

    if (res.success) {
      setSubmitSuccess(res.message || 'Thank you for reaching out to Giftora. One of our customer care specialists will reply to your email shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        orderId: '',
        category: 'General Query',
        message: ''
      });
      setTimeout(() => setSubmitSuccess(null), 8000);
    } else {
      setSubmitError(res.error || 'Failed to submit inquiry. Please try again.');
      setTimeout(() => setSubmitError(null), 6000);
    }
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
            <span className="text-olive-800 font-semibold">Contact Us</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-extrabold tracking-wider uppercase mb-4 shadow-xs">
              <Headphones className="w-4 h-4 text-rose-600 animate-pulse" />
              Here to Help 24/7
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.15]">
              We’d Love to <span className="bg-gradient-to-r from-olive-700 via-rose-600 to-amber-700 bg-clip-text text-transparent">Hear From You</span> 📞
            </h1>
            <p className="text-stone-600 text-sm sm:text-base lg:text-lg mt-4 font-normal leading-relaxed">
              Have a question about your order, custom corporate gifting, or fresh floral delivery? Our friendly support team is always just a message away.
            </p>
          </div>
        </div>
      </div>

      {/* ── Contact Info Cards Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div 
                key={i} 
                className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.color} mb-4 shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 mb-1">{card.title}</h3>
                  <p className="font-extrabold text-xs text-olive-700 mb-1">{card.detail}</p>
                  <p className="text-[11px] text-stone-500 font-medium">{card.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Form & Map Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <span className="text-xs font-bold text-olive-600 uppercase tracking-wider">Send Us a Message</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight mt-1">
                How Can We Help You Today?
              </h2>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h3 className="font-bold text-xl text-gray-900">Message Sent Successfully!</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {submitSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-600 bg-stone-50" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Email Address *</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-600 bg-stone-50" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number *</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-600 bg-stone-50" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Order ID (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="#GIFT-109823"
                      value={formData.orderId}
                      onChange={(e) => setFormData({...formData, orderId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-600 bg-stone-50" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Inquiry Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-600 bg-stone-50 font-medium"
                  >
                    <option value="General Query">General Query</option>
                    <option value="Order Tracking & Status">Order Tracking & Status</option>
                    <option value="Corporate Gifting Bulk Order">Corporate Gifting Bulk Order</option>
                    <option value="Cancellation & Refund">Cancellation & Refund</option>
                    <option value="Feedback & Support">Feedback & Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Message *</label>
                  <textarea 
                    required 
                    rows={4}
                    placeholder="Tell us how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-600 bg-stone-50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-olive-600 hover:bg-olive-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message Now</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick Support Callout */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-50/80 via-rose-50/60 to-orange-50/80 p-8 rounded-3xl border border-rose-200/80 space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-olive-100 text-olive-800 text-[11px] font-bold mb-2">
                Need Instant Help?
              </span>
              <h3 className="font-display font-extrabold text-2xl text-gray-900">Check Our FAQs</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Find immediate answers regarding delivery SLAs, payment options, midnight surprises, and order tracking.
              </p>
            </div>

            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-olive-800 font-bold text-xs shadow-xs transition-all"
            >
              <HelpCircle className="w-4 h-4 text-olive-600" />
              Visit FAQ Center
            </Link>

            <div className="pt-6 border-t border-rose-200/60">
              <h4 className="font-bold text-xs text-gray-900 mb-2">Corporate HQ Location</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {company?.name || 'Memory Creators'}<br />
                {company?.address || 'Jayanagar 9th Block, Bangalore – 560 043 Karnataka.'}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
