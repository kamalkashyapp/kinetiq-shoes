import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Layers, Compass, Cpu, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';

export const metadata = {
  title: 'About KINETIQ — Biomechanical Footwear Architecture',
  description:
    'Engineering weightless performance through additive lattice manufacturing and basalt-derived compounds.',
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-20">
      {/* 1. Header / Manifesto */}
      <section className="border-b border-line pb-16 space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="acid">KINETIQ LABS</Badge>
          <span className="micro-label text-smoke">EST. 2024 · BENGALURU, INDIA</span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.92]">
          WEIGHTLESS
          <br />
          <span className="text-smoke">BY DESIGN.</span>
        </h1>

        <p className="font-serif italic text-xl sm:text-2xl text-ink max-w-3xl leading-relaxed">
          We reject cosmetic excess. Every millimeter of our silhouettes is calculated for mechanical efficiency,
          structural rigidity, and anisotropic energy rebound.
        </p>
      </section>

      {/* 2. Technical Philosophy Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-line bg-paper p-8 space-y-4">
          <div className="w-10 h-10 rounded-full bg-bone border border-line flex items-center justify-center text-ink">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="micro-label text-smoke">PILLAR 01 // ADDITIVE GEOMETRY</span>
          <h3 className="font-display font-bold text-2xl uppercase tracking-tight">K-LATTICE 3D</h3>
          <p className="text-sm text-smoke font-mono leading-relaxed">
            Eliminating traditional solid foam layers. We print parametric Voronoi lattice midsoles that compress
            directionally along the foot's strike vector, providing 34% higher impact attenuation at 210 grams.
          </p>
        </div>

        <div className="border border-line bg-paper p-8 space-y-4">
          <div className="w-10 h-10 rounded-full bg-bone border border-line flex items-center justify-center text-ink">
            <Layers className="w-5 h-5" />
          </div>
          <span className="micro-label text-smoke">PILLAR 02 // VECTOR DYNAMICS</span>
          <h3 className="font-display font-bold text-2xl uppercase tracking-tight">CARBON PROPULSION</h3>
          <p className="text-sm text-smoke font-mono leading-relaxed">
            Our aerospace-grade carbon vector plates act as kinetic springs. Snapping flat during dorsiflexion,
            returning 88.4% of stored muscular kinetic energy with zero mechanical degradation over 1,200 km.
          </p>
        </div>

        <div className="border border-line bg-paper p-8 space-y-4">
          <div className="w-10 h-10 rounded-full bg-bone border border-line flex items-center justify-center text-ink">
            <Compass className="w-5 h-5" />
          </div>
          <span className="micro-label text-smoke">PILLAR 03 // GEOLOGICAL GRIP</span>
          <h3 className="font-display font-bold text-2xl uppercase tracking-tight">BASALT-X COMPOUND</h3>
          <p className="text-sm text-smoke font-mono leading-relaxed">
            Formulated with volcanic basalt micro-fibers embedded inside high-coefficient synthetic rubber.
            Ensures uncompromised micro-lug traction across dry scree, wet asphalt, and saturated soil.
          </p>
        </div>
      </section>

      {/* 3. The Three Disciplines */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <span className="micro-label text-smoke">PRODUCT ARCHITECTURE</span>
            <h2 className="font-display font-bold text-3xl uppercase tracking-tight mt-1">THE THREE DISCIPLINES</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border border-line bg-bone p-6 space-y-4">
            <Badge variant="clay">TERRA</Badge>
            <h3 className="font-display font-bold text-xl uppercase">ALL-TERRAIN / TRAIL</h3>
            <p className="text-xs text-smoke font-mono leading-relaxed">
              Designed for aggressive elevation gain and unpredictable geological substrates. Built with 5mm directional
              lugs, basalt reinforcement, and an integrated weather-sealed gaiter tongue.
            </p>
            <div className="pt-4 border-t border-line text-xs font-mono space-y-1 text-smoke">
              <div>// AVG WEIGHT: 278G</div>
              <div>// LUG DEPTH: 5.0MM</div>
              <div>// DROP: 6MM BIOMECHANICAL</div>
            </div>
          </div>

          <div className="border border-line bg-bone p-6 space-y-4">
            <Badge variant="acid">PULSE</Badge>
            <h3 className="font-display font-bold text-xl uppercase">PERFORMANCE ROAD</h3>
            <p className="text-xs text-smoke font-mono leading-relaxed">
              Engineered for marathon pacing, sub-2 speed work, and maximum metabolic efficiency. Features continuous
              K-Lattice cushioning paired with our tuned carbon lever plate.
            </p>
            <div className="pt-4 border-t border-line text-xs font-mono space-y-1 text-smoke">
              <div>// AVG WEIGHT: 210G</div>
              <div>// REBOUND RATE: 88.4%</div>
              <div>// DROP: 4MM SPEED STRIKE</div>
            </div>
          </div>

          <div className="border border-line bg-bone p-6 space-y-4">
            <Badge variant="outline">FORM</Badge>
            <h3 className="font-display font-bold text-xl uppercase">LIFESTYLE MONOCHROME</h3>
            <p className="text-xs text-smoke font-mono leading-relaxed">
              Restrained minimalist brutalism for daily urban wear. Italian full-grain calf leather paired with
              sub-surface comfort pods and silent rubber outsoles.
            </p>
            <div className="pt-4 border-t border-line text-xs font-mono space-y-1 text-smoke">
              <div>// AVG WEIGHT: 295G</div>
              <div>// LEATHER: 1.4MM FULL GRAIN</div>
              <div>// INSOLE: BIO-CUSHION LATEX</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Engineering Metric Bar */}
      <section className="bg-ink text-bone p-8 lg:p-12 border border-ink">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="space-y-1 p-2">
            <div className="font-display font-black text-4xl lg:text-5xl text-acid">210G</div>
            <div className="micro-label text-smoke">FLAGSHIP WEIGHT</div>
          </div>
          <div className="space-y-1 p-2">
            <div className="font-display font-black text-4xl lg:text-5xl text-white">88.4%</div>
            <div className="micro-label text-smoke">ENERGY REBOUND</div>
          </div>
          <div className="space-y-1 p-2">
            <div className="font-display font-black text-4xl lg:text-5xl text-acid">14,800</div>
            <div className="micro-label text-smoke">TESTED KM (LAB)</div>
          </div>
          <div className="space-y-1 p-2">
            <div className="font-display font-black text-4xl lg:text-5xl text-white">0%</div>
            <div className="micro-label text-smoke">UNGROUNDED MATERIALS</div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="text-center py-8 space-y-6">
        <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight">
          TEST OUR ARCHITECTURE ON ROAD
        </h2>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="bg-ink text-bone hover:bg-ink/90 font-mono text-xs">
            <Link href="/shop">
              EXPLORE ALL SILHOUETTES <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-mono text-xs">
            <Link href="/size-guide">VIEW SIZE MATRIX</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
