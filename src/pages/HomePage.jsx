import React from 'react';
import CategoryNav from '../components/CategoryNav';
import CategoryStrip from '../components/CategoryStrip';
import OccasionGifts from '../components/OccasionGifts';
import PromoBanners from '../components/PromoBanners';
import BestSellers from '../components/BestSellers';
import FlowersCollection from '../components/FlowersCollection';
import BirthdayGifts from '../components/BirthdayGifts';
import GiftsForEveryone from '../components/GiftsForEveryone';
import FreshlyBakedCakes from '../components/FreshlyBakedCakes';
import GiftsForEveryFeeling from '../components/GiftsForEveryFeeling';
import NewlyLaunched from '../components/NewlyLaunched';
import SaveMoreOffers from '../components/SaveMoreOffers';
import PlantsForEveryVibe from '../components/PlantsForEveryVibe';
import JoyfulGiftingStories from '../components/JoyfulGiftingStories';
import TrustStats from '../components/TrustStats';
import ShopByBrands from '../components/ShopByBrands';

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <CategoryNav />
      <CategoryStrip />
      <OccasionGifts />
      <PromoBanners />
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
    </div>
  );
}
