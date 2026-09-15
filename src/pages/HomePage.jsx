import React from 'react';
import CategoryNav from '../components/CategoryNav';
import CategoryStrip from '../components/CategoryStrip';
import OccasionGifts from '../components/OccasionGifts';
import PromoBanners from '../components/PromoBanners';
import SideBannerSection from '../components/SideBannerSection';
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
      
      {/* Top Banner Section (Hero Carousel) */}
      <PromoBanners position="Top" />

      <OccasionGifts />
      <BestSellers />
      <FlowersCollection />

      {/* Featured Left Banner with Related Cards Showcase */}
      <SideBannerSection position="Left" bannerIndex={0} />

      <BirthdayGifts />
      <GiftsForEveryone />

      {/* Middle Banner Section */}
      <PromoBanners position="Middle" />

      <FreshlyBakedCakes />
      <GiftsForEveryFeeling />

      {/* Featured Second Banner / Right Banner with Related Cards Showcase */}
      <SideBannerSection position="Left" bannerIndex={1} />
      <SideBannerSection position="Right" bannerIndex={0} />

      <NewlyLaunched />

      {/* Bottom Banners if configured */}
      <PromoBanners position="Bottom" />

      <SaveMoreOffers />
      <PlantsForEveryVibe />
      <JoyfulGiftingStories />
      <TrustStats />
      <ShopByBrands />
    </div>
  );
}
