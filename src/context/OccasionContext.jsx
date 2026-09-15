import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getOccasions } from '../services/occasionService';

const OccasionContext = createContext();

export function OccasionProvider({ children }) {
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOccasions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOccasions();
      if (response.success) {
        setOccasions(response.data || []);
      } else {
        setError(response.error);
        setOccasions([]);
      }
    } catch (err) {
      console.error('OccasionContext error fetching occasions:', err);
      setError(err.message || 'Failed to load occasions');
      setOccasions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOccasions();
  }, [fetchOccasions]);

  return (
    <OccasionContext.Provider
      value={{
        occasions,
        loading,
        error,
        refreshOccasions: fetchOccasions,
      }}
    >
      {children}
    </OccasionContext.Provider>
  );
}

export function useOccasions() {
  const context = useContext(OccasionContext);
  if (!context) {
    throw new Error('useOccasions must be used within an OccasionProvider');
  }
  return context;
}

export default OccasionContext;
