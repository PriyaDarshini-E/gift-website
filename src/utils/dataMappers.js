/**
 * Data Mapping & Normalization Layer
 * 
 * Maps raw API / backend responses into clean, predictable frontend data models.
 * Handles missing fields, fallback values, variant attribute trees, and image resolution
 * without polluting UI components with backend-specific transformation logic.
 */

// Global fallback images
export const FALLBACK_IMAGES = {
  product: 'https://memorycreators.in/crmapi/public/assets/images/no_image.jpg',
  category: 'https://memorycreators.in/crmapi/public/assets/images/no_image.jpg',
  brand: 'https://memorycreators.in/crmapi/public/assets/images/no_image.jpg',
  vendor: 'https://memorycreators.in/crmapi/public/assets/images/no_image.jpg',
  occasion: '/images/home/occasion_birthday.png',
  banner: '/images/home/banner1.png',
  avatar: '/images/home/flower_coll_1.png',
};

/**
 * Format image URL safely against CRM base URL or absolute paths
 */
export const resolveImageUrl = (path, type = 'product', imageUrlArray = []) => {
  let fallbackUrl = FALLBACK_IMAGES[type] || FALLBACK_IMAGES.product;

  if (!path || typeof path !== 'string' || !path.trim()) {
    return fallbackUrl;
  }
  const trimmed = path.trim().replace(/\\/g, '/');
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  if (trimmed.startsWith('/images/')) {
    return trimmed;
  }
  const CRM_BASE_URL = 'https://memorycreators.in';
  const ASSET_BASE_URL = 'https://memorycreators.in/crmapi/public';

  if (trimmed.startsWith('/')) {
    return `${CRM_BASE_URL}${trimmed}`;
  }

  // Check if image_url array matches type (e.g. Banner, Company, Category, Brand, Product Variant, Product)
  if (Array.isArray(imageUrlArray) && imageUrlArray.length > 0) {
    const cleanType = type.toLowerCase();
    
    // Check for Product Variant image match
    const isVariantFilename = trimmed.includes('_0_') || trimmed.includes('_1_') || trimmed.includes('_2_') || cleanType.includes('variant');
    if (isVariantFilename) {
      const variantObj = imageUrlArray.find(o => (o.image_for || '').toLowerCase().includes('variant'));
      if (variantObj && variantObj.image_url) {
        return `${variantObj.image_url.replace(/\/+$/, '')}/${trimmed.replace(/^\/+/, '')}`;
      }
    }

    const matchObj = imageUrlArray.find(
      (o) => {
        const imgFor = (o.image_for || '').toLowerCase();
        return imgFor === cleanType || imgFor.includes(cleanType) || cleanType.includes(imgFor);
      }
    );
    if (matchObj && matchObj.image_url) {
      return `${matchObj.image_url.replace(/\/+$/, '')}/${trimmed.replace(/^\/+/, '')}`;
    }
  }

  if (trimmed.startsWith('assets/images/')) {
    return `${ASSET_BASE_URL}/${trimmed}`;
  }
  if (trimmed.startsWith('crmapi/public/')) {
    return `${CRM_BASE_URL}/${trimmed}`;
  }

  // Type specific subfolders if from legacy CRM structure
  if (type === 'banner') {
    return `${ASSET_BASE_URL}/assets/images/banner_images/${trimmed}`;
  }
  if (type === 'brand') {
    return `${ASSET_BASE_URL}/assets/images/brand_images/${trimmed}`;
  }
  if (type === 'category') {
    return `${ASSET_BASE_URL}/assets/images/category_images/${trimmed}`;
  }
  if (type === 'variant' || trimmed.includes('_0_') || trimmed.includes('_1_') || trimmed.includes('_2_')) {
    return `${ASSET_BASE_URL}/assets/images/product_variant_images/${trimmed}`;
  }
  return `${ASSET_BASE_URL}/assets/images/product_images/${trimmed}`;
};

/**
 * Normalizes dynamic Product Variants
 * Handles arbitrary variant attributes like Color, Size, Material, Weight(kg), etc.
 */
