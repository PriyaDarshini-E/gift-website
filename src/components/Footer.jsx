import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

/* ── Inline Brand SVG Icons ─────────────────────────────── */
function FacebookIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#f0f3f6] border-t border-gray-200 font-sans text-gray-700">
      
      {/* ── Top Main Footer Navigation Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200/80">
          
          {/* Col 1: Policy Info */}
          <div className="lg:pr-6 pt-4 lg:pt-0">
            <h3 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">
              Policy Info
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#terms" className="hover:text-gray-900 transition-colors">Terms & Conditions</a></li>
              <li><a href="#privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#use" className="hover:text-gray-900 transition-colors">Terms of Use</a></li>
              <li><a href="#disclaimer" className="hover:text-gray-900 transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          {/* Col 2: About Company */}
          <div className="lg:px-6 pt-4 lg:pt-0">
            <h3 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">
              About Company
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#about" className="hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="#team" className="hover:text-gray-900 transition-colors">Giftora Team</a></li>
              <li><a href="#careers" className="hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="#testimonials" className="hover:text-gray-900 transition-colors">Testimonials</a></li>
              <li><a href="#newsroom" className="hover:text-gray-900 transition-colors">News Room</a></li>
              <li><a href="#blog" className="hover:text-gray-900 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Col 3: Giftora Business */}
          <div className="lg:px-6 pt-4 lg:pt-0">
            <h3 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">
              Giftora Business
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#decoration" className="hover:text-gray-900 transition-colors">Decoration Services</a></li>
              <li><a href="#corporate" className="hover:text-gray-900 transition-colors">Corporate Service</a></li>
              <li><a href="#affiliate" className="hover:text-gray-900 transition-colors">Affiliate Program</a></li>
              <li><a href="#retail" className="hover:text-gray-900 transition-colors">Retails Stores</a></li>
              <li><a href="#franchise" className="hover:text-gray-900 transition-colors">Franchise</a></li>
            </ul>
          </div>

          {/* Col 4: Need Help ? */}
          <div className="lg:px-6 pt-4 lg:pt-0">
            <h3 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">
              Need Help ?
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#contact" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
              <li><a href="#faqs" className="hover:text-gray-900 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Col 5: International Presence */}
          <div className="lg:px-6 pt-4 lg:pt-0">
            <h3 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">
              International Presence
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#dubai" className="hover:text-gray-900 transition-colors">Dubai</a></li>
              <li><a href="#qatar" className="hover:text-gray-900 transition-colors">Qatar</a></li>
              <li><a href="#saudi" className="hover:text-gray-900 transition-colors">Saudi Arabia</a></li>
              <li><a href="#singapore" className="hover:text-gray-900 transition-colors">Singapore</a></li>
            </ul>
          </div>

          {/* Col 6: Subscribe Now Form */}
          <div className="lg:pl-6 pt-4 lg:pt-0">
            <h3 className="text-sm font-bold text-gray-900 mb-2 tracking-tight">
              Subscribe Now
            </h3>
            <p className="text-xs text-gray-500 mb-4 leading-normal">
              Get updates on promotions and offers coupons.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-olive-600 focus:ring-1 focus:ring-olive-600 shadow-sm transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 p-1 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-600" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-600 font-semibold mt-2 animate-fade-in">
                Thank you for subscribing!
              </p>
            )}
          </div>

        </div>
      </div>

      {/* ── Middle Corporate Legal Information ── */}
      <div className="border-t border-gray-200/80 bg-[#edf0f4] py-8 text-center text-[11px] text-gray-500 leading-relaxed px-4">
        <div className="max-w-5xl mx-auto space-y-2">
          <p>
            <span className="font-semibold text-gray-700">Company Name:</span> Giftora E Retail Private Limited &nbsp;|&nbsp; 
            <span className="font-semibold text-gray-700"> CIN:</span> U52100HR2021PTC118882 &nbsp;|&nbsp; 
            <span className="font-semibold text-gray-700"> Regd. Office:</span> Plot No. 75P, Sector-44, Gurugram, Haryana - 122003
          </p>
          <p>
            <span className="font-semibold text-gray-700">Telephone No.:</span> +91-11-28802680 &nbsp;|&nbsp; 
            <span className="font-semibold text-gray-700"> Grievance Resolution Officer Name:</span> Mr. Sagarjit Karmakar &nbsp;|&nbsp; 
            <span className="font-semibold text-gray-700"> Contact No.:</span> +91 9212422000 / 9755-248-248 &nbsp;|&nbsp; 
            <span className="font-semibold text-gray-700"> Email ID -</span> <a href="mailto:grievance@giftora.com" className="hover:underline text-gray-700">grievance@giftora.com</a>
          </p>
          <p className="pt-1">
            <a href="#csr" className="text-blue-600 font-semibold hover:underline">
              Corporate Social Responsibility (CSR) Policy
            </a>
          </p>
        </div>
      </div>

      {/* ── Bottom Strip: Social Media, Copyright, Payment Partners ── */}
      <div className="border-t border-gray-200/80 bg-[#e9ecf0] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#facebook" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#twitter" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors" aria-label="X (Twitter)">
              <TwitterIcon />
            </a>
            <a href="#instagram" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-pink-600 transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#linkedin" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-blue-700 hover:border-blue-700 transition-colors" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>

          {/* Copyright Notice */}
          <div className="text-center font-medium text-gray-600">
            © 1994-2026 giftora.com. All rights reserved.
          </div>

          {/* Payment Partner Logos */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-extrabold text-[#1a1f71] tracking-tighter">
              VISA
            </span>
            <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-black text-[#eb001b] tracking-tighter">
              mastercard
            </span>
            <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-black text-[#005a9c] tracking-tighter">
              RuPay
            </span>
            <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-black text-[#006fcf] tracking-tighter">
              EXPRESS
            </span>
            <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-[10px] font-extrabold text-gray-700">
              NetBanking
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
}
