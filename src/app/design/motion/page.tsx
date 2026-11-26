'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TextReveal,
  Reveal,
  Stagger,
  StaggerItem,
  ParallaxImage,
  Marquee,
  Magnetic,
  Counter,
  ScrollRail,
  ScrollRailPanel,
  ImageFrame,
  Skeleton,
} from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useReducedMotionManager } from '@/providers/ReducedMotionProvider';
import { PLACEHOLDERS } from '@/lib/assets';
import { Sparkles, ArrowRight, Play, RefreshCw, Eye } from 'lucide-react';

export default function MotionDemoPage() {
  const { forcedReducedMotion, toggleForcedReducedMotion, shouldReduceMotion } =
    useReducedMotionManager();
  const [replayKey, setReplayKey] = useState(0);

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
  };

  return (
    <div key={replayKey} className="w-full bg-bone text-ink">
      {/* Top Header / Simulation Controls */}
      <section className="max-w-page mx-auto px-4 md:px-10 py-12 md:py-16 border-b border-line">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="acid">PHASE 1 // MOTION SYSTEM</Badge>
              <Badge variant="outline">SRC/LIB/MOTION.TS</Badge>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
              MOTION PRIMITIVES
            </h1>
            <p className="text-xs md:text-sm font-mono text-smoke mt-2 max-w-xl">
              12 production-grade animation primitives built with motion/react & Lenis. Every primitive contains an immediate static fallback for prefers-reduced-motion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant={forcedReducedMotion ? 'acid' : 'secondary'}
              size="sm"
              onClick={toggleForcedReducedMotion}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {forcedReducedMotion ? 'REDUCED MOTION: ACTIVE (STATIC FALLBACK)' : 'SIMULATE REDUCED MOTION'}
            </Button>

            <Button variant="primary" size="sm" onClick={handleReplay}>
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              RE-TRIGGER ENTRANCES
            </Button>

            <Link href="/design">
              <Button variant="secondary" size="sm">
                BACK TO TOKENS
              </Button>
            </Link>
          </div>
        </div>

        {shouldReduceMotion && (
          <div className="mt-6 p-4 bg-acid/15 border border-acid text-ink flex items-center justify-between">
            <span className="micro-label font-bold text-xs">
              ⚡ REDUCED MOTION ACTIVE — ALL 12 PRIMITIVES RENDERING INSTANT STATIC STATES WITH ZERO TRANSITIONS
            </span>
            <span className="micro-label text-smoke text-[10px]">WCAG 2.2 AA VERIFIED</span>
          </div>
        )}
      </section>

      {/* 01 // TEXT REVEAL */}
      <section className="max-w-page mx-auto px-4 md:px-10 py-16 border-b border-line space-y-6">
        <div className="flex justify-between items-center border-b border-line pb-3">
          <span className="micro-label text-smoke">01 // TEXT REVEAL PRIMITIVE</span>
          <span className="text-[10px] font-mono text-smoke">MASKED WORD CLIP · 28MS STAGGER</span>
        </div>
        <div className="bg-paper p-8 border border-line space-y-4">
          <TextReveal
            as="h2"
            text="WEIGHTLESS ARCHITECTURE DESIGNED FOR RAW KINETIC VELOCITY."
            className="font-display text-4xl md:text-6xl font-bold tracking-tight text-ink"
            staggerMs={28}
          />
          <TextReveal
            as="p"
            text="Engineered with dual-density lattice cushioning and monolithic carbon propulsion plates. Manufactured in zero-gravity simulation environments."
            className="text-sm md:text-base font-sans text-smoke max-w-2xl leading-relaxed"
            delay={0.2}
          />
        </div>
      </section>

      {/* 02 // REVEAL & STAGGER */}
      <section className="max-w-page mx-auto px-4 md:px-10 py-16 border-b border-line space-y-6">
        <div className="flex justify-between items-center border-b border-line pb-3">
          <span className="micro-label text-smoke">02 // REVEAL & STAGGER CONTAINER</span>
          <span className="text-[10px] font-mono text-smoke">FADE + 16PX RISE + 80MS CHILD ORCHESTRATION</span>
        </div>
        <Stagger interval={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem className="p-6 border border-line bg-paper space-y-3">
            <Badge variant="acid">01 // PULSE</Badge>
            <h3 className="font-display text-2xl font-bold">FEATHERWEIGHT MESH</h3>
            <p className="text-xs text-smoke font-sans">
              Single-thread monofilament lattice providing unencumbered airflow and structural lock.
            </p>
          </StaggerItem>

          <StaggerItem className="p-6 border border-line bg-paper space-y-3">
            <Badge variant="clay">02 // TERRA</Badge>
            <h3 className="font-display text-2xl font-bold">BASALT TRACTION</h3>
            <p className="text-xs text-smoke font-sans">
              Multi-directional aggressive 5mm lugs engineered for wet granite and loose scree.
            </p>
          </StaggerItem>

          <StaggerItem className="p-6 border border-line bg-paper space-y-3">
            <Badge variant="outline">03 // FORM</Badge>
            <h3 className="font-display text-2xl font-bold">MONOCHROME CALFSKIN</h3>
            <p className="text-xs text-smoke font-sans">
              Precision laser-perforated Italian suede with seamless thermal welding.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* 03 // MARQUEE */}
      <section className="py-12 border-b border-line bg-ink text-bone space-y-4">
        <div className="max-w-page mx-auto px-4 md:px-10 flex justify-between items-center">
          <span className="micro-label text-acid">03 // INFINITE MARQUEE TICKER</span>
          <span className="text-[10px] font-mono text-smoke">SEAMLESS GPU LOOP · PAUSES ON HOVER</span>
        </div>
        <Marquee speed={22} className="py-4 border-y border-bone/15">
          <span className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-bone">
            KINETIQ // SERIES 01
          </span>
          <span className="text-acid font-mono text-2xl">//</span>
          <span className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-bone">
            WEIGHTLESS BY DESIGN
          </span>
          <span className="text-acid font-mono text-2xl">//</span>
          <span className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-bone">
            210 GRAMS TOTAL PACKAGE
          </span>
          <span className="text-acid font-mono text-2xl">//</span>
          <span className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-bone">
            K-LATTICE DAMPING
          </span>
          <span className="text-acid font-mono text-2xl">//</span>
        </Marquee>
      </section>

      {/* 04 // MAGNETIC & CUSTOM CURSOR */}
      <section className="max-w-page mx-auto px-4 md:px-10 py-16 border-b border-line space-y-6">
        <div className="flex justify-between items-center border-b border-line pb-3">
          <span className="micro-label text-smoke">04 // MAGNETIC INTERACTION & CURSOR LABELS</span>
          <span className="text-[10px] font-mono text-smoke">POINTER GRAVITY MAX 8PX · HOVER LABELS</span>
        </div>
        <div className="bg-paper p-8 border border-line grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold">MAGNETIC SPRING TARGETS</h3>
            <p className="text-xs text-smoke font-sans leading-relaxed">
              Hover near buttons to experience magnetic translation (clamped to 8px max travel with spring return). Disabled automatically on touch screens.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Magnetic strength={8}>
                <Button variant="acid" size="lg">
                  MAGNETIC ACID CTA
                </Button>
              </Magnetic>
              <Magnetic strength={8}>
                <Button variant="primary" size="lg">
                  MAGNETIC PRIMARY
                </Button>
              </Magnetic>
              <Magnetic strength={6}>
                <Button variant="secondary" size="lg">
                  MAGNETIC SECONDARY
                </Button>
              </Magnetic>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold">CUSTOM CURSOR TAG SLOTS</h3>
            <p className="text-xs text-smoke font-sans leading-relaxed">
              Hover over the cards below with your mouse to observe the precision ink dot expand into contextual label pills.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div
                data-cursor="VIEW"
                className="h-32 border border-line bg-bone flex flex-col items-center justify-center p-4 hover:border-ink transition-colors cursor-none"
              >
                <Eye className="w-5 h-5 text-smoke mb-1" />
                <span className="micro-label text-ink">HOVER FOR &quot;VIEW&quot;</span>
              </div>
              <div
                data-cursor="DRAG"
                className="h-32 border border-line bg-bone flex flex-col items-center justify-center p-4 hover:border-ink transition-colors cursor-none"
              >
                <Play className="w-5 h-5 text-smoke mb-1 rotate-90" />
                <span className="micro-label text-ink">HOVER FOR &quot;DRAG&quot;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 // COUNTER */}
      <section className="max-w-page mx-auto px-4 md:px-10 py-16 border-b border-line space-y-6">
        <div className="flex justify-between items-center border-b border-line pb-3">
          <span className="micro-label text-smoke">05 // LOCALE-AWARE NUMERIC COUNTER</span>
          <span className="text-[10px] font-mono text-smoke">INR CURRENCY & METRIC UNITS · EN-IN</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-6 border border-line bg-paper">
            <p className="micro-label text-smoke">RETAIL PRICE (INR)</p>
            <p className="font-display text-3xl md:text-5xl font-extrabold text-ink mt-2">
              <Counter to={14999} prefix="₹" duration={0.9} />
            </p>
            <p className="micro-label text-smoke mt-1">PER SINGLE UNIT</p>
          </div>

          <div className="p-6 border border-line bg-paper">
            <p className="micro-label text-smoke">TOTAL WEIGHT</p>
            <p className="font-display text-3xl md:text-5xl font-extrabold text-ink mt-2">
              <Counter to={210} suffix="G" duration={0.8} />
            </p>
            <p className="micro-label text-smoke mt-1">SIZE 9.5 US BENCHMARK</p>
          </div>

          <div className="p-6 border border-line bg-paper">
            <p className="micro-label text-smoke">KINETIC EFFICIENCY</p>
            <p className="font-display text-3xl md:text-5xl font-extrabold text-ink mt-2">
              <Counter to={88} suffix="%" duration={1.0} />
            </p>
            <p className="micro-label text-smoke mt-1">ENERGY RETENTION</p>
          </div>

          <div className="p-6 border border-line bg-paper">
            <p className="micro-label text-smoke">ACTIVE RUNNERS</p>
            <p className="font-display text-3xl md:text-5xl font-extrabold text-ink mt-2">
              <Counter to={4280} suffix="+" duration={1.1} />
            </p>
            <p className="micro-label text-smoke mt-1">BETA REGISTRY</p>
          </div>
        </div>
      </section>

      {/* 06 // PARALLAX IMAGE */}
      <section className="max-w-page mx-auto px-4 md:px-10 py-16 border-b border-line space-y-6">
        <div className="flex justify-between items-center border-b border-line pb-3">
          <span className="micro-label text-smoke">06 // PARALLAX IMAGE</span>
          <span className="text-[10px] font-mono text-smoke">CLAMPED Y & SCALE · TRANSFORM ONLY</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-paper p-8 border border-line">
          <div className="space-y-4">
            <Badge variant="acid">SCROLL-LINKED PARALLAX</Badge>
            <h3 className="font-display text-3xl font-bold">ATMOSPHERIC Y TRANSLATION</h3>
            <p className="text-sm font-sans text-smoke leading-relaxed">
              Parallax calculations are strictly clamped to small pixel travels (±32px) and subtle scale (1.05 max), operating solely via hardware-accelerated transform attributes without triggering DOM layout recalculations.
            </p>
          </div>
          <div className="aspect-[4/5] border border-line bg-bone overflow-hidden">
            <ParallaxImage
              src={PLACEHOLDERS.pulseHero}
              alt="PULSE Parallax Demo"
              speed={36}
              scaleDelta={0.06}
            />
          </div>
        </div>
      </section>

      {/* 07 // SCROLL RAIL */}
      <section className="space-y-4">
        <ScrollRail title="07 // HORIZONTAL SCROLL RAIL LOOKBOOK" totalPanels={4}>
          <ScrollRailPanel>
            <div className="flex justify-between items-center mb-2">
              <span className="micro-label text-acid bg-ink px-2 py-0.5">PANEL 01 // TERRA</span>
              <span className="font-mono text-xs font-bold">₹18,400</span>
            </div>
            <div className="flex-1 bg-bone border border-line overflow-hidden my-2">
              <img src={PLACEHOLDERS.terraHero} alt="Terra Lookbook" className="w-full h-full object-cover" />
            </div>
            <p className="font-display font-bold text-lg">HIGH-ALTITUDE BASALT TRACTION</p>
          </ScrollRailPanel>

          <ScrollRailPanel>
            <div className="flex justify-between items-center mb-2">
              <span className="micro-label text-acid bg-ink px-2 py-0.5">PANEL 02 // PULSE</span>
              <span className="font-mono text-xs font-bold">₹22,800</span>
            </div>
            <div className="flex-1 bg-bone border border-line overflow-hidden my-2">
              <img src={PLACEHOLDERS.pulseHero} alt="Pulse Lookbook" className="w-full h-full object-cover" />
            </div>
            <p className="font-display font-bold text-lg">AERODYNAMIC MONOFILAMENT ROAD</p>
          </ScrollRailPanel>

          <ScrollRailPanel>
            <div className="flex justify-between items-center mb-2">
              <span className="micro-label text-acid bg-ink px-2 py-0.5">PANEL 03 // FORM</span>
              <span className="font-mono text-xs font-bold">₹16,200</span>
            </div>
            <div className="flex-1 bg-bone border border-line overflow-hidden my-2">
              <img src={PLACEHOLDERS.formHero} alt="Form Lookbook" className="w-full h-full object-cover" />
            </div>
            <p className="font-display font-bold text-lg">DAILY MONOCHROME ARCHITECTURE</p>
          </ScrollRailPanel>

          <ScrollRailPanel>
            <div className="flex justify-between items-center mb-2">
              <span className="micro-label text-acid bg-ink px-2 py-0.5">PANEL 04 // LAB</span>
              <span className="font-mono text-xs font-bold">SERIES 01</span>
            </div>
            <div className="flex-1 bg-bone border border-line overflow-hidden my-2">
              <img src={PLACEHOLDERS.bannerPulse} alt="Lab Lookbook" className="w-full h-full object-cover" />
            </div>
            <p className="font-display font-bold text-lg">ZERO-RESIN COMPOSITE TESTING</p>
          </ScrollRailPanel>
        </ScrollRail>
      </section>

      {/* 08 // IMAGE FRAME VARIANTS */}
      <section className="max-w-page mx-auto px-4 md:px-10 py-16 border-b border-line space-y-6">
        <div className="flex justify-between items-center border-b border-line pb-3">
          <span className="micro-label text-smoke">08 // EDITORIAL IMAGE FRAMES</span>
          <span className="text-[10px] font-mono text-smoke">6 CODE-BASED CLIP-PATH VARIANTS</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <ImageFrame
            src={PLACEHOLDERS.pulseHero}
            alt="Arch Frame"
            variant="arch"
            caption="Arch"
          />
          <ImageFrame
            src={PLACEHOLDERS.terraHero}
            alt="Blob Frame"
            variant="blob"
            caption="Blob"
          />
          <ImageFrame
            src={PLACEHOLDERS.formHero}
            alt="Square-Tear Frame"
            variant="square-tear"
            caption="Square Tear"
          />
          <ImageFrame
            src={PLACEHOLDERS.pulseHover}
            alt="Film-Strip Frame"
            variant="film-strip"
            caption="Film Strip"
          />
          <ImageFrame
            src={PLACEHOLDERS.terraHover}
            alt="Offset-Duplicate Frame"
            variant="offset-duplicate"
            caption="Duplicate"
          />
          <ImageFrame
            src={PLACEHOLDERS.formHover}
            alt="Inset Frame"
            variant="inset"
            caption="Inset"
          />
        </div>
      </section>

      {/* 09 // SKELETON */}
      <section className="max-w-page mx-auto px-4 md:px-10 py-16 space-y-6">
        <div className="flex justify-between items-center border-b border-line pb-3">
          <span className="micro-label text-smoke">09 // SKELETON PLACEHOLDER SYSTEM</span>
          <span className="text-[10px] font-mono text-smoke">TYPOGRAPHIC LINE-HEIGHT ALIGNED SHIMMER</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-paper p-8 border border-line">
          <div className="space-y-3">
            <span className="micro-label text-smoke">CARD SKELETON</span>
            <Skeleton variant="card" />
            <Skeleton variant="title" />
            <Skeleton variant="micro" />
          </div>

          <div className="space-y-3">
            <span className="micro-label text-smoke">TEXT CONTENT SKELETON</span>
            <Skeleton variant="title" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-2/3" />
            <div className="pt-4 flex gap-3">
              <Skeleton variant="thumbnail" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" />
                <Skeleton variant="micro" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="micro-label text-smoke">TABLE ROW SKELETONS</span>
            <div className="p-3 border border-line space-y-3">
              <div className="flex justify-between">
                <Skeleton variant="micro" />
                <Skeleton variant="micro" className="w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton variant="micro" />
                <Skeleton variant="micro" className="w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton variant="micro" />
                <Skeleton variant="micro" className="w-16" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
