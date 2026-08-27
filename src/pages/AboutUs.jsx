import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Gift, 
  Award, 
  Globe, 
  MapPin, 
  ChevronRight, 
  ArrowRight,
  Smile,
  Star,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Eye,
  Quote,
  TrendingUp,
  Sparkle,
  Users,
  Trophy
} from 'lucide-react';

/* ── Golden Laurel Leaf Wreath Branch SVG ──────────────────── */
function LaurelBranch({ flip = false }) {
  return (
    <svg 
      width="40" 
      height="80" 
      viewBox="0 0 44 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none flex-shrink-0 ${flip ? 'scale-x-[-1]' : ''}`}
      aria-hidden="true"
    >
      <path 
        d="M22 82C20 62 10 38 4 10" 
        stroke="#D4AF37" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      {/* Laurel Leaves */}
      <path d="M18 70C10 68 4 60 8 52C16 54 20 62 18 70Z" fill="#E5C158" />
      <path d="M14 54C6 50 2 40 8 34C14 38 16 48 14 54Z" fill="#D4AF37" />
      <path d="M12 38C4 32 2 20 10 16C14 22 14 30 12 38Z" fill="#F0D675" />
      <path d="M10 22C4 14 4 6 12 4C14 10 12 18 10 22Z" fill="#D4AF37" />
      <path d="M22 60C28 56 32 46 26 42C22 46 20 54 22 60Z" fill="#E5C158" />
      <path d="M18 42C24 36 26 26 20 22C16 26 16 36 18 42Z" fill="#D4AF37" />
      <path d="M14 26C18 18 20 10 14 6C10 12 12 20 14 26Z" fill="#F0D675" />
    </svg>
  );
}

const accolades = [
  {
    title: '2024 Pitch Top 50 Brands India',
    subtitle: 'Top D2C Gifting Brand'
  },
  {
    title: 'Future of Workplace & Leadership Award',
    subtitle: 'Excellence in Culture'
  },
  {
    title: 'Top 100 Franchise Opportunities',
    subtitle: 'Retail Expansion'
  },
  {
    title: 'Business Leadership Award',
    subtitle: 'E-Commerce Innovation'
  },
  {
    title: 'Best Gifting e-Retailer',
    subtitle: 'Indian Retail Excellence'
  },
  {
    title: 'Specialty e-Retailer of the Year',
    subtitle: 'Customer Delight Summit'
  }
];


const timelineData = [
  {
    year: '1994',
    title: 'The First Flower Shop',
    desc: 'Giftora started as a humble single flower shop in Delhi, driven by a passion to deliver fresh handpicked blooms and handwritten notes of love.',
    badge: 'Humble Beginnings 🌸',
    img: '/images/home/flower_coll_1.png',
    stat: '1 Store'
  },
  {
    year: '2002',
    title: 'Pioneering E-Commerce Gifting',
    desc: 'Launched Giftora.com, becoming one of India’s earliest digital storefronts for online flower, cake, and gift deliveries.',
    badge: 'Digital Era 🚀',
    img: '/images/home/banner1.png',
    stat: '50+ Cities'
  },
  {
    year: '2012',
    title: 'Franchise & Retail Expansion',
    desc: 'Expanded into a nation-wide network of 100+ boutique retail outlets, establishing cold-chain supply for fresh cakes and flowers.',
    badge: 'Retail Growth 🏪',
    img: '/images/home/raksha1.png',
    stat: '150+ Outlets'
  },
  {
    year: '2020',
    title: 'Global Express Network',
    desc: 'Launched international delivery services across 120+ countries including UAE, Singapore, Qatar, UK, and USA.',
    badge: 'Global Footprint 🌍',
    img: '/images/home/banner2.png',
    stat: '120+ Countries'
  },
  {
    year: '2024',
    title: 'Luxury Artisanal Hampers',
    desc: 'Introduced luxury gourmet gift boxes, designer plant collections, and premium corporate gifting solutions.',
    badge: 'Luxury Experience 🎁',
    img: '/images/home/banner3.png',
    stat: '2.5M+ Customers'
  },
  {
    year: '2026',
    title: 'AI-Powered Ultra-Fast Gifting',
    desc: 'Empowering 10M+ celebrations with AI gift finders, 2-hour express deliveries, and 99.8% customer satisfaction.',
    badge: 'Future of Gifting ✨',
    img: '/images/home/banner4.png',
    stat: '10M+ Smiles'
  }
];

