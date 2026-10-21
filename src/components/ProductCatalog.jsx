import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, PRODUCTS } from '../data/storeData';
import ProductCard from './ProductCard';
import { Search, X } from 'lucide-react';

export default function ProductCatalog() {
  const { lang, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();
  const fa = lang === 'fa';
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    return PRODUCTS
      .filter(p => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.titleEn.toLowerCase().includes(q) ||
            p.fabricEn.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceAfn - b.priceAfn;
        if (sortBy === 'price-desc') return b.priceAfn - a.priceAfn;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-14 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            {fa ? 'مجموعه لباس‌های سنتی' : 'Traditional Dress Collection'}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {fa
              ? 'هر مدل با اندازه‌های اختصاصی شما دوخته می‌شود'
              : 'Every garment tailored to your exact measurements'}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 space-y-4">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={fa ? 'جستجو در مجموعه...' : 'Search collection...'}
                className="w-full ps-9 pe-9 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value="featured">{fa ? 'پیشنهاد ویژه' : 'Featured'}</option>
              <option value="price-asc">{fa ? 'قیمت: کم به زیاد' : 'Price: Low to High'}</option>
              <option value="price-desc">{fa ? 'قیمت: زیاد به کم' : 'Price: High to Low'}</option>
            </select>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {fa ? cat.name : cat.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-bold text-gray-700 mb-2">
              {fa ? 'موردی یافت نشد' : 'No results found'}
            </p>
            <p className="text-sm text-gray-400 mb-5">
              {fa ? 'فیلترها را تغییر دهید یا جستجو را پاک کنید' : 'Try adjusting your filters or search term'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-sm font-semibold hover:bg-emerald-900 transition-colors"
            >
              {fa ? 'نمایش همه' : 'Show All'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
