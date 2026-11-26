'use client';

import React, { useState, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ALL_PRODUCTS, filterProducts } from '@/lib/products';
import { ProductCard } from '@/components/store/ProductCard';
import { FilterRail } from '@/components/store/FilterRail';
import { FilterSheet } from '@/components/store/FilterSheet';
import { ActiveFilters } from '@/components/store/ActiveFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutGrid, Grid3X3, ArrowUpDown, RotateCcw, ArrowRight } from 'lucide-react';

function ShopCatalogContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const collection = searchParams.get('collection');
  const size = searchParams.get('size');
  const color = searchParams.get('color');
  const sort = searchParams.get('sort') || 'featured';
  const minPriceStr = searchParams.get('min');
  const maxPriceStr = searchParams.get('max');
  const density = searchParams.get('density') || 'comfortable'; // 'comfortable' (3-col) | 'dense' (4-col)

  // Visible items count for Load More pagination
  const [displayCount, setDisplayCount] = useState(12);

  const minPrice = minPriceStr ? parseInt(minPriceStr, 10) : null;
  const maxPrice = maxPriceStr ? parseInt(maxPriceStr, 10) : null;

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return filterProducts(ALL_PRODUCTS, {
      collection,
      size,
      color,
      sort,
      minPrice,
      maxPrice,
    });
  }, [collection, size, color, sort, minPrice, maxPrice]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  // Active filter count for badge
  const activeCount = [
    collection && collection !== 'all',
    size,
    color,
    minPrice || maxPrice,
  ].filter(Boolean).length;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleDensity = (newDensity: 'comfortable' | 'dense') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('density', newDensity);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleRemoveFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === 'price') {
      params.delete('min');
      params.delete('max');
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const gridClass =
    density === 'dense'
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

  return (
    <div className="max-w-page mx-auto px-4 md:px-10 py-10 md:py-16 space-y-8">
      {/* Catalog Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="acid">KINETIQ CATALOG</Badge>
            <span className="micro-label text-smoke">[24 REGISTERED SILHOUETTES]</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink uppercase">
            THE RUN MATRIX
          </h1>
          <p className="text-xs md:text-sm font-mono text-smoke mt-1 max-w-xl">
            Precision athletic architecture categorized by terrain discipline. Engineered with micro-millimeter tolerances.
          </p>
        </div>

        {/* Catalog Control Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile Filter Button */}
          <FilterSheet activeFilterCount={activeCount} />

          {/* Sort Dropdown */}
          <div className="flex items-center border border-line bg-paper px-3 h-10 gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-smoke" />
            <select
              value={sort}
              onChange={handleSortChange}
              aria-label="Sort products"
              className="bg-transparent text-xs font-mono text-ink focus:outline-none cursor-pointer"
            >
              <option value="featured">SORT: FEATURED</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="rating">HIGHEST RATED</option>
              <option value="weight">FEATHERWEIGHT (GRAMS)</option>
              <option value="newest">NEWEST RELEASES</option>
            </select>
          </div>

          {/* Grid Density Toggle (Desktop) */}
          <div className="hidden lg:flex items-center border border-line bg-paper h-10 p-1 gap-1">
            <button
              type="button"
              onClick={() => toggleDensity('comfortable')}
              aria-label="Comfortable 3-column grid"
              className={`p-1.5 transition-colors ${
                density === 'comfortable' ? 'bg-ink text-bone' : 'text-smoke hover:text-ink'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleDensity('dense')}
              aria-label="Dense 4-column grid"
              className={`p-1.5 transition-colors ${
                density === 'dense' ? 'bg-ink text-bone' : 'text-smoke hover:text-ink'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout (Left Rail + Product Grid) */}
      <div className="flex gap-8 items-start">
        {/* Left Desktop Rail */}
        <div className="hidden lg:block w-64 shrink-0 sticky top-28">
          <FilterRail />
        </div>

        {/* Right Main Grid Container */}
        <div className="flex-1 w-full space-y-6">
          {/* Active Filter Pills */}
          <ActiveFilters
            totalCount={ALL_PRODUCTS.length}
            filteredCount={filteredProducts.length}
            filters={{ collection, size, color, sort, minPrice, maxPrice }}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAll}
          />

          {/* Product Grid */}
          {visibleProducts.length > 0 ? (
            <div className={`grid ${gridClass}`}>
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Designed Zero-Results State */
            <div className="border border-line bg-paper p-12 text-center space-y-6">
              <div className="w-16 h-16 border border-line flex items-center justify-center mx-auto text-smoke">
                <RotateCcw className="w-7 h-7 stroke-1" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold uppercase">
                  ZERO SILHOUETTES MATCHING CRITERIA
                </h3>
                <p className="text-xs text-smoke font-mono uppercase tracking-wider max-w-md mx-auto">
                  No technical models correspond to your current parameter matrix. Reset parameters to view the complete catalog.
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="primary" size="sm" onClick={handleClearAll}>
                  RESET ALL FILTERS
                </Button>
              </div>

              {/* Suggested Collections Block */}
              <div className="pt-8 border-t border-line text-left">
                <span className="micro-label text-smoke block mb-4">EXPLORE CORE DISCIPLINES</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link
                    href="/collections/pulse"
                    className="p-4 border border-line bg-bone hover:border-ink transition-colors flex justify-between items-center"
                  >
                    <div>
                      <p className="font-display font-bold">PULSE // ROAD</p>
                      <p className="micro-label text-smoke">8 MODELS</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-smoke" />
                  </Link>

                  <Link
                    href="/collections/terra"
                    className="p-4 border border-line bg-bone hover:border-ink transition-colors flex justify-between items-center"
                  >
                    <div>
                      <p className="font-display font-bold">TERRA // TRAIL</p>
                      <p className="micro-label text-smoke">8 MODELS</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-smoke" />
                  </Link>

                  <Link
                    href="/collections/form"
                    className="p-4 border border-line bg-bone hover:border-ink transition-colors flex justify-between items-center"
                  >
                    <div>
                      <p className="font-display font-bold">FORM // DAILY</p>
                      <p className="micro-label text-smoke">8 MODELS</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-smoke" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Load More Pagination */}
          {visibleProducts.length < filteredProducts.length && (
            <div className="pt-8 border-t border-line text-center space-y-3">
              <p className="micro-label text-smoke">
                SHOWING {visibleProducts.length} OF {filteredProducts.length} MODELS
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setDisplayCount((prev) => prev + 12)}
                className="px-8"
              >
                LOAD MORE SILHOUETTES
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-page mx-auto px-4 md:px-10 py-16 text-center">
          <p className="micro-label text-smoke">HYDRATING CATALOG MATRIX...</p>
        </div>
      }
    >
      <ShopCatalogContent />
    </Suspense>
  );
}
