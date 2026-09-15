import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getActiveCategories } from '../services/categoryService';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getActiveCategories();
      if (response.success) {
        setCategories(response.data || []);
      } else {
        setError(response.error);
        setCategories([]);
      }
    } catch (err) {
      console.warn('CategoryContext error fetching categories:', err.message);
      setError(err.message || 'Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Main Top-level categories configured with isTop = 1
  const topCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];

    // Filter categories explicitly marked as isTop
    const isTopCategories = categories
      .filter((c) => c.isTop && (String(c.status).toLowerCase() === 'active' || !c.status))
      .sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0));

    if (isTopCategories.length > 0) {
      return isTopCategories;
    }

    // Fallback if no category is marked as isTop
    return categories
      .filter((c) => (c.parentId === null || !c.parentId) && !c.name.includes('>'))
      .sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0));
  }, [categories]);

  const getCategoryBySlug = useCallback(
    (slug) => {
      if (!slug || !Array.isArray(categories)) return null;
      const lower = String(slug).toLowerCase().trim();
      return (
        categories.find(
          (c) =>
            (c.slug && c.slug.toLowerCase().trim() === lower) ||
            (c.name && c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === lower) ||
            String(c.id) === lower
        ) || null
      );
    },
    [categories]
  );

  const getSubcategories = useCallback(
    (parentIdOrCategory) => {
      if (!Array.isArray(categories) || !parentIdOrCategory) return [];

      let targetId = null;
      if (typeof parentIdOrCategory === 'object' && parentIdOrCategory !== null) {
        targetId = parentIdOrCategory.id;
      } else {
        targetId = parentIdOrCategory;
      }

      if (targetId === undefined || targetId === null) return [];

      // Find all subcategories where parent_id matches targetId
      const matchingChildren = categories.filter(
        (c) =>
          c.parentId !== null &&
          c.parentId !== undefined &&
          String(c.parentId) === String(targetId) &&
          (String(c.status).toLowerCase() === 'active' || !c.status)
      );

      // Prioritize isSubTop = 1 categories
      const subTopChildren = matchingChildren.filter((c) => c.isSubTop);
      const list = subTopChildren.length > 0 ? subTopChildren : matchingChildren;

      return [...list].sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0));
    },
    [categories]
  );

  return (
    <CategoryContext.Provider
      value={{
        categories,
        topCategories,
        loading,
        error,
        refreshCategories: fetchCategories,
        getCategoryBySlug,
        getSubcategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
}

export default CategoryContext;
