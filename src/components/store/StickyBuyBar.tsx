'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Check } from 'lucide-react';
import type { ProductItem } from '@/lib/products';

interface StickyBuyBarProps {
  product: ProductItem;
  selectedSize: number;
  isVisible: boolean;
  onAddToCart: () => void;
  isAdding: boolean;
}

export function StickyBuyBar({
  product,
  selectedSize,
  isVisible,
  onAddToCart,
  isAdding,
}: StickyBuyBarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-paper/95 backdrop-blur-md border-t border-line shadow-drawer p-3 md:p-4 animate-in slide-in-from-bottom duration-base">
      <div className="max-w-page mx-auto flex items-center justify-between gap-4">
        {/* Left: Thumbnail & Name & Size */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-bone border border-line shrink-0 overflow-hidden hidden sm:block">
            <img
              src={product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-display font-extrabold text-sm md:text-base text-ink leading-tight">
              {product.name}
            </p>
            <p className="micro-label text-smoke text-[9px]">
              US {selectedSize.toFixed(1)} // {product.collection.toUpperCase()} // {product.weight}G
            </p>
          </div>
        </div>

        {/* Right: Price & CTA */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-mono text-base md:text-lg font-bold text-ink">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && (
              <span className="block font-mono text-[10px] text-smoke line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <Button
            type="button"
            variant="acid"
            size="default"
            onClick={onAddToCart}
            disabled={!product.inStock}
            className="h-11 px-6 text-xs font-bold shrink-0"
          >
            {isAdding ? (
              <Check className="w-4 h-4 mr-1.5" />
            ) : (
              <ShoppingBag className="w-4 h-4 mr-1.5" />
            )}
            <span>{isAdding ? 'PACKED IN BAG' : 'ADD TO BAG'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