export const normalizeProductVariant = (v, index = 0, imageUrlArray = []) => {
  if (!v || typeof v !== 'object') return null;

  const id = v.id ?? v.variant_id ?? v.product_variant_id ?? index + 1;
  const sku = v.product_sku || v.sku || '';
  const barcode = v.product_barcode || v.barcode || '';
  const price = Number(v.product_sale_price || v.sale_price || v.price || 0);
  const originalPrice = Number(v.product_mrp || v.mrp || v.original_price || Math.round(price * 1.25));
  const bulkPrice = Number(v.product_bulk_price || v.bulk_price || price);
  const weight = v.product_weight || v.weight || '0';
  const status = v.product_status || v.status || 'Active';

  // Normalize dynamic variant images
  let images = [];
  if (Array.isArray(v.images)) {
    images = v.images.map(imgObj => {
      const p = typeof imgObj === 'string' ? imgObj : (imgObj.product_variant_images || imgObj.image || imgObj.url || '');
      return resolveImageUrl(p, 'product', imageUrlArray);
    }).filter(Boolean);
  } else if (v.image || v.img || v.product_variant_images) {
    images = [resolveImageUrl(v.image || v.img || v.product_variant_images, 'product', imageUrlArray)];
  }

  // Extract all dynamic attributes (e.g. Color, Size, Material, Weight, Custom)
  const attributes = [];
  if (Array.isArray(v.attributes)) {
    v.attributes.forEach(attr => {
      if (attr && typeof attr === 'object') {
        attributes.push({
          id: attr.id || attr.attribute_id,
          name: attr.name || attr.attribute_name || 'Option',
          value: attr.value || attr.attribute_value || '',
          code: attr.code || '',
        });
      }
    });
  } else if (v.attributes && typeof v.attributes === 'object') {
    Object.entries(v.attributes).forEach(([key, val]) => {
      attributes.push({
        name: key,
        value: typeof val === 'object' ? (val.name || val.value || JSON.stringify(val)) : String(val),
      });
    });
  }

  return {
    id,
    sku,
    barcode,
    price,
    originalPrice,
    bulkPrice,
    weight,
    status,
    images,
    image: images[0] || '',
    attributes,
    raw: v,
  };
};

/**
 * Normalizes a single Product record from any backend payload
 */
