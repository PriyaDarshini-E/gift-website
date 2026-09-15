import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getBanners } from '../services/bannerService';

const BannerContext = createContext();

export function BannerProvider({ children }) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBanners();
      if (response.success) {
        setBanners(response.data || []);
      } else {
        setError(response.error);
        setBanners([]);
      }
    } catch (err) {
      console.error('BannerContext error fetching banners:', err);
      setError(err.message || 'Failed to load banners');
      setBanners([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const topBanners = banners.filter(b => (b.position || '').toLowerCase() === 'top');
  const middleBanners = banners.filter(b => (b.position || '').toLowerCase() === 'middle');
  const bottomBanners = banners.filter(b => (b.position || '').toLowerCase() === 'bottom');
  const leftBanners = banners.filter(b => (b.position || '').toLowerCase() === 'left');
  const rightBanners = banners.filter(b => (b.position || '').toLowerCase() === 'right');
  const mainBanners = banners.filter(b => (b.type || '').toLowerCase() === 'main');
  const offerBanners = banners.filter(b => (b.type || '').toLowerCase() === 'offer');

  const getBannersByPosition = useCallback((pos) => {
    if (!pos) return banners;
    return banners.filter(b => (b.position || '').toLowerCase().trim() === pos.toLowerCase().trim());
  }, [banners]);

  const getBannersByType = useCallback((type) => {
    if (!type) return banners;
    return banners.filter(b => (b.type || '').toLowerCase().trim() === type.toLowerCase().trim());
  }, [banners]);

  return (
    <BannerContext.Provider
      value={{
        banners,
        topBanners,
        middleBanners,
        bottomBanners,
        leftBanners,
        rightBanners,
        mainBanners,
        offerBanners,
        getBannersByPosition,
        getBannersByType,
        loading,
        error,
        refreshBanners: fetchBanners,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
}

export function useBanners() {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanners must be used within a BannerProvider');
  }
  return context;
}

export default BannerContext;
