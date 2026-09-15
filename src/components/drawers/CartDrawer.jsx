import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import FixedImage from '../common/FixedImage';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Check, 
  Sparkles 
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    discountAmount, 
    deliveryFee, 
    grandTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    clearCart 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) setCouponCode('');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        clearCart();
        closeCart();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Drawer Header */}
          <div className="p-6 bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 border-b border-rose-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-olive-100 border border-olive-300 flex items-center justify-center text-olive-700">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-lg text-gray-900">Your Shopping Cart</h2>
                <p className="text-[11px] text-stone-500 font-medium">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} Selected
                </p>
              </div>
            </div>
            <button 
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-white/80 text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {checkoutSuccess ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-gray-900">Order Placed Successfully!</h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  Thank you for shopping with Giftora! Your express surprise is being prepared with extreme care.
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto" />
                <h3 className="font-bold text-lg text-gray-800">Your Cart is Empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our fresh flowers, artisanal cakes, and luxury gift hampers to add items to your cart.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-olive-600 hover:bg-olive-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Nudge Progress */}
                <div className="bg-amber-50 border border-amber-200/80 p-3.5 rounded-2xl text-xs text-amber-900 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  {subtotal >= 1499 ? (
                    <span className="font-bold text-emerald-700">🎉 Congratulations! You unlocked FREE Express Delivery!</span>
                  ) : (
                    <span>Add <strong>₹{1499 - subtotal}</strong> more to unlock <strong>FREE Delivery</strong></span>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div 
                      key={`${item.id}-${item.variant}`}
                      className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 flex gap-4 items-center"
                    >
                      <FixedImage 
                        src={item.image || item.img} 
                        alt={item.name} 
                        type="product"
                        containerClassName="w-16 h-16 rounded-xl border border-stone-200 flex-shrink-0"
                        imageClassName="w-full h-full object-cover"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-gray-900 truncate">{item.name}</h4>
                        <p className="text-[11px] text-stone-500 font-medium">{item.deliveryDate}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <span className="font-extrabold text-xs text-olive-700">₹{item.price * item.quantity}</span>
                            <span className="text-[10px] text-stone-400 line-through">₹{item.originalPrice * item.quantity}</span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 px-2 py-0.5 shadow-xs">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-stone-500 hover:text-stone-800"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-stone-500 hover:text-stone-800"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Coupon Form */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-800">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold">Code {appliedCoupon.code} Applied</span>
                      </div>
                      <button 
                        onClick={removeCoupon}
                        className="text-xs text-rose-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. GIFTORA10)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-olive-500/30 uppercase font-bold"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                        >
                          Apply
                        </button>
                      </div>

                      {couponFeedback && (
                        <p className={`text-[11px] font-semibold ${couponFeedback.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {couponFeedback.message}
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </>
            )}

          </div>

          {/* Drawer Footer Summary & Checkout */}
          {cartItems.length > 0 && !checkoutSuccess && (
            <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-extrabold text-gray-900">
                  <span>Grand Total</span>
                  <span className="text-olive-700 text-base">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-2xl bg-olive-600 hover:bg-olive-700 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Safe & Secure Checkout
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
