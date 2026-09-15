import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getProducts } from '../services/productService';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data || []);
      } else {
        setError(response.error);
        setProducts([]);
      }
    } catch (err) {
      console.warn('ProductContext error fetching products:', err.message);
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getProductById = useCallback(
    (id) => products.find((p) => String(p.id) === String(id) || String(p.productId) === String(id)),
    [products]
  );

  const getProductBySlug = useCallback(
    (slug) => products.find((p) => p.slug === slug),
    [products]
  );

  const getProductsByCategory = useCallback(
    (categoryNameOrSlug) => {
      if (!categoryNameOrSlug || categoryNameOrSlug.toLowerCase() === 'all') return products;
      const query = categoryNameOrSlug.toLowerCase().replace(/-/g, ' ');
      return products.filter((p) => {
        const cat = (p.category || '').toLowerCase();
        const subCat = (p.subCategory || '').toLowerCase();
        const name = (p.name || '').toLowerCase();
        return cat.includes(query) || subCat.includes(query) || name.includes(query);
      });
    },
    [products]
  );

  const getProductsByBrand = useCallback(
    (brandNameOrId) => {
      if (!brandNameOrId) return [];
      const query = String(brandNameOrId).toLowerCase();
      return products.filter((p) => {
        const b = (p.brand || '').toLowerCase();
        return b.includes(query) || String(p.brandId) === query;
      });
    },
    [products]
  );

  const getProductsByOccasion = useCallback(
    (occasionTitleOrSlug) => {
      if (!occasionTitleOrSlug) return [];
      const query = String(occasionTitleOrSlug).toLowerCase().replace(/-/g, ' ');
      return products.filter((p) => {
        const name = (p.name || '').toLowerCase();
        const cat = (p.category || '').toLowerCase();
        const hasOccasion = Array.isArray(p.occasions) && p.occasions.some(o => 
          (typeof o === 'object' ? (o.name || o.title || '') : String(o)).toLowerCase().includes(query)
        );
        return hasOccasion || name.includes(query) || cat.includes(query);
      });
    },
    [products]
  );

  const getFeaturedProducts = useMemo(() => {
    return products.slice(0, 10);
  }, [products]);

  const getBestsellers = useMemo(() => {
    return products.filter(p => {
      const tagStr = typeof p.tag === 'string' ? p.tag : (p.tag?.name || p.tag?.tags_name || '');
      return tagStr.toLowerCase().includes('bestseller') || Number(p.rating || 0) >= 4.7;
    }).slice(0, 20);
  }, [products]);

  const getNewArrivals = useMemo(() => {
    return products.slice(-15).reverse();
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts: fetchProducts,
        getProductById,
        getProductBySlug,
        getProductsByCategory,
        getProductsByBrand,
        getProductsByOccasion,
        getFeaturedProducts,
        getBestsellers,
        getNewArrivals,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export default ProductContext;
