'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  totalCount: number;
  filteredCount: number;
  filters: {
    collection?: string | null;
    size?: string | null;
    color?: string | null;
    sort?: string | null;
    minPrice?: number | null;
    maxPrice?: number | null;
  };
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  totalCount,
  filteredCount,
  filters,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersProps) {
  const activeChips: { key: string; label: string }[] = [];

  if (filters.collection && filters.collection !== 'all') {
    activeChips.push({ key: 'collection', label: `COLLECTION: ${filters.collection.toUpperCase()}` });
  }
  if (filters.size) {
    activeChips.push({ key: 'size', label: `SIZE: US ${filters.size}` });
  }
  if (filters.color) {
    activeChips.push({ key: 'color', label: `COLOR: ${filters.color.toUpperCase()}` });
  }
  if (filters.minPrice || filters.maxPrice) {
    const min = filters.minPrice ? `₹${filters.minPrice.toLocaleString('en-IN')}` : '₹0';
    const max = filters.maxPrice ? `₹${filters.maxPrice.toLocaleString('en-IN')}` : 'MAX';
    activeChips.push({ key: 'price', label: `${min} - ${max}` });
  }

  const hasActiveFilters = activeChips.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-line bg-bone/40">
      <div className="flex flex-wrap items-center gap-2">
        <span className="micro-label text-smoke">
          [{filteredCount} OF {totalCount} PRODUCTS]
        </span>

        {activeChips.map((chip) => (
          <button
            key={chip.key}
            onClick={() => onRemoveFilter(chip.key)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase bg-paper border border-line hover:border-ink transition-colors"
          >
            <span>{chip.label}</span>
            <X className="w-3 h-3 text-smoke hover:text-ink" />
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-[10px] font-mono text-smoke hover:text-ink underline uppercase tracking-wider ml-2"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <span className="micro-label text-smoke text-[9px]">EN-IN // TAX INCLUDED</span>
      </div>
    </div>
  );
}
