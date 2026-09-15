/**
 * Company Service to fetch real-time company profile from CRM API
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://memorycreators.in/crmapi/public/api';
const CRM_BASE_URL = import.meta.env.VITE_CRM_BASE_URL || 'https://memorycreators.in';
const ASSET_BASE_URL = import.meta.env.VITE_CRM_ASSET_BASE_URL || 'https://memorycreators.in/crmapi/public';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

/**
 * Helper to build full URL for company logo/assets
 */
export const formatCompanyImageUrl = (imgPath, imageUrlArray) => {
  let noImageUrl = 'https://memorycreators.in/crmapi/public/assets/images/no_image.jpg';
  if (Array.isArray(imageUrlArray)) {
    const noImgObj = imageUrlArray.find(
      (o) => o.image_for && (o.image_for.toLowerCase() === 'no image' || o.image_for.toLowerCase() === 'no_image')
    );
    if (noImgObj && noImgObj.image_url) {
      noImageUrl = noImgObj.image_url;
    }
  }

  if (!imgPath || typeof imgPath !== 'string' || !imgPath.trim()) {
    return noImageUrl;
  }
  const trimmed = imgPath.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  
  if (trimmed.startsWith('/')) {
    return `${CRM_BASE_URL}${trimmed}`;
  }

  // Check if image_url has Company image base path
  if (Array.isArray(imageUrlArray)) {
    const companyImageObj = imageUrlArray.find(
      (o) => o.image_for && o.image_for.toLowerCase() === 'company'
    );
    if (companyImageObj && companyImageObj.image_url) {
      return `${companyImageObj.image_url.replace(/\/+$/, '')}/${trimmed.replace(/^\/+/, '')}`;
    }
  }

  if (trimmed.startsWith('assets/images/')) {
    return `${ASSET_BASE_URL}/${trimmed}`;
  }
  
  if (trimmed.startsWith('crmapi/public/')) {
    return `${CRM_BASE_URL}/${trimmed}`;
  }

  return `${ASSET_BASE_URL}/assets/images/company_images/${trimmed}`;
};

/**
 * Normalizes company profile from CRM response
 */
export const normalizeCompanyData = (data) => {
  if (!data || typeof data !== 'object') return null;

  const item = Array.isArray(data) ? data[0] : (data.data || data.company || data);

  if (!item || typeof item !== 'object') return null;

  const name =
    item.company_name ||
    item.name ||
    item.title ||
    item.companyName ||
    'Memory Creators';

  const rawLogo =
    item.company_logo ||
    item.logo ||
    item.logo_url ||
    item.image ||
    item.icon ||
    '';

  const logo = formatCompanyImageUrl(rawLogo, data?.image_url);

  const email =
    item.company_email ||
    item.email ||
    item.support_email ||
    item.contact_email ||
    'info@memorycreators.in';

  const phone =
    item.company_mobile_no ||
    item.mobile ||
    item.phone ||
    item.contact_number ||
    item.company_phone ||
    item.company_landline_no ||
    '+91 88671 71060';

  const address =
    item.company_address ||
    item.address ||
    item.office_address ||
    'Jayanagar 9th Block, Bangalore – 560 043 Karnataka.';

  const place = item.company_place || item.place || item.city || 'Bangalore';
  const gst = item.company_gst || item.gst || '';
  const pan = item.company_pan_no || item.pan || '';
  const mapUrl = item.company_map_url || item.map_url || '';

  const website = item.website || item.company_website || 'https://www.memorycreators.in';

  const facebook = item.facebook || item.fb_url || item.facebook_url || '';
  const twitter = item.twitter || item.twitter_url || item.x_url || '';
  const instagram = item.instagram || item.instagram_url || item.ig_url || '';
  const linkedin = item.linkedin || item.linkedin_url || '';
  const youtube = item.youtube || item.youtube_url || '';

  const copyright =
    item.copyright ||
    `© ${new Date().getFullYear()} ${name}. All rights reserved.`;

  const about =
    item.about ||
    item.about_us ||
    item.description ||
    item.company_description ||
    '';

  return {
    id: item.id ?? item._id ?? 1,
    name,
    logo,
    rawLogo,
    email,
    phone,
    address,
    place,
    gst,
    pan,
    mapUrl,
    website,
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube,
    copyright,
    about,
    raw: item,
  };
};

/**
 * Fetch company details directly from CRM API database
 */
export async function getCompany() {
  try {
    const endpoint = `${API_BASE_URL.replace(/\/+$/, '')}/getCompany`;
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
    const normalized = normalizeCompanyData(data);

    return {
      success: true,
      data: normalized,
      error: null,
    };
  } catch (error) {
    console.error('Failed to fetch company details from CRM API:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Error fetching company profile',
    };
  }
}