export const normalizeProduct = (item, index = 0, imageUrlArray = []) => {
  if (!item || typeof item !== 'object') return null;

  const id = item.id ?? item._id ?? item.product_id ?? item.productId ?? index + 1;
  const name =
    item.product_name ||
    item.name ||
    item.title ||
    item.product_title ||
    item.productName ||
    `Curated Gift ${index + 1}`;

  const slug =
    item.product_slug ||
    item.slug ||
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Extract images array from all possible backend structures
  let rawImageList = [];

  if (Array.isArray(item.images) && item.images.length > 0) {
    rawImageList.push(...item.images);
  } else if (typeof item.images === 'string' && item.images.trim()) {
    try {
      const parsed = JSON.parse(item.images);
      if (Array.isArray(parsed)) rawImageList.push(...parsed);
      else rawImageList.push(item.images);
    } catch {
      rawImageList.push(...item.images.split(',').map(s => s.trim()));
    }
  }

  if (Array.isArray(item.product_images)) {
    rawImageList.push(...item.product_images);
  } else if (typeof item.product_images === 'string' && item.product_images.trim()) {
    rawImageList.push(item.product_images);
  }

  if (Array.isArray(item.product_variant_images)) {
    rawImageList.push(...item.product_variant_images);
  } else if (typeof item.product_variant_images === 'string' && item.product_variant_images.trim()) {
    rawImageList.push(item.product_variant_images);
  }

  if (item.product_image) rawImageList.push(item.product_image);
  if (item.image) rawImageList.push(item.image);
  if (item.img) rawImageList.push(item.img);
  if (item.thumbnail) rawImageList.push(item.thumbnail);
  if (item.photo) rawImageList.push(item.photo);

  // Also check inside variants
  if (Array.isArray(item.variants)) {
    item.variants.forEach(v => {
      if (Array.isArray(v.images)) rawImageList.push(...v.images);
      if (v.product_variant_images) rawImageList.push(v.product_variant_images);
      if (v.image) rawImageList.push(v.image);
      if (v.img) rawImageList.push(v.img);
      if (v.product_images) rawImageList.push(v.product_images);
    });
  }

  let allImages = rawImageList
    .map(imgObj => {
      const p = typeof imgObj === 'string'
        ? imgObj
        : (imgObj?.product_variant_images || imgObj?.product_images || imgObj?.image || imgObj?.img || imgObj?.url || '');
      return resolveImageUrl(p, 'product', imageUrlArray);
    })
    .filter(Boolean);

  const primaryRawImage =
    item.product_image ||
    item.image ||
    item.img ||
    item.thumbnail ||
    item.photo ||
    item.product_images ||
    (allImages[0] || '');

  const primaryImage = allImages[0] || resolveImageUrl(primaryRawImage, 'product', imageUrlArray) || FALLBACK_IMAGES.product;
  if (allImages.length === 0 && primaryImage) {
    allImages = [primaryImage];
  }

  // Parse Variants
  const variants = Array.isArray(item.variants)
    ? item.variants.map((v, vIdx) => normalizeProductVariant(v, vIdx, imageUrlArray)).filter(Boolean)
    : [];

  // Pricing
  let price = Number(
    item.product_sale_price ||
    item.sale_price ||
    item.salePrice ||
    item.price ||
    item.enquiry_sale_price ||
    item.discounted_price ||
    0
  );

  let originalPrice = Number(
    item.product_mrp ||
    item.mrp ||
    item.original_price ||
    item.originalPrice ||
    item.regular_price ||
    0
  );

  const bulkPrice = Number(
    item.product_bulk_price ||
    item.bulk_price ||
    item.bulkPrice ||
    item.enquiry_bulk_price ||
    price
  );

  if ((!price || price === 0) && variants.length > 0) {
    price = variants[0].price || 0;
    originalPrice = variants[0].originalPrice || Math.round(price * 1.25);
  }
  if (!originalPrice || originalPrice < price) {
    originalPrice = Math.round(price * 1.25) || price;
  }

  // Brand Info
  const brand = item.brand
    ? (typeof item.brand === 'object' ? item.brand.brands_name || item.brand.name || '' : item.brand)
    : (item.brand_name || item.brandName || '');
  const brandId = item.product_brand_id || item.brand_id || item.brandId || item.brand?.id || null;

  // Category & Subcategory Info
  const categories = Array.isArray(item.categories)
    ? item.categories
    : (item.category ? [item.category] : []);
  
  const primaryCategory = categories[0]
    ? (typeof categories[0] === 'object' ? categories[0].categories_name || categories[0].name || 'Gifts' : categories[0])
    : (item.category_name || item.categoryName || item.categories_name || 'Gifts');
  const categoryId = item.category_id || item.categoryId || (categories[0]?.id) || null;

  const subCategory = item.subCategory || item.subcategory || item.sub_category || '';

  // Occasions & Tags
  const occasions = Array.isArray(item.occasion)
    ? item.occasion
    : (Array.isArray(item.occasions) ? item.occasions : (item.occasion ? [item.occasion] : []));

  const tags = Array.isArray(item.tag)
    ? item.tag
    : (Array.isArray(item.tags) ? item.tags : (item.tag ? [item.tag] : []));

  let tagLabel = '';
  if (tags.length > 0) {
    const firstTag = tags[0];
    tagLabel = typeof firstTag === 'string' ? firstTag : (firstTag?.tags_name || firstTag?.name || '');
  } else if (typeof item.tag === 'string') {
    tagLabel = item.tag;
  } else if (item.tag && typeof item.tag === 'object') {
    tagLabel = item.tag.tags_name || item.tag.name || '';
  }

  // Vendor Info
  const vendor = Array.isArray(item.vendor) ? item.vendor : (item.vendor ? [item.vendor] : []);
  const vendorName = vendor[0]
    ? (typeof vendor[0] === 'object' ? vendor[0].vendor_name || vendor[0].name || '' : String(vendor[0]))
    : (typeof item.vendor_name === 'string' ? item.vendor_name : '');

  // Ratings & Description
  const rating = Number(item.rating || 4.8);
  const reviewsCount = Number(item.reviews_count || item.reviewsCount || 48);
  const shortDescription = item.product_short_description || item.short_description || item.shortDescription || '';
  const longDescription = item.product_description || item.description || item.longDescription || item.details || '';

  return {
    id,
    productId: id,
    name,
    title: name,
    slug,
    price,
    originalPrice,
    bulkPrice,
    img: primaryImage,
    image: primaryImage,
    images: allImages,
    category: primaryCategory,
    categories,
    categoryId,
    subCategory,
    brand,
    brandId,
    vendor,
    vendorName,
    occasions,
    tags,
    tag: tagLabel,
    hasVariants: Boolean(item.has_variants || item.hasVariants || variants.length > 0),
    variants,
    weight: item.product_weight || item.weight || '0',
    barcode: item.product_barcode || item.barcode || '',
    status: item.product_status || item.status || 'Active',
    availability: item.availability || 'In Stock',
    rating,
    reviewsCount,
    shortDescription,
    longDescription,
    description: shortDescription || longDescription,
    variantId: item.variant_id || (variants[0]?.id || 1),
    shareId: item.share_id || 1,
    raw: item,
  };
};

