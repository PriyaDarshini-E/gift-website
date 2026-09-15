import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { BrandProvider } from './context/BrandContext';
import { CategoryProvider } from './context/CategoryContext';
import { CompanyProvider } from './context/CompanyContext';
import { BannerProvider } from './context/BannerContext';
import { OccasionProvider } from './context/OccasionContext';
import { WebsiteProvider } from './context/WebsiteContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import TermsAndConditions from './pages/TermsAndConditions';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Testimonials from './pages/Testimonials';
import ContactUs from './pages/ContactUs';
import FAQs from './pages/FAQs';
import CategoryPage from './pages/CategoryPage';
import CorporateGifting from './pages/CorporateGifting';

// Interactive Drawers & Modals
import CartDrawer from './components/drawers/CartDrawer';
import LocationModal from './components/modals/LocationModal';
import ProductModal from './components/modals/ProductModal';
import RemindersModal from './components/modals/RemindersModal';
import GiftFinderModal from './components/modals/GiftFinderModal';
import OrderTrackerModal from './components/modals/OrderTrackerModal';

export default function App() {
  return (
    <CartProvider>
      <CompanyProvider>
        <BrandProvider>
          <CategoryProvider>
            <BannerProvider>
              <OccasionProvider>
                <WebsiteProvider>
                  <ProductProvider>
                    <div className="min-h-screen bg-stone-50 animate-fade-in flex flex-col justify-between">
                      <ScrollToTop />
                      <div>
                        <Header />
                        <main>
                          <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/terms" element={<TermsAndConditions />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/testimonials" element={<Testimonials />} />
                            <Route path="/contact" element={<ContactUs />} />
                            <Route path="/category/:slug" element={<CategoryPage />} />
                            <Route path="/occasion/:slug" element={<CategoryPage />} />
                            <Route path="/brand/:slug" element={<CategoryPage />} />
                            <Route path="/tag/:slug" element={<CategoryPage />} />
                            <Route path="/search" element={<CategoryPage />} />
                            <Route path="/corporate" element={<CorporateGifting />} />
                          </Routes>
                        </main>
                      </div>
                      <Footer />

                      {/* Global Drawers & Modals */}
                      <CartDrawer />
                      <LocationModal />
                      <ProductModal />
                      <RemindersModal />
                      <GiftFinderModal />
                      <OrderTrackerModal />
                    </div>
                  </ProductProvider>
                </WebsiteProvider>
              </OccasionProvider>
            </BannerProvider>
          </CategoryProvider>
        </BrandProvider>
      </CompanyProvider>
    </CartProvider>
  );
}


