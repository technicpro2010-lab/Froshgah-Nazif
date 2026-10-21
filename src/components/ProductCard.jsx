import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Scissors } from 'lucide-react';

export default function ProductCard({ product }) {
  const { lang, formatPrice, addToCart, favorites, toggleFavorite, setSelectedProduct, setIsCustomOrderOpen } = useStore();
  const fa = lang === 'fa';
  const isFav = favorites.includes(product.id);

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
      onClick={() => setSelectedProduct(product)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={fa ? product.title : product.titleEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80';
          }}
        />

        {/* Wishlist button */}
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(product.id); }}
          className={`absolute top-3 end-3 p-2 rounded-full shadow-sm transition-colors ${
            isFav ? 'bg-rose-50 text-rose-500' : 'bg-white text-gray-400 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Category badge */}
        {product.badge && (
          <span className="absolute top-3 start-3 bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {fa ? product.badge : product.badgeEn}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-sm text-gray-900 line-clamp-1">
            {fa ? product.title : product.titleEn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {fa ? product.fabric : product.fabricEn}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-[10px] text-gray-400">{fa ? 'قیمت از:' : 'From:'}</span>
            <p className="font-black text-sm text-gray-900">
              {formatPrice(product.priceAfn, product.priceUsd)}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={e => { e.stopPropagation(); setSelectedProduct(product); setIsCustomOrderOpen(true); }}
              className="p-2 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
              title={fa ? 'سفارش دوخت' : 'Custom Tailoring'}
            >
              <Scissors className="w-4 h-4" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); addToCart(product); }}
              className="p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
              title={fa ? 'افزودن به سبد' : 'Add to Cart'}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
