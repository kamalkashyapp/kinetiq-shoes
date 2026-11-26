'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ALL_PRODUCTS, filterProducts } from '@/lib/products';
import { ProductCard } from '@/components/store/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PLACEHOLDERS } from '@/lib/assets';
import { ArrowLeft, ArrowDown, Mountain, Zap, Square } from 'lucide-react';

const COLLECTION_METADATA = {
  terra: {
    name: 'TERRA',
    tagline: 'TRAIL / ALL-TERRAIN ARCHITECTURE',
    headline: 'BASALT & SCREE PROPULSION.',
    description:
      'Engineered for steep ascents, loose shale, and torrential mountain weather. Built with high-friction Basalt-X rubber compounds and waterproof ballistic rands.',
    accent: '#B4553A',
    badgeVariant: 'clay' as const,
    stats: [
      { label: 'OUTSOLE DEPTH', val: '5.5MM CHEVRON' },
      { label: 'ELEVATION TESTED', val: '4,800M ALPINE' },
      { label: 'CHASSIS PROTECTION', val: 'STONE SHIELD' },
      { label: 'COLLECTION MODELS', val: '8 SILHOUETTES' },
    ],
    heroBanner: '/images/products/terra-ridge.jpg',
    icon: Mountain,
  },
  pulse: {
    name: 'PULSE',
    tagline: 'PERFORMANCE ROAD RACING',
    headline: 'AERODYNAMIC VELOCITY PLATFORM.',
    description:
      'Monofilament engineered mesh, 3D photopolymer lattice dampening, and S-curve carbon propulsion plates. Built to convert downward impact force into forward flight.',
    accent: '#D9FF43',
    badgeVariant: 'acid' as const,
    stats: [
      { label: 'FEATHERWEIGHT', val: '210G BENCHMARK' },
      { label: 'ENERGY EFFICIENCY', val: '88.4% RETURN' },
      { label: 'PROPULSION', val: 'S-CURVE CARBON' },
      { label: 'COLLECTION MODELS', val: '8 SILHOUETTES' },
    ],
    heroBanner: '/images/products/pulse-01.jpg',
    icon: Zap,
  },
  form: {
    name: 'FORM',
    tagline: 'LIFESTYLE // ESSENTIAL ARCHITECTURE',
    headline: 'MONOCHROME DAILY ARCHITECTURE.',
    description:
      'Clean geometric silhouettes crafted in full-grain Italian calfskin suede, unbleached duck canvas, and sculpted ortholite anatomical beds. Hairline tolerances.',
    accent: '#F3F0E9',
    badgeVariant: 'outline' as const,
    stats: [
      { label: 'MATERIAL', val: 'ITALIAN SUEDE' },
      { label: 'EYELETS', val: 'BLIND RECESSED' },
      { label: 'CONSTRUCTION', val: 'STITCHED CUPSOLE' },
      { label: 'COLLECTION MODELS', val: '8 SILHOUETTES' },
    ],
    heroBanner: '/images/products/form-zero.jpg',
    icon: Square,
  },
};

export default function CollectionLandingPage() {
  const params = useParams();
  const slug = (params.slug as string)?.toLowerCase();

  const metadata = COLLECTION_METADATA[slug as keyof typeof COLLECTION_METADATA];
  if (!metadata) {
    notFound();
  }

  const products = useMemo(() => {
    return filterProducts(ALL_PRODUCTS, { collection: slug });
  }, [slug]);

  const Icon = metadata.icon;

  return (
    <div className="w-full bg-bone text-ink">
      {/* 1. EDITORIAL HERO WITH PINNED COMPOSITION MOMENT */}
      <section className="relative min-h-[75vh] border-b border-line px-4 md:px-10 py-12 md:py-16 flex flex-col justify-between overflow-hidden bg-paper">
        {/* Top Eyebrow */}
        <div className="flex justify-between items-center z-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-smoke hover:text-ink uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL SILHOUETTES</span>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant={metadata.badgeVariant}>{metadata.name} COLLECTION</Badge>
            <span className="micro-label text-smoke">SERIES 01</span>
          </div>
        </div>

        {/* Hero Headline & Editorial Split */}
        <div className="my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-smoke" />
              <span className="micro-label text-smoke tracking-[0.2em]">{metadata.tagline}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink uppercase leading-tight">
              {metadata.headline}
            </h1>
            <p className="text-sm md:text-base font-sans text-smoke max-w-xl leading-relaxed mt-4">
              {metadata.description}
            </p>
            <div className="pt-4 flex items-center gap-4">
              <a href="#collection-grid">
                <Button variant={slug === 'pulse' ? 'acid' : 'primary'} size="lg">
                  VIEW {metadata.name} MODELS [{products.length}]
                  <ArrowDown className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>

          {/* Editorial Photographic Composition */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md aspect-[4/5] border border-line bg-bone shadow-pop overflow-hidden relative">
              <img
                src={products[0]?.primaryImage || metadata.heroBanner}
                alt={`${metadata.name} Hero`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-paper/90 backdrop-blur-sm p-3 border border-line flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-xs">{products[0]?.name}</p>
                  <p className="micro-label text-smoke text-[9px]">{metadata.tagline}</p>
                </div>
                <span className="font-mono text-xs font-bold">₹{products[0]?.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Stats Strip */}
        <div className="pt-6 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
          {metadata.stats.map((stat, idx) => (
            <div key={idx}>
              <p className="micro-label text-smoke">{stat.label}</p>
              <p className="font-display font-bold text-xl md:text-2xl text-ink mt-0.5">{stat.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. FILTERED COLLECTION PRODUCT GRID */}
      <section id="collection-grid" className="max-w-page mx-auto px-4 md:px-10 py-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <span className="micro-label text-smoke">SPECIFICATION ROSTER</span>
            <h2 className="font-display text-3xl font-extrabold uppercase">
              {metadata.name} LINEUP [{products.length} MODELS]
            </h2>
          </div>
          <span className="micro-label text-smoke text-[10px]">
            ALL MODELS READY FOR COMPLIMENTARY DOMESTIC DISPATCH
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
