/**
 * Brand Service to fetch and manage brands
 * Ready for backend endpoint integration when provided.
 */

import { normalizeBrand } from '../utils/dataMappers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://memorycreators.in/crmapi/public/api';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

/**
 * Fetch brands from Backend API
 * Endpoint: GET https://memorycreators.in/crmapi/public/api/getBrand
 */
export async function getBrands() {
  try {
    const endpoint = `${API_BASE_URL.replace(/\/+$/, '')}/getBrand`;
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
      } else if (Array.isArray(data.brands)) {
        rawList = data.brands;
      } else if (Array.isArray(data.result)) {
        rawList = data.result;
      } else if (Array.isArray(data.getBrands)) {
        rawList = data.getBrands;
      }
    }

    const normalized = rawList
      .map((item, idx) => normalizeBrand(item, idx, imageUrlArray))
      .filter(Boolean);

    return {
      success: true,
      data: normalized,
      imageUrlArray,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message || 'Error fetching brands',
    };
  }
}

export const getActiveBrands = getBrands;
