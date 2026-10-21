import React from 'react';
import { useStore } from '../context/StoreContext';
import { TESTIMONIALS } from '../data/storeData';

export default function AboutSection() {
  const { lang } = useStore();
  const fa = lang === 'fa';

  return (
    <section id="about" className="py-14 sm:py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">

        {/* About block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {fa ? 'درباره فروشگاه تولیدی نظیف' : 'About Froshgah Nazif'}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {fa
                ? 'فروشگاه تولیدی نظیف با سال‌ها تجربه در عرصه دوخت و طراحی لباس‌های محلی و گندهای اصیل افغانی فعالیت می‌کند. هدف ما زنده نگاه داشتن هنر دیرینه دست‌دوز افغانستان و ارائه آن با بهترین کیفیت به مشتریان در سراسر جهان است.'
                : 'Froshgah Nazif has years of expertise in handcrafted tailoring and reviving authentic Afghan traditional clothing. We bring timeless heritage craftsmanship to Afghan communities and fashion lovers worldwide.'}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {fa
                ? 'تمامی محصولات با مرغوب‌ترین پارچه‌ها تهیه شده و هر نوع طرح چرمه‌دوزی، تاردوزی زرین و آیینه‌دوزی طبق سلیقه و اندازه مشتری انجام می‌گیرد.'
                : 'Every piece is crafted using premium fabrics with handcrafted mirror work, gold tilla threads, and charma embroidery — customized exactly to your measurements.'}
            </p>

            {/* Simple stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { num: '10+', fa: 'سال تجربه', en: 'Years Exp.' },
                { num: '500+', fa: 'سفارش موفق', en: 'Orders Done' },
                { num: '100%', fa: 'دست‌دوز', en: 'Handcrafted' },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 bg-white rounded-xl border border-gray-200">
                  <span className="font-black text-lg text-emerald-800">{s.num}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{fa ? s.fa : s.en}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-100">
            <img
              src="/assets/images/product_featured.jpg"
              alt={fa ? 'کارگاه تولیدی نظیف' : 'Nazif Couture Atelier'}
              className="w-full h-full object-cover"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'; }}
            />
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-8">
            {fa ? 'نظرات مشتریان' : 'Customer Reviews'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                <div className="flex text-amber-400 text-sm">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">«{t.text}»</p>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold text-gray-700">{t.name}</span>
                  <span>{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
