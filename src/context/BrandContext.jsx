import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getActiveBrands } from '../services/brandService';

const BrandContext = createContext();

export function BrandProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getActiveBrands();
      if (response.success && Array.isArray(response.data)) {
        setBrands(response.data);
      } else {
        setBrands([]);
      }
    } catch (err) {
      console.error('BrandContext error fetching brands:', err);
      setError(err.message || 'Failed to load brands');
      setBrands([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const getBrandById = useCallback(
    (id) => brands.find((b) => String(b.id) === String(id)),
    [brands]
  );

  return (
    <BrandContext.Provider
      value={{
        brands,
        loading,
        error,
        refreshBrands: fetchBrands,
        getBrandById,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrands() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrands must be used within a BrandProvider');
  }
  return context;
}

export default BrandContext;
