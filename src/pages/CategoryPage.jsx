import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Filter, 
  ChevronRight, 
  Star, 
  ShoppingBag, 
  Sparkles, 
  ArrowUpDown,
  CheckCircle2
} from 'lucide-react';

const mockCategoryProducts = {
  rakhi: [
    { id: 101, title: 'Designer Peacock Kundan Rakhi Set', price: 599, originalPrice: 799, rating: 4.9, img: '/images/home/raksha1.png' },
    { id: 102, title: 'Rakhi with Premium Assorted Sweets', price: 899, originalPrice: 1199, rating: 4.8, img: '/images/home/raksha2.png' },
    { id: 103, title: 'Silver Plated Rakhi with Chocolates', price: 749, originalPrice: 999, rating: 4.9, img: '/images/home/raksha3.png' },
    { id: 104, title: 'Set of 2 Designer Thread Rakhis', price: 499, originalPrice: 699, rating: 4.7, img: '/images/home/raksha4.png' },
    { id: 105, title: 'Luxury Bhaiya Bhabhi Lumba Set', price: 999, originalPrice: 1299, rating: 5.0, img: '/images/home/raksha5.png' },
    { id: 106, title: 'Gold Plated Premium Ganesha Rakhi', price: 699, originalPrice: 899, rating: 4.9, img: '/images/home/raksha6.png' }
  ],
  flowers: [
    { id: 201, title: 'Luxury Phalaenopsis Purple Orchids Box', price: 1299, originalPrice: 1699, rating: 5.0, img: '/images/home/flower_coll_1.png' },
    { id: 202, title: 'Handcrafted Crochet Floral Bouquet', price: 899, originalPrice: 1199, rating: 4.8, img: '/images/home/flower_coll_2.png' },
    { id: 203, title: 'Table Centerpiece Arrangement Vase', price: 1499, originalPrice: 1899, rating: 4.9, img: '/images/home/flower_coll_3.png' },
    { id: 204, title: 'Sunny Sunflower & Yellow Roses', price: 999, originalPrice: 1299, rating: 4.9, img: '/images/home/flower_coll_4.png' },
    { id: 205, title: 'Boho Rustic Dried Flower Pampas Box', price: 1199, originalPrice: 1499, rating: 4.7, img: '/images/home/flower_coll_5.png' }
  ],
  cakes: [
    { id: 301, title: 'Belgian Truffle Chocolate Cake', price: 699, originalPrice: 899, rating: 4.9, img: '/images/home/banner1.png' },
    { id: 302, title: 'Fresh Red Velvet Heart Cake', price: 799, originalPrice: 999, rating: 4.8, img: '/images/home/banner2.png' },
    { id: 303, title: 'Fresh Pineapple Cream Cake', price: 549, originalPrice: 699, rating: 4.7, img: '/images/home/banner3.png' },
    { id: 304, title: 'Black Forest Celebration Cake', price: 649, originalPrice: 849, rating: 4.9, img: '/images/home/banner4.png' }
  ]
};

export default function CategoryPage() {
  const { slug } = useParams();
  const { openProductModal, addToCart } = useCart();
  
  const [sortBy, setSortBy] = useState('popular');
  const [priceFilter, setPriceFilter] = useState('all');

  const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Gifts';
  const productsList = mockCategoryProducts[slug?.toLowerCase()] || mockCategoryProducts.flowers;

  const filteredProducts = productsList.filter(p => {
    if (priceFilter === 'under800') return p.price < 800;
    if (priceFilter === 'above800') return p.price >= 800;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price - b.price;
    if (sortBy === 'highToLow') return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-gray-800 animate-fade-in pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-amber-50/90 via-rose-50/70 to-orange-50/80 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-b border-rose-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-4">
            <Link to="/" className="hover:text-olive-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-olive-800 font-semibold">{categoryName} Collection</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                Handcrafted & Fresh
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
                {categoryName} Gifts Collection
              </h1>
            </div>

            <span className="text-xs font-bold text-stone-500 bg-white/80 border border-stone-200 px-3.5 py-1.5 rounded-full shadow-xs self-start sm:self-auto">
              {filteredProducts.length} Items Available
            </span>
          </div>
        </div>
      </div>

      {/* Main Filter & Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs mb-8">
          
          {/* Price Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-olive-600" />
            <span className="text-xs font-bold text-stone-700">Filter Price:</span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none bg-stone-50"
            >
              <option value="all">All Prices</option>
              <option value="under800">Under ₹800</option>
              <option value="above800">₹800 & Above</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-olive-600" />
            <span className="text-xs font-bold text-stone-700">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none bg-stone-50"
            >
              <option value="popular">Popularity & Rating</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div 
                onClick={() => openProductModal(p)}
                className="cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-emerald-600 text-white font-extrabold text-[10px] uppercase rounded-full shadow-xs">
                    Same-Day
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-xs font-bold text-gray-900">{p.rating} ★</span>
                  </div>

                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-olive-700 transition-colors line-clamp-2">
                    {p.title}
                  </h3>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-extrabold text-lg text-olive-700">₹{p.price}</span>
                    <span className="text-xs text-stone-400 line-through">₹{p.originalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => addToCart(p)}
                  className="w-full py-2.5 rounded-xl bg-olive-600 hover:bg-olive-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Quick Add
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