/**
 * Normalizes Category & Subcategory records
 */
export const normalizeCategory = (item, index = 0, imageUrlArray = []) => {
  if (!item || typeof item !== 'object') return null;

  const id = item.id !== undefined && item.id !== null ? Number(item.id) : (item._id ?? item.category_id ?? item.categoryId ?? index + 1);
  const parentId = (item.parent_id !== undefined && item.parent_id !== null && item.parent_id !== '')
    ? Number(item.parent_id)
    : (item.parentId !== undefined && item.parentId !== null && item.parentId !== '' ? Number(item.parentId) : null);

  const isTop = Boolean(
    item.isTop === 1 ||
    item.isTop === '1' ||
    item.isTop === true ||
    item.is_top === 1 ||
    item.is_top === '1' ||
    item.is_top === true
  );

  const isSubTop = Boolean(
    item.isSubTop === 1 ||
    item.isSubTop === '1' ||
    item.isSubTop === true ||
    item.is_sub_top === 1 ||
    item.is_sub_top === '1' ||
    item.is_sub_top === true
  );

  const sortOrder = Number(item.categories_sort_order ?? item.sort_order ?? item.sortOrder ?? index);

  const name =
    item.categories_name ||
    item.category_name ||
    item.name ||
    item.title ||
    item.categoryName ||
    `Category ${id}`;

  const slug =
    item.categories_slug ||
    item.slug ||
    item.category_slug ||
    (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `category-${id}`);

  const rawImage =
    item.categories_image ||
    item.category_image ||
    item.image ||
    item.icon ||
    item.category_icon ||
    item.image_url ||
    item.banner ||
    '';

  const image = resolveImageUrl(rawImage, 'category', imageUrlArray);

  const subcategories = Array.isArray(item.subcategories || item.children)
    ? (item.subcategories || item.children).map((sub, sIdx) => normalizeCategory(sub, sIdx, imageUrlArray)).filter(Boolean)
    : [];

  return {
    id,
    parentId,
    isTop,
    isSubTop,
    sortOrder,
    name,
    title: name,
    slug,
    image,
    rawImage,
    description: item.description || item.category_description || '',
    status: item.categories_status ?? item.status ?? item.is_active ?? 'Active',
    subcategories,
    raw: item,
  };
};

/**
 * Normalizes Brand records
 */
export const normalizeBrand = (item, index = 0, imageUrlArray = []) => {
  if (!item || typeof item !== 'object') return null;

  const id = item.id ?? item._id ?? item.brand_id ?? index + 1;
  const name = item.brands_name || item.brand_name || item.name || item.title || `Brand ${id}`;
  const slug = item.brands_slug || item.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const rawLogo = item.brands_image || item.brand_image || item.logo || item.image || '';
  const logo = resolveImageUrl(rawLogo, 'brand', imageUrlArray);

  return {
    id,
    name,
    title: name,
    slug,
    logo,
    image: logo,
    tagline: item.tagline || item.description || 'Quality Homeware & Gifts',
    themeColor: item.theme_color || item.themeColor || '#334155',
    bgColor: item.bg_color || item.bgColor || 'bg-stone-50',
    borderColor: item.border_color || item.borderColor || 'border-stone-200',
    status: item.brands_status || item.status || 'Active',
    raw: item,
  };
};

/**
 * Occasion Theme & Image Presets
 */
