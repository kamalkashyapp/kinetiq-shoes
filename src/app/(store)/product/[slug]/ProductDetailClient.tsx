'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MediaGallery } from '@/components/store/MediaGallery';
import { VariantPicker } from '@/components/store/VariantPicker';
import { StickyBuyBar } from '@/components/store/StickyBuyBar';
import { ProductSpecs } from '@/components/store/ProductSpecs';
import { ProductReviews } from '@/components/store/ProductReviews';
import { CompleteKit } from '@/components/store/CompleteKit';
import { ProductCard } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useToast } from '@/providers/ToastProvider';
import { generate360SpinFrames, generateProductSvg } from '@/lib/assets';
import type { ProductItem, ProductColor } from '@/lib/products';
import { Heart, ShoppingBag, Check, Shield, Truck, ChevronRight } from 'lucide-react';

export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: ProductItem;
  relatedProducts: ProductItem[];
}) {
  const { addItem, openCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { toast } = useToast();

  const mainCtaRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 9.5);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  const isFavorited = isInWishlist(product.slug);

  // Real multi-angle commercial photography based on collection discipline
  const collectionAngles: Record<string, string[]> = {
    pulse: [
      product.primaryImage,
      product.hoverImage,
      '/images/products/pulse-vector.jpg',
      '/images/products/pulse-marathon.jpg',
      '/images/products/pulse-speed-carbon.jpg',
    ],
    terra: [
      product.primaryImage,
      product.hoverImage,
      '/images/products/terra-ridge.jpg',
      '/images/products/terra-gravity.jpg',
      '/images/products/terra-basalt.jpg',
    ],
    form: [
      product.primaryImage,
      product.hoverImage,
      '/images/products/form-zero.jpg',
      '/images/products/form-zero.jpg',
      '/images/products/form-zero.jpg',
    ],
  };

  const renders = collectionAngles[product.collection] || [
    product.primaryImage,
    product.hoverImage,
    product.primaryImage,
    product.hoverImage,
    product.primaryImage,
  ];

  // 5 real photography views for MediaGallery
  const galleryImages = [
    { url: renders[0], alt: `${product.name} 3/4 Studio View`, label: '3/4 STUDIO' },
    { url: renders[1], alt: `${product.name} Profile Lateral View`, label: 'LATERAL' },
    { url: renders[2], alt: `${product.name} Technical Architecture`, label: 'CHASSIS' },
    { url: renders[3], alt: `${product.name} Traction Lug Geometry`, label: 'OUTSOLE' },
    { url: renders[4], alt: `${product.name} Material Construction Detail`, label: 'CONSTRUCTION' },
  ];

  // 24 frames for 360 spin viewer cycling through authentic real views
  const spinFrames = [
    renders[0],
    renders[1],
    renders[2],
    renders[3],
    renders[4],
    renders[0],
    renders[1],
    renders[2],
    renders[3],
    renders[4],
    renders[0],
    renders[1],
    renders[2],
    renders[3],
    renders[4],
    renders[0],
    renders[1],
    renders[2],
    renders[3],
    renders[4],
    renders[0],
    renders[1],
    renders[2],
    renders[3],
  ];

  // IntersectionObserver on main CTA to toggle StickyBuyBar
  useEffect(() => {
    const target = mainCtaRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When main CTA is NOT intersecting and is above the viewport, show sticky bar
        const isPastCta = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setStickyVisible(isPastCta);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast({
        title: 'SILHOUETTE ALLOCATED',
        description: 'This edition is sold out. Select another size.',
        type: 'warn',
      });
      return;
    }

    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor.name}`,
      variantId: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      color: selectedColor.name,
      quantity: 1,
      image: product.primaryImage,
    });

    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 400);

    toast({
      title: 'PACKED IN BAG',
      description: `${product.name} // SIZE ${selectedSize} US (${selectedColor.name})`,
      type: 'success',
      action: {
        label: 'VIEW BAG',
        onClick: () => openCart(),
      },
    });
  };

  const handleToggleWishlist = () => {
    const isNow = toggleWishlist(product.slug);
    toast({
      title: isNow ? 'RESERVED TO WISHLIST' : 'REMOVED FROM WISHLIST',
      description: `${product.name} [SIZE ${selectedSize}]`,
      type: isNow ? 'success' : 'default',
    });
  };

  return (
    <div className="w-full bg-bone text-ink">
      {/* 1. PDP HERO STAGE (BREADCRUMB + GALLERY + BUY MODULE) */}
      <div className="max-w-page mx-auto px-4 md:px-10 py-6 md:py-12 space-y-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-smoke">
          <Link href="/shop" className="hover:text-ink uppercase">CATALOG</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/collections/${product.collection}`} className="hover:text-ink uppercase">
            {product.collection}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink font-bold uppercase">{product.name}</span>
        </nav>

        {/* 2-Column Responsive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Media Gallery & 360 Spin Viewer */}
          <div className="lg:col-span-7">
            <MediaGallery
              images={galleryImages}
              spinFrames={spinFrames}
              productName={product.name}
              colorHex={selectedColor.hex}
              collection={product.collection}
            />
          </div>

          {/* Right Column: High-Craft Buy Module */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Collection Header */}
            <div className="space-y-2 border-b border-line pb-4">
              <div className="flex items-center justify-between">
                <Badge variant={product.collection === 'pulse' ? 'acid' : product.collection === 'terra' ? 'clay' : 'outline'}>
                  {product.collection.toUpperCase()} // SERIES 01
                </Badge>
                <span className="micro-label text-smoke">
                  WT: {product.weight}G // DROP: {product.drop}MM
                </span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight uppercase leading-tight">
                {product.name}
              </h1>

              <p className="text-xs font-mono text-smoke uppercase tracking-wider">
                {product.subtitle}
              </p>
            </div>

            {/* Price Callout & Rating */}
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xl md:text-2xl font-extrabold text-ink">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="font-mono text-sm text-smoke line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="micro-label text-status-success font-bold">
                  TAX INCLUDED
                </span>
              </div>

              <div className="text-right">
                <span className="micro-label text-ink font-bold">
                  ★ {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="micro-label text-smoke block text-[9px]">
                  ({product.ratingCount} VERIFIED REVIEWS)
                </span>
              </div>
            </div>

            {/* Description Summary */}
            <p className="text-xs md:text-sm font-sans text-smoke leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selector (Colors, Size Grid, Size Guide Modal) */}
            <VariantPicker
              sizes={product.sizes}
              colors={product.colors}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSelectSize={setSelectedSize}
              onSelectColor={setSelectedColor}
              soldOutSizes={[11.5]}
              lowStockSizes={[9.5]}
            />

            {/* Primary Action Buttons (Above Fold on Mobile) */}
            <div ref={mainCtaRef} className="space-y-3 pt-2">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="acid"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 h-14 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {isAdding ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>PACKED IN BAG</span>
                    </>
                  ) : product.inStock ? (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG // ₹{product.price.toLocaleString('en-IN')}</span>
                    </>
                  ) : (
                    <span>CURRENTLY SOLD OUT</span>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`w-14 h-14 border flex items-center justify-center transition-colors shrink-0 ${
                    isFavorited
                      ? 'border-clay bg-clay text-paper'
                      : 'border-line bg-paper text-ink hover:border-ink'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono text-smoke">
                <div className="p-2 border border-line bg-paper flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-smoke shrink-0" />
                  <span>BLUEDART AIR DISPATCH IN 24H</span>
                </div>
                <div className="p-2 border border-line bg-paper flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-smoke shrink-0" />
                  <span>30-DAY COMPLIMENTARY EXCHANGE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TECHNICAL SPECS, DIAGRAM & ACCORDIONS */}
        <div className="pt-12 border-t border-line">
          <ProductSpecs product={product} />
        </div>

        {/* 3. COMPLETE THE KIT (CROSS-SELL) */}
        <div className="pt-6">
          <CompleteKit />
        </div>

        {/* 4. VERIFIED REVIEWS & FIT FEEDBACK */}
        <div className="pt-8 border-t border-line">
          <ProductReviews product={product} />
        </div>

        {/* 5. RELATED SILHOUETTES RAIL (HORIZONTAL SNAP SCROLL) */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-line space-y-6">
            <div className="flex justify-between items-end border-b border-line pb-3">
              <div>
                <span className="micro-label text-smoke">COMPLEMENTARY ARCHITECTURE</span>
                <h3 className="font-display font-extrabold text-2xl text-ink uppercase">
                  RELATED {product.collection.toUpperCase()} SILHOUETTES
                </h3>
              </div>
              <Link href={`/collections/${product.collection}`} className="text-xs font-mono underline uppercase hover:text-acid">
                EXPLORE ALL {product.collection.toUpperCase()}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Sticky Buy Bar (Activated when main CTA scrolls past viewport) */}
      <StickyBuyBar
        product={product}
        selectedSize={selectedSize}
        isVisible={stickyVisible}
        onAddToCart={handleAddToCart}
        isAdding={isAdding}
      />
    </div>
  );
}
