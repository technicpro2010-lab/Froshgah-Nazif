import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Scissors, Check, Share2 } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function ProductDetailModal() {
  const { lang, selectedProduct, setSelectedProduct, formatPrice, addToCart, favorites, toggleFavorite, setIsCustomOrderOpen, showToast, storeInfo } = useStore();

  if (!selectedProduct) return null;
  const fa = lang === 'fa';
  const isFav = favorites.includes(selectedProduct.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: selectedProduct.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(fa ? 'لینک کپی شد' : 'Link copied');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl flex flex-col">

        {/* Close */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 end-4 p-2 rounded-full bg-white shadow-sm text-gray-600 hover:text-black z-20 border border-gray-100"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-gray-100 aspect-[4/5] md:aspect-auto min-h-60 md:min-h-full overflow-hidden md:rounded-s-2xl">
            <img
              src={selectedProduct.image}
              alt={fa ? selectedProduct.title : selectedProduct.titleEn}
              className="w-full h-full object-cover"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80'; }}
            />
            <div className="absolute top-3 start-3 bg-black/50 text-white text-[11px] font-mono px-2 py-1 rounded-full flex items-center gap-1.5">
              <InstagramIcon className="w-3 h-3 text-pink-400" />
              @{storeInfo.instagramHandle}
            </div>
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-lg text-gray-900 leading-tight">
                    {fa ? selectedProduct.title : selectedProduct.titleEn}
                  </h3>
                  <p className="text-sm text-amber-700 font-medium mt-0.5">
                    {fa ? selectedProduct.fabric : selectedProduct.fabricEn}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={handleShare} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(selectedProduct.id)}
                    className={`p-1.5 rounded-lg ${isFav ? 'text-rose-500 bg-rose-50' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-amber-400 font-bold">{'★'.repeat(Math.round(selectedProduct.rating))}</span>
                <span>{selectedProduct.rating} · {selectedProduct.reviewsCount} {fa ? 'نظر' : 'reviews'}</span>
              </div>

              {/* Price */}
              <div className="bg-amber-50 rounded-xl px-4 py-3 flex items-center justify-between border border-amber-100">
                <span className="text-xs text-amber-800 font-medium">{fa ? 'قیمت ست کامل:' : 'Full Set Price:'}</span>
                <span className="font-black text-lg text-gray-900">
                  {formatPrice(selectedProduct.priceAfn, selectedProduct.priceUsd)}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {fa ? selectedProduct.description : selectedProduct.descriptionEn}
              </p>

              {/* Embroidery */}
              <div className="text-xs text-gray-600 bg-gray-50 rounded-xl p-3 space-y-1.5 border border-gray-100">
                <div><span className="font-semibold text-gray-800">{fa ? 'نوع دوخت: ' : 'Embroidery: '}</span>{fa ? selectedProduct.workmanship : selectedProduct.workmanshipEn}</div>
              </div>

              {/* Includes */}
              {selectedProduct.includes && (
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-2">{fa ? 'شامل این ست:' : 'Included:'}</p>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {(fa ? selectedProduct.includes : selectedProduct.includesEn).map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => { setSelectedProduct(null); setIsCustomOrderOpen(true); }}
                className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Scissors className="w-4 h-4" />
                {fa ? 'سفارش دوخت' : 'Custom Tailor'}
              </button>
              <button
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                {fa ? 'افزودن به سبد' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
