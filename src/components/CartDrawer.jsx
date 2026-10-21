import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, CheckCircle2, Scissors } from 'lucide-react';

export default function CartDrawer() {
  const { lang, isCartOpen, setIsCartOpen, cart, cartCount, cartTotalAfn, cartTotalUsd, formatPrice, updateCartQty, removeFromCart, clearCart, showToast, storeInfo } = useStore();
  const fa = lang === 'fa';

  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ name: '', phone: '', city: '', address: '' });

  if (!isCartOpen) return null;

  const setField = (k, v) => setInfo(p => ({ ...p, [k]: v }));

  const checkout = () => {
    if (!info.name || !info.phone) {
      showToast(fa ? 'نام و شماره تماس الزامی است' : 'Name and phone are required');
      return;
    }
    const lines = cart.map((item, i) => {
      let l = `${i + 1}. ${item.title} x${item.qty} — ${formatPrice(item.priceAfn * item.qty, item.priceUsd * item.qty)}`;
      if (item.customSpecs) l += ` [دوخت سفارشی: قد ${item.customSpecs.height}, سینه ${item.customSpecs.chest}]`;
      return l;
    }).join('\n');

    const msg = `سفارش فروشگاه نظیف:\n${lines}\nجمع کل: ${formatPrice(cartTotalAfn, cartTotalUsd)}\nنام: ${info.name}\nتماس: ${info.phone}\nشهر: ${info.city}\nآدرس: ${info.address}`;
    const clean = storeInfo.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(msg)}`, '_blank');
    setStep(3);
    clearCart();
  };

  const inputCls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-colors";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 end-0 w-full max-w-sm bg-white flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <h3 className="font-black text-gray-900">{fa ? 'سبد خرید' : 'Shopping Cart'}</h3>
            {cartCount > 0 && (
              <span className="bg-emerald-800 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
            )}
          </div>
          <button onClick={() => { setIsCartOpen(false); setStep(1); }} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">

          {/* Step 1: Items */}
          {step === 1 && (
            cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-4xl">🛍️</p>
                <p className="font-bold text-gray-700">{fa ? 'سبد خرید خالی است' : 'Your cart is empty'}</p>
                <p className="text-sm text-gray-400">{fa ? 'محصولی را از مجموعه اضافه کنید' : 'Add items from the collection'}</p>
                <button onClick={() => setIsCartOpen(false)} className="mt-2 px-4 py-2 rounded-lg bg-emerald-800 text-white text-sm font-bold hover:bg-emerald-900 transition-colors">
                  {fa ? 'مشاهده محصولات' : 'Browse Products'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.itemKey || item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 rounded-lg object-cover bg-gray-200 shrink-0"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&q=80'; }}
                    />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-gray-900 truncate">{fa ? item.title : item.titleEn}</h4>
                          {item.customSpecs && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1 w-fit mt-0.5">
                              <Scissors className="w-2.5 h-2.5" />
                              {fa ? 'دوخت سفارشی' : 'Custom Tailored'}
                            </span>
                          )}
                        </div>
                        <button onClick={() => removeFromCart(item.itemKey || item.id)} className="text-gray-400 hover:text-red-500 p-0.5">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden text-xs">
                          <button onClick={() => updateCartQty(item.itemKey || item.id, item.qty - 1)} className="px-2 py-1 hover:bg-gray-100">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.itemKey || item.id, item.qty + 1)} className="px-2 py-1 hover:bg-gray-100">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-black text-sm">{formatPrice(item.priceAfn * item.qty, item.priceUsd * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* Step 2: Info */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                {fa ? 'اطلاعات تحویل سفارش را وارد کنید. با شما تماس می‌گیریم.' : 'Enter your shipping details. We will confirm your order shortly.'}
              </p>
              {[
                { key: 'name', fa: 'نام و تخلص*', en: 'Full Name*', type: 'text' },
                { key: 'phone', fa: 'شماره تماس*', en: 'Phone*', type: 'tel' },
                { key: 'city', fa: 'شهر و کشور', en: 'City & Country', type: 'text' },
                { key: 'address', fa: 'آدرس', en: 'Address', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{fa ? f.fa : f.en}</label>
                  <input type={f.type} value={info[f.key]} onChange={e => setField(f.key, e.target.value)} className={inputCls} />
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-16 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h4 className="font-black text-lg text-gray-900">{fa ? 'سفارش ثبت شد!' : 'Order Placed!'}</h4>
              <p className="text-sm text-gray-500">
                {fa ? 'از انتخاب فروشگاه نظیف سپاسگزاریم. به زودی با شما تماس می‌گیریم.' : 'Thank you for choosing Froshgah Nazif. We will contact you shortly.'}
              </p>
              <button onClick={() => { setIsCartOpen(false); setStep(1); }} className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-sm font-bold hover:bg-emerald-900 transition-colors">
                {fa ? 'بازگشت به فروشگاه' : 'Back to Shop'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && step !== 3 && (
          <div className="border-t border-gray-100 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-600">{fa ? 'جمع کل:' : 'Total:'}</span>
              <span className="font-black text-lg text-gray-900">{formatPrice(cartTotalAfn, cartTotalUsd)}</span>
            </div>

            {step === 1 ? (
              <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm transition-colors">
                {fa ? 'تکمیل سفارش' : 'Proceed to Checkout'}
              </button>
            ) : (
              <div className="space-y-2">
                <button onClick={checkout} className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                  <Send className="w-4 h-4" />
                  {fa ? 'ارسال نهایی به واتساپ' : 'Complete via WhatsApp'}
                </button>
                <button onClick={() => setStep(1)} className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 text-center">
                  {fa ? '← بازگشت به سبد' : '← Back to Cart'}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
