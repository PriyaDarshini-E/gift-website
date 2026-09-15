/**
 * Product Service to fetch and manage products
 */

import { normalizeProduct } from '../utils/dataMappers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://memorycreators.in/crmapi/public/api';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

/**
 * Fetch products from CRM / Backend API
 */
export async function getProducts() {
  try {
    const endpoint = `${API_BASE_URL.replace(/\/+$/, '')}/getProducts`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      return {
        success: false,
        data: [],
        error: `HTTP ${response.status}`,
      };
    }

    const data = await response.json();

    let rawList = [];
    let imageUrlArray = [];
    if (data && typeof data === 'object') {
      if (Array.isArray(data.image_url)) {
        imageUrlArray = data.image_url;
      }
      if (Array.isArray(data)) {
        rawList = data;
      } else if (Array.isArray(data.data)) {
        rawList = data.data;
      } else if (Array.isArray(data.products)) {
        rawList = data.products;
      } else if (Array.isArray(data.result)) {
        rawList = data.result;
      } else if (Array.isArray(data.getProducts)) {
        rawList = data.getProducts;
      }
    }

    const normalized = rawList
      .map((item, idx) => normalizeProduct(item, idx, imageUrlArray))
      .filter(Boolean);

    return {
      success: true,
      data: normalized,
      imageUrlArray,
      error: null,
    };
  } catch (error) {
    console.warn('Failed to fetch products from backend:', error.message);
    return {
      success: false,
      data: [],
      error: error.message || 'Error fetching products',
    };
  }
}

/**
 * Search products against backend / CRM API
 */
export async function searchProducts(query = '') {
  if (!query || !query.trim()) {
    return { success: true, data: [], error: null };
  }

  const cleanQuery = query.trim().toLowerCase();

  try {
    // Attempt with query parameter
    const endpoint = `${API_BASE_URL.replace(/\/+$/, '')}/getProducts?search=${encodeURIComponent(cleanQuery)}`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    });

    let rawList = [];
    let imageUrlArray = [];

    if (response.ok) {
      const data = await response.json();
      if (data && typeof data === 'object') {
        if (Array.isArray(data.image_url)) imageUrlArray = data.image_url;
        if (Array.isArray(data)) rawList = data;
        else if (Array.isArray(data.data)) rawList = data.data;
        else if (Array.isArray(data.products)) rawList = data.products;
        else if (Array.isArray(data.result)) rawList = data.result;
        else if (Array.isArray(data.getProducts)) rawList = data.getProducts;
      }
    }

    // If server returned results, normalize them
    let normalized = rawList
      .map((item, idx) => normalizeProduct(item, idx, imageUrlArray))
      .filter(Boolean);

    // Fallback or local refine across fields
    if (normalized.length === 0) {
      const allRes = await getProducts();
      if (allRes.success && Array.isArray(allRes.data)) {
        normalized = allRes.data.filter((p) => {
          const name = (p.name || p.title || '').toLowerCase();
          const cat = (p.category || '').toLowerCase();
          const subCat = (p.subCategory || '').toLowerCase();
          const brand = (p.brand || '').toLowerCase();
          const tag = (p.tag || '').toLowerCase();
          const desc = (p.description || '').toLowerCase();
          return (
            name.includes(cleanQuery) ||
            cat.includes(cleanQuery) ||
            subCat.includes(cleanQuery) ||
            brand.includes(cleanQuery) ||
            tag.includes(cleanQuery) ||
            desc.includes(cleanQuery)
          );
        });
      }
    }

    return {
      success: true,
      data: normalized,
      imageUrlArray,
      error: null,
    };
  } catch (error) {
    console.warn('Search query error:', error.message);
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
}

