'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useReducedMotionManager } from '@/providers/ReducedMotionProvider';
import { useToast } from '@/providers/ToastProvider';
import { PLACEHOLDERS } from '@/lib/assets';
import { Sparkles, Moon, Sun, Play } from 'lucide-react';

export default function DesignTokensPage() {
  const { forcedReducedMotion, toggleForcedReducedMotion, shouldReduceMotion } =
    useReducedMotionManager();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [motionActive, setMotionActive] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const triggerMotionTest = () => {
    setMotionActive(true);
    setTimeout(() => setMotionActive(false), 1200);
  };

  const colors = [
    { name: 'bone', label: 'Page Background', hex: '#F3F0E9', bgClass: 'bg-bone', textDark: true },
    { name: 'paper', label: 'Surfaces / Cards', hex: '#FFFFFF', bgClass: 'bg-paper', textDark: true },
    { name: 'ink', label: 'Primary Text', hex: '#0B0B0C', bgClass: 'bg-ink', textDark: false },
    { name: 'ink-soft', label: 'Secondary Dark', hex: '#2A2A2C', bgClass: 'bg-ink-soft', textDark: false },
    { name: 'smoke', label: 'Muted Meta', hex: '#8A867E', bgClass: 'bg-smoke', textDark: false },
    { name: 'line', label: '1px Structural Rule', hex: 'rgba(11,11,12,0.12)', bgClass: 'bg-line', textDark: true },
    { name: 'acid', label: 'PULSE Accent (<8%)', hex: '#D9FF43', bgClass: 'bg-acid', textDark: true },
    { name: 'clay', label: 'TERRA Warmth', hex: '#B4553A', bgClass: 'bg-clay', textDark: false },
    { name: 'signal', label: 'Links & Rings', hex: '#1E5BFF', bgClass: 'bg-signal', textDark: false },
    { name: 'status-success', label: 'Success', hex: '#1F7A4D', bgClass: 'bg-status-success', textDark: false },
    { name: 'status-warn', label: 'Warning', hex: '#B58200', bgClass: 'bg-status-warn', textDark: false },
    { name: 'status-danger', label: 'Danger', hex: '#B3261E', bgClass: 'bg-status-danger', textDark: false },
  ];

  const typeScale = [
    { name: '6xl', style: 'text-6xl font-display font-extrabold', sample: 'KINETIQ 01', note: 'clamp(4.5rem, 12vw, 12rem) · lh: 0.92 · ls: -0.03em' },
    { name: '5xl', style: 'text-5xl font-display font-bold', sample: 'WEIGHTLESS BY DESIGN', note: 'clamp(3.5rem, 7.5vw, 7rem) · lh: 0.92' },
    { name: '4xl', style: 'text-4xl font-display font-bold', sample: 'ENGINEERED LATTICE', note: 'clamp(2.75rem, 5vw, 4.5rem)' },
    { name: '3xl', style: 'text-3xl font-display font-bold', sample: 'AUTONOMOUS CUSHIONING', note: 'clamp(2rem, 3.4vw, 3rem)' },
    { name: '2xl', style: 'text-2xl font-display font-bold', sample: 'CARBON VECTOR PLATE', note: 'clamp(1.5rem, 2.2vw, 2rem)' },
    { name: 'xl', style: 'text-xl font-display font-bold', sample: '210 Grams Total Package', note: 'clamp(1.25rem, 1.6vw, 1.5rem)' },
    { name: 'lg', style: 'text-lg font-sans font-medium', sample: 'High-resilience thermoplastic polyurethane matrix.', note: '1.125rem' },
    { name: 'base', style: 'text-base font-sans', sample: 'Standard body text designed for seamless readability on 4G mobile devices.', note: '1.0rem · lh: 1.55' },
    { name: 'sm', style: 'text-sm font-sans', sample: 'Secondary descriptions, tabular specifications, and card metadata.', note: '0.875rem' },
    { name: 'xs', style: 'text-xs font-mono', sample: 'TECHNICAL FOOTNOTE // ZERO RESIN BONDING', note: '0.75rem' },
    { name: 'micro', style: 'micro-label', sample: 'KINETIQ // SERIES 01 // PULSE', note: '0.6875rem (11px) · uppercase · ls: 0.14em' },
  ];

  const spaces = [
    { name: '--space-1', value: '4px / 0.25rem', width: 'w-1' },
    { name: '--space-2', value: '8px / 0.5rem', width: 'w-2' },
    { name: '--space-3', value: '12px / 0.75rem', width: 'w-3' },
    { name: '--space-4', value: '16px / 1.0rem', width: 'w-4' },
    { name: '--space-5', value: '24px / 1.5rem', width: 'w-6' },
    { name: '--space-6', value: '32px / 2.0rem', width: 'w-8' },
    { name: '--space-7', value: '48px / 3.0rem', width: 'w-12' },
    { name: '--space-8', value: '64px / 4.0rem', width: 'w-16' },
    { name: '--space-9', value: '96px / 6.0rem', width: 'w-24' },
    { name: '--space-10', value: '128px / 8.0rem', width: 'w-32' },
    { name: '--space-11', value: '192px / 12.0rem', width: 'w-48' },
  ];

  return (
    <div className="max-w-page mx-auto px-4 md:px-10 py-12 md:py-20 space-y-16">
      {/* Top Banner / System Controls */}
      <div className="border-b border-line pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="acid">DEV ONLY // SYSTEM CONTRACT</Badge>
            <Badge variant="outline">NEXT.JS STRICT</Badge>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
            DESIGN TOKENS
          </h1>
          <p className="text-xs md:text-sm font-mono text-smoke mt-2 max-w-xl">
            Single visual source of truth matching AGENTS.md verbatim. All components render strictly from CSS variables and Tailwind extensions.
          </p>
        </div>

        {/* Interactive Testing Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/design/motion">
            <Button variant="acid" size="sm">
              <Play className="w-3.5 h-3.5 mr-1.5" />
              VIEW MOTION PRIMITIVES (/DESIGN/MOTION)
            </Button>
          </Link>

          <Button
            variant={forcedReducedMotion ? 'acid' : 'secondary'}
            size="sm"
            onClick={toggleForcedReducedMotion}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            {forcedReducedMotion ? 'REDUCED MOTION: ON' : 'SIMULATE REDUCED MOTION'}
          </Button>

          <Button variant="secondary" size="sm" onClick={toggleDarkMode}>
            {isDark ? <Sun className="w-3.5 h-3.5 mr-1.5" /> : <Moon className="w-3.5 h-3.5 mr-1.5" />}
            {isDark ? 'LIGHT CANVAS' : 'NIGHT STUDIO'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              toast({
                title: 'SYSTEM SPEC NOTIFICATION',
                description: 'Toast component rendered with 1px border and mono micro-label.',
                type: 'success',
              })
            }
          >
            TEST TOAST
          </Button>
        </div>
      </div>

      {/* Reduced Motion Status Callout */}
      {shouldReduceMotion && (
        <div className="p-4 bg-acid/10 border border-acid text-ink flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-acid animate-ping" />
            <span className="micro-label font-bold text-xs">
              REDUCED MOTION ACTIVE — ALL TRANSITIONS CLAMPED TO STATIC INSTANT RENDERING
            </span>
          </div>
          <span className="micro-label text-smoke text-[10px]">WCAG 2.2 AA COMPLIANT</span>
        </div>
      )}

      {/* 1. Color System */}
      <section className="space-y-6">
        <div className="border-b border-line pb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight">01 // COLOR SPECIMENS</h2>
          <span className="micro-label text-smoke">12 REGISTERED TOKENS</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {colors.map((c) => (
            <div key={c.name} className="border border-line p-3 bg-paper shadow-sm">
              <div
                className={`h-20 w-full border border-line ${c.bgClass} flex items-end p-2 mb-3`}
              >
                <span
                  className={`micro-label text-[9px] ${
                    c.textDark ? 'text-ink' : 'text-paper'
                  }`}
                >
                  {c.hex}
                </span>
              </div>
              <p className="font-mono text-xs font-bold text-ink uppercase">{c.name}</p>
              <p className="text-[10px] text-smoke mt-0.5">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Fluid Typography Scale */}
      <section className="space-y-6">
        <div className="border-b border-line pb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight">02 // FLUID TYPE SCALE</h2>
          <span className="micro-label text-smoke">BRICOLAGE + INSTRUMENT + INTER + JETBRAINS</span>
        </div>
        <div className="space-y-8 bg-paper p-6 md:p-8 border border-line">
          {typeScale.map((t) => (
            <div key={t.name} className="border-b border-line-soft pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-1">
                <span className="micro-label text-acid bg-ink px-1.5 py-0.5">
                  --TEXT-{t.name.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-smoke">{t.note}</span>
              </div>
              <p className={`${t.style} text-ink break-words`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Spacing Scale */}
      <section className="space-y-6">
        <div className="border-b border-line pb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight">03 // 8PX SPACING BASELINE</h2>
          <span className="micro-label text-smoke">--SPACE-1 THROUGH --SPACE-11</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-paper p-6 border border-line">
          {spaces.map((s) => (
            <div key={s.name} className="flex items-center gap-4 py-2 border-b border-line-soft">
              <span className="micro-label w-24 text-smoke">{s.name}</span>
              <div className="h-6 bg-ink flex items-center px-2" style={{ width: s.value.split('/')[0].trim() }}>
                <span className="text-[9px] font-mono text-bone whitespace-nowrap">{s.value.split('/')[0]}</span>
              </div>
              <span className="text-xs font-mono text-smoke">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Geometry, Radii & Hairline Rules */}
      <section className="space-y-6">
        <div className="border-b border-line pb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight">04 // RADII & GEOMETRY</h2>
          <span className="micro-label text-smoke">SQUARE BY DEFAULT // PILLS FOR CHIPS</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-4 border border-line bg-paper text-center">
            <div className="h-16 w-full bg-bone border border-line rounded-none flex items-center justify-center mb-2">
              <span className="micro-label text-[10px]">0px</span>
            </div>
            <p className="micro-label">--RADIUS-NONE</p>
          </div>
          <div className="p-4 border border-line bg-paper text-center">
            <div className="h-16 w-full bg-bone border border-line rounded-hair flex items-center justify-center mb-2">
              <span className="micro-label text-[10px]">2px</span>
            </div>
            <p className="micro-label">--RADIUS-HAIR</p>
          </div>
          <div className="p-4 border border-line bg-paper text-center">
            <div className="h-16 w-full bg-bone border border-line rounded-sm flex items-center justify-center mb-2">
              <span className="micro-label text-[10px]">6px</span>
            </div>
            <p className="micro-label">--RADIUS-SM</p>
          </div>
          <div className="p-4 border border-line bg-paper text-center">
            <div className="h-16 w-full bg-bone border border-line rounded-md flex items-center justify-center mb-2">
              <span className="micro-label text-[10px]">12px</span>
            </div>
            <p className="micro-label">--RADIUS-MD</p>
          </div>
          <div className="p-4 border border-line bg-paper text-center col-span-2 sm:col-span-1">
            <div className="h-16 w-full bg-bone border border-line rounded-pill flex items-center justify-center mb-2">
              <span className="micro-label text-[10px]">9999px</span>
            </div>
            <p className="micro-label">--RADIUS-PILL</p>
          </div>
        </div>
      </section>

      {/* 5. Buttons, Badges & Chips */}
      <section className="space-y-6">
        <div className="border-b border-line pb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight">05 // INTERACTIVE PRIMITIVES</h2>
          <span className="micro-label text-smoke">CUSTOM SHADCN / RADIX VARIANTS</span>
        </div>
        <div className="space-y-6 bg-paper p-6 md:p-8 border border-line">
          <div>
            <p className="micro-label text-smoke mb-3">BUTTON VARIANTS</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">PRIMARY (INK)</Button>
              <Button variant="acid">ACID CTA</Button>
              <Button variant="clay">CLAY ACCENT</Button>
              <Button variant="secondary">SECONDARY</Button>
              <Button variant="pill">PILL BUTTON</Button>
              <Button variant="ghost">GHOST ACTION</Button>
              <Button variant="primary" disabled>DISABLED</Button>
            </div>
          </div>

          <div className="pt-6 border-t border-line">
            <p className="micro-label text-smoke mb-3">CHIPS & MICRO-BADGES</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">DEFAULT INK</Badge>
              <Badge variant="acid">PULSE // ACID</Badge>
              <Badge variant="clay">TERRA // CLAY</Badge>
              <Badge variant="outline">HAIRLINE OUTLINE</Badge>
              <Badge variant="smoke">SMOKE METADATA</Badge>
              <Badge variant="chip">FILTER CHIP</Badge>
              <Badge variant="chipActive">ACTIVE FILTER [X]</Badge>
            </div>
          </div>

          <div className="pt-6 border-t border-line">
            <p className="micro-label text-smoke mb-3">INPUT CONTROLS</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
              <div>
                <label className="micro-label block text-smoke mb-1.5">STANDARD INPUT</label>
                <Input placeholder="E.G. SIZE 10.5 US" />
              </div>
              <div>
                <label className="micro-label block text-smoke mb-1.5">FOCUS STATE TEST</label>
                <Input defaultValue="KINETIQ-2026-X" />
              </div>
              <div>
                <label className="micro-label block text-smoke mb-1.5">DISABLED STATE</label>
                <Input disabled value="SOLD OUT IN ALL REGIONS" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Motion Tokens & Interactive Demos */}
      <section className="space-y-6">
        <div className="border-b border-line pb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight">06 // MOTION TIMING DEMOS</h2>
          <Button variant="secondary" size="sm" onClick={triggerMotionTest}>
            <Play className="w-3.5 h-3.5 mr-1.5" />
            TRIGGER EASING TESTS
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fast */}
          <div className="p-5 border border-line bg-paper space-y-3">
            <div className="flex justify-between items-center">
              <span className="micro-label font-bold">--DUR-FAST (160MS)</span>
              <span className="text-[10px] font-mono text-smoke">Micro-feedback</span>
            </div>
            <div className="h-2 bg-bone border border-line overflow-hidden">
              <div
                className={`h-full bg-acid transition-all duration-fast ease-editorial-out ${
                  motionActive ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <p className="text-xs text-smoke font-mono">cubic-bezier(0.16, 1, 0.3, 1)</p>
          </div>

          {/* Base */}
          <div className="p-5 border border-line bg-paper space-y-3">
            <div className="flex justify-between items-center">
              <span className="micro-label font-bold">--DUR-BASE (260MS)</span>
              <span className="text-[10px] font-mono text-smoke">Drawers / Modals</span>
            </div>
            <div className="h-2 bg-bone border border-line overflow-hidden">
              <div
                className={`h-full bg-ink transition-all duration-base ease-editorial-out ${
                  motionActive ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <p className="text-xs text-smoke font-mono">cubic-bezier(0.16, 1, 0.3, 1)</p>
          </div>

          {/* Cinematic */}
          <div className="p-5 border border-line bg-paper space-y-3">
            <div className="flex justify-between items-center">
              <span className="micro-label font-bold">--DUR-CINEMATIC (900MS)</span>
              <span className="text-[10px] font-mono text-smoke">Hero Narratives</span>
            </div>
            <div className="h-2 bg-bone border border-line overflow-hidden">
              <div
                className={`h-full bg-clay transition-all duration-cinematic ease-editorial-in-out ${
                  motionActive ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <p className="text-xs text-smoke font-mono">cubic-bezier(0.65, 0, 0.35, 1)</p>
          </div>
        </div>
      </section>

      {/* 7. Generated SVG Placeholder Studio */}
      <section className="space-y-6">
        <div className="border-b border-line pb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight">07 // ASSET STUDIO PLACEHOLDERS</h2>
          <span className="micro-label text-smoke">GENERATIVE CODE-FIRST SILHOUETTES</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-line bg-paper p-3 space-y-2">
            <div className="aspect-[4/5] bg-bone border border-line overflow-hidden">
              <img
                src={PLACEHOLDERS.pulseHero}
                alt="PULSE 01 Generated Silhouette"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-sm">PULSE 01 // ACID GHOST</span>
              <Badge variant="acid">PULSE</Badge>
            </div>
          </div>

          <div className="border border-line bg-paper p-3 space-y-2">
            <div className="aspect-[4/5] bg-bone border border-line overflow-hidden">
              <img
                src={PLACEHOLDERS.terraHero}
                alt="TERRA RIDGE Generated Silhouette"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-sm">TERRA RIDGE // BASALT</span>
              <Badge variant="clay">TERRA</Badge>
            </div>
          </div>

          <div className="border border-line bg-paper p-3 space-y-2">
            <div className="aspect-[4/5] bg-bone border border-line overflow-hidden">
              <img
                src={PLACEHOLDERS.formHero}
                alt="FORM ZERO Generated Silhouette"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-sm">FORM ZERO // BONE</span>
              <Badge variant="outline">FORM</Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
