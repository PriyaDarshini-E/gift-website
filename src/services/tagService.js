/**
 * Tag Service to fetch tags from CRM API
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://memorycreators.in/crmapi/public/api';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

export const normalizeTagItem = (item, index) => {
  if (!item) return null;
  if (typeof item === 'string') {
    return { id: index + 1, name: item, slug: item.toLowerCase().replace(/\s+/g, '-'), sort: index + 1, status: 'Active' };
  }

  const id = item.id ?? item._id ?? item.tag_id ?? index + 1;
  const name = item.tags_name || item.tag_name || item.name || item.title || item.tag || '';
  const slug = item.tags_slug || item.slug || item.tag_slug || name.toLowerCase().replace(/\s+/g, '-');
  const sort = item.tags_sort ?? item.sort ?? index + 1;
  const status = item.tags_status ?? item.status ?? 'Active';

  return {
    id,
    name,
    slug,
    sort,
    status,
    count: item.product_count ?? item.count ?? null,
    raw: item,
  };
};

export async function getTags() {
  try {
    const endpoint = `${API_BASE_URL.replace(/\/+$/, '')}/getTags`;
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
      } else if (Array.isArray(data.tags)) {
        rawList = data.tags;
      } else if (Array.isArray(data.result)) {
        rawList = data.result;
      } else if (Array.isArray(data.getTags)) {
        rawList = data.getTags;
      }
    }

    const normalized = rawList
      .map((item, idx) => normalizeTagItem(item, idx))
      .filter((item) => item && item.name);

    return {
      success: true,
      data: normalized,
      error: null,
    };
  } catch (error) {
    console.error('Failed to fetch tags from CRM API:', error);
    return {
      success: false,
      data: [],
      error: error.message || 'Error fetching tags',
    };
  }
}
