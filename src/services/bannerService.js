/**
 * Banner Service to fetch and manage promotional banners
 */

import { normalizeBanner } from '../utils/dataMappers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://memorycreators.in/crmapi/public/api';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

/**
 * Fetch banners from Backend / CRM API
 */
export async function getBanners() {
  try {
    const endpoint = `${API_BASE_URL.replace(/\/+$/, '')}/getBanner`;
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

    if (Array.isArray(data)) {
      rawList = data;
    } else if (data && typeof data === 'object') {
      if (Array.isArray(data.image_url)) {
        imageUrlArray = data.image_url;
      }
      if (Array.isArray(data.data)) {
        rawList = data.data;
      } else if (Array.isArray(data.banners)) {
        rawList = data.banners;
      } else if (Array.isArray(data.result)) {
        rawList = data.result;
      } else if (Array.isArray(data.getBanner)) {
        rawList = data.getBanner;
      }
    }

    const normalized = rawList
      .map((item, idx) => normalizeBanner(item, idx, imageUrlArray))
      .filter((item) => item && item.image && item.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      success: true,
      data: normalized,
      imageUrlArray,
      error: null,
    };
  } catch (error) {
    console.warn('Failed to fetch banners from backend:', error.message);
    return {
      success: false,
      data: [],
      error: error.message || 'Error fetching banners',
    };
  }
}
