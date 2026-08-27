import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  Clock, 
  HelpCircle, 
  Mail, 
  Phone, 
  ArrowUp,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
  CreditCard,
  Lock
} from 'lucide-react';

const sections = [
  { id: 'agreement', title: '1. Agreement to Terms', icon: ShieldCheck },
  { id: 'account', title: '2. User Account & Eligibility', icon: Lock },
  { id: 'pricing', title: '3. Products, Pricing & Payment', icon: CreditCard },
  { id: 'delivery', title: '4. Delivery & Shipping Policy', icon: Truck },
  { id: 'cancellation', title: '5. Cancellations, Refunds & Returns', icon: RotateCcw },
  { id: 'intellectual-property', title: '6. Intellectual Property Rights', icon: FileText },
  { id: 'user-conduct', title: '7. Prohibited Conduct & User Misuse', icon: AlertCircle },
  { id: 'liability', title: '8. Limitation of Liability & Warranties', icon: CheckCircle2 },
  { id: 'governing-law', title: '9. Governing Law & Dispute Resolution', icon: ShieldCheck },
  { id: 'contact-us', title: '10. Contact & Support Information', icon: HelpCircle },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('agreement');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-gray-800 animate-fade-in pb-16">
      
      {/* ── Page Header / Hero Banner ── */}
      <div className="bg-gradient-to-br from-amber-50/90 via-rose-50/70 to-orange-50/80 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-b border-rose-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-4">
            <Link to="/" className="hover:text-olive-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-olive-800 font-semibold">Terms & Conditions</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-semibold tracking-wide uppercase mb-3 shadow-xs">
                <FileText className="w-3.5 h-3.5 text-rose-600" />
                Legal & Compliance
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight">
                Terms & Conditions
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl font-normal">
                Please read these terms carefully before using Giftora platform or ordering our products & gifting services.
              </p>
            </div>

            {/* Last Updated Pill */}
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-rose-200/80 shadow-xs self-start md:self-auto">
              <Clock className="w-5 h-5 text-olive-600" />
              <div>
                <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">Effective Date</p>
                <p className="text-xs font-bold text-gray-900">August 26, 2026</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ── Left Sidebar Navigation (Quick Links) ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 px-3 pb-2 border-b border-stone-100 mb-2">
                Table of Contents
              </p>
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive 
                        ? 'bg-olive-50 text-olive-800 font-bold border-l-4 border-olive-600 shadow-xs' 
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-olive-600' : 'text-stone-400'}`} />
                      <span className="truncate">{sec.title}</span>
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isActive ? 'translate-x-0.5 text-olive-600' : 'text-stone-300'}`} />
                  </button>
                );
              })}

              {/* Need Help Box */}
              <div className="pt-4 border-t border-stone-100 mt-4 px-2">
                <div className="bg-amber-50/80 rounded-xl p-3.5 border border-amber-200/80">
                  <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Have Legal Questions?
                  </p>
                  <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                    Contact our support team for clarifications regarding policies.
                  </p>
                  <a
                    href="mailto:support@giftora.com"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 hover:underline mt-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-700" />
                    support@giftora.com
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ── Right Content Panel ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* Intro Alert Box */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center text-olive-700 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-2">
                <p className="font-semibold text-stone-900 text-base">Welcome to Giftora!</p>
                <p>
                  These Terms and Conditions governing the use of website <span className="font-semibold text-stone-800">www.giftora.com</span> and mobile applications ("Giftora Platform") operated by <span className="font-semibold text-stone-800">Giftora E Retail Private Limited</span>. By accessing, browsing, or purchasing products through Giftora, you acknowledge and agree to comply with all clauses outlined herein.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section id="agreement" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-olive-600" />
                1. Agreement to Terms
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3 font-sans">
                <p>
                  By accessing or using Giftora Platform, you confirm that you are at least 18 years of age (or possess legal parental/guardian consent) and are legally competent to enter into binding contracts.
                </p>
                <p>
                  Giftora reserves the right to modify, revise, or update these Terms & Conditions at any time without prior individual notice. Any updates will become effective immediately upon being published on the platform. Your continued use of Giftora following published modifications signifies acceptance of the revised terms.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="account" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <Lock className="w-5 h-5 text-olive-600" />
                2. User Account & Security
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p>
                  To place orders or access personalized features on Giftora, you may create a user account. You are solely responsible for maintaining confidentiality of your password and credentials.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You agree to provide accurate, current, and complete personal & delivery details during registration and checkout.</li>
                  <li>You are responsible for all activities occurring under your account credentials.</li>
                  <li>Giftora reserves the right to suspend or terminate accounts found violating terms or engaging in fraudulent activity.</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="pricing" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <CreditCard className="w-5 h-5 text-olive-600" />
                3. Products, Pricing & Payment Terms
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p>
                  All product prices listed on Giftora are in Indian Rupees (INR) unless otherwise stated, inclusive of applicable Goods and Services Tax (GST).
                </p>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2">
                  <p className="font-semibold text-stone-800 text-xs uppercase tracking-wider">Payment Options Supported:</p>
                  <p className="text-xs text-stone-600">
                    We accept payments via Credit Cards, Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), Wallet payments, and Select Cash-on-Delivery (COD) options.
                  </p>
                </div>
                <p>
                  Prices for products and delivery services are subject to change without notice. In the event of a pricing error on the platform, Giftora reserves the right to cancel orders placed at incorrect prices after notifying the customer.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="delivery" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <Truck className="w-5 h-5 text-olive-600" />
                4. Delivery & Shipping Policy
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p>
                  Giftora offers express shipping, courier delivery, and hand-delivered perishable items (cakes, fresh flowers, plants) across India.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                    <p className="font-bold text-xs text-stone-800 mb-1">Perishable Gifts (Flowers & Cakes)</p>
                    <p className="text-xs text-stone-600">Hand-delivered by local partner bakers & florists during chosen slot.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                    <p className="font-bold text-xs text-stone-800 mb-1">Courier Products</p>
                    <p className="text-xs text-stone-600">Dispatched via premium courier partners (BlueDart, Delhivery) within 2-5 business days.</p>
                  </div>
                </div>
                <p>
                  Exact delivery time slots are approximate. Unforeseen weather conditions, traffic delays, or incorrect recipient addresses may affect timing.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="cancellation" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <RotateCcw className="w-5 h-5 text-olive-600" />
                5. Cancellations, Refunds & Returns Policy
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p>
                  Due to the perishable nature of flowers, plants, cakes, and personalized gifts, cancellations are subject to strict cut-off times:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Standard Orders:</strong> Cancellations permitted up to 24 hours prior to scheduled delivery time.</li>
                  <li><strong>Same-Day / Express Orders:</strong> Cannot be cancelled once preparation or dispatch has initiated.</li>
                  <li><strong>Damaged / Incorrect Items:</strong> If a delivered item is damaged or defective, please contact support within 4 hours of delivery along with photos for immediate replacement or refund.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section id="intellectual-property" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <FileText className="w-5 h-5 text-olive-600" />
                6. Intellectual Property Rights
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p>
                  All content included on Giftora Platform—including logos, product graphics, UI design, text, software, and audio clips—is the exclusive property of Giftora E Retail Private Limited or its content suppliers and is protected under Indian Intellectual Property laws.
                </p>
                <p>
                  Reproduction, copying, distribution, or commercial exploitation of platform content without explicit written consent from Giftora is strictly prohibited.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="user-conduct" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <AlertCircle className="w-5 h-5 text-olive-600" />
                7. Prohibited Conduct & User Misuse
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p>
                  Users agree not to engage in any activity that impairs the security or functioning of Giftora Platform:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Uploading malicious code, viruses, or automated scraping scripts.</li>
                  <li>Impersonating another person or fabricating payment details.</li>
                  <li>Sending offensive, defamatory, or unlawful messages on gift cards.</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section id="liability" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <CheckCircle2 className="w-5 h-5 text-olive-600" />
                8. Limitation of Liability & Warranty Disclaimer
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p>
                  Giftora platform services are provided on an "as is" and "as available" basis. Giftora expressly disclaims all warranties of any kind, whether express or implied.
                </p>
                <p>
                  Giftora shall not be liable for indirect, incidental, special, or consequential damages resulting from inability to use the platform, delivery delays beyond reasonable control, or unauthorized access to server data.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="governing-law" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-olive-600" />
                9. Governing Law & Dispute Resolution
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of India.
                </p>
                <p>
                  Any legal proceedings, disputes, or claims arising out of or relating to Giftora services shall be subject to exclusive jurisdiction of the courts located in Gurugram / New Delhi, India.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="contact-us" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <HelpCircle className="w-5 h-5 text-olive-600" />
                10. Contact & Support Information
              </h2>
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-4">
                <p>
                  For any inquiries, customer support requests, or grievance resolutions regarding these Terms & Conditions:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <p className="font-bold text-stone-900 text-xs mb-1 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-olive-600" />
                      Email Support
                    </p>
                    <a href="mailto:support@giftora.com" className="text-xs text-olive-700 hover:underline">
                      support@giftora.com
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <p className="font-bold text-stone-900 text-xs mb-1 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-olive-600" />
                      Customer Care Helpline
                    </p>
                    <p className="text-xs text-stone-700">+91 92124 22000 (9 AM - 9 PM)</p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-stone-500">
                  <p className="font-semibold text-stone-800">Corporate Address:</p>
                  <p>Giftora E Retail Private Limited, Plot No. 75P, Sector-44, Gurugram, Haryana - 122003, India.</p>
                </div>
              </div>
            </section>

            {/* Back to top button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 shadow-xs transition-all"
              >
                <ArrowUp className="w-4 h-4 text-olive-600" />
                Back to Top
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