const leadership = [
  {
    name: 'Vikaas Gutgutia',
    role: 'Founder & Managing Director',
    quote: 'Gifting is the most universal language of human affection. We built Giftora to bridge distances and create everyday magic.',
    img: '/images/home/flower_coll_3.png',
    color: 'from-amber-500 to-rose-500'
  },
  {
    name: 'Meeta Gutgutia',
    role: 'Co-Founder & Creative Director',
    quote: 'Every bouquet design, cake layer, and gift box is curated like a piece of art to evoke unmitigated joy.',
    img: '/images/home/flower_coll_1.png',
    color: 'from-rose-500 to-purple-600'
  },
  {
    name: 'Pawan Gadia',
    role: 'Global CEO',
    quote: 'Combining logistics innovation, technology, and heart to deliver happiness in under 2 hours nationwide.',
    img: '/images/home/flower_coll_4.png',
    color: 'from-emerald-500 to-teal-600'
  }
];

const pillars = [
  {
    icon: Heart,
    title: 'Freshness Guarantee',
    desc: 'Hand-harvested flowers and oven-fresh cakes baked daily by master confectioners.',
    gradient: 'from-rose-500 via-pink-500 to-purple-600',
    shadow: 'shadow-pink-500/20'
  },
  {
    icon: Zap,
    title: 'Express 2-Hour Delivery',
    desc: 'Rapid delivery infrastructure ensuring midnight and same-day surprises arrive right on cue.',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    shadow: 'shadow-amber-500/20'
  },
  {
    icon: Gift,
    title: 'Artisanal Craftsmanship',
    desc: 'Personalized keepsakes, bespoke floral arrangements, and luxury gift hampers wrapped to perfection.',
    gradient: 'from-emerald-500 via-teal-600 to-green-700',
    shadow: 'shadow-emerald-500/20'
  },
  {
    icon: Globe,
    title: 'Global Reach (120+ Countries)',
    desc: 'Seamless worldwide delivery connecting families across UAE, Singapore, US, UK, and beyond.',
    gradient: 'from-blue-500 via-indigo-600 to-purple-700',
    shadow: 'shadow-blue-500/20'
  }
];

const stats = [
  { number: '10M+', label: 'Happy Celebrations', icon: Smile, color: 'text-rose-500' },
  { number: '400+', label: 'Cities Across India', icon: MapPin, color: 'text-amber-500' },
  { number: '120+', label: 'Countries Delivered To', icon: Globe, color: 'text-sky-500' },
  { number: '99.8%', label: 'On-Time Express Rate', icon: Clock, color: 'text-emerald-500' }
];

