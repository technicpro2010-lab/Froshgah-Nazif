import React from 'react';
import { useStore } from '../context/StoreContext';
import { ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './Icons';

export default function InstagramGallery() {
  const { lang, storeInfo } = useStore();
  const fa = lang === 'fa';

  const posts = [
    {
      img: '/assets/images/social_post_01.webp',
      href: 'https://www.instagram.com/froshgah_nazef/p/DJSQqtsRq5x/',
      caption: fa ? 'لباس سنتی افغانی از صفحه اینستاگرام' : 'Afghan traditional dress from Instagram',
      likes: '342', comments: '48',
    },
    {
      img: '/assets/images/facebook_post_01.webp',
      href: storeInfo.facebookUrl,
      caption: fa ? 'مدل سنتی از صفحه فیسبوک فروشگاه نظیف' : 'Traditional design from our Facebook page',
      likes: '198', comments: '26',
    },
    {
      img: '/assets/images/facebook_post_02.webp',
      href: storeInfo.facebookUrl,
      caption: fa ? 'لباس سنتی گلدوزی‌شده از صفحه فیسبوک' : 'Embroidered traditional dress from Facebook',
      likes: '512', comments: '73',
    },
    {
      img: '/assets/images/social_post_09.webp',
      href: 'https://www.instagram.com/froshgah_nazef/p/DdPVhJ0KIFT/',
      caption: fa ? 'لباس سنتی زرشکی با گلدوزی' : 'Burgundy traditional dress with embroidery',
      likes: '420', comments: '55',
    },
  ];

  return (
    <section id="instagram-showcase" className="py-14 sm:py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <img
              src="/assets/images/logo.jpg"
              alt={storeInfo.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-300"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&q=80'; }}
            />
            <div>
              <h2 className="text-xl font-black text-gray-900">
                {fa ? storeInfo.name : storeInfo.nameEn}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                  href={storeInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-pink-600 hover:text-pink-700 flex items-center gap-1"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  @{storeInfo.instagramHandle}
                </a>
                <a
                  href={storeInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                  Facebook
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {fa ? 'جدیدترین مدل‌ها و رضایت مشتریان را دنبال کنید' : 'Follow for the latest designs & client reviews'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={storeInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              {fa ? 'اینستاگرام' : 'Instagram'}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={storeInfo.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold transition-colors"
            >
              <FacebookIcon className="w-4 h-4" />
              Facebook
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {posts.map((post, i) => (
            <a
              key={i}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.img}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80'; }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-sm font-bold">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{post.comments}</span>
                </div>
              </div>
              <p className="p-2 text-[11px] text-gray-600 line-clamp-1">{post.caption}</p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
