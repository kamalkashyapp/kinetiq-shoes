'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { ALL_PRODUCTS, type ProductItem } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { useToast } from '@/providers/ToastProvider';

export function WishlistClient() {
  const { items, removeFromWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const { toast } = useToast();

  const favoritedProducts: ProductItem[] = items
    .map((slug: string) => ALL_PRODUCTS.find((p: ProductItem) => p.slug === slug))
    .filter((p): p is ProductItem => p !== undefined);

  const handleMoveToBag = (product: ProductItem) => {
    const size = product.sizes[0] || 10.0;
    addItem({
      id: `${product.id}-${size}`,
      variantId: `${product.id}-${size}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size,
      color: product.colors[0]?.name || 'Mono',
      quantity: 1,
      image: product.primaryImage,
    });

    removeFromWishlist(product.slug);

    toast({
      title: 'MOVED TO BAG',
      description: `${product.name} (US ${size}) transferred from wishlist to active bag.`,
      type: 'success',
    });

    openCart();
  };

  if (favoritedProducts.length === 0) {
    return (
      <div className="border border-line bg-paper p-12 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 border border-line bg-bone flex items-center justify-center mx-auto text-smoke">
          <Heart className="w-7 h-7 stroke-1" />
        </div>
        <h3 className="font-display font-bold text-2xl uppercase tracking-tight">
          NO RESERVED SILHOUETTES
        </h3>
        <p className="font-mono text-xs text-smoke max-w-sm mx-auto uppercase tracking-wider leading-relaxed">
          Your personal wishlist is currently empty. Star your favorite trail, road, or lifestyle pairs to save for later drops.
        </p>
        <div className="pt-4">
          <Link href="/shop">
            <Button variant="primary">EXPLORE RUNNING ARCHITECTURE</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="micro-label text-smoke">SAVED RUN MATRIX</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
            RESERVED WISHLIST ({favoritedProducts.length})
          </h2>
        </div>
        <p className="font-mono text-xs text-smoke">
          Saved silhouettes remain stored in your client profile
        </p>
      </div>

      {/* Grid of Wishlist Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoritedProducts.map((product) => (
          <div
            key={product.id}
            className="border border-line bg-paper flex flex-col justify-between group shadow-sm hover:border-ink transition-colors"
          >
            {/* Top 4:5 Image */}
            <div className="relative aspect-[4/5] bg-bone border-b border-line overflow-hidden">
              <Link href={`/product/${product.slug}`} className="block w-full h-full">
                <Image
                  src={product.primaryImage}
                  alt={product.name}
                  fill
                  className="object-cover p-2 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 320px"
                />
              </Link>

              {/* Remove heart button */}
              <button
                onClick={() => removeFromWishlist(product.slug)}
                className="absolute top-3 right-3 p-2 bg-paper/90 border border-line text-clay hover:bg-paper transition-colors shadow-sm"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <span className="absolute bottom-3 left-3 micro-label bg-paper px-2 py-0.5 border border-line uppercase">
                {product.collection}
              </span>
            </div>

            {/* Info & Action */}
            <div className="p-4 space-y-3">
              <div>
                <Link
                  href={`/product/${product.slug}`}
                  className="font-display font-bold text-base hover:text-smoke truncate block"
                >
                  {product.name}
                </Link>
                <p className="micro-label text-smoke mt-0.5">
                  WEIGHT: {product.weight}G · DROP: {product.drop}MM
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-sm">
                <span className="font-bold text-ink">₹{product.price.toLocaleString('en-IN')}</span>
                {product.compareAtPrice && (
                  <span className="text-smoke line-through text-xs">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <Button
                variant="acid"
                className="w-full h-10 text-xs font-bold flex items-center justify-center gap-1.5"
                onClick={() => handleMoveToBag(product)}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>MOVE TO BAG (US 10.0)</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
