import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Layers, Grid, Sparkles } from 'lucide-react';
import { useCategories } from '../context/CategoryContext';
import FixedImage from './common/FixedImage';

export default function CategoryNav() {
  const { categories, topCategories, getSubcategories, loading } = useCategories();
  const [activeHoverId, setActiveHoverId] = useState(null);
  const [showAllDropdown, setShowAllDropdown] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const rawCategories = Array.isArray(categories) ? categories : [];
  const displayTopCategories = (topCategories && topCategories.length > 0)
    ? topCategories
    : rawCategories.filter(c => !c.parentId && !c.name.includes('>')).slice(0, 10);

  const handleMouseEnter = (deptId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setShowAllDropdown(false);
    setActiveHoverId(deptId);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveHoverId(null);
      setShowAllDropdown(false);
    }, 220);
  };

  const activeDept = displayTopCategories.find((d) => String(d.id) === String(activeHoverId));
  const subItems = activeDept ? getSubcategories(activeDept) : [];

  if (loading && rawCategories.length === 0) {
    return (
      <div className="hidden lg:block border-t border-gray-100 bg-white py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-xs text-stone-400">
          <span>Loading catalog categories...</span>
        </div>
      </div>
    );
  }

  if (displayTopCategories.length === 0) {
    return null;
  }

  return (
    <div 
      className="hidden lg:block border-t border-gray-100 bg-white relative z-40 shadow-xs select-none"
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-6 overflow-x-auto py-2.5 scrollbar-none text-[13.5px] text-gray-700">
          
          {/* Main isTop Categories list */}
          <div className="flex items-center gap-7">
            {displayTopCategories.map((dept, idx) => {
              const isHovered = String(activeHoverId) === String(dept.id);
              const related = getSubcategories(dept);
              const hasSub = related && related.length > 0;

              return (
                <div
                  key={dept.id || dept.slug || idx}
                  onMouseEnter={() => handleMouseEnter(dept.id)}
                  className="relative py-1.5 cursor-pointer"
                >
                  <Link
                    to={`/category/${dept.slug}`}
                    className={`flex items-center gap-1.5 transition-all whitespace-nowrap group ${
                      isHovered
                        ? 'text-olive-700 font-bold'
                        : 'hover:text-olive-600 font-semibold text-gray-800'
                    }`}
                  >
                    <span className="tracking-tight font-sans text-sm">
                      {dept.name}
                    </span>
                    {hasSub && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isHovered
                            ? 'rotate-180 text-olive-600'
                            : 'text-gray-400 group-hover:text-olive-500'
                        }`}
                      />
                    )}
                  </Link>

                  {/* Active bottom indicator line on hover */}
                  {isHovered && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-olive-600 rounded-full animate-fade-in" />
                  )}
                </div>
              );
            })}
          </div>

          {/* All Categories Mega Menu Trigger */}
          <div 
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              setShowAllDropdown(true);
              setActiveHoverId(null);
            }}
            className="relative py-1 cursor-pointer flex-shrink-0"
          >
            <button className="flex items-center gap-1.5 text-xs font-bold bg-amber-50/80 text-amber-900 border border-amber-200/80 px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors shadow-2xs">
              <Grid className="w-3.5 h-3.5 text-amber-700" />
              <span>All Categories</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showAllDropdown ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* ── Dropdown for isSubTop Subcategories ── */}
      {activeHoverId && activeDept && subItems.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 w-full bg-white shadow-xl border-t border-b border-gray-100 animate-fade-in z-50"
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            {/* Header / Subcategory count */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-olive-600"></span>
                <h3 className="font-display font-bold text-base text-gray-900">
                  {activeDept.name} Collection
                </h3>
                <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                  {subItems.length} sub-categories
                </span>
              </div>

              <Link
                to={`/category/${activeDept.slug}`}
                className="text-xs font-bold text-olive-700 hover:text-olive-800 flex items-center gap-1.5 transition-all group bg-olive-50/70 hover:bg-olive-100 px-3 py-1.5 rounded-lg"
              >
                <span>Explore all {activeDept.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Grid of isSubTop options */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {subItems.map((sub, i) => {
                const subImg = sub.image || sub.rawImage;
                const hasValidImg = subImg && !subImg.includes('no_image.jpg');

                return (
                  <Link
                    key={sub.id || sub.slug || i}
                    to={`/category/${sub.slug}`}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-stone-100 hover:border-olive-300 bg-stone-50/40 hover:bg-olive-50/40 transition-all duration-200 group text-left"
                  >
                    {hasValidImg ? (
                      <FixedImage
                        src={subImg}
                        alt={sub.name}
                        type="category"
                        containerClassName="w-9 h-9 rounded-lg overflow-hidden bg-white border border-stone-200/80 flex-shrink-0"
                        imageClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-olive-100/70 text-olive-800 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-olive-200 transition-colors">
                        {sub.name.charAt(0)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <span className="text-[13px] font-semibold text-gray-800 group-hover:text-olive-700 transition-colors block truncate">
                        {sub.name}
                      </span>
                      <span className="text-[10px] text-stone-400 group-hover:text-olive-600/80 flex items-center gap-0.5 transition-colors">
                        Shop gifts <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Mega Dropdown for All Categories ── */}
      {showAllDropdown && (
        <div 
          className="absolute top-full left-0 right-0 w-full bg-white shadow-2xl border-t border-b border-gray-200 animate-fade-in z-50 max-h-[70vh] overflow-y-auto"
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-olive-700" />
                <h3 className="font-display font-bold text-base text-gray-900">
                  All Catalog Categories
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  ({rawCategories.length} categories available)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-2.5 text-xs">
              {rawCategories.map((cat, i) => (
                <Link
                  key={cat.id || cat.slug || i}
                  to={`/category/${cat.slug}`}
                  className="text-stone-700 hover:text-olive-700 hover:font-bold truncate py-1 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

