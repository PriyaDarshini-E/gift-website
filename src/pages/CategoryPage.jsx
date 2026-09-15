import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCategories } from '../context/CategoryContext';
import { useProducts } from '../context/ProductContext';
import { useBrands } from '../context/BrandContext';
import { useOccasions } from '../context/OccasionContext';
import { useWebsite } from '../context/WebsiteContext';
import FixedImage from '../components/common/FixedImage';
import { 
  Filter, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShoppingBag, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  Check, 
  Truck, 
  RotateCcw, 
  PackageOpen, 
  Award,
  CalendarHeart,
  Tag
} from 'lucide-react';

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { openProductModal, addToCart, formatPrice } = useCart();
  const { getCategoryBySlug, categories, topCategories, getSubcategories } = useCategories();
  const { products: allProducts, loading } = useProducts();
  const { brands: allBrands } = useBrands();
  const { occasions: allOccasions } = useOccasions();
  const { tags: allTags } = useWebsite();

  const searchQuery = searchParams.get('q') || searchParams.get('search') || '';
  const brandQuery = searchParams.get('brand') || '';
  const occasionQuery = searchParams.get('occasion') || '';
  const tagQuery = searchParams.get('tag') || '';

  const isSearchPage = Boolean(searchQuery && searchQuery.trim().length > 0);
  const isSameDayPage = slug === 'same-day' || slug === 'same-day-delivery' || slug === 'sameday' || tagQuery === 'same-day-delivery';
  const isOccasionRoute = location.pathname.startsWith('/occasion/');
  const isBrandRoute = location.pathname.startsWith('/brand/');
  const isTagRoute = location.pathname.startsWith('/tag/');

  const cleanSlug = (slug || '').toLowerCase().trim();

  // 1. Identify matched Occasion (from URL params, query param, or slug matching an occasion)
  const matchedOccasion = useMemo(() => {
    if (occasionQuery) {
      const q = occasionQuery.toLowerCase().trim();
      return (allOccasions || []).find(o => 
        (o.slug && o.slug.toLowerCase() === q) || 
        (o.name && o.name.toLowerCase() === q) ||
        (o.title && o.title.toLowerCase() === q)
      ) || { name: occasionQuery, title: occasionQuery, slug: q };
    }
    if (isOccasionRoute && cleanSlug) {
      return (allOccasions || []).find(o => 
        (o.slug && o.slug.toLowerCase() === cleanSlug) || 
        (o.name && o.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug)
      ) || { name: cleanSlug.replace(/-/g, ' '), title: cleanSlug.replace(/-/g, ' '), slug: cleanSlug };
    }
    // Also check if slug directly matches any known CRM occasion
    if (cleanSlug && cleanSlug !== 'all') {
      const found = (allOccasions || []).find(o => 
        (o.slug && o.slug.toLowerCase() === cleanSlug) || 
        (o.name && o.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug)
      );
      if (found) return found;
    }
    return null;
  }, [occasionQuery, isOccasionRoute, cleanSlug, allOccasions]);

  // 2. Identify matched Brand
  const matchedBrand = useMemo(() => {
    if (brandQuery) {
      const q = brandQuery.toLowerCase().trim();
      return (allBrands || []).find(b => 
        (b.slug && b.slug.toLowerCase() === q) || 
        (b.name && b.name.toLowerCase() === q)
      ) || { name: brandQuery, slug: q };
    }
    if (isBrandRoute && cleanSlug) {
      return (allBrands || []).find(b => 
        (b.slug && b.slug.toLowerCase() === cleanSlug) || 
        (b.name && b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug)
      ) || { name: cleanSlug.replace(/-/g, ' '), slug: cleanSlug };
    }
    if (cleanSlug && cleanSlug !== 'all' && !matchedOccasion) {
      const found = (allBrands || []).find(b => 
        (b.slug && b.slug.toLowerCase() === cleanSlug) || 
        (b.name && b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug)
      );
      if (found) return found;
    }
    return null;
  }, [brandQuery, isBrandRoute, cleanSlug, allBrands, matchedOccasion]);

  // 3. Identify matched Tag
  const matchedTag = useMemo(() => {
    if (tagQuery) {
      const q = tagQuery.toLowerCase().trim();
      return (allTags || []).find(t => 
        (t.slug && t.slug.toLowerCase() === q) || 
        (t.name && t.name.toLowerCase() === q)
      ) || { name: tagQuery, slug: q };
    }
    if (isTagRoute && cleanSlug) {
      return (allTags || []).find(t => 
        (t.slug && t.slug.toLowerCase() === cleanSlug) || 
        (t.name && t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug)
      ) || { name: cleanSlug.replace(/-/g, ' '), slug: cleanSlug };
    }
    if (cleanSlug && cleanSlug !== 'all' && !matchedOccasion && !matchedBrand) {
      const found = (allTags || []).find(t => 
        (t.slug && t.slug.toLowerCase() === cleanSlug) || 
        (t.name && t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug)
      );
      if (found) return found;
    }
    return null;
  }, [tagQuery, isTagRoute, cleanSlug, allTags, matchedOccasion, matchedBrand]);

  // 4. Identify matched Category (if not an Occasion, Brand, Tag, or Search)
  const matchedCat = useMemo(() => {
    if (isSameDayPage || isSearchPage || matchedOccasion || matchedBrand || matchedTag) {
      return null;
    }
    return getCategoryBySlug(slug);
  }, [isSameDayPage, isSearchPage, matchedOccasion, matchedBrand, matchedTag, slug, getCategoryBySlug]);

  const parentCat = matchedCat?.parentId 
    ? (categories || []).find(c => String(c.id) === String(matchedCat.parentId))
    : (matchedCat?.isTop ? matchedCat : null);

  const mainCategory = parentCat || matchedCat;

  // Derive Page Heading & Category Name
  const pageTitle = useMemo(() => {
    if (isSearchPage) return `Search: "${searchQuery}"`;
    if (isSameDayPage) return 'Same Day Delivery Gifts';
    if (matchedOccasion) return `${matchedOccasion.title || matchedOccasion.name} Gifts`;
    if (matchedBrand) return `${matchedBrand.name} Collection`;
    if (matchedTag) return `${matchedTag.name} Gifts`;
    if (matchedCat) return `${matchedCat.name} Online`;
    if (cleanSlug && cleanSlug !== 'all') {
      return cleanSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Gifts';
    }
    return 'All Curated Gifts';
  }, [isSearchPage, searchQuery, isSameDayPage, matchedOccasion, matchedBrand, matchedTag, matchedCat, cleanSlug]);

  const breadcrumbName = useMemo(() => {
    if (isSearchPage) return `Search: "${searchQuery}"`;
    if (isSameDayPage) return 'Same Day Delivery';
    if (matchedOccasion) return matchedOccasion.title || matchedOccasion.name;
    if (matchedBrand) return matchedBrand.name;
    if (matchedTag) return matchedTag.name;
    if (matchedCat) return matchedCat.name;
    return 'All Gifts';
  }, [isSearchPage, searchQuery, isSameDayPage, matchedOccasion, matchedBrand, matchedTag, matchedCat]);

  // Top Visual Subcategories / Occasions / Brands Carousel Strip
  const relatedTopItems = useMemo(() => {
    if (matchedOccasion) {
      return (allOccasions || []).map(o => ({
        id: o.id,
        name: o.title || o.name,
        slug: o.slug,
        image: o.image,
        type: 'occasion',
        link: `/occasion/${o.slug}`,
      }));
    }
    if (matchedBrand) {
      return (allBrands || []).map(b => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        image: b.logo,
        type: 'brand',
        link: `/brand/${b.slug}`,
      }));
    }
    if (mainCategory) {
      const subs = getSubcategories(mainCategory);
      if (subs.length > 0) {
        return subs.map(s => ({
          ...s,
          type: 'category',
          link: `/category/${s.slug}`,
        }));
      }
    }
    return (topCategories || []).map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      image: c.image || c.rawImage,
      type: 'category',
      link: `/category/${c.slug}`,
    }));
  }, [matchedOccasion, matchedBrand, mainCategory, getSubcategories, allOccasions, allBrands, topCategories]);

  // --- Filter States ---
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedDelivery, setSelectedDelivery] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Accordion open/close states
  const [openSections, setOpenSections] = useState({
    price: true,
    categories: true,
    occasions: true,
    brands: true,
    tags: true,
    delivery: true,
    rating: true,
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 1. BASE PRODUCTS for current page (Occasion, Brand, Tag, Category, or Search)
  const baseCategoryProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];

    // Search Page
    if (isSearchPage) {
      const q = searchQuery.toLowerCase().trim();
      return allProducts.filter((p) => {
        const name = (p.name || p.title || '').toLowerCase();
        const cat = (p.category || '').toLowerCase();
        const subCat = (p.subCategory || '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        const tag = (p.tag || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const occStr = Array.isArray(p.occasions) 
          ? p.occasions.map(o => typeof o === 'string' ? o : (o?.occasions_name || o?.name || '')).join(' ').toLowerCase() 
          : '';

        return (
          name.includes(q) ||
          cat.includes(q) ||
          subCat.includes(q) ||
          brand.includes(q) ||
          tag.includes(q) ||
          desc.includes(q) ||
          occStr.includes(q)
        );
      });
    }

    // Occasion Page / Match
    if (matchedOccasion) {
      const occName = (matchedOccasion.name || matchedOccasion.title || '').toLowerCase().trim();
      const occSlug = (matchedOccasion.slug || '').toLowerCase().trim();

      return allProducts.filter((p) => {
        const pName = (p.name || '').toLowerCase();
        const pDesc = (p.description || '').toLowerCase();

        const hasOccInArray = Array.isArray(p.occasions) && p.occasions.some(o => {
          const oName = typeof o === 'string' ? o.toLowerCase() : (o?.occasions_name || o?.name || '').toLowerCase();
          const oSlug = typeof o === 'string' ? '' : (o?.occasions_slug || o?.slug || '').toLowerCase();
          return (occName && oName.includes(occName)) || (occSlug && (oSlug === occSlug || oSlug.includes(occSlug)));
        });

        const hasSingleOcc = p.occasion && (
          (typeof p.occasion === 'string' && p.occasion.toLowerCase().includes(occName)) ||
          (typeof p.occasion === 'object' && ((p.occasion.occasions_name || p.occasion.name || '').toLowerCase().includes(occName)))
        );

        return hasOccInArray || hasSingleOcc || pName.includes(occName) || pDesc.includes(occName);
      });
    }

    // Brand Page / Match
    if (matchedBrand) {
      const brName = (matchedBrand.name || '').toLowerCase().trim();
      const brSlug = (matchedBrand.slug || '').toLowerCase().trim();
      const brId = matchedBrand.id ? String(matchedBrand.id) : null;

      return allProducts.filter((p) => {
        const pBrand = (p.brand || '').toLowerCase();
        const pBrandId = p.brandId ? String(p.brandId) : null;
        const pName = (p.name || '').toLowerCase();

        return (
          (brId && pBrandId === brId) ||
          (brName && (pBrand.includes(brName) || pName.includes(brName))) ||
          (brSlug && (pBrand.includes(brSlug) || pName.includes(brSlug)))
        );
      });
    }

    // Tag Page / Match / Same Day
    if (matchedTag || isSameDayPage) {
      const tagName = (isSameDayPage ? 'same day' : (matchedTag?.name || '')).toLowerCase().trim();
      const tagSlug = (isSameDayPage ? 'same-day' : (matchedTag?.slug || '')).toLowerCase().trim();

      return allProducts.filter((p) => {
        const pTag = (p.tag || '').toLowerCase();
        const hasTagInArray = Array.isArray(p.tags) && p.tags.some(t => {
          const tName = typeof t === 'string' ? t.toLowerCase() : (t?.tags_name || t?.name || '').toLowerCase();
          const tSlug = typeof t === 'string' ? '' : (t?.tags_slug || t?.slug || '').toLowerCase();
          return (tagName && tName.includes(tagName)) || (tagSlug && (tSlug === tagSlug || tSlug.includes(tagSlug)));
        });

        if (isSameDayPage) {
          const pCat = (p.category || '').toLowerCase();
          return hasTagInArray || pTag.includes('same') || pTag.includes('today') || pCat.includes('flower') || pCat.includes('cake') || pCat.includes('chocolate');
        }

        return hasTagInArray || pTag.includes(tagName) || (tagSlug && pTag.includes(tagSlug));
      });
    }

    // Category / Subcategory Match
    if (matchedCat || (cleanSlug && cleanSlug !== 'all')) {
      const currentName = (matchedCat?.name || cleanSlug.replace(/-/g, ' ')).toLowerCase();
      const currentSlug = cleanSlug;
      const parentName = (parentCat?.name || '').toLowerCase();

      return allProducts.filter((p) => {
        const cat = (p.category || '').toLowerCase();
        const subCat = (p.subCategory || '').toLowerCase();
        const name = (p.name || '').toLowerCase();

        const isExactCategory = cat.includes(currentName) || subCat.includes(currentName);
        const isSlugMatch = (p.categorySlug && p.categorySlug.toLowerCase() === currentSlug);
        const isParentMatch = parentName && (cat.includes(parentName) || subCat.includes(parentName));
        const isNameMatch = name.includes(currentName);

        return isExactCategory || isSlugMatch || isParentMatch || isNameMatch;
      });
    }

    return allProducts;
  }, [allProducts, isSearchPage, searchQuery, matchedOccasion, matchedBrand, matchedTag, isSameDayPage, matchedCat, cleanSlug, parentCat]);

  // Price Stats
  const priceStats = useMemo(() => {
    if (baseCategoryProducts.length === 0) return { min: 100, max: 5000 };
    const prices = baseCategoryProducts.map(p => Number(p.price || 0)).filter(p => p > 0);
    if (prices.length === 0) return { min: 100, max: 5000 };
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [baseCategoryProducts]);

  // ── SIDEBAR OPTIONS WITH LIVE COUNTS ──

  // 1. Categories & Subcategories Option List
  const sidebarCategoryOptions = useMemo(() => {
    const list = topCategories && topCategories.length > 0 ? topCategories : categories;
    if (!list || list.length === 0) return [];

    return list.map((c) => {
      const lower = (c.name || '').toLowerCase();
      const count = baseCategoryProducts.filter((p) => {
        const pCat = (p.category || '').toLowerCase();
        const pSub = (p.subCategory || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();
        return pCat.includes(lower) || pSub.includes(lower) || pName.includes(lower);
      }).length;

      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        count,
      };
    }).filter(item => item.count > 0 || baseCategoryProducts.length === 0);
  }, [topCategories, categories, baseCategoryProducts]);

  // 2. Occasions Option List
  const sidebarOccasionOptions = useMemo(() => {
    if (!allOccasions || allOccasions.length === 0) return [];

    return allOccasions.map((occ) => {
      const occName = (occ.name || occ.title || '').toLowerCase();
      const occSlug = (occ.slug || '').toLowerCase();

      const count = baseCategoryProducts.filter((p) => {
        const hasOccInArray = Array.isArray(p.occasions) && p.occasions.some(o => {
          const oName = typeof o === 'string' ? o.toLowerCase() : (o?.occasions_name || o?.name || '').toLowerCase();
          const oSlug = typeof o === 'string' ? '' : (o?.occasions_slug || o?.slug || '').toLowerCase();
          return oName.includes(occName) || (occSlug && oSlug === occSlug);
        });
        const pName = (p.name || '').toLowerCase();
        return hasOccInArray || pName.includes(occName);
      }).length;

      return {
        id: occ.id,
        name: occ.title || occ.name,
        slug: occ.slug,
        count,
      };
    });
  }, [allOccasions, baseCategoryProducts]);

  // 3. Brands Option List
  const sidebarBrandOptions = useMemo(() => {
    if (!allBrands || allBrands.length === 0) return [];

    return allBrands.map((b) => {
      const bName = (b.name || '').toLowerCase();
      const bId = String(b.id);

      const count = baseCategoryProducts.filter((p) => {
        const pBrand = (p.brand || '').toLowerCase();
        const pBrandId = String(p.brandId || '');
        const pName = (p.name || '').toLowerCase();
        return pBrand.includes(bName) || pBrandId === bId || pName.includes(bName);
      }).length;

      return {
        id: b.id,
        name: b.name,
        slug: b.slug,
        count,
      };
    });
  }, [allBrands, baseCategoryProducts]);

  // 4. Tags Option List
  const sidebarTagOptions = useMemo(() => {
    if (!allTags || allTags.length === 0) return [];

    return allTags.map((t) => {
      const tName = (t.name || '').toLowerCase();
      const tSlug = (t.slug || '').toLowerCase();

      const count = baseCategoryProducts.filter((p) => {
        const pTag = (p.tag || '').toLowerCase();
        const hasTagInArray = Array.isArray(p.tags) && p.tags.some(tg => {
          const tgName = typeof tg === 'string' ? tg.toLowerCase() : (tg?.tags_name || tg?.name || '').toLowerCase();
          const tgSlug = typeof tg === 'string' ? '' : (tg?.tags_slug || tg?.slug || '').toLowerCase();
          return tgName.includes(tName) || (tSlug && tgSlug === tSlug);
        });
        return hasTagInArray || pTag.includes(tName);
      }).length;

      return {
        id: t.id,
        name: t.name,
        slug: t.slug,
        count,
      };
    });
  }, [allTags, baseCategoryProducts]);

  // Reset filters on route / slug / query change
  useEffect(() => {
    setSelectedSubcategories([]);
    setSelectedOccasions([]);
    setSelectedBrands([]);
    setSelectedTags([]);
    setMinPrice(priceStats.min || 0);
    setMaxPrice(Math.max(priceStats.max || 5000, 10000));
    setSelectedDelivery([]);
    setMinRating(0);
    setSortBy('recommended');
  }, [slug, searchQuery, brandQuery, occasionQuery, tagQuery, priceStats.min, priceStats.max]);

  // ── FILTERED & SORTED PRODUCTS ──
  const filteredProducts = useMemo(() => {
    let result = baseCategoryProducts.filter((p) => {
      const price = Number(p.price || 0);
      const rating = Number(p.rating || 4.5);
      const cat = (p.category || '').toLowerCase();
      const subCat = (p.subCategory || '').toLowerCase();
      const pName = (p.name || '').toLowerCase();
      const pBrand = (p.brand || '').toLowerCase();
      const pBrandId = String(p.brandId || '');

      // Price filter
      if (price < minPrice || price > maxPrice) {
        return false;
      }

      // Categories filter
      if (selectedSubcategories.length > 0) {
        const matchesCat = selectedSubcategories.some((cName) => {
          const lower = cName.toLowerCase();
          return subCat.includes(lower) || cat.includes(lower) || pName.includes(lower);
        });
        if (!matchesCat) return false;
      }

      // Occasions filter
      if (selectedOccasions.length > 0) {
        const matchesOcc = selectedOccasions.some((occName) => {
          const lower = occName.toLowerCase();
          const inArray = Array.isArray(p.occasions) && p.occasions.some(o => {
            const oName = typeof o === 'string' ? o.toLowerCase() : (o?.occasions_name || o?.name || '').toLowerCase();
            return oName.includes(lower);
          });
          return inArray || pName.includes(lower);
        });
        if (!matchesOcc) return false;
      }

      // Brands filter
      if (selectedBrands.length > 0) {
        const matchesBrand = selectedBrands.some((bName) => {
          const lower = bName.toLowerCase();
          return pBrand.includes(lower) || pName.includes(lower);
        });
        if (!matchesBrand) return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const matchesTag = selectedTags.some((tName) => {
          const lower = tName.toLowerCase();
          const inArray = Array.isArray(p.tags) && p.tags.some(t => {
            const tgName = typeof t === 'string' ? t.toLowerCase() : (t?.tags_name || t?.name || '').toLowerCase();
            return tgName.includes(lower);
          });
          return inArray || (p.tag || '').toLowerCase().includes(lower);
        });
        if (!matchesTag) return false;
      }

      // Rating filter
      if (minRating > 0 && rating < minRating) {
        return false;
      }

      // Delivery filter
      if (selectedDelivery.length > 0) {
        const tag = (p.tag || '').toLowerCase();
        const matchesDelivery = selectedDelivery.some((del) => {
          if (del === 'same-day') {
            return (
              tag.includes('same') ||
              tag.includes('today') ||
              cat.includes('flower') ||
              cat.includes('cake') ||
              cat.includes('chocolate') ||
              Boolean(p.sameDayDelivery)
            );
          }
          if (del === 'midnight') {
            return tag.includes('midnight') || cat.includes('cake') || cat.includes('flower');
          }
          if (del === 'express') {
            return tag.includes('express') || cat.includes('flower') || cat.includes('cake');
          }
          return tag.includes(del.toLowerCase());
        });
        if (!matchesDelivery) return false;
      }

      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'lowToHigh') return Number(a.price) - Number(b.price);
      if (sortBy === 'highToLow') return Number(b.price) - Number(a.price);
      if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
      if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
      return (Number(b.rating || 0) * 10 + (b.reviewsCount || 0)) - (Number(a.rating || 0) * 10 + (a.reviewsCount || 0));
    });
  }, [baseCategoryProducts, minPrice, maxPrice, selectedSubcategories, selectedOccasions, selectedBrands, selectedTags, minRating, selectedDelivery, sortBy]);

  const hasActiveFilters =
    selectedSubcategories.length > 0 ||
    selectedOccasions.length > 0 ||
    selectedBrands.length > 0 ||
    selectedTags.length > 0 ||
    minPrice > (priceStats.min || 0) ||
    maxPrice < (priceStats.max || 50000) ||
    minRating > 0 ||
    selectedDelivery.length > 0;

  const handleResetFilters = () => {
    setSelectedSubcategories([]);
    setSelectedOccasions([]);
    setSelectedBrands([]);
    setSelectedTags([]);
    setMinPrice(priceStats.min || 0);
    setMaxPrice(Math.max(priceStats.max || 5000, 10000));
    setSelectedDelivery([]);
    setMinRating(0);
    setSortBy('recommended');
  };

  const handleToggleSubcategory = (name) => {
    setSelectedSubcategories(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  };

  const handleToggleOccasion = (name) => {
    setSelectedOccasions(prev => prev.includes(name) ? prev.filter(o => o !== name) : [...prev, name]);
  };

  const handleToggleBrand = (name) => {
    setSelectedBrands(prev => prev.includes(name) ? prev.filter(b => b !== name) : [...prev, name]);
  };

  const handleToggleTag = (name) => {
    setSelectedTags(prev => prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]);
  };

  const handleToggleDelivery = (delOption) => {
    setSelectedDelivery(prev => prev.includes(delOption) ? prev.filter(d => d !== delOption) : [...prev, delOption]);
  };

  const histogramBars = [15, 25, 45, 60, 85, 95, 80, 65, 50, 40, 30, 20, 15, 10];

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-gray-800 animate-fade-in pb-20">
      
      {/* ── BREADCRUMB & HEADER SECTION ── */}
      <div className="bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-3">
            <Link to="/" className="hover:text-olive-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            {matchedOccasion && (
              <>
                <span className="text-stone-500">Occasions</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </>
            )}
            {matchedBrand && (
              <>
                <span className="text-stone-500">Brands</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </>
            )}
            {parentCat && parentCat.id !== matchedCat?.id && (
              <>
                <Link to={`/category/${parentCat.slug}`} className="hover:text-olive-700 transition-colors">
                  {parentCat.name}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </>
            )}
            <span className="text-gray-900 font-bold">{breadcrumbName}</span>
          </nav>

          {/* Title, Review Count & Sort Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
                {pageTitle}
              </h1>
              <span className="text-xs sm:text-sm font-semibold text-stone-500 border-l border-stone-300 pl-3">
                {filteredProducts.length} of {baseCategoryProducts.length} Gifts
              </span>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md text-xs font-extrabold">
                <Star className="w-3 h-3 fill-emerald-700 text-emerald-700" />
                <span>4.9</span>
              </div>
            </div>

            {/* Desktop Sort By Dropdown */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-semibold text-stone-600">Sort by :</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-stone-200 hover:border-olive-500 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-olive-500 cursor-pointer shadow-2xs transition-all"
                >
                  <option value="recommended">Recommended</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-2 text-xs text-stone-500 max-w-4xl leading-relaxed">
            <p className={isReadMoreOpen ? '' : 'line-clamp-1'}>
              Explore our curated selection for {pageTitle.toLowerCase()}. Freshly handpicked from top verified creators and delivered with utmost care across India.
            </p>
            <button
              onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
              className="text-stone-800 font-bold hover:text-olive-700 text-xs ml-1 inline-block mt-0.5 cursor-pointer"
            >
              {isReadMoreOpen ? 'Read Less' : 'Read More'}
            </button>
          </div>

          {/* ── VISUAL TOP ITEMS STRIP (Quick Switcher) ── */}
          {relatedTopItems.length > 0 && (
            <div className="mt-5 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none">
                {relatedTopItems.map((item, idx) => {
                  const isCurrent = 
                    (matchedOccasion && matchedOccasion.slug === item.slug) ||
                    (matchedBrand && matchedBrand.slug === item.slug) ||
                    (matchedCat && matchedCat.slug === item.slug);

                  const rawImg = item.image;
                  const hasImg = rawImg && !rawImg.includes('no_image.jpg');

                  return (
                    <Link
                      to={item.link || `/category/${item.slug}`}
                      key={item.id || item.slug || idx}
                      className={`flex flex-col items-center flex-shrink-0 group text-center transition-all ${
                        isCurrent ? 'scale-105' : 'hover:-translate-y-0.5'
                      }`}
                    >
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-white border transition-all duration-200 overflow-hidden relative shadow-2xs flex items-center justify-center ${
                        isCurrent 
                          ? 'border-olive-600 ring-2 ring-olive-600/30 shadow-md' 
                          : 'border-stone-200 group-hover:border-olive-400 group-hover:shadow-sm'
                      }`}>
                        {hasImg ? (
                          <FixedImage
                            src={rawImg}
                            alt={item.name}
                            type={item.type || 'category'}
                            containerClassName="w-full h-full rounded-xl overflow-hidden"
                            imageClassName="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center font-bold text-olive-800 text-sm">
                            {item.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        {isCurrent && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-olive-700 text-white flex items-center justify-center text-[10px]">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[11px] sm:text-xs mt-1.5 font-bold line-clamp-1 max-w-[90px] transition-colors ${
                        isCurrent ? 'text-olive-700' : 'text-stone-700 group-hover:text-olive-600'
                      }`}>
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE FILTER BAR ── */}
      <div className="lg:hidden sticky top-20 z-30 bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-bold text-gray-800"
        >
          <Filter className="w-3.5 h-3.5 text-olive-600" />
          <span>Filter {hasActiveFilters && `(${selectedSubcategories.length + selectedOccasions.length + selectedBrands.length + selectedTags.length})`}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-0 text-xs font-bold text-olive-700 focus:outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER (Sidebar + Product Grid) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start gap-7">

          {/* ================= LEFT SIDEBAR FILTER PANEL ================= */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28 bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
            {/* Filter Panel Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50/50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-olive-700" />
                <h2 className="font-display font-extrabold text-base text-gray-900">
                  Filters
                </h2>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear All
                </button>
              )}
            </div>

            <div className="divide-y divide-stone-100 text-xs max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin">
              
              {/* 1. PRICE FILTER ACCORDION */}
              <div className="p-5">
                <div 
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between cursor-pointer font-bold text-stone-900 text-[13px] mb-3 select-none"
                >
                  <span>Price Range</span>
                  {openSections.price ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </div>

                {openSections.price && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-end justify-between h-10 gap-1 px-1 bg-stone-50 rounded-lg p-1.5 border border-stone-100">
                      {histogramBars.map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-stone-300 hover:bg-olive-500 rounded-xs transition-colors"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-stone-400 mb-1">
                        <span>₹{priceStats.min || 100}</span>
                        <span>₹{priceStats.max || 5000}+</span>
                      </div>
                      <input
                        type="range"
                        min={priceStats.min || 100}
                        max={priceStats.max || 5000}
                        step={50}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-olive-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 block mb-1">Minimum</span>
                        <div className="flex items-center border border-stone-200 rounded-lg px-2.5 py-1.5 bg-stone-50/50">
                          <span className="text-stone-400 mr-1">₹</span>
                          <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            className="w-full bg-transparent font-bold text-xs text-stone-800 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-stone-400 block mb-1">Maximum</span>
                        <div className="flex items-center border border-stone-200 rounded-lg px-2.5 py-1.5 bg-stone-50/50">
                          <span className="text-stone-400 mr-1">₹</span>
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full bg-transparent font-bold text-xs text-stone-800 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        { label: 'Under ₹500', max: 500 },
                        { label: '₹500 - ₹1000', min: 500, max: 1000 },
                        { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
                        { label: '₹2000+', min: 2000, max: 10000 },
                      ].map((chip) => (
                        <button
                          key={chip.label}
                          type="button"
                          onClick={() => {
                            if (chip.min) setMinPrice(chip.min);
                            if (chip.max) setMaxPrice(chip.max);
                          }}
                          className="text-[10px] font-semibold px-2 py-1 rounded-md bg-stone-100 hover:bg-olive-50 hover:text-olive-700 text-stone-600 transition-colors cursor-pointer"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. CATEGORIES FILTER */}
              {sidebarCategoryOptions.length > 0 && (
                <div className="p-5">
                  <div 
                    onClick={() => toggleSection('categories')}
                    className="flex items-center justify-between cursor-pointer font-bold text-stone-900 text-[13px] mb-3 select-none"
                  >
                    <span>Categories</span>
                    {openSections.categories ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </div>

                  {openSections.categories && (
                    <div className="space-y-2 animate-fade-in max-h-52 overflow-y-auto pr-1">
                      {sidebarCategoryOptions.map((cat) => {
                        const isChecked = selectedSubcategories.includes(cat.name);
                        return (
                          <label
                            key={cat.id || cat.name}
                            className="flex items-center justify-between hover:bg-stone-50 p-1.5 rounded-lg cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleSubcategory(cat.name)}
                                className="w-4 h-4 rounded text-olive-600 accent-olive-600 focus:ring-0 cursor-pointer"
                              />
                              <span className={`text-xs ${isChecked ? 'font-bold text-olive-800' : 'text-stone-700'}`}>
                                {cat.name}
                              </span>
                            </div>
                            {cat.count !== undefined && (
                              <span className="text-[10px] text-stone-400 font-bold bg-stone-100 px-1.5 py-0.5 rounded-md">
                                {cat.count}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* 3. OCCASIONS FILTER */}
              {sidebarOccasionOptions.length > 0 && (
                <div className="p-5">
                  <div 
                    onClick={() => toggleSection('occasions')}
                    className="flex items-center justify-between cursor-pointer font-bold text-stone-900 text-[13px] mb-3 select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <CalendarHeart className="w-3.5 h-3.5 text-rose-600" />
                      <span>Occasions</span>
                    </div>
                    {openSections.occasions ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </div>

                  {openSections.occasions && (
                    <div className="space-y-2 animate-fade-in max-h-52 overflow-y-auto pr-1">
                      {sidebarOccasionOptions.map((occ) => {
                        const isChecked = selectedOccasions.includes(occ.name);
                        return (
                          <label
                            key={occ.id || occ.name}
                            className="flex items-center justify-between hover:bg-stone-50 p-1.5 rounded-lg cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleOccasion(occ.name)}
                                className="w-4 h-4 rounded text-rose-600 accent-rose-600 focus:ring-0 cursor-pointer"
                              />
                              <span className={`text-xs ${isChecked ? 'font-bold text-rose-800' : 'text-stone-700'}`}>
                                {occ.name}
                              </span>
                            </div>
                            {occ.count !== undefined && (
                              <span className="text-[10px] text-stone-400 font-bold bg-stone-100 px-1.5 py-0.5 rounded-md">
                                {occ.count}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* 4. SHOP BY BRAND FILTER */}
              {sidebarBrandOptions.length > 0 && (
                <div className="p-5">
                  <div 
                    onClick={() => toggleSection('brands')}
                    className="flex items-center justify-between cursor-pointer font-bold text-stone-900 text-[13px] mb-3 select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>Shop by Brand</span>
                    </div>
                    {openSections.brands ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </div>

                  {openSections.brands && (
                    <div className="space-y-2 animate-fade-in max-h-52 overflow-y-auto pr-1">
                      {sidebarBrandOptions.map((brand) => {
                        const isChecked = selectedBrands.includes(brand.name);
                        return (
                          <label
                            key={brand.id || brand.name}
                            className="flex items-center justify-between hover:bg-stone-50 p-1.5 rounded-lg cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleBrand(brand.name)}
                                className="w-4 h-4 rounded text-amber-600 accent-amber-600 focus:ring-0 cursor-pointer"
                              />
                              <span className={`text-xs ${isChecked ? 'font-bold text-amber-900' : 'text-stone-700'}`}>
                                {brand.name}
                              </span>
                            </div>
                            {brand.count !== undefined && (
                              <span className="text-[10px] text-stone-400 font-bold bg-stone-100 px-1.5 py-0.5 rounded-md">
                                {brand.count}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* 5. TAGS & SPECIAL COLLECTIONS */}
              {sidebarTagOptions.length > 0 && (
                <div className="p-5">
                  <div 
                    onClick={() => toggleSection('tags')}
                    className="flex items-center justify-between cursor-pointer font-bold text-stone-900 text-[13px] mb-3 select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-olive-600" />
                      <span>Special Tags</span>
                    </div>
                    {openSections.tags ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </div>

                  {openSections.tags && (
                    <div className="space-y-2 animate-fade-in max-h-52 overflow-y-auto pr-1">
                      {sidebarTagOptions.map((tag) => {
                        const isChecked = selectedTags.includes(tag.name);
                        return (
                          <label
                            key={tag.id || tag.name}
                            className="flex items-center justify-between hover:bg-stone-50 p-1.5 rounded-lg cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleTag(tag.name)}
                                className="w-4 h-4 rounded text-olive-600 accent-olive-600 focus:ring-0 cursor-pointer"
                              />
                              <span className={`text-xs ${isChecked ? 'font-bold text-olive-800' : 'text-stone-700'}`}>
                                {tag.name}
                              </span>
                            </div>
                            {tag.count !== undefined && (
                              <span className="text-[10px] text-stone-400 font-bold bg-stone-100 px-1.5 py-0.5 rounded-md">
                                {tag.count}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* 6. DELIVERY SPEED FILTER */}
              <div className="p-5">
                <div 
                  onClick={() => toggleSection('delivery')}
                  className="flex items-center justify-between cursor-pointer font-bold text-stone-900 text-[13px] mb-3 select-none"
                >
                  <span>Delivery Speed</span>
                  {openSections.delivery ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </div>

                {openSections.delivery && (
                  <div className="space-y-2 animate-fade-in">
                    {[
                      { key: 'same-day', label: 'Same Day Delivery', badge: 'Fastest' },
                      { key: 'midnight', label: 'Midnight Delivery', badge: 'Special' },
                      { key: 'express', label: 'Express Delivery' },
                    ].map((opt) => {
                      const isChecked = selectedDelivery.includes(opt.key);
                      return (
                        <label
                          key={opt.key}
                          className="flex items-center justify-between hover:bg-stone-50 p-1.5 rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleDelivery(opt.key)}
                              className="w-4 h-4 rounded text-olive-600 accent-olive-600 focus:ring-0 cursor-pointer"
                            />
                            <span className={`text-xs ${isChecked ? 'font-bold text-olive-800' : 'text-stone-700'}`}>
                              {opt.label}
                            </span>
                          </div>
                          {opt.badge && (
                            <span className="text-[9px] font-bold bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                              {opt.badge}
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 7. CUSTOMER RATING FILTER */}
              <div className="p-5">
                <div 
                  onClick={() => toggleSection('rating')}
                  className="flex items-center justify-between cursor-pointer font-bold text-stone-900 text-[13px] mb-3 select-none"
                >
                  <span>Customer Rating</span>
                  {openSections.rating ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </div>

                {openSections.rating && (
                  <div className="space-y-1.5 animate-fade-in">
                    {[4.5, 4.0, 3.5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setMinRating(minRating === val ? 0 : val)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                          minRating === val 
                            ? 'border-olive-600 bg-olive-50 text-olive-900 font-bold' 
                            : 'border-stone-100 hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center text-amber-400">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-3.5 h-3.5 ${idx < Math.floor(val) ? 'fill-amber-400' : 'text-stone-200'}`}
                              />
                            ))}
                          </div>
                          <span>{val} & Above</span>
                        </div>
                        {minRating === val && <Check className="w-3.5 h-3.5 text-olive-700" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </aside>

          {/* ================= RIGHT PRODUCT GRID ================= */}
          <main className="flex-1 min-w-0">
            {/* Active filter chips bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-4 bg-white p-3 rounded-2xl border border-stone-200">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Active Filters:</span>
                {selectedSubcategories.map(cat => (
                  <span key={cat} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-olive-50 text-olive-800 text-xs font-bold border border-olive-200">
                    {cat}
                    <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => handleToggleSubcategory(cat)} />
                  </span>
                ))}
                {selectedOccasions.map(occ => (
                  <span key={occ} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-900 text-xs font-bold border border-rose-200">
                    <CalendarHeart className="w-3 h-3 text-rose-500" />
                    {occ}
                    <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => handleToggleOccasion(occ)} />
                  </span>
                ))}
                {selectedBrands.map(b => (
                  <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                    <Award className="w-3 h-3 text-amber-600" />
                    {b}
                    <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => handleToggleBrand(b)} />
                  </span>
                ))}
                {selectedTags.map(t => (
                  <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold border border-stone-300">
                    <Tag className="w-3 h-3 text-stone-600" />
                    {t}
                    <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => handleToggleTag(t)} />
                  </span>
                ))}
                {(minPrice > (priceStats.min || 0) || maxPrice < (priceStats.max || 50000)) && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-olive-50 text-olive-800 text-xs font-bold border border-olive-200">
                    ₹{minPrice} - ₹{maxPrice}
                    <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => { setMinPrice(priceStats.min || 0); setMaxPrice(priceStats.max || 50000); }} />
                  </span>
                )}
                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-olive-50 text-olive-800 text-xs font-bold border border-olive-200">
                    {minRating}★ & Above
                    <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => setMinRating(0)} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-rose-600 hover:underline ml-auto cursor-pointer"
                >
                  Reset all
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && !loading && (
              <div className="bg-white rounded-3xl p-12 border border-stone-200 text-center flex flex-col items-center justify-center my-8">
                <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 mb-4">
                  <PackageOpen className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-1">
                  No Matching Gifts Found
                </h3>
                <p className="text-xs text-stone-500 mb-6 max-w-sm">
                  We couldn't find any products matching your selected filters. Try loosening the price range or filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-olive-700 text-white text-xs font-bold hover:bg-olive-800 transition-colors shadow-sm cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {filteredProducts.map((p) => {
                const name = p.name || p.title || 'Curated Gift';
                const price = Number(p.price || 0);
                const originalPrice = Number(p.originalPrice || Math.round(price * 1.25));
                const image = p.img || p.image;
                const rating = p.rating || 4.8;
                const reviews = p.reviewsCount || 48;
                const tag = p.tag || 'Bestseller';
                const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

                return (
                  <div
                    key={p.id}
                    className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div 
                      onClick={() => openProductModal(p)}
                      className="cursor-pointer"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-square overflow-hidden bg-stone-100">
                        <FixedImage
                          src={image}
                          alt={name}
                          type="product"
                          containerClassName="w-full h-full"
                          imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Tag Badge */}
                        {tag && (
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-stone-900/85 backdrop-blur-xs text-white font-extrabold text-[9px] uppercase tracking-wider rounded-md shadow-xs">
                            {tag}
                          </span>
                        )}

                        {/* Rating Pill */}
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs border border-stone-200/80 flex items-center gap-1 shadow-2xs">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[11px] font-extrabold text-gray-900">{rating}</span>
                          <span className="text-[10px] text-stone-400 font-medium">({reviews})</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-4 space-y-1.5">
                        <h3 className="font-bold text-sm text-gray-900 group-hover:text-olive-700 transition-colors line-clamp-2 leading-snug">
                          {name}
                        </h3>

                        {/* Delivery speed line */}
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <Truck className="w-3.5 h-3.5" />
                          <span>Earliest Delivery: Today</span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="font-extrabold text-base text-gray-900">{formatPrice(price)}</span>
                          {originalPrice > price && (
                            <span className="text-xs text-stone-400 line-through">{formatPrice(originalPrice)}</span>
                          )}
                          {discount > 0 && (
                            <span className="text-[11px] font-extrabold text-emerald-600">
                              {discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Add Button */}
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="w-full py-2.5 rounded-xl bg-olive-700 hover:bg-olive-800 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </main>

        </div>
      </div>

      {/* ── MOBILE FILTER DRAWER POPUP ── */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end animate-fade-in">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-display font-extrabold text-lg text-gray-900">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            {sidebarCategoryOptions.length > 0 && (
              <div className="mb-5">
                <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider mb-2">Categories</h4>
                <div className="flex flex-wrap gap-1.5">
                  {sidebarCategoryOptions.map(cat => {
                    const isChecked = selectedSubcategories.includes(cat.name);
                    return (
                      <button
                        key={cat.id || cat.name}
                        type="button"
                        onClick={() => handleToggleSubcategory(cat.name)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                          isChecked ? 'bg-olive-700 text-white border-olive-700' : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.count !== undefined && (
                          <span className={`text-[10px] px-1 rounded-full ${isChecked ? 'bg-white/20 text-white' : 'bg-stone-200/80 text-stone-600'}`}>
                            {cat.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile Occasions */}
            {sidebarOccasionOptions.length > 0 && (
              <div className="mb-5">
                <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <CalendarHeart className="w-3 h-3 text-rose-600" />
                  <span>Occasions</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {sidebarOccasionOptions.map(occ => {
                    const isChecked = selectedOccasions.includes(occ.name);
                    return (
                      <button
                        key={occ.id || occ.name}
                        type="button"
                        onClick={() => handleToggleOccasion(occ.name)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                          isChecked ? 'bg-rose-700 text-white border-rose-700' : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <span>{occ.name}</span>
                        {occ.count !== undefined && (
                          <span className={`text-[10px] px-1 rounded-full ${isChecked ? 'bg-white/20 text-white' : 'bg-stone-200/80 text-stone-600'}`}>
                            {occ.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile Shop by Brand */}
            {sidebarBrandOptions.length > 0 && (
              <div className="mb-5">
                <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-600" />
                  <span>Shop by Brand</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {sidebarBrandOptions.map(brand => {
                    const isChecked = selectedBrands.includes(brand.name);
                    return (
                      <button
                        key={brand.id || brand.name}
                        type="button"
                        onClick={() => handleToggleBrand(brand.name)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                          isChecked ? 'bg-amber-800 text-white border-amber-800' : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <span>{brand.name}</span>
                        {brand.count !== undefined && (
                          <span className={`text-[10px] px-1 rounded-full ${isChecked ? 'bg-white/20 text-white' : 'bg-stone-200/80 text-stone-600'}`}>
                            {brand.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile Price Slider */}
            <div className="mb-5">
              <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider mb-2">
                Price: ₹{minPrice} - ₹{maxPrice}
              </h4>
              <input
                type="range"
                min={priceStats.min || 100}
                max={priceStats.max || 5000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-olive-600 cursor-pointer"
              />
            </div>

            {/* Apply / Reset Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-olive-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Apply ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
