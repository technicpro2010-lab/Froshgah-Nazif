import React from 'react';
import { useStore } from '../context/StoreContext';

export default function StoryBanner() {
  const { lang } = useStore();
  const fa = lang === 'fa';

  const features = [
    {
      icon: '✂️',
      fa: 'دوخت سفارشی',
      faDesc: 'طراحی بر اساس اندازه دقیق شما',
      en: 'Custom Tailoring',
      enDesc: 'Precision measurements for perfect fit',
    },
    {
      icon: '🧵',
      fa: 'پارچه‌های فاخر',
      faDesc: 'مخمل، حریر و ابریشم اصیل',
      en: 'Luxury Fabrics',
      enDesc: 'Premium velvet, silk & chiffon',
    },
    {
      icon: '🪞',
      fa: 'هنر دست افغان',
      faDesc: 'چرمه‌دوزی و آیینه‌دوزی',
      en: 'Afghan Artisanship',
      enDesc: 'Traditional handcraft embroidery',
    },
    {
      icon: '🚚',
      fa: 'ارسال جهانی',
      faDesc: 'DHL و پست پیشتاز',
      en: 'Global Shipping',
      enDesc: 'DHL express worldwide',
    },
  ];

  return (
    <section className="bg-emerald-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Quote */}
        <p className="text-center text-base sm:text-lg font-medium text-emerald-100 max-w-3xl mx-auto mb-8 leading-relaxed">
          {fa
            ? '«سفارش هر نوع گند افغانی و لباس‌های محلی افغانستان را پذیرفته و با بهترین دیزاین‌ها در خدمت تان می‌باشیم.»'
            : '"We accept custom orders for all types of Afghan Gand and traditional garments, serving you with the finest designs."'}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h4 className="text-sm font-bold text-amber-200">{fa ? f.fa : f.en}</h4>
              <p className="text-xs text-emerald-300">{fa ? f.faDesc : f.enDesc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
