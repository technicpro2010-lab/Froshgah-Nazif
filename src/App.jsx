import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StoryBanner from './components/StoryBanner';
import ProductCatalog from './components/ProductCatalog';
import InstagramGallery from './components/InstagramGallery';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import CustomTailoringModal from './components/CustomTailoringModal';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import { useStore } from './context/StoreContext';
import { Scissors, Check } from 'lucide-react';
import { WhatsAppIcon } from './components/Icons';

export default function App() {
  const { lang, toastMessage, setIsCustomOrderOpen, storeInfo } = useStore();
  const fa = lang === 'fa';

  const openWhatsApp = () => {
    const clean = storeInfo.whatsapp.replace(/[^0-9]/g, '');
    const msg = fa
      ? 'سلام، جهت مشاوره و سفارش دوخت در فروشگاه نظیف تماس می‌گیرم.'
      : 'Hello, I would like to inquire about a custom tailoring order at Froshgah Nazif.';
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

      <Header />

      <main className="flex-1">
        <Hero />
        <StoryBanner />
        <ProductCatalog />
        <InstagramGallery />
        <AboutSection />
      </main>

      <Footer />

      {/* Modals */}
      <CustomTailoringModal />
      <ProductDetailModal />
      <CartDrawer />

      {/* Floating Buttons */}
      <div className="fixed bottom-5 start-4 z-40 flex flex-col gap-3">
        <button
          onClick={() => setIsCustomOrderOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-lg transition-colors"
        >
          <Scissors className="w-4 h-4" />
          <span className="hidden sm:inline">{fa ? 'سفارش دوخت' : 'Custom Order'}</span>
        </button>

        <button
          onClick={openWhatsApp}
          className="p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-colors"
          title={fa ? 'واتساپ' : 'WhatsApp'}
        >
          <WhatsAppIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 end-4 z-50 bg-gray-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 max-w-xs">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          {toastMessage}
        </div>
      )}

    </div>
  );
}
