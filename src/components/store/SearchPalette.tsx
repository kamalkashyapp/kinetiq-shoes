'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, CornerDownLeft, Clock } from 'lucide-react';
import { ALL_PRODUCTS, filterProducts, type ProductItem } from '@/lib/products';

export function SearchPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kinetiq_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      } else {
        setRecentSearches(['Pulse 01', 'Carbon', 'Terra Ridge', 'Basalt', 'Form Zero']);
      }
    } catch {
      setRecentSearches(['Pulse 01', 'Carbon', 'Terra Ridge']);
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    try {
      const updated = [term, ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('kinetiq_recent_searches', JSON.stringify(updated));
    } catch {}
  };

  // Instant filtered results (debounced query)
  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    return filterProducts(ALL_PRODUCTS, { query }).slice(0, 6);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
      } else if (e.key === 'Enter') {
        if (results[selectedIndex]) {
          e.preventDefault();
          saveRecentSearch(results[selectedIndex].name);
          router.push(`/product/${results[selectedIndex].slug}`);
          onClose();
        } else if (query.trim()) {
          e.preventDefault();
          saveRecentSearch(query.trim());
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, query, onClose, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Instant Search"
        className="relative z-10 w-full max-w-2xl bg-paper border border-line shadow-drawer overflow-hidden animate-in fade-in-50 zoom-in-95 duration-fast"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-line flex items-center gap-3 bg-bone/30">
          <Search className="w-5 h-5 text-smoke shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="SEARCH BY MODEL, DISCIPLINE (PULSE/TERRA/FORM), OR SPEC..."
            className="w-full bg-transparent text-sm md:text-base font-mono uppercase text-ink placeholder:text-smoke focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-smoke hover:text-ink transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="micro-label text-smoke border border-line px-1.5 py-0.5 hidden sm:inline">
              ESC
            </span>
          )}
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {query.trim().length > 0 ? (
            results.length > 0 ? (
              <div className="space-y-1">
                <span className="micro-label text-smoke block mb-2">
                  RESULTS [{results.length}]
                </span>
                {results.map((product, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        saveRecentSearch(product.name);
                        router.push(`/product/${product.slug}`);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full p-2.5 flex items-center justify-between text-left border transition-colors ${
                        isSelected
                          ? 'border-ink bg-ink text-bone'
                          : 'border-transparent hover:border-line bg-paper text-ink'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-bone border border-line overflow-hidden shrink-0">
                          <img
                            src={product.primaryImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-display font-bold text-sm leading-tight">
                            {product.name}
                          </p>
                          <p
                            className={`micro-label text-[9px] ${
                              isSelected ? 'text-acid' : 'text-smoke'
                            }`}
                          >
                            {product.collection.toUpperCase()} // {product.weight}G // {product.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-acid" />
                        )}
                      </div>
                    </button>
                  );
                })}

                <div className="pt-3 border-t border-line mt-2 text-right">
                  <button
                    onClick={() => {
                      saveRecentSearch(query);
                      router.push(`/search?q=${encodeURIComponent(query)}`);
                      onClose();
                    }}
                    className="text-xs font-mono underline uppercase text-smoke hover:text-ink inline-flex items-center gap-1"
                  >
                    <span>VIEW ALL RESULTS FOR &quot;{query}&quot;</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <p className="font-display font-bold text-lg uppercase">
                  ZERO SILHOUETTES FOUND FOR &quot;{query}&quot;
                </p>
                <p className="text-xs font-mono text-smoke">
                  Try searching for &quot;Carbon&quot;, &quot;Basalt&quot;, &quot;Pulse&quot;, or &quot;Suede&quot;.
                </p>
              </div>
            )
          ) : (
            /* Recent Searches & Suggested Disciplines */
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <span className="micro-label text-smoke block flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    RECENT SEARCH MATRICES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 border border-line bg-bone hover:border-ink text-xs font-mono transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-line">
                <span className="micro-label text-smoke block">DISCIPLINE SHORTCUTS</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      router.push('/collections/pulse');
                      onClose();
                    }}
                    className="p-3 border border-line hover:border-ink text-left bg-bone"
                  >
                    <p className="font-display font-bold text-xs">PULSE // ROAD</p>
                    <p className="micro-label text-smoke text-[8px]">8 MODELS</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      router.push('/collections/terra');
                      onClose();
                    }}
                    className="p-3 border border-line hover:border-ink text-left bg-bone"
                  >
                    <p className="font-display font-bold text-xs">TERRA // TRAIL</p>
                    <p className="micro-label text-smoke text-[8px]">8 MODELS</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      router.push('/collections/form');
                      onClose();
                    }}
                    className="p-3 border border-line hover:border-ink text-left bg-bone"
                  >
                    <p className="font-display font-bold text-xs">FORM // DAILY</p>
                    <p className="micro-label text-smoke text-[8px]">8 MODELS</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 border-t border-line bg-bone/40 flex items-center justify-between text-[10px] font-mono text-smoke">
          <div className="flex items-center gap-4">
            <span>↑↓ NAVIGATE</span>
            <span>↵ SELECT</span>
            <span>ESC DISMISS</span>
          </div>
          <span>KINETIQ INSTANT TSVECTOR SEARCH</span>
        </div>
      </div>
    </div>
  );
}
