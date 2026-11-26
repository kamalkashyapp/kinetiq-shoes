'use client';

import React, { useState, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ALL_PRODUCTS, filterProducts } from '@/lib/products';
import { ProductCard } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, RotateCcw, ArrowRight } from 'lucide-react';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState(queryParam);

  const results = useMemo(() => {
    return filterProducts(ALL_PRODUCTS, { query: queryParam });
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
  };

  return (
    <div className="max-w-page mx-auto px-4 md:px-10 py-12 md:py-16 space-y-10">
      {/* Search Header */}
      <div className="border-b border-line pb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="acid">SEARCH INDEX</Badge>
          <span className="micro-label text-smoke">FULL TEXT TSVECTOR</span>
        </div>

        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase">
          {queryParam ? `RESULTS FOR: "${queryParam.toUpperCase()}"` : 'EXPLORE CATALOG INDEX'}
        </h1>

        {/* Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl flex gap-3 pt-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="SEARCH BY NAME, MATERIAL, OR DISCIPLINE..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="h-12 text-sm font-mono uppercase"
            />
          </div>
          <Button type="submit" variant="primary" size="default" className="h-12 px-6">
            <Search className="w-4 h-4 mr-2" />
            QUERY
          </Button>
        </form>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center text-xs font-mono text-smoke border-b border-line pb-3">
        <span>[{results.length} SILHOUETTES MATCHING INDEX]</span>
        <span className="hidden sm:inline">SORTED BY RELEVANCE</span>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Zero Results */
        <div className="border border-line bg-paper p-12 text-center space-y-6">
          <div className="w-16 h-16 border border-line flex items-center justify-center mx-auto text-smoke">
            <RotateCcw className="w-7 h-7 stroke-1" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold uppercase">
              NO MODELS MATCHING &quot;{queryParam}&quot;
            </h3>
            <p className="text-xs text-smoke font-mono uppercase tracking-wider max-w-md mx-auto">
              Our engineering index could not locate corresponding models. Explore our primary collections.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/shop">
              <Button variant="primary" size="sm">
                VIEW ALL 24 SILHOUETTES
              </Button>
            </Link>
          </div>

          {/* Quick Collection Tiles */}
          <div className="pt-8 border-t border-line text-left">
            <span className="micro-label text-smoke block mb-4">SUGGESTED DISCIPLINES</span>
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
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-page mx-auto px-4 md:px-10 py-16 text-center">
          <p className="micro-label text-smoke">QUERYING DATABASE INDEX...</p>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
