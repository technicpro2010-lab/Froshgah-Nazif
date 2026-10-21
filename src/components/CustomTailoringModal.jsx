import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { X, Scissors, MessageSquare, Ruler } from 'lucide-react';

export default function CustomTailoringModal() {
  const { lang, isCustomOrderOpen, setIsCustomOrderOpen, selectedProduct, addToCart, showToast, storeInfo } = useStore();
  const fa = lang === 'fa';

  const [form, setForm] = useState({
    modelTitle: '',
    fabric: 'مخمل اعلا زرشکی (Crimson Velvet)',
    embroidery: 'چرمه‌دوزی + آیینه‌دوزی',
    height: '140', chest: '95', waist: '80', sleeves: '58', shoulders: '40',
    unit: 'cm',
    name: '', phone: '', city: '', notes: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setForm(f => ({ ...f, modelTitle: fa ? selectedProduct.title : selectedProduct.titleEn }));
    }
  }, [selectedProduct, fa]);

  if (!isCustomOrderOpen) return null;

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validate = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      showToast(fa ? 'لطفاً نام و شماره تماس را وارد کنید' : 'Please enter name and phone number');
      return false;
    }
    return true;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    const msg = `سفارش دوخت اختصاصی - فروشگاه نظیف
مدل: ${form.modelTitle}
پارچه: ${form.fabric}
دوخت: ${form.embroidery}
--- اندازه‌ها (${form.unit}):
قد: ${form.height} | سینه: ${form.chest} | کمر: ${form.waist} | آستین: ${form.sleeves} | شانه: ${form.shoulders}
--- مشتری:
نام: ${form.name} | تماس: ${form.phone} | شهر: ${form.city}
یادداشت: ${form.notes || '-'}`;
    const clean = storeInfo.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsCustomOrderOpen(false);
    showToast(fa ? 'سفارش به واتساپ ارسال شد' : 'Order sent to WhatsApp');
  };

  const addToCartWithSpecs = () => {
    if (!validate()) return;
    const base = selectedProduct || PRODUCTS[0];
    addToCart(base, { ...form, isCustomTailored: true });
    setIsCustomOrderOpen(false);
  };

  const inputCls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-colors";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900">{fa ? 'سفارش دوخت اختصاصی' : 'Custom Tailoring Order'}</h3>
              <p className="text-xs text-gray-400">{fa ? 'اندازه‌های دقیق خود را وارد کنید' : 'Enter your exact measurements'}</p>
            </div>
          </div>
          <button onClick={() => setIsCustomOrderOpen(false)} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-6">

          {/* Section 1: Garment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">{fa ? '۱. مشخصات لباس' : '1. Garment Details'}</h4>

            <div>
              <label className={labelCls}>{fa ? 'مدل:' : 'Model:'}</label>
              <input type="text" value={form.modelTitle} onChange={e => set('modelTitle', e.target.value)} className={inputCls} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>{fa ? 'نوع پارچه:' : 'Fabric:'}</label>
                <select value={form.fabric} onChange={e => set('fabric', e.target.value)} className={inputCls}>
                  <option>مخمل اعلا زرشکی (Crimson Velvet)</option>
                  <option>مخمل سبز زمردی (Emerald Velvet)</option>
                  <option>مخمل مشکی (Black Velvet)</option>
                  <option>حریر و ابریشم (Silk Chiffon)</option>
                  <option>کتان سنتی (Afghan Cotton)</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>{fa ? 'نوع دوخت:' : 'Embroidery:'}</label>
                <select value={form.embroidery} onChange={e => set('embroidery', e.target.value)} className={inputCls}>
                  <option>چرمه‌دوزی + آیینه‌دوزی</option>
                  <option>تاردوزی زرین + سکه‌دوزی</option>
                  <option>خامک‌دوزی دست‌ساز</option>
                  <option>مرواریددوزی و ملیله</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Measurements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5" />
                {fa ? '۲. اندازه‌ها' : '2. Measurements'}
              </h4>
              <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-semibold">
                <button onClick={() => set('unit', 'cm')} className={`px-2.5 py-1 ${form.unit === 'cm' ? 'bg-emerald-800 text-white' : 'text-gray-500'}`}>CM</button>
                <button onClick={() => set('unit', 'inch')} className={`px-2.5 py-1 ${form.unit === 'inch' ? 'bg-emerald-800 text-white' : 'text-gray-500'}`}>INCH</button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[
                { key: 'height', fa: 'قد', en: 'Length' },
                { key: 'chest', fa: 'سینه', en: 'Chest' },
                { key: 'waist', fa: 'کمر', en: 'Waist' },
                { key: 'sleeves', fa: 'آستین', en: 'Sleeve' },
                { key: 'shoulders', fa: 'شانه', en: 'Shoulder' },
              ].map(m => (
                <div key={m.key}>
                  <label className="block text-[10px] font-semibold text-gray-500 mb-1 text-center">{fa ? m.fa : m.en}</label>
                  <input
                    type="text"
                    value={form[m.key]}
                    onChange={e => set(m.key, e.target.value)}
                    className="w-full text-center px-1 py-2 rounded-lg border border-gray-200 text-xs font-bold bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Client */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">{fa ? '۳. اطلاعات مشتری' : '3. Your Details'}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>{fa ? 'نام:*' : 'Name:*'}</label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} placeholder={fa ? 'نام و تخلص' : 'Full Name'} />
              </div>
              <div>
                <label className={labelCls}>{fa ? 'تماس:*' : 'Phone:*'}</label>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className={`${inputCls} dir-ltr font-mono`} placeholder="+93..." />
              </div>
              <div>
                <label className={labelCls}>{fa ? 'شهر:' : 'City:'}</label>
                <input type="text" value={form.city} onChange={e => set('city', e.target.value)} className={inputCls} placeholder={fa ? 'کابل / خارج' : 'e.g. Kabul'} />
              </div>
            </div>
            <div>
              <label className={labelCls}>{fa ? 'یادداشت:' : 'Notes:'}</label>
              <textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)} className={inputCls} placeholder={fa ? 'رنگ یا تغییرات خاص...' : 'Special color or design requests...'} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
            <button onClick={sendWhatsApp} className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors">
              <MessageSquare className="w-4 h-4" />
              {fa ? 'ارسال به واتساپ' : 'Send to WhatsApp'}
            </button>
            <button onClick={addToCartWithSpecs} className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm flex items-center justify-center gap-2 transition-colors">
              <Scissors className="w-4 h-4" />
              {fa ? 'افزودن به سبد خرید' : 'Add to Cart'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