export default function AboutUs() {
  const [activeYearIndex, setActiveYearIndex] = useState(5);
  const currentTimeline = timelineData[activeYearIndex];

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-gray-800 animate-fade-in pb-20 overflow-hidden">
      
      {/* ── 1. Vibrant Light Floral Hero Header ── */}
      <div className="relative bg-gradient-to-br from-amber-50/90 via-rose-50/70 to-orange-50/80 text-gray-900 py-16 px-4 sm:px-6 lg:px-8 border-b border-rose-200/80 shadow-sm overflow-hidden">
        
        {/* Animated Ambient Glowing Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center md:justify-start gap-2 text-xs text-stone-500 mb-6">
            <Link to="/" className="hover:text-olive-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-olive-800 font-semibold">About Us</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-extrabold tracking-wider uppercase mb-4 shadow-xs">
                <Sparkles className="w-4 h-4 text-rose-600 animate-spin" style={{ animationDuration: '6s' }} />
                Delivering Love & Emotions Since 1994
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.15]">
                Making Every <span className="bg-gradient-to-r from-olive-700 via-rose-600 to-amber-700 bg-clip-text text-transparent">Moment Unforgettable</span> ✨
              </h1>

              <p className="text-stone-600 text-sm sm:text-base lg:text-lg mt-5 font-normal leading-relaxed max-w-2xl">
                From a single neighborhood flower shop to India's premier online gifting destination, Giftora connects millions of hearts with fresh blooms, delicious cakes, and luxury handcrafted surprises.
              </p>

              {/* Quick Badge Chips */}
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-rose-200/80 text-xs text-stone-800 font-semibold shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-olive-600" />
                  100% Guaranteed Freshness
                </div>
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-rose-200/80 text-xs text-stone-800 font-semibold shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-olive-600" />
                  Same-Day 2-Hour Express
                </div>
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-rose-200/80 text-xs text-stone-800 font-semibold shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-olive-600" />
                  120+ Countries Reach
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-gold-400 via-rose-300 to-olive-400 shadow-xl">
                <div className="bg-white rounded-[23px] overflow-hidden p-6 relative border border-rose-100">
                  <img
                    src="/images/home/flower_coll_1.png"
                    alt="Luxury Orchid Bouquet"
                    className="w-full h-72 object-cover rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="mt-4 flex items-center justify-between text-gray-900">
                    <div>
                      <p className="text-xs text-olive-700 font-bold uppercase tracking-wider">Signature Collection</p>
                      <p className="text-base font-extrabold text-stone-900">Luxury Phalaenopsis Orchids</p>
                    </div>
                    <span className="px-3 py-1 bg-olive-600 text-white rounded-full text-xs font-bold shadow-sm">
                      Fresh & Handcrafted
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── 2. Vision & Mission (Glassmorphic Cards) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <div className="group relative rounded-3xl p-8 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white text-stone-900 shadow-lg border border-emerald-200/80 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Eye className="w-32 h-32 text-emerald-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mb-6 shadow-xs">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block mb-1">Looking Ahead</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900 mb-3">Our Vision</h3>
              <p className="text-stone-600 text-sm leading-relaxed font-normal">
                To be the world’s most loved and trusted gifting brand, continuously innovating to make every emotional connection effortless, vibrant, and unforgettable across all corners of the globe.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="group relative rounded-3xl p-8 bg-gradient-to-br from-rose-50 via-pink-50/60 to-white text-stone-900 shadow-lg border border-rose-200/80 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target className="w-32 h-32 text-rose-600" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 mb-6 shadow-xs">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold text-rose-700 uppercase tracking-widest block mb-1">Our Purpose</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900 mb-3">Our Mission</h3>
              <p className="text-stone-600 text-sm leading-relaxed font-normal">
                To deliver happiness through high-quality handcrafted floral arrangements, fresh cakes, personalized treasures, and seamless express logistics that exceed customer expectations every single day.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. Interactive Milestone Timeline (1994 - 2026) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            Our Legacy
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            30+ Years of Spreading Joy
          </h2>
          <p className="text-stone-500 text-sm mt-2 font-sans">
            Click on any year to explore Giftora’s milestones over the decades.
          </p>
        </div>

        {/* Year Tabs Selector */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap mb-10">
          {timelineData.map((item, idx) => {
            const isActive = activeYearIndex === idx;
            return (
              <button
                key={item.year}
                onClick={() => setActiveYearIndex(idx)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 transform active:scale-95 shadow-sm ${
                  isActive 
                    ? 'bg-olive-600 text-white ring-4 ring-olive-200 scale-105 shadow-lg' 
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {item.year}
              </button>
            );
          })}
        </div>

        {/* Active Year Milestone Feature Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500 animate-fade-in">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-olive-600 tracking-tight">
                {currentTimeline.year}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs">
                {currentTimeline.badge}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
              {currentTimeline.title}
            </h3>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
              {currentTimeline.desc}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <div className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl inline-flex items-center gap-2">
                <Award className="w-4 h-4 text-olive-600" />
                <span className="text-xs font-bold text-stone-800">Key Milestone: {currentTimeline.stat}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 aspect-[4/3]">
              <img
                src={currentTimeline.img}
                alt={currentTimeline.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          </div>

        </div>

      </div>

      {/* ── 3.5. Accolades & Milestones (Golden Laurel Wreaths) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-b from-amber-50/50 via-rose-50/30 to-amber-50/50 rounded-3xl border border-amber-200/60 p-8 sm:p-12 shadow-sm">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-xs">
              <Trophy className="w-4 h-4 text-gold-600 animate-pulse" />
              Awards & Recognition
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-olive-900 tracking-tight">
              Accolades & Milestones
            </h2>
            <p className="text-stone-600 text-sm mt-2 font-sans">
              Honored and recognized for excellence in D2C e-commerce, leadership, and customer delight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {accolades.map((award, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-between text-center overflow-hidden hover:border-gold-400"
              >
                {/* Left Laurel Branch */}
                <LaurelBranch />

                {/* Award Title Text */}
                <div className="px-2 my-auto">
                  <p className="font-display font-extrabold text-base sm:text-lg text-stone-800 leading-snug group-hover:text-olive-800 transition-colors">
                    {award.title}
                  </p>
                  {award.subtitle && (
                    <p className="text-xs text-amber-700 font-semibold mt-1.5 font-sans">
                      {award.subtitle}
                    </p>
                  )}
                </div>

                {/* Right Laurel Branch */}
                <LaurelBranch flip={true} />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── 4. Colorful Brand Pillars ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            The Pillars of Giftora
          </h2>
          <p className="text-stone-500 text-sm mt-2 font-sans">
            Designed with love, built for perfection, delivered with speed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={`group relative rounded-3xl p-6 bg-gradient-to-br ${p.gradient} text-white shadow-lg ${p.shadow} hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/30 shadow-inner group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white mb-2">{p.title}</h3>
                  <p className="text-white/90 text-xs leading-relaxed font-light">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. Founder & Leadership Spotlight ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-olive-100 border border-olive-300 text-olive-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-olive-600" />
            Leadership & Visionaries
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Meet the Minds Behind the Magic
          </h2>
          <p className="text-stone-500 text-sm mt-2 font-sans">
            Guiding Giftora’s mission to connect hearts across borders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((leader, i) => (
            <div 
              key={i} 
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[4/3] shadow-md">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${leader.color} opacity-20`}></div>
                </div>
                
                <h3 className="font-display font-extrabold text-xl text-gray-900">{leader.name}</h3>
                <p className="text-xs font-bold text-olive-600 uppercase tracking-wide mt-0.5 mb-4">{leader.role}</p>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 relative">
                  <Quote className="w-5 h-5 text-amber-500 mb-1 opacity-70" />
                  <p className="text-xs text-stone-600 italic leading-relaxed">{leader.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. Impact Stats Counter (Light Cream Strip) ── */}
      <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 text-gray-900 py-14 px-4 sm:px-6 lg:px-8 border-y border-rose-200/80 my-8 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="p-5 rounded-2xl bg-white/80 border border-rose-100 backdrop-blur-sm shadow-xs hover:shadow-md transition-all">
                <Icon className={`w-7 h-7 mx-auto mb-2 ${s.color}`} />
                <p className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">{s.number}</p>
                <p className="text-xs text-stone-600 mt-1 font-bold">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 7. Interactive Floating CTA Banner ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-amber-400 via-rose-400 to-olive-500 shadow-xl">
          <div className="bg-gradient-to-br from-amber-50/90 via-rose-50/80 to-orange-50/90 rounded-[23px] p-8 sm:p-14 text-gray-900 text-center flex flex-col items-center relative overflow-hidden border border-rose-100">
            
            {/* Background floating confetti icons */}
            <Sparkle className="w-8 h-8 text-amber-500 absolute top-6 left-8 animate-bounce opacity-70" />
            <Heart className="w-8 h-8 text-rose-500 absolute bottom-6 right-8 animate-pulse opacity-70" />

            <div className="w-14 h-14 rounded-2xl bg-olive-100 border border-olive-300 flex items-center justify-center text-olive-700 mb-6 shadow-sm">
              <Gift className="w-7 h-7" />
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-gray-900 tracking-tight max-w-2xl leading-tight">
              Ready to Send Happiness Across Miles?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-4 max-w-lg font-normal leading-relaxed">
              Explore our fresh flowers, artisanal cakes, and luxury gift hampers with guaranteed same-day delivery.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-olive-600 hover:bg-olive-700 text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Start Gifting Now
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>
        </div>
      </div>

    </div>
  );
}
