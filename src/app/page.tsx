'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Wind,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';
import { Magnetic } from '@/components/motion/Magnetic';
import { Counter } from '@/components/motion/Counter';
import { ProductCard } from '@/components/store/ProductCard';
import { KineticShowcase3D } from '@/components/store/KineticShowcase3D';
import { HeroShoe3D } from '@/components/store/HeroShoe3D';
import { ALL_PRODUCTS, type ProductItem } from '@/lib/products';
import { generateProductSvg, PLACEHOLDERS } from '@/lib/assets';

export default function HomePage() {
  // Top 4 featured sneakers across the 3 disciplines
  const featuredProducts: ProductItem[] = [
    ALL_PRODUCTS.find((p) => p.slug === 'pulse-01') || ALL_PRODUCTS[0],
    ALL_PRODUCTS.find((p) => p.slug === 'terra-ridge') || ALL_PRODUCTS[1],
    ALL_PRODUCTS.find((p) => p.slug === 'pulse-speed-carbon') || ALL_PRODUCTS[2],
    ALL_PRODUCTS.find((p) => p.slug === 'form-zero') || ALL_PRODUCTS[3],
  ];

  return (
    <div className="w-full space-y-16 lg:space-y-24">
      {/* 1. HERO SCROLL NARRATIVE STAGE */}
      <section className="relative min-h-[90vh] flex flex-col justify-between px-4 sm:px-6 lg:px-10 py-10 lg:py-16 border-b border-line overflow-hidden bg-bone">
        {/* Top Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-3">
            <Badge variant="acid" className="font-bold">
              SERIES 01 // K-LATTICE
            </Badge>
            <span className="micro-label text-smoke">
              210G AERODYNAMIC LIGHTNESS · CASHFREE PAYMENTS (INR)
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-smoke">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>DISPATCHING NATIONWIDE VIA BLUEDART AIR</span>
          </div>
        </div>

        {/* Center Display Headline & Interactive Sneaker Hero */}
        <div className="my-auto py-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Typography & CTAs (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="micro-label text-smoke tracking-[0.2em] block">
              ENGINEERED RUNNING FLAGSHIP
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink uppercase leading-tight">
              WEIGHTLESS BY DESIGN.
            </h1>

            <p className="text-sm sm:text-base font-sans text-smoke max-w-xl leading-relaxed">
              Kinetic footwear engineered with high-precision lattice cushioning and aerodynamic lightness.
              Zero ungrounded materials. 210 grams of pure forward propulsion.
            </p>

            {/* CTAs with Magnetic Micro-Interaction */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Magnetic strength={8}>
                <Link href="/shop">
                  <Button variant="acid" size="lg" className="h-14 px-8 text-xs font-bold shadow-md">
                    <span>EXPLORE THE MATRIX</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Magnetic>

              <Magnetic strength={8}>
                <Link href="/collections/pulse">
                  <Button variant="primary" size="lg" className="h-14 px-8 text-xs font-bold">
                    <span>DISCOVER PULSE SERIES</span>
                  </Button>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Right: Interactive 3D Hero Stage with 360° Rotation (5 columns) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <HeroShoe3D />
          </div>
        </div>

        {/* Bottom Technical Performance Counters */}
        <div className="pt-8 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-6 z-10">
          <div>
            <p className="micro-label text-smoke">01 // SILHOUETTE WEIGHT</p>
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-ink">
              <Counter to={210} suffix="G" duration={0.8} />
            </div>
            <p className="text-[11px] font-mono text-smoke">Aerodynamic mono-mesh</p>
          </div>

          <div>
            <p className="micro-label text-smoke">02 // KINETIC ENERGY RETURN</p>
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-ink">
              <Counter to={88.4} suffix="%" duration={1.0} />
            </div>
            <p className="text-[11px] font-mono text-smoke">Superfoam + carbon lattice</p>
          </div>

          <div>
            <p className="micro-label text-smoke">03 // HEEL-TO-TOE DROP</p>
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-ink">
              <Counter to={4} suffix="MM" duration={0.6} />
            </div>
            <p className="text-[11px] font-mono text-smoke">Biomechanical natural strike</p>
          </div>

          <div>
            <p className="micro-label text-smoke">04 // OUTSOLE GRIP COMPOUND</p>
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-ink">
              BASALT-X
            </div>
            <p className="text-[11px] font-mono text-smoke">Micro-lugged all-weather traction</p>
          </div>
        </div>
      </section>

      {/* 2. 3D PERSPECTIVE FLOATING CAROUSEL (SSENSE / NIKE REFERENCE) */}
      <KineticShowcase3D />

      {/* 3. HIGH-VELOCITY TECHNICAL MARQUEE */}
      <div className="py-2 bg-ink text-paper border-y border-line overflow-hidden">
        <Marquee speed={36} pauseOnHover>
          <div className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] px-4 font-bold">
            <span className="text-acid">● KINETIQ LABS</span>
            <span>BASALT-X DUAL TRACTION</span>
            <span>210G AERODYNAMIC MESH</span>
            <span className="text-acid">● K-LATTICE 3D PRINTED SUPERFOAM</span>
            <span>CASHFREE PG IN INR</span>
            <span>14-DAY COMPLIMENTARY EXCHANGES</span>
            <span className="text-acid">● ZERO UNGROUNDED MATERIALS</span>
          </div>
        </Marquee>
      </div>

      {/* 3. FEATURED SILHOUETTES CURATED GRID */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <span className="micro-label text-smoke">RUNNING ARCHITECTURE</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-ink mt-1">
              CURATED DROPS // EDITION 01
            </h2>
          </div>

          <Link href="/shop" className="text-xs font-mono uppercase tracking-wider text-smoke hover:text-ink flex items-center gap-1 font-bold underline">
            <span>VIEW ALL 24 SILHOUETTES</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. K-LATTICE 3D BIOMECHANICS BREAKDOWN */}
      <section className="bg-paper border-y border-line py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="micro-label text-acid bg-ink px-2.5 py-0.5 font-bold">
              PROPRIETARY LATTICE ARCHITECTURE
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-ink">
              HOW K-LATTICE SHIFTS KINETIC ENERGY
            </h2>
            <p className="font-mono text-xs sm:text-sm text-smoke leading-relaxed">
              Traditional solid EVA midsoles trap vertical force as heat. KINETIQ prints an open-cell Voronoi lattice tuned to redirect heel-strike vectors into forward propulsion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cell 1 */}
            <div className="p-6 border border-line bg-bone/30 space-y-4">
              <div className="w-12 h-12 bg-paper border border-line flex items-center justify-center text-ink font-mono font-bold text-lg">
                01
              </div>
              <h3 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
                IMPACT ATTENUATION
              </h3>
              <p className="font-mono text-xs text-smoke leading-relaxed">
                3D Voronoi cells compress anisotropically upon contact, absorbing 34% more peak G-force than conventional marathon superfoams.
              </p>
            </div>

            {/* Cell 2 */}
            <div className="p-6 border border-line bg-bone/30 space-y-4">
              <div className="w-12 h-12 bg-paper border border-line flex items-center justify-center text-ink font-mono font-bold text-lg">
                02
              </div>
              <h3 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
                VECTOR PROPULSION
              </h3>
              <p className="font-mono text-xs text-smoke leading-relaxed">
                A featherweight aerospace carbon fiber vector plate anchors the lattice core, snapping back with 88.4% energy rebound per stride.
              </p>
            </div>

            {/* Cell 3 */}
            <div className="p-6 border border-line bg-bone/30 space-y-4">
              <div className="w-12 h-12 bg-paper border border-line flex items-center justify-center text-ink font-mono font-bold text-lg">
                03
              </div>
              <h3 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
                THERMAL VENTILATION
              </h3>
              <p className="font-mono text-xs text-smoke leading-relaxed">
                Open channels pump ambient air through the sole with every heel-to-toe transition, keeping internal foot temperature 4.2°C cooler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THREE TERRAIN DISCIPLINES (TRIPTYCH) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <span className="micro-label text-smoke">COLLECTION DISCIPLINE TRIPTYCH</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-ink mt-1">
              THREE FORM FACTORS. ONE CODE.
            </h2>
          </div>
          <p className="font-mono text-xs text-smoke max-w-sm">
            Calibrated for technical trails, record-breaking road marathons, and clean everyday architectural wear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* TERRA */}
          <Link
            href="/collections/terra"
            className="group block border border-line bg-paper p-6 hover:border-ink transition-colors shadow-sm"
          >
            <div className="aspect-[4/5] bg-bone border border-line overflow-hidden mb-4 relative">
              <Image
                src="/images/products/terra-ridge.jpg"
                alt="TERRA Collection"
                fill
                unoptimized
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="clay">TERRA</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-2xl uppercase tracking-tight">TERRA</h3>
              <ArrowUpRight className="w-5 h-5 text-smoke group-hover:text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="micro-label text-smoke mt-1">TRAIL // ALL-TERRAIN</p>
            <p className="text-xs text-smoke mt-2 font-mono leading-relaxed">
              Basalt-X lugged compound, earth tones, waterproof membrane, warm clay accents.
            </p>
          </Link>

          {/* PULSE */}
          <Link
            href="/collections/pulse"
            className="group block border border-line bg-paper p-6 hover:border-ink transition-colors shadow-sm"
          >
            <div className="aspect-[4/5] bg-bone border border-line overflow-hidden mb-4 relative">
              <Image
                src="/images/products/pulse-01.jpg"
                alt="PULSE Collection"
                fill
                unoptimized
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="acid">PULSE</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-2xl uppercase tracking-tight">PULSE</h3>
              <ArrowUpRight className="w-5 h-5 text-smoke group-hover:text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="micro-label text-smoke mt-1">PERFORMANCE // ROAD</p>
            <p className="text-xs text-smoke mt-2 font-mono leading-relaxed">
              Carbon vector plate, 3D printed lattice midsole, engineered mono-mesh with acid highlights.
            </p>
          </Link>

          {/* FORM */}
          <Link
            href="/collections/form"
            className="group block border border-line bg-paper p-6 hover:border-ink transition-colors shadow-sm"
          >
            <div className="aspect-[4/5] bg-bone border border-line overflow-hidden mb-4 relative">
              <Image
                src="/images/products/form-zero.jpg"
                alt="FORM Collection"
                fill
                unoptimized
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="outline">FORM</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-2xl uppercase tracking-tight">FORM</h3>
              <ArrowUpRight className="w-5 h-5 text-smoke group-hover:text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="micro-label text-smoke mt-1">LIFESTYLE // MONOCHROME</p>
            <p className="text-xs text-smoke mt-2 font-mono leading-relaxed">
              Minimal monochrome silhouette, full-grain calfskin suede, sculpted ortholite footbed.
            </p>
          </Link>
        </div>
      </section>

      {/* 6. CALL TO ACTION FINALE */}
      <section className="bg-ink text-paper py-20 px-4 sm:px-6 lg:px-8 border-t border-line text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="micro-label text-acid uppercase tracking-[0.2em] font-bold">
            EXPERIENCE WEIGHTLESS PROPULSION
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-paper">
            JOIN THE MATRIX.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-smoke leading-relaxed max-w-lg mx-auto">
            All 24 footwear editions are backed by 14-day complimentary exchanges and secure Cashfree checkout in INR.
          </p>
          <div className="pt-4 flex justify-center">
            <Link href="/shop">
              <Button variant="acid" size="lg" className="h-14 px-10 text-xs font-bold text-ink shadow-lg">
                <span>SHOP ALL FOOTWEAR</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
