'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import type { ProductItem } from '@/lib/products';

export function ProductSpecs({ product }: { product: ProductItem }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>('shipping');

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const specs = [
    { label: 'TOTAL WEIGHT', val: `${product.weight} GRAMS (SIZE 9.5 US)` },
    { label: 'HEEL-TO-TOE DROP', val: `${product.drop} MM` },
    { label: 'STACK HEIGHT', val: `${product.stack} MM HEEL / ${product.stack - product.drop} MM FOREFOOT` },
    { label: 'UPPER ARCHITECTURE', val: product.upper },
    { label: 'OUTSOLE RUBBER COMPOUND', val: product.outsole },
    { label: 'TERRAIN DISCIPLINE', val: product.collection.toUpperCase() },
    { label: 'CHASSIS STABILIZATION', val: product.collection === 'pulse' ? 'S-CURVE CARBON VECTOR' : product.collection === 'terra' ? 'BASALT STONE SHIELD' : 'MOLDED CUP-SOLE' },
    { label: 'COUNTRY OF MANUFACTURE', val: 'ENGINEERED IN MUMBAI, INDIA' },
  ];

  return (
    <div className="space-y-12">
      {/* 1. Technical Specs Table */}
      <section className="space-y-4">
        <div className="border-b border-line pb-2 flex flex-wrap justify-between items-baseline gap-2">
          <h3 className="font-display font-extrabold text-xl md:text-2xl text-ink uppercase tracking-tight">
            BUILT FOR // TECHNICAL SPECIFICATIONS
          </h3>
          <span className="micro-label text-smoke text-[10px]">TOLERANCES: ±0.5MM</span>
        </div>

        <div className="border border-line divide-y divide-line bg-paper font-mono text-xs">
          {specs.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 hover:bg-bone/40 transition-colors">
              <span className="text-smoke micro-label text-[10px] w-56 shrink-0">{item.label}</span>
              <span className="text-ink font-bold uppercase mt-1 sm:mt-0">{item.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Technology Callout Diagram */}
      <section className="p-6 md:p-8 border border-line bg-ink text-bone space-y-6">
        <div className="flex items-center justify-between border-b border-bone/20 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-acid" />
            <span className="micro-label text-acid">K-LATTICE ARCHITECTURE</span>
          </div>
          <span className="micro-label text-smoke text-[9px]">PATENTED COMPUTATIONAL DAMPING</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
          <div className="space-y-2 border-l border-bone/20 pl-4">
            <p className="text-acid font-bold">01 // IMPACT DISPERSION</p>
            <p className="text-smoke leading-relaxed">
              3D printed Voronoi cell geometry compresses non-linearly, deflecting vertical shock vectors away from knee joints.
            </p>
          </div>
          <div className="space-y-2 border-l border-bone/20 pl-4">
            <p className="text-acid font-bold">02 // FORWARD PROPULSION</p>
            <p className="text-smoke leading-relaxed">
              Longitudinal hollow struts rebound in under 12 milliseconds, yielding 88.4% mechanical energy return at push-off.
            </p>
          </div>
          <div className="space-y-2 border-l border-bone/20 pl-4">
            <p className="text-acid font-bold">03 // THERMAL VENTILATION</p>
            <p className="text-smoke leading-relaxed">
              Continuous hollow channels force internal airflow through the sole matrix with every foot strike.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Shipping & Returns Accordion */}
      <section className="space-y-3">
        <div className="border-b border-line pb-2">
          <span className="micro-label text-smoke">LOGISTICS & CARE PROTOCOL</span>
        </div>

        {/* Accordion 1: Shipping */}
        <div className="border border-line bg-paper">
          <button
            type="button"
            onClick={() => toggleAccordion('shipping')}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase font-bold hover:bg-bone/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-smoke" />
              <span>COMPLIMENTARY DOMESTIC DISPATCH & TIMELINES</span>
            </div>
            {openAccordion === 'shipping' ? (
              <ChevronUp className="w-4 h-4 text-smoke" />
            ) : (
              <ChevronDown className="w-4 h-4 text-smoke" />
            )}
          </button>
          {openAccordion === 'shipping' && (
            <div className="px-4 pb-4 text-xs font-mono text-smoke leading-relaxed border-t border-line-soft pt-3 space-y-2">
              <p>• All orders are dispatched via insured BlueDart Air express directly from our Mumbai laboratory.</p>
              <p>• Metro locations: 24 to 48 hours delivery SLA. Rest of India: 2 to 4 business days.</p>
              <p>• Real-time AWB tracking URL and SMS telemetry are issued immediately upon package seal.</p>
            </div>
          )}
        </div>

        {/* Accordion 2: 30-Day Reverse Pickup */}
        <div className="border border-line bg-paper">
          <button
            type="button"
            onClick={() => toggleAccordion('returns')}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase font-bold hover:bg-bone/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-smoke" />
              <span>30-DAY ANATOMICAL EXCHANGE & COMPLIMENTARY REVERSE PICKUP</span>
            </div>
            {openAccordion === 'returns' ? (
              <ChevronUp className="w-4 h-4 text-smoke" />
            ) : (
              <ChevronDown className="w-4 h-4 text-smoke" />
            )}
          </button>
          {openAccordion === 'returns' && (
            <div className="px-4 pb-4 text-xs font-mono text-smoke leading-relaxed border-t border-line-soft pt-3 space-y-2">
              <p>• Test your fit indoors on clean surfaces. If the sizing does not align, initiate an exchange from your dashboard.</p>
              <p>• Our courier arranges doorstep reverse pickup at zero expense to you.</p>
              <p>• Full refunds are processed to your original payment method within 3 business days of return inspection.</p>
            </div>
          )}
        </div>

        {/* Accordion 3: Material Sourcing */}
        <div className="border border-line bg-paper">
          <button
            type="button"
            onClick={() => toggleAccordion('materials')}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase font-bold hover:bg-bone/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-smoke" />
              <span>MATERIAL RECOVERY & 1-YEAR CHASSIS WARRANTY</span>
            </div>
            {openAccordion === 'materials' ? (
              <ChevronUp className="w-4 h-4 text-smoke" />
            ) : (
              <ChevronDown className="w-4 h-4 text-smoke" />
            )}
          </button>
          {openAccordion === 'materials' && (
            <div className="px-4 pb-4 text-xs font-mono text-smoke leading-relaxed border-t border-line-soft pt-3 space-y-2">
              <p>• Covered by the KINETIQ 1-Year Chassis Guarantee covering midsole bond failure and carbon plate delamination.</p>
              <p>• Crafted without animal glues or unrecoverable resins. Return worn-out shoes for a ₹2,000 recycling credit.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
