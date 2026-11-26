'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { FilterRail } from './FilterRail';

export function FilterSheet({ activeFilterCount = 0 }: { activeFilterCount?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Drawer Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-3 py-2 border border-line bg-paper text-ink text-xs font-mono uppercase hover:border-ink transition-colors"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>FILTERS</span>
        {activeFilterCount > 0 && (
          <span className="bg-acid text-ink font-bold px-1.5 py-0.2 rounded-full text-[10px]">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Slide-over Filter Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter Catalog"
            className="relative z-10 w-full max-w-xs bg-paper h-full flex flex-col shadow-drawer border-r border-line p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
              <span className="font-display text-lg font-bold">FILTERS</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close filters"
                className="p-1 text-smoke hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reused FilterRail */}
            <div className="flex-1">
              <FilterRail />
            </div>

            <div className="pt-6 border-t border-line mt-6">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full h-11 bg-ink text-bone font-mono text-xs uppercase font-bold flex items-center justify-center hover:bg-ink-soft transition-colors"
              >
                APPLY & VIEW RESULTS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
