import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Search, CheckCircle2, Clock, Truck, Gift, MapPin } from 'lucide-react';

export default function OrderTrackerModal() {
  const { isTrackerOpen, closeTracker } = useCart();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);

  if (!isTrackerOpen) return null;

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    setActiveOrder({
      id: orderIdInput.trim().toUpperCase(),
      status: 'Out for Express Delivery',
      recipient: 'Ananya Sharma',
      city: 'Delhi NCR',
      estimatedTime: 'Today by 6:00 PM',
      steps: [
        { title: 'Order Confirmed & Payment Verified', time: '10:30 AM', completed: true },
        { title: 'Flowers Harvested & Handcrafted', time: '11:45 AM', completed: true },
        { title: 'Out for Delivery with Express Courier', time: '2:15 PM', completed: true },
        { title: 'Delivered to Recipient Doorstep', time: 'Expected 6:00 PM', completed: false }
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={closeTracker}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative z-10 animate-fade-in border border-stone-200">
        
        <button 
          onClick={closeTracker}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-100">
          <div className="w-10 h-10 rounded-2xl bg-olive-100 border border-olive-300 flex items-center justify-center text-olive-700">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-gray-900">Track Your Express Order</h3>
            <p className="text-xs text-stone-500">Real-time status of your surprise gift delivery</p>
          </div>
        </div>

        {/* Order ID Input Form */}
        <form onSubmit={handleTrack} className="space-y-3 mb-6">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. GF-8842)..."
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="w-full pl-10 pr-24 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 uppercase font-bold bg-stone-50"
              required
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-2 bg-olive-600 hover:bg-olive-700 text-white font-bold text-xs rounded-lg transition-colors"
            >
              Track
            </button>
          </div>
        </form>

        {/* Timeline Status */}
        {activeOrder && (
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-4 animate-fade-in">
            <div className="flex justify-between items-start pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-extrabold text-stone-400 uppercase">Order #{activeOrder.id}</span>
                <h4 className="font-extrabold text-sm text-gray-900">{activeOrder.status}</h4>
                <p className="text-[11px] text-stone-500 font-medium">To: {activeOrder.recipient} ({activeOrder.city})</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                {activeOrder.estimatedTime}
              </span>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-3 pt-1">
              {activeOrder.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0 ${
                    step.completed ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-500'
                  }`}>
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${step.completed ? 'text-gray-900' : 'text-stone-400'}`}>
                      {step.title}
                    </p>
                    <span className="text-[10px] text-stone-400">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
