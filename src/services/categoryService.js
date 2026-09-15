/**
 * Category Service to fetch and manage categories & subcategories
 */

import { normalizeCategory } from '../utils/dataMappers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://memorycreators.in/crmapi/public/api';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

/**
 * Fetch categories from Backend / CRM API
 */
export async function getCategory() {
  try {
    const endpoint = `${API_BASE_URL.replace(/\/+$/, '')}/getCategory`;
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
      } else if (Array.isArray(data.categories)) {
        rawList = data.categories;
      } else if (Array.isArray(data.result)) {
        rawList = data.result;
      } else if (Array.isArray(data.getCategory)) {
        rawList = data.getCategory;
      } else if (data.data && Array.isArray(data.data.categories)) {
        rawList = data.data.categories;
      }
    }

    const normalized = rawList
      .map((item, idx) => normalizeCategory(item, idx, imageUrlArray))
      .filter(Boolean);

    return {
      success: true,
      data: normalized,
      imageUrlArray,
      error: null,
    };
  } catch (error) {
    console.warn('Failed to fetch categories from backend:', error.message);
    return {
      success: false,
      data: [],
      error: error.message || 'Error fetching categories',
    };
  }
}

export const getCategories = getCategory;
export const getActiveCategories = getCategory;
