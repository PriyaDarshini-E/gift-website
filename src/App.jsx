import React from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import CategoryStrip from './components/CategoryStrip';
import OccasionGifts from './components/OccasionGifts';
import PromoBanners from './components/PromoBanners';
import RakshaBandhan from './components/RakshaBandhan';
import BestSellers from './components/BestSellers';
import FlowersCollection from './components/FlowersCollection';
import BirthdayGifts from './components/BirthdayGifts';
// import SendRakhiCity from './components/SendRakhiCity';
import GiftsForEveryone from './components/GiftsForEveryone';
import FreshlyBakedCakes from './components/FreshlyBakedCakes';
import GiftsForEveryFeeling from './components/GiftsForEveryFeeling';
import NewlyLaunched from './components/NewlyLaunched';
import PlantsForEveryVibe from './components/PlantsForEveryVibe';
import JoyfulGiftingStories from './components/JoyfulGiftingStories';
import TrustStats from './components/TrustStats';
import ShopByBrands from './components/ShopByBrands';
import SaveMoreOffers from './components/SaveMoreOffers';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 animate-fade-in">
      <Header />
      <CategoryNav />
      <CategoryStrip />
      <OccasionGifts />
      <PromoBanners />
      <RakshaBandhan />
      <BestSellers />
      <FlowersCollection />
      <BirthdayGifts />
      <GiftsForEveryone />
      <FreshlyBakedCakes />
      <GiftsForEveryFeeling />
      <NewlyLaunched />
      <SaveMoreOffers />
      <PlantsForEveryVibe />
      <JoyfulGiftingStories />
      <TrustStats />
      <ShopByBrands />

      {/* <SendRakhiCity /> */}

      <Footer />
    </div>
  );
}
