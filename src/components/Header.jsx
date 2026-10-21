import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Menu, X, Globe, Scissors } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Header() {
  const { lang, setLang, cartCount, setIsCartOpen, setIsCustomOrderOpen, storeInfo } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const fa = lang === 'fa';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="pattern-bar" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo + Name */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/assets/images/logo.jpg"
            alt={storeInfo.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-amber-300"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80&q=80'; }}
          />
          <div>
            <div className="font-black text-gray-900 text-base leading-tight">
              {fa ? storeInfo.name : storeInfo.nameEn}
            </div>
            <div className="text-[11px] text-amber-700 font-medium hidden sm:block">
              {fa ? storeInfo.subtitle : storeInfo.subtitleEn}
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-600">
          <a href="#catalog" className="hover:text-gray-900 transition-colors">
            {fa ? 'مجموعه‌ها' : 'Collections'}
          </a>
          <a href="#instagram-showcase" className="hover:text-gray-900 transition-colors">
            {fa ? 'گالری' : 'Gallery'}
          </a>
          <a href="#about" className="hover:text-gray-900 transition-colors">
            {fa ? 'درباره ما' : 'About'}
          </a>
          <a href="#contact" className="hover:text-gray-900 transition-colors">
            {fa ? 'تماس' : 'Contact'}
          </a>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={() => setLang(fa ? 'en' : 'fa')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{fa ? 'English' : 'دری'}</span>
          </button>

          {/* Custom order CTA */}
          <button
            onClick={() => setIsCustomOrderOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>{fa ? 'سفارش دوخت' : 'Custom Order'}</span>
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {[
            { href: '#catalog', fa: 'مجموعه‌ها', en: 'Collections' },
            { href: '#instagram-showcase', fa: 'گالری اینستاگرام', en: 'Instagram Gallery' },
            { href: '#about', fa: 'درباره ما', en: 'About Us' },
            { href: '#contact', fa: 'تماس', en: 'Contact' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              {fa ? item.fa : item.en}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); setIsCustomOrderOpen(true); }}
            className="w-full mt-2 py-2.5 px-3 rounded-lg bg-emerald-800 text-white text-sm font-bold text-start flex items-center gap-2"
          >
            <Scissors className="w-4 h-4" />
            {fa ? 'سفارش دوخت اختصاصی' : 'Custom Tailoring Order'}
          </button>
        </div>
      )}
    </header>
  );
}
