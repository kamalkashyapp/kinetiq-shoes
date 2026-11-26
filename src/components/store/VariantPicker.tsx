'use client';

import React, { useState } from 'react';
import { SizeGuideModal } from './SizeGuideModal';
import { Ruler, AlertCircle } from 'lucide-react';
import type { ProductColor } from '@/lib/products';

interface VariantPickerProps {
  sizes: number[];
  colors: ProductColor[];
  selectedSize: number;
  selectedColor: ProductColor;
  onSelectSize: (size: number) => void;
  onSelectColor: (color: ProductColor) => void;
  soldOutSizes?: number[];
  lowStockSizes?: number[];
}

export function VariantPicker({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSelectSize,
  onSelectColor,
  soldOutSizes = [11.5],
  lowStockSizes = [9.5],
}: VariantPickerProps) {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const isSoldOut = (sz: number) => soldOutSizes.includes(sz);
  const isLowStock = (sz: number) => lowStockSizes.includes(sz);

  return (
    <div className="space-y-6">
      {/* 1. Colorway Selection */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="micro-label text-smoke">01 // COLORWAY</span>
          <span className="font-mono text-xs font-bold text-ink uppercase">
            {selectedColor.name}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {colors.map((c) => {
            const isSelected = selectedColor.name === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onSelectColor(c)}
                className={`flex items-center gap-2 px-3 py-2 border transition-all text-xs font-mono uppercase ${
                  isSelected
                    ? 'border-ink bg-bone font-bold shadow-sm ring-1 ring-ink'
                    : 'border-line hover:border-ink bg-paper'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-line shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sizing Selection Grid */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="micro-label text-smoke">02 // SELECT US MENS SIZE</span>
            {isLowStock(selectedSize) && (
              <span className="micro-label text-status-warn font-bold">
                ● LOW STOCK ({selectedSize})
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="flex items-center gap-1 text-[11px] font-mono text-smoke hover:text-ink underline uppercase"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>SIZE GUIDE & CONVERSION</span>
          </button>
        </div>

        {/* Size Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {sizes.map((sz) => {
            const isSelected = selectedSize === sz;
            const soldOut = isSoldOut(sz);

            return (
              <button
                key={sz}
                type="button"
                disabled={soldOut}
                onClick={() => onSelectSize(sz)}
                className={`h-12 border flex flex-col items-center justify-center font-mono text-xs transition-all relative ${
                  soldOut
                    ? 'border-line/60 bg-bone/60 text-smoke/40 cursor-not-allowed line-through'
                    : isSelected
                    ? 'border-ink bg-ink text-bone font-bold shadow-sm'
                    : 'border-line bg-paper text-ink hover:border-ink hover:bg-bone'
                }`}
              >
                <span>{sz.toFixed(1)}</span>
                {soldOut ? (
                  <span className="text-[8px] no-underline">OUT</span>
                ) : isLowStock(sz) ? (
                  <span className={`text-[8px] ${isSelected ? 'text-acid' : 'text-status-warn'}`}>
                    LOW
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Low Stock / Out of Stock Banner */}
      {isSoldOut(selectedSize) ? (
        <div className="p-3 bg-status-danger/10 border border-status-danger text-ink flex items-center gap-2 text-xs font-mono">
          <AlertCircle className="w-4 h-4 text-status-danger shrink-0" />
          <span>SIZE {selectedSize.toFixed(1)} IS SOLD OUT. SELECT ANOTHER SIZE OR JOIN RESTOCK WAITLIST.</span>
        </div>
      ) : isLowStock(selectedSize) ? (
        <div className="p-3 bg-status-warn/10 border border-status-warn text-ink flex items-center gap-2 text-xs font-mono">
          <AlertCircle className="w-4 h-4 text-status-warn shrink-0" />
          <span>HIGH DEMAND: ONLY 3 PAIRS REMAINING IN US {selectedSize.toFixed(1)}.</span>
        </div>
      ) : null}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        selectedSize={selectedSize}
        onSelectSize={(sz) => onSelectSize(sz)}
      />
    </div>
  );
}
