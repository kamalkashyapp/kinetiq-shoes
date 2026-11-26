'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/store/ProductCard';
import { ALL_PRODUCTS } from '@/lib/products';
import { useWishlistStore } from '@/store/useWishlistStore';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const wishlistedProducts = ALL_PRODUCTS.filter((p) => items.includes(p.id));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-8">
        <div>
          <div className="flex items-center gap-3">
            <Badge variant="acid">CURATED ARCHIVE</Badge>
            <span className="micro-label text-smoke">SAVED SILHOUETTES</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter mt-2">
            YOUR WISHLIST
          </h1>
          <p className="font-mono text-xs text-smoke mt-1">
            {wishlistedProducts.length} silhouette{wishlistedProducts.length === 1 ? '' : 's'} staged for acquisition.
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearWishlist}
            className="font-mono text-xs text-smoke hover:text-ink"
          >
            CLEAR ARCHIVE
          </Button>
        )}
      </div>

      {/* Grid or Empty State */}
      {wishlistedProducts.length === 0 ? (
        <div className="border border-line bg-paper p-12 lg:p-20 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-bone border border-line flex items-center justify-center mx-auto text-smoke">
            <Heart className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
              NO SILHOUETTES CURRENTLY ARCHIVED
            </h2>
            <p className="font-mono text-xs text-smoke max-w-md mx-auto">
              Explore our technical catalog across TERRA, PULSE, and FORM disciplines. Tap the heart glyph on any silhouette to preserve it here.
            </p>
          </div>
          <Button asChild className="bg-ink text-bone hover:bg-ink/90 font-mono text-xs">
            <Link href="/shop">
              EXPLORE FULL CATALOG <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
