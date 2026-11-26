'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function FilterRail({ className = '' }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCollection = searchParams.get('collection') || 'all';
  const currentSize = searchParams.get('size');
  const currentColor = searchParams.get('color');
  const currentSort = searchParams.get('sort') || 'featured';
  const currentMinPrice = searchParams.get('min');
  const currentMaxPrice = searchParams.get('max');

  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '' || (key === 'collection' && value === 'all')) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const collections = [
    { slug: 'all', name: 'ALL COLLECTIONS' },
    { slug: 'pulse', name: 'PULSE // ROAD' },
    { slug: 'terra', name: 'TERRA // TRAIL' },
    { slug: 'form', name: 'FORM // DAILY' },
  ];

  const sizes = ['7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0'];

  const colors = [
    { name: 'Acid Ghost', hex: '#D9FF43' },
    { name: 'Graphite Black', hex: '#0B0F0E' },
    { name: 'Basalt Clay', hex: '#B4553A' },
    { name: 'Dune Sand', hex: '#C8B89E' },
    { name: 'Bone White', hex: '#F3F0E9' },
    { name: 'Shadow Ink', hex: '#0B0B0C' },
  ];

  const priceTiers = [
    { label: 'ALL TIERS', min: null, max: null },
    { label: 'UNDER ₹16,000', min: null, max: '16000' },
    { label: '₹16,000 - ₹22,000', min: '16000', max: '22000' },
    { label: 'ABOVE ₹22,000', min: '22000', max: null },
  ];

  const isCurrentPriceTier = (min: string | null, max: string | null) => {
    if (min === null && max === null) return !currentMinPrice && !currentMaxPrice;
    return currentMinPrice === min && currentMaxPrice === max;
  };

  return (
    <aside className={`w-full space-y-8 pr-6 text-ink ${className}`}>
      {/* 1. Collection Selector */}
      <div className="space-y-3">
        <span className="micro-label text-smoke block border-b border-line pb-1.5">
          01 // COLLECTION
        </span>
        <div className="space-y-1">
          {collections.map((col) => {
            const active = currentCollection.toLowerCase() === col.slug.toLowerCase();
            return (
              <button
                key={col.slug}
                onClick={() => updateQuery('collection', col.slug === 'all' ? null : col.slug)}
                className={`w-full text-left py-1.5 px-2 text-xs font-mono transition-colors flex items-center justify-between ${
                  active
                    ? 'bg-ink text-bone font-bold'
                    : 'text-smoke hover:text-ink hover:bg-bone'
                }`}
              >
                <span>{col.name}</span>
                {active && <span className="text-[9px] text-acid">●</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sizing Matrix Grid */}
      <div className="space-y-3">
        <span className="micro-label text-smoke block border-b border-line pb-1.5">
          02 // US MENS SIZING
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {sizes.map((sz) => {
            const active = currentSize === sz;
            return (
              <button
                key={sz}
                onClick={() => updateQuery('size', active ? null : sz)}
                className={`h-9 text-xs font-mono border transition-colors flex items-center justify-center ${
                  active
                    ? 'border-ink bg-ink text-bone font-bold shadow-sm'
                    : 'border-line text-ink bg-paper hover:border-ink'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Colorways */}
      <div className="space-y-3">
        <span className="micro-label text-smoke block border-b border-line pb-1.5">
          03 // COLORWAY MATRIX
        </span>
        <div className="space-y-1.5">
          {colors.map((c) => {
            const active = currentColor?.toLowerCase() === c.name.toLowerCase();
            return (
              <button
                key={c.name}
                onClick={() => updateQuery('color', active ? null : c.name)}
                className={`w-full flex items-center gap-2.5 p-1.5 text-xs font-mono border transition-colors ${
                  active ? 'border-ink bg-bone font-bold' : 'border-transparent hover:border-line'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-line shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-xs uppercase">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Price Bracket */}
      <div className="space-y-3">
        <span className="micro-label text-smoke block border-b border-line pb-1.5">
          04 // PRICE BRACKET
        </span>
        <div className="space-y-1">
          {priceTiers.map((tier, idx) => {
            const active = isCurrentPriceTier(tier.min, tier.max);
            return (
              <button
                key={idx}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  if (tier.min) params.set('min', tier.min);
                  else params.delete('min');
                  if (tier.max) params.set('max', tier.max);
                  else params.delete('max');
                  router.push(`${pathname}?${params.toString()}`, { scroll: false });
                }}
                className={`w-full text-left py-1.5 px-2 text-xs font-mono transition-colors flex items-center justify-between ${
                  active
                    ? 'bg-ink text-bone font-bold'
                    : 'text-smoke hover:text-ink hover:bg-bone'
                }`}
              >
                <span>{tier.label}</span>
                {active && <span className="text-[9px] text-acid">●</span>}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
