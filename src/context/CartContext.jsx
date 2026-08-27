import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // ── Cart Items State (Persisted in localStorage) ──
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('giftora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // ── Coupon State ──
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // ── Location State ──
  const [selectedLocation, setSelectedLocation] = useState(() => {
    try {
      return localStorage.getItem('giftora_location') || 'Delhi NCR';
    } catch (e) {
      return 'Delhi NCR';
    }
  });

  // ── Modals & Drawers States ──
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // For Product Quick-View Modal

  // ── Currency State ──
  const [selectedCurrency, setSelectedCurrency] = useState('INR'); // INR | USD | AED

  const currencyRates = {
    INR: { symbol: '₹', rate: 1 },
    USD: { symbol: '$', rate: 0.012 },
    AED: { symbol: 'AED ', rate: 0.044 }
  };

  const formatPrice = (inrAmount) => {
    const curr = currencyRates[selectedCurrency] || currencyRates.INR;
    const converted = Math.round(inrAmount * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  // ── Additional Modals States ──
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('giftora_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  // Persist location to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('giftora_location', selectedLocation);
    } catch (e) {}
  }, [selectedLocation]);

  // ── Cart Actions ──
  const addToCart = (product, options = {}) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id && item.variant === options.variant);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += options.quantity || 1;
        return updated;
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name || product.title || 'Curated Gift',
          price: product.price || 999,
          originalPrice: product.originalPrice || (product.price ? Math.round(product.price * 1.25) : 1299),
          image: product.img || product.image || '/images/home/flower_coll_1.png',
          quantity: options.quantity || 1,
          deliveryDate: options.deliveryDate || 'Today (Express)',
          deliverySlot: options.deliverySlot || 'Standard Delivery',
          cardMessage: options.cardMessage || '',
          variant: options.variant || 'Standard'
        }
      ];
    });

    setIsCartOpen(true); // Auto open cart drawer
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) => 
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // ── Coupon Logic ──
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GIFTORA10') {
      setAppliedCoupon({ code: 'GIFTORA10', discountPercent: 10 });
      return { success: true, message: 'Coupon GIFTORA10 applied! 10% OFF' };
    } else if (cleanCode === 'WELCOME50') {
      setAppliedCoupon({ code: 'WELCOME50', discountFlat: 50 });
      return { success: true, message: 'Coupon WELCOME50 applied! ₹50 OFF' };
    }
    return { success: false, message: 'Invalid promo code. Try GIFTORA10 or WELCOME50.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // ── Calculated Values ──
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountFlat) {
      discountAmount = appliedCoupon.discountFlat;
    }
  }

  const deliveryFee = subtotal > 0 ? (subtotal > 1499 ? 0 : 49) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        deliveryFee,
        grandTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        selectedLocation,
        setSelectedLocation,
        selectedCurrency,
        setSelectedCurrency,
        formatPrice,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isLocationModalOpen,
        openLocationModal: () => setIsLocationModalOpen(true),
        closeLocationModal: () => setIsLocationModalOpen(false),
        isRemindersModalOpen,
        openRemindersModal: () => setIsRemindersModalOpen(true),
        closeRemindersModal: () => setIsRemindersModalOpen(false),
        isFinderOpen,
        openFinder: () => setIsFinderOpen(true),
        closeFinder: () => setIsFinderOpen(false),
        isTrackerOpen,
        openTracker: () => setIsTrackerOpen(true),
        closeTracker: () => setIsTrackerOpen(false),
        selectedProduct,
        openProductModal: (product) => setSelectedProduct(product),
        closeProductModal: () => setSelectedProduct(null)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
