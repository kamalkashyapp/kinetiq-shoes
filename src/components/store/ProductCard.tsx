'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Plus, Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useToast } from '@/providers/ToastProvider';
import type { ProductItem } from '@/lib/products';

interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 9.5);
  const [quickAdded, setQuickAdded] = useState(false);

  const isFavorited = isInWishlist(product.slug);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isNowIn = toggleWishlist(product.slug);
    toast({
      title: isNowIn ? 'RESERVED TO WISHLIST' : 'REMOVED FROM WISHLIST',
      description: `${product.name} [SIZE ${selectedSize}]`,
      type: isNowIn ? 'success' : 'default',
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock) {
      toast({
        title: 'SILHOUETTE ALLOCATED',
        description: 'This edition is sold out. Join waitlist on PDP.',
        type: 'warn',
      });
      return;
    }

    addItem({
      id: `${product.id}-${selectedSize}`,
      variantId: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      color: product.colors[0]?.name || 'Mono',
      quantity: 1,
      image: product.primaryImage,
    });

    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1500);

    toast({
      title: 'ADDED TO BAG',
      description: `${product.name} // SIZE ${selectedSize} US`,
      type: 'success',
      action: {
        label: 'VIEW BAG',
        onClick: () => openCart(),
      },
    });
  };

  const collectionAccent =
    product.collection === 'pulse'
      ? 'border-acid text-ink bg-acid/20'
      : product.collection === 'terra'
      ? 'border-clay text-paper bg-clay'
      : 'border-line text-ink bg-paper';

  return (
    <div
      data-cursor="VIEW"
      className={`group relative flex flex-col border border-line bg-paper transition-all duration-base hover:border-ink hover:shadow-pop overflow-hidden ${className}`}
    >
      <Link href={`/product/${product.slug}`} className="block flex-1 flex flex-col">
        {/* 4:5 Dominated Image Container */}
        <div className="relative aspect-[4/5] w-full bg-bone overflow-hidden border-b border-line">
          {/* Primary Studio Angle Image */}
          <img
            src={product.primaryImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-3 transition-opacity duration-300 group-hover:opacity-0"
          />

          {/* Secondary Angle Hover Swap Image (320ms crossfade) */}
          <img
            src={product.hoverImage}
            alt={`${product.name} Alternate View`}
            className="absolute inset-0 w-full h-full object-contain p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-105 transition-transform"
          />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span
              className={`micro-label px-2 py-0.5 border text-[9px] font-bold uppercase tracking-widest ${collectionAccent}`}
            >
              {product.collection.toUpperCase()}
            </span>
            {product.isNew && (
              <span className="micro-label px-2 py-0.5 bg-ink text-bone text-[9px] tracking-widest">
                NEW DROP
              </span>
            )}
            {!product.inStock && (
              <span className="micro-label px-2 py-0.5 bg-status-danger text-paper text-[9px] tracking-widest">
                ALLOCATED
              </span>
            )}
          </div>

          {/* Wishlist Toggle Heart Button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-3 right-3 z-10 w-9 h-9 border border-line bg-paper/90 backdrop-blur-sm flex items-center justify-center text-ink hover:border-ink hover:bg-paper transition-all active:scale-90"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited ? 'fill-clay text-clay' : 'text-smoke hover:text-ink'
              }`}
            />
          </button>

          {/* Quick-Add Hover Drawer (Slides up from bottom edge) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 inset-x-0 bg-paper/95 backdrop-blur-md border-t border-line p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-base ease-editorial-out z-20 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="micro-label text-smoke text-[9px]">SELECT US SIZE</span>
              <span className="micro-label text-ink font-bold text-[9px]">
                {product.inStock ? `${product.sizes.length} SIZES READY` : 'SOLD OUT'}
              </span>
            </div>

            {/* Quick Size Pills */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {product.sizes.slice(0, 6).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`px-2 py-1 text-[10px] font-mono border transition-colors shrink-0 ${
                    selectedSize === sz
                      ? 'border-ink bg-ink text-bone'
                      : 'border-line text-smoke hover:border-ink hover:text-ink'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Quick-Add Action Button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className={`w-full h-9 micro-label flex items-center justify-center gap-1.5 transition-colors ${
                quickAdded
                  ? 'bg-status-success text-paper'
                  : product.inStock
                  ? 'bg-acid text-ink hover:bg-[#c9ef30]'
                  : 'bg-smoke/20 text-smoke cursor-not-allowed'
              }`}
            >
              {quickAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>PACKED IN BAG</span>
                </>
              ) : product.inStock ? (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>QUICK ADD // US {selectedSize}</span>
                </>
              ) : (
                <span>NOTIFY UPON RESTOCK</span>
              )}
            </button>
          </div>
        </div>

        {/* Typographic Metadata Card Base */}
        <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-display font-extrabold text-lg md:text-xl text-ink leading-none tracking-tight group-hover:text-smoke transition-colors">
                {product.name}
              </h3>
              {/* Stock Indicator Dot */}
              <div className="flex items-center gap-1 mt-0.5 shrink-0" title={product.inStock ? 'Stock Ready' : 'Sold Out'}>
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.inStock ? 'bg-status-success' : 'bg-status-danger'
                  }`}
                />
              </div>
            </div>
            <p className="micro-label text-smoke text-[9px] tracking-[0.14em]">
              WT: {product.weight}G // DROP: {product.drop}MM
            </p>
          </div>

          <div className="pt-2 border-t border-line-soft flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-sm md:text-base font-bold text-ink">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-xs text-smoke line-through">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="micro-label text-smoke text-[9px]">
              ★ {product.rating} ({product.ratingCount})
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
