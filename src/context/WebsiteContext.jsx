import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getWebsiteUnique, getShare } from '../services/websiteService';
import { getTags } from '../services/tagService';

const WebsiteContext = createContext();

export function WebsiteProvider({ children }) {
  const [uniqueStats, setUniqueStats] = useState([]);
  const [shares, setShares] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWebsiteData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [uniqueRes, shareRes, tagRes] = await Promise.allSettled([
        getWebsiteUnique(),
        getShare(),
        getTags(),
      ]);

      if (uniqueRes.status === 'fulfilled' && uniqueRes.value.success) {
        setUniqueStats(uniqueRes.value.data || []);
      }
      if (shareRes.status === 'fulfilled' && shareRes.value.success) {
        setShares(shareRes.value.data || []);
      }
      if (tagRes.status === 'fulfilled' && tagRes.value.success) {
        setTags(tagRes.value.data || []);
      }
    } catch (err) {
      console.error('WebsiteContext error fetching website data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebsiteData();
  }, [fetchWebsiteData]);

  return (
    <WebsiteContext.Provider
      value={{
        uniqueStats,
        shares,
        tags,
        loading,
        error,
        refreshWebsiteData: fetchWebsiteData,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}

export default WebsiteContext;
