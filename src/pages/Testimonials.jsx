import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle2, 
  ChevronRight, 
  Heart, 
  Gift, 
  Filter,
  Quote
} from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Ananya Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: 'August 24, 2026',
    category: 'Fresh Flowers',
    product: 'Luxury Orchids Velvet Box',
    img: '/images/home/flower_coll_1.png',
    comment: 'The orchids arrived looking absolutely breathtaking! Fresh, vibrant, and packed with extreme luxury. My mother was so touched by the surprise. Giftora’s 2-hour delivery is genuinely life-saving!'
  },
  {
    id: 2,
    name: 'Rohan Malhotra',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: 'August 22, 2026',
    category: 'Birthday Cakes',
    product: 'Belgian Truffle Chocolate Cake',
    img: '/images/home/banner1.png',
    comment: 'Ordered a midnight birthday cake for my sister. It arrived exactly at 12:00 AM! The chocolate truffle was so rich, moist, and delicious. 10/10 quality and service.'
  },
  {
    id: 3,
    name: 'Priya & Vikram Nair',
    location: 'New Delhi, NCR',
    rating: 5,
    date: 'August 20, 2026',
    category: 'Festive Hampers',
    product: 'Raksha Bandhan Royal Hamper',
    img: '/images/home/raksha1.png',
    comment: 'The designer Rakhi hamper exceeded all expectations. Beautiful handcrafted brass thali, gourmet sweets, and personalized message card. Giftora made our Rakhi celebration truly unforgettable.'
  },
  {
    id: 4,
    name: 'Sneha Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    date: 'August 18, 2026',
    category: 'Fresh Flowers',
    product: 'Sunny Sunflower & Rose Bouquet',
    img: '/images/home/flower_coll_4.png',
    comment: 'Brightened up my best friend’s workday completely! The sunflowers were super fresh and lasted over a week in the vase. Super fast same-day delivery!'
  },
  {
    id: 5,
    name: 'Arjun Sen',
    location: 'Kolkata, West Bengal',
    rating: 5,
    date: 'August 15, 2026',
    category: 'Corporate Gifts',
    product: 'Customized Executive Gourmet Hamper',
    img: '/images/home/banner3.png',
    comment: 'We ordered 150 corporate hampers for our annual client summit. Giftora handled customized branding and multi-city deliveries flawlessly. Highly recommend for corporate gifting!'
  },
  {
    id: 6,
    name: 'Meera Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    date: 'August 12, 2026',
    category: 'Dried Flowers',
    product: 'Rustic Boho Dried Pampas Box',
    img: '/images/home/flower_coll_5.png',
    comment: 'Sublime aesthetic quality! The dried pampas arrangement looks stunning on my living room coffee table. Arrived in perfect protective packaging.'
  }
];

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Fresh Flowers', 'Birthday Cakes', 'Festive Hampers', 'Corporate Gifts', 'Dried Flowers'];

  const filteredReviews = activeCategory === 'All' 
    ? reviews 
    : reviews.filter(r => r.category === activeCategory);

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
            <span className="text-olive-800 font-semibold">Testimonials</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-extrabold tracking-wider uppercase mb-4 shadow-xs">
                <Sparkles className="w-4 h-4 text-rose-600 animate-spin" style={{ animationDuration: '6s' }} />
                Real Stories & Real Joy
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.15]">
                Loved by <span className="bg-gradient-to-r from-olive-700 via-rose-600 to-amber-700 bg-clip-text text-transparent">Millions Nationwide</span> 💬
              </h1>
              <p className="text-stone-600 text-sm sm:text-base lg:text-lg mt-4 font-normal leading-relaxed">
                Read authentic reviews from happy customers who celebrated their special moments with Giftora.
              </p>
            </div>

            {/* Rating Summary Card */}
            <div className="bg-white rounded-3xl border border-rose-200/80 p-6 shadow-lg flex flex-col items-center text-center self-center md:self-auto min-w-[240px]">
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-display font-extrabold text-3xl text-gray-900">4.9 / 5.0</span>
              <p className="text-xs font-bold text-stone-500 mt-1">Based on 150,000+ Verified Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Reviews Showcase Section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-xs ${
                activeCategory === cat
                  ? 'bg-olive-600 text-white ring-4 ring-olive-200 scale-105 shadow-md'
                  : 'bg-white text-stone-700 hover:bg-rose-50 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-3xl border border-stone-200/90 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Image & Tag Header */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-stone-100">
                  <img
                    src={rev.img}
                    alt={rev.product}
                    className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shadow-xs"
                  />
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-olive-100 text-olive-800 text-[10px] font-bold mb-1">
                      {rev.category}
                    </span>
                    <h4 className="font-bold text-xs text-gray-900 line-clamp-1">{rev.product}</h4>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment Body */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-rose-300 opacity-40 absolute -top-2 -left-1" />
                  <p className="text-xs text-stone-700 leading-relaxed italic pl-5 font-sans">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              {/* Customer Profile Footer */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-gray-900 flex items-center gap-1">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </h5>
                  <p className="text-[11px] text-stone-400 font-medium">{rev.location}</p>
                </div>
                <span className="text-[10px] text-stone-400 font-semibold">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
