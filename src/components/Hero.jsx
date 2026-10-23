import React from 'react';
import { useStore } from '../context/StoreContext';
import { Scissors, ArrowDown } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './Icons';

export default function Hero() {
  const { lang, setIsCustomOrderOpen, storeInfo } = useStore();
  const fa = lang === 'fa';

  return (
    <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text side */}
          <div className="space-y-6">
            {/* Instagram tag */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={storeInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-pink-600 hover:text-pink-700 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                <span className="font-mono">@{storeInfo.instagramHandle}</span>
              </a>
              <a
                href={storeInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
                <span>{fa ? 'فیسبوک' : 'Facebook'}</span>
              </a>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              {fa ? (
                <>
                  گند افغانی{' '}
                  <span className="text-emerald-800">اصیل و دست‌دوز</span>
                </>
              ) : (
                <>
                  Authentic{' '}
                  <span className="text-emerald-800">Afghan Couture</span>
                </>
              )}
            </h1>

            {/* Bio */}
            <p className="text-base text-gray-600 leading-relaxed max-w-lg">
              {fa ? storeInfo.bio : storeInfo.bioEn}
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="font-black text-xl text-gray-900 block">140+</span>
                <span className="text-gray-500 text-xs">{fa ? 'دنبال‌کننده' : 'Followers'}</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <span className="font-black text-xl text-gray-900 block">500+</span>
                <span className="text-gray-500 text-xs">{fa ? 'سفارش موفق' : 'Orders Done'}</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <span className="font-black text-xl text-gray-900 block">10+</span>
                <span className="text-gray-500 text-xs">{fa ? 'سال تجربه' : 'Years Exp.'}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsCustomOrderOpen(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm transition-colors"
              >
                <Scissors className="w-4 h-4" />
                {fa ? 'سفارش دوخت با اندازه شما' : 'Order Custom Tailoring'}
              </button>
              <a
                href="#catalog"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:border-gray-400 transition-colors"
              >
                {fa ? 'مشاهده مجموعه' : 'Browse Collection'}
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-gray-200 aspect-[4/5] bg-gray-100 shadow-sm">
              <img
                src="/assets/images/product_featured.jpg"
                alt={fa ? 'گند افغانی تولیدی نظیف' : 'Froshgah Nazif Afghan Dress'}
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80';
                }}
              />
            </div>

            {/* Simple floating tag */}
            <div className="absolute bottom-4 start-4 bg-white rounded-xl shadow-md border border-gray-100 px-4 py-3 max-w-[200px]">
              <p className="text-xs font-bold text-gray-900">
                {fa ? 'گند زرین شاهی' : 'Royal Golden Gand'}
              </p>
              <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
                {fa ? 'از ۱۴,۵۰۰ افغانی' : 'From $210 USD'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