const OCCASION_THEME_MAP = {
  anniversary: {
    image: '/images/home/occasion_anniversary.png',
    subtitle: 'LOVE & ROMANCE',
    tag: 'Most Loved',
    gradient: 'from-rose-500/25 via-pink-400/15 to-amber-100/40',
    bgCard: 'from-rose-50 via-pink-50/50 to-orange-50/40',
    accentColor: 'text-rose-700',
    badgeBg: 'bg-rose-100/90 text-rose-800 border-rose-200',
    glow: 'rgba(244, 63, 94, 0.25)',
  },
  birthday: {
    image: '/images/home/occasion_birthday.png',
    subtitle: 'PARTY & JOY',
    tag: 'Trending',
    gradient: 'from-amber-400/25 via-orange-300/15 to-yellow-100/40',
    bgCard: 'from-amber-50 via-orange-50/50 to-yellow-50/40',
    accentColor: 'text-amber-800',
    badgeBg: 'bg-amber-100/90 text-amber-900 border-amber-200',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
  wedding: {
    image: '/images/home/gift_personalised.png',
    subtitle: 'EVERLASTING UNION',
    tag: 'Luxury',
    gradient: 'from-amber-300/25 via-rose-200/15 to-stone-100/40',
    bgCard: 'from-orange-50/80 via-rose-50/60 to-stone-50',
    accentColor: 'text-amber-900',
    badgeBg: 'bg-orange-100/90 text-orange-900 border-orange-200',
    glow: 'rgba(217, 119, 6, 0.22)',
  },
  rakhi: {
    image: '/images/home/occasion_rakhi_abroad.png',
    subtitle: 'SIBLING BOND',
    tag: 'Festive',
    gradient: 'from-orange-500/25 via-red-400/15 to-amber-100/40',
    bgCard: 'from-orange-50 via-red-50/50 to-amber-50/40',
    accentColor: 'text-orange-800',
    badgeBg: 'bg-orange-100/90 text-orange-900 border-orange-200',
    glow: 'rgba(234, 88, 12, 0.25)',
  },
  rakshabandhan: {
    image: '/images/home/occasion_rakhi_abroad.png',
    subtitle: 'SIBLING BOND',
    tag: 'Festive',
    gradient: 'from-orange-500/25 via-red-400/15 to-amber-100/40',
    bgCard: 'from-orange-50 via-red-50/50 to-amber-50/40',
    accentColor: 'text-orange-800',
    badgeBg: 'bg-orange-100/90 text-orange-900 border-orange-200',
    glow: 'rgba(234, 88, 12, 0.25)',
  },
  housewarming: {
    image: '/images/home/occasion_housewarming.png',
    subtitle: 'NEW BEGINNINGS',
    tag: 'Curated',
    gradient: 'from-emerald-400/25 via-teal-300/15 to-lime-100/40',
    bgCard: 'from-emerald-50 via-teal-50/50 to-lime-50/40',
    accentColor: 'text-emerald-800',
    badgeBg: 'bg-emerald-100/90 text-emerald-900 border-emerald-200',
    glow: 'rgba(16, 185, 129, 0.25)',
  },
  babyshower: {
    image: '/images/home/occasion_babyshower.png',
    subtitle: 'LITTLE BLESSINGS',
    tag: 'Sweet Joy',
    gradient: 'from-sky-400/25 via-indigo-300/15 to-purple-100/40',
    bgCard: 'from-sky-50 via-indigo-50/50 to-purple-50/40',
    accentColor: 'text-sky-800',
    badgeBg: 'bg-sky-100/90 text-sky-900 border-sky-200',
    glow: 'rgba(14, 165, 233, 0.25)',
  },
  congratulations: {
    image: '/images/home/flower_coll_4.png',
    subtitle: 'CHEERS & SUCCESS',
    tag: 'Special',
    gradient: 'from-indigo-400/25 via-purple-300/15 to-amber-100/40',
    bgCard: 'from-indigo-50 via-purple-50/50 to-amber-50/40',
    accentColor: 'text-indigo-800',
    badgeBg: 'bg-indigo-100/90 text-indigo-900 border-indigo-200',
    glow: 'rgba(99, 102, 241, 0.25)',
  },
  thankyou: {
    image: '/images/home/flower_coll_3.png',
    subtitle: 'HEARTFELT THANKS',
    tag: 'Gratitude',
    gradient: 'from-teal-400/25 via-cyan-300/15 to-rose-100/40',
    bgCard: 'from-teal-50 via-cyan-50/50 to-rose-50/40',
    accentColor: 'text-teal-800',
    badgeBg: 'bg-teal-100/90 text-teal-900 border-teal-200',
    glow: 'rgba(20, 184, 166, 0.25)',
  },
};

/**
 * Normalizes Occasion records
 */
export const normalizeOccasion = (item, index = 0, imageUrlArray = []) => {
  if (!item || typeof item !== 'object') return null;

  const id = item.id ?? item._id ?? item.occasion_id ?? index + 1;
  const title = item.occasion_name || item.occasions_name || item.title || item.name || `Occasion ${id}`;
  const slug = item.occasion_slug || item.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const cleanKey = slug.replace(/[^a-z0-9]/g, '');

  // Find theme preset based on keyword match
  let matchedTheme = null;
  for (const [key, preset] of Object.entries(OCCASION_THEME_MAP)) {
    if (cleanKey.includes(key) || key.includes(cleanKey)) {
      matchedTheme = preset;
      break;
    }
  }

  const defaultThemeList = Object.values(OCCASION_THEME_MAP);
  const fallbackTheme = defaultThemeList[index % defaultThemeList.length];
  const activeTheme = matchedTheme || fallbackTheme;

  const rawImage = item.occasion_image || item.image || item.img || '';
  let image = '';
  if (rawImage && rawImage.trim()) {
    image = resolveImageUrl(rawImage, 'occasion', imageUrlArray);
  }
  if (!image || image === FALLBACK_IMAGES.occasion) {
    image = activeTheme.image || FALLBACK_IMAGES.occasion;
  }

  const subtitle = item.subtitle || item.tagline || activeTheme.subtitle || 'CELEBRATION SPECIAL';
  const tag = item.tag || activeTheme.tag || 'Special';
  const gradient = item.gradient || activeTheme.gradient || 'from-amber-100/90 via-rose-100/70 to-orange-100/80';
  const bgCard = item.bgCard || activeTheme.bgCard || 'from-stone-50 to-rose-50/40';
  const subColor = item.subColor || activeTheme.accentColor || 'text-amber-800';
  const badgeBg = activeTheme.badgeBg || 'bg-amber-100/90 text-amber-800 border-amber-200';
  const glow = activeTheme.glow || 'rgba(245, 158, 11, 0.25)';

  return {
    id,
    title,
    name: title,
    slug,
    subtitle,
    tag,
    image,
    gradient,
    bgCard,
    subColor,
    badgeBg,
    glow,
    status: item.status || 'Active',
    raw: item,
  };
};

/**
 * Normalizes Promo Banner records
 */
export const normalizeBanner = (item, index = 0, imageUrlArray = []) => {
  if (!item || typeof item !== 'object') return null;

  const id = item.id ?? item._id ?? item.banner_id ?? index + 1;
  const title = item.banner_alt || item.banner_title || item.title || item.name || `Banner ${id}`;
  const alt = item.banner_alt || title;
  const subtitle = item.banner_subtitle || item.subtitle || '';
  const rawImage = item.banner_image || item.image || item.img || '';
  const image = resolveImageUrl(rawImage, 'banner', imageUrlArray);
  const link = item.banner_link || item.link || item.cta_link || item.ctaLink || null;
  const position = item.banner_position || 'Top';
  const type = item.banner_type || 'Main';
  const ctaText = item.cta_text || item.ctaText || 'Shop Now';
  const sortOrder = Number(item.banner_sort_order ?? item.sort_order ?? item.order ?? index + 1);
  const status = item.banner_status || item.status || 'Active';

  return {
    id,
    title,
    alt,
    subtitle,
    image,
    rawImage,
    link,
    position,
    type,
    ctaText,
    sortOrder,
    status,
    isActive: String(status).toLowerCase() === 'active',
    raw: item,
  };
};

/**
 * Normalizes Offer & Discount records
 */
export const normalizeOffer = (item, index = 0) => {
  if (!item || typeof item !== 'object') return null;

  const id = item.id ?? item._id ?? index + 1;
  const partner = item.partner || item.partner_name || item.title || 'Special Partner';
  const partnerType = item.partner_type || item.partnerType || partner.toLowerCase().replace(/[^a-z0-9]/g, '');
  const tagline = item.tagline || item.subtitle || 'ENJOY UP TO';
  const title = item.title || item.offer_title || 'Flat Discount';
  const tnc = item.tnc || item.terms || 'T&C Apply';
  const bgColor = item.bg_color || item.bgColor || 'bg-[#fff0bd]';
  const borderColor = item.border_color || item.borderColor || 'border-[#ffe494]';
  const code = item.code || item.coupon_code || '';

  return {
    id,
    partner,
    partnerType,
    tagline,
    title,
    tnc,
    bgColor,
    borderColor,
    code,
    status: item.status || 'Active',
    raw: item,
  };
};
