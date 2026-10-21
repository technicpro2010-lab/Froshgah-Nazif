import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, STORE_INFO } from '../data/storeData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [lang, setLang] = useState('fa'); // 'fa' or 'en'
  const [currency, setCurrency] = useState('AFN'); // 'AFN' or 'USD'
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('fn_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('fn_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null); // For Quick View Modal
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart and favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fn_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('fn_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  // Set document dir when lang changes
  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, customSpecs = null) => {
    setCart((prev) => {
      const itemKey = customSpecs ? `${product.id}-${Date.now()}` : product.id;
      const existing = prev.find((item) => !customSpecs && item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, itemKey, qty: 1, customSpecs }];
    });

    showToast(lang === 'fa' ? `«${product.title}» به سبد خرید اضافه شد` : `"${product.titleEn}" added to cart`);
  };

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => (item.itemKey || item.id) !== itemKey));
  };

  const updateCartQty = (itemKey, qty) => {
    if (qty <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.itemKey || item.id) === itemKey ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        exists
          ? (lang === 'fa' ? 'از علاقه‌مندی‌ها حذف شد' : 'Removed from wishlist')
          : (lang === 'fa' ? 'به علاقه‌مندی‌ها اضافه شد' : 'Saved to wishlist')
      );
      return updated;
    });
  };

  const formatPrice = (priceAfn, priceUsd) => {
    if (currency === 'USD') {
      return `$${priceUsd.toLocaleString()}`;
    }
    return `${priceAfn.toLocaleString()} ${lang === 'fa' ? 'افغانی' : 'AFN'}`;
  };

  const cartTotalAfn = cart.reduce((acc, item) => acc + (item.priceAfn * item.qty), 0);
  const cartTotalUsd = cart.reduce((acc, item) => acc + (item.priceUsd * item.qty), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <StoreContext.Provider
      value={{
        lang,
        setLang,
        currency,
        setCurrency,
        cart,
        cartCount,
        cartTotalAfn,
        cartTotalUsd,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        favorites,
        toggleFavorite,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        isCustomOrderOpen,
        setIsCustomOrderOpen,
        isCartOpen,
        setIsCartOpen,
        formatPrice,
        toastMessage,
        showToast,
        storeInfo: STORE_INFO
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

