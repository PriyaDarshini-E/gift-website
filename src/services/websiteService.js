/**
 * Website Service to fetch website unique features/stats and share settings from CRM API
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://memorycreators.in/crmapi/public/api';
const CRM_BASE_URL = import.meta.env.VITE_CRM_BASE_URL || 'https://memorycreators.in';
const ASSET_BASE_URL = import.meta.env.VITE_CRM_ASSET_BASE_URL || 'https://memorycreators.in/crmapi/public';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

export const formatWebsiteImageUrl = (imgPath) => {
  if (!imgPath || typeof imgPath !== 'string') return '';
  const trimmed = imgPath.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return `${CRM_BASE_URL}${trimmed}`;
  }
  if (trimmed.startsWith('crmapi/public/')) {
    return `${CRM_BASE_URL}/${trimmed}`;
  }
  return `${ASSET_BASE_URL}/${trimmed}`;
};

/**
 * Normalizes website unique stats / USPs
 */
export const normalizeWebsiteUniqueItem = (item, index) => {
  if (!item) return null;
  const id = item.id ?? item._id ?? index + 1;
  const title = item.title || item.name || item.label || item.heading || '';
  const value = item.value || item.stat || item.number || item.count || '';
  const description = item.description || item.subtitle || item.sub || '';
  const rawIcon = item.icon || item.image || item.icon_url || '';
  const icon = formatWebsiteImageUrl(rawIcon);

  return {
    id,
    title,
    value,
    label: title || description,
    description,
    icon,
    raw: item,
  };
};

/**
 * Normalizes website share settings
 */
export const normalizeShareItem = (item, index) => {
  if (!item) return null;
  const id = item.id ?? item._id ?? index + 1;
  const platform = item.platform || item.name || item.title || item.type || `Share ${index + 1}`;
  const url = item.url || item.share_url || item.link || '';
  const icon = item.icon || item.logo || '';
  const message = item.message || item.share_text || item.text || '';

  return {
    id,
    platform,
    url,
    icon,
    message,
    raw: item,
  };
};

/**
 * Fetch website unique statistics / USPs
 */
export async function getWebsiteUnique() {
  try {
    const endpoint = `${API_BASE_URL.replace(/\/+$/, '')}/getWebsiteUnique`;
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
      throw new Error(`CRM API HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    let rawList = [];
    if (Array.isArray(data)) {
      rawList = data;
    } else if (data && typeof data === 'object') {
      if (Array.isArray(data.data)) {
        rawList = data.data;
      } else if (Array.isArray(data.unique)) {
        rawList = data.unique;
      } else if (Array.isArray(data.features)) {
        rawList = data.features;
      } else if (Array.isArray(data.getWebsiteUnique)) {
        rawList = data.getWebsiteUnique;
      }
    }

    const normalized = rawList
      .map((item, idx) => normalizeWebsiteUniqueItem(item, idx))
      .filter(Boolean);

    return {
      success: true,
      data: normalized,
      error: null,
    };
  } catch (error) {
    console.error('Failed to fetch website unique features from CRM API:', error);
    return {
      success: false,
      data: [],
      error: error.message || 'Error fetching unique features',
    };
  }
}

/**
 * Fetch website share configurations
 */
export async function getShare() {
  try {
    const endpoint = `${API_BASE_URL.replace(/\/+$/, '')}/getShare`;
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
      throw new Error(`CRM API HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    let rawList = [];
    if (Array.isArray(data)) {
      rawList = data;
    } else if (data && typeof data === 'object') {
      if (Array.isArray(data.data)) {
        rawList = data.data;
      } else if (Array.isArray(data.shares)) {
        rawList = data.shares;
      } else if (Array.isArray(data.result)) {
        rawList = data.result;
      } else if (Array.isArray(data.getShare)) {
        rawList = data.getShare;
      }
    }

    const normalized = rawList
      .map((item, idx) => normalizeShareItem(item, idx))
      .filter(Boolean);

    return {
      success: true,
      data: normalized,
      error: null,
    };
  } catch (error) {
    console.error('Failed to fetch share settings from CRM API:', error);
    return {
      success: false,
      data: [],
      error: error.message || 'Error fetching share configuration',
    };
  }
}
