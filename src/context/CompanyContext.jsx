import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCompany } from '../services/companyService';

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompany = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCompany();
      if (response.success && response.data) {
        setCompany(response.data);
      } else {
        setError(response.error);
      }
    } catch (err) {
      console.error('CompanyContext error fetching company:', err);
      setError(err.message || 'Failed to load company profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return (
    <CompanyContext.Provider
      value={{
        company,
        loading,
        error,
        refreshCompany: fetchCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}

export default CompanyContext;
