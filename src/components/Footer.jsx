import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, Scissors, Heart } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './Icons';

export default function Footer() {
  const { lang, setIsCustomOrderOpen, storeInfo } = useStore();
  const fa = lang === 'fa';

  const categories = [
    { fa: 'گند افغانی مجلسی', en: 'Royal Gand Afghani' },
    { fa: 'لباس عروس و حنابندان', en: 'Bridal & Henna Sets' },
    { fa: 'لباس مردانه سنتی', en: "Men's Traditional Wear" },
    { fa: 'لباس بچگانه سنتی', en: 'Kids Traditional Dresses' },
    { fa: 'زیورآلات سنتی', en: 'Traditional Jewelry' },
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-700">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/logo.jpg"
                alt={storeInfo.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&q=80'; }}
              />
              <div>
                <h3 className="font-black text-white text-base">
                  {fa ? storeInfo.name : storeInfo.nameEn}
                </h3>
                <p className="text-xs text-amber-400">{fa ? storeInfo.subtitle : storeInfo.subtitleEn}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              {fa ? storeInfo.bio : storeInfo.bioEn}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={storeInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                @{storeInfo.instagramHandle}
              </a>
              <a
                href={storeInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
                Facebook
              </a>
              <button
                onClick={() => setIsCustomOrderOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-600 text-gray-300 text-xs hover:border-gray-400 transition-colors"
              >
                <Scissors className="w-3.5 h-3.5" />
                {fa ? 'سفارش دوخت' : 'Custom Order'}
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">
              {fa ? 'دسته‌بندی‌ها' : 'Collections'}
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              {categories.map((c, i) => (
                <li key={i}>
                  <a href="#catalog" className="hover:text-gray-200 transition-colors">
                    {fa ? c.fa : c.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">
              {fa ? 'تماس با ما' : 'Contact'}
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{fa ? storeInfo.location : storeInfo.locationEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">{storeInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono">{storeInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <a href={storeInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors font-mono">
                  instagram.com/{storeInfo.instagramHandle}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FacebookIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={storeInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                  Facebook
                </a>
              </div>
            </div>

            <div className="pt-1">
              <p className="text-[11px] text-gray-500 mb-2">
                {fa ? 'ارسال به:' : 'Ships to:'}
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-gray-400">
                {['🇦🇫 Afghanistan', '🇺🇸 USA', '🇩🇪 Germany', '🇨🇦 Canada', '🇦🇺 Australia'].map(c => (
                  <span key={c} className="bg-gray-800 px-2 py-0.5 rounded">{c}</span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} {fa ? 'فروشگاه تولیدی نظیف — تمامی حقوق محفوظ است.' : 'Froshgah Nazif — All rights reserved.'}
          </span>
          <span className="flex items-center gap-1.5">
            {fa ? 'ساخته شده با' : 'Made with'}
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            {fa ? 'برای فرهنگ اصیل افغانستان' : 'for Afghan heritage'}
          </span>
        </div>

      </div>
    </footer>
  );
}
