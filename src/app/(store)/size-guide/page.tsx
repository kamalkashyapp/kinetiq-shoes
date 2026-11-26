'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Ruler, ArrowRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SizeRow {
  usMen: string;
  usWomen: string;
  uk: string;
  eu: string;
  cm: string;
  inches: string;
}

const SIZE_CHART: SizeRow[] = [
  { usMen: '7.0', usWomen: '8.5', uk: '6.0', eu: '40.0', cm: '25.0', inches: '9.84' },
  { usMen: '7.5', usWomen: '9.0', uk: '6.5', eu: '40.5', cm: '25.5', inches: '10.04' },
  { usMen: '8.0', usWomen: '9.5', uk: '7.0', eu: '41.0', cm: '26.0', inches: '10.24' },
  { usMen: '8.5', usWomen: '10.0', uk: '7.5', eu: '42.0', cm: '26.5', inches: '10.43' },
  { usMen: '9.0', usWomen: '10.5', uk: '8.0', eu: '42.5', cm: '27.0', inches: '10.63' },
  { usMen: '9.5', usWomen: '11.0', uk: '8.5', eu: '43.0', cm: '27.5', inches: '10.83' },
  { usMen: '10.0', usWomen: '11.5', uk: '9.0', eu: '44.0', cm: '28.0', inches: '11.02' },
  { usMen: '10.5', usWomen: '12.0', uk: '9.5', eu: '44.5', cm: '28.5', inches: '11.22' },
  { usMen: '11.0', usWomen: '12.5', uk: '10.0', eu: '45.0', cm: '29.0', inches: '11.42' },
  { usMen: '11.5', usWomen: '13.0', uk: '10.5', eu: '45.5', cm: '29.5', inches: '11.61' },
  { usMen: '12.0', usWomen: '13.5', uk: '11.0', eu: '46.0', cm: '30.0', inches: '11.81' },
  { usMen: '13.0', usWomen: '14.5', uk: '12.0', eu: '47.5', cm: '31.0', inches: '12.20' },
];

export default function SizeGuidePage() {
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <section className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="acid">BIOMECHANICAL CALIBRATION</Badge>
          <span className="micro-label text-smoke">MILLIMETER ACCURACY</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.92]">
          SIZE & FIT
          <br />
          <span className="text-smoke">SPECIFICATION MATRIX.</span>
        </h1>
        <p className="font-mono text-sm text-smoke max-w-2xl">
          KINETIQ silhouettes are built on standard anatomical lasts. Review international conversions and the heel-to-wall measurement protocol below.
        </p>
      </section>

      {/* Measurement Protocol */}
      <section className="space-y-6">
        <div>
          <span className="micro-label text-smoke">MEASUREMENT TECHNIQUE</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight mt-1">
            HOW TO MEASURE YOUR FOOT ACCURATELY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-line bg-paper p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-acid bg-ink px-2 py-0.5 inline-block">
              01 // SETUP
            </span>
            <h3 className="font-display font-bold text-lg uppercase">FLUSH TO VERTICAL WALL</h3>
            <p className="font-mono text-xs text-smoke leading-relaxed">
              Place a blank sheet of paper on a hard floor, tape it down flush against a 90° wall. Stand on the paper wearing the performance socks you run in.
            </p>
          </div>

          <div className="border border-line bg-paper p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-acid bg-ink px-2 py-0.5 inline-block">
              02 // MARK APEX
            </span>
            <h3 className="font-display font-bold text-lg uppercase">LONGEST TOE VECTOR</h3>
            <p className="font-mono text-xs text-smoke leading-relaxed">
              Ensure heel rests against the wall. Holding a pencil vertically perpendicular to the sheet, mark the outermost tip of your longest toe.
            </p>
          </div>

          <div className="border border-line bg-paper p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-acid bg-ink px-2 py-0.5 inline-block">
              03 // CALIBRATE
            </span>
            <h3 className="font-display font-bold text-lg uppercase">MEASURE & MATCH</h3>
            <p className="font-mono text-xs text-smoke leading-relaxed">
              Measure the exact distance from the paper edge to the mark in centimeters. Match with our conversion matrix below. If between sizes, choose the larger.
            </p>
          </div>
        </div>
      </section>

      {/* Size Matrix Table */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="micro-label text-smoke">INTERNATIONAL STANDARDS</span>
            <h2 className="font-display font-bold text-2xl uppercase tracking-tight mt-1">
              CONVERSION MATRIX
            </h2>
          </div>

          {/* Unit Toggle */}
          <div className="inline-flex border border-line bg-bone p-1">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 font-mono text-xs transition-colors ${
                unit === 'cm' ? 'bg-ink text-bone font-bold' : 'text-smoke hover:text-ink'
              }`}
            >
              METRIC (CM)
            </button>
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 font-mono text-xs transition-colors ${
                unit === 'inches' ? 'bg-ink text-bone font-bold' : 'text-smoke hover:text-ink'
              }`}
            >
              IMPERIAL (INCH)
            </button>
          </div>
        </div>

        <div className="border border-line overflow-x-auto bg-paper">
          <table className="w-full text-left font-mono text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-bone border-b border-line text-ink">
                <th className="p-4 font-bold uppercase">US MEN</th>
                <th className="p-4 font-bold uppercase">US WOMEN</th>
                <th className="p-4 font-bold uppercase">UK</th>
                <th className="p-4 font-bold uppercase">EU</th>
                <th className="p-4 font-bold uppercase text-right">
                  FOOT LENGTH ({unit === 'cm' ? 'CM' : 'INCH'})
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SIZE_CHART.map((row, idx) => (
                <tr key={idx} className="hover:bg-bone/40 transition-colors">
                  <td className="p-4 font-bold text-ink">{row.usMen}</td>
                  <td className="p-4 text-smoke">{row.usWomen}</td>
                  <td className="p-4 text-smoke">{row.uk}</td>
                  <td className="p-4 text-smoke">{row.eu}</td>
                  <td className="p-4 text-right font-bold text-ink">
                    {unit === 'cm' ? `${row.cm} cm` : `${row.inches} in`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Discipline Specific Fit Advice */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-line bg-paper p-6 space-y-3">
          <Badge variant="clay">TERRA ADVICE</Badge>
          <h3 className="font-display font-bold text-lg uppercase">DOWNHILL FOREFOOT CLEARANCE</h3>
          <p className="font-mono text-xs text-smoke leading-relaxed">
            For steep trail descents, we recommend allowing 10mm to 12mm of toe-box clearance to prevent black toenails caused by repeated downhill braking.
          </p>
        </div>

        <div className="border border-line bg-paper p-6 space-y-3">
          <Badge variant="acid">PULSE ADVICE</Badge>
          <h3 className="font-display font-bold text-lg uppercase">RACE-FIT LOCKDOWN</h3>
          <p className="font-mono text-xs text-smoke leading-relaxed">
            The carbon plate performs best when the heel counter has zero lateral slip. Order exact true-to-size for optimal lever fulcrum placement.
          </p>
        </div>

        <div className="border border-line bg-paper p-6 space-y-3">
          <Badge variant="outline">FORM ADVICE</Badge>
          <h3 className="font-display font-bold text-lg uppercase">NATURAL LEATHER CONFORMITY</h3>
          <p className="font-mono text-xs text-smoke leading-relaxed">
            Full-grain calfskin uppers soften and stretch approximately 2% within 3 to 5 wears, molding permanently to your foot contour.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-line">
        <div className="font-mono text-xs text-smoke">
          Uncertain between two sizes? Our 14-day exchange policy guarantees zero-friction size swaps.
        </div>
        <Button asChild className="bg-ink text-bone hover:bg-ink/90 font-mono text-xs shrink-0">
          <Link href="/shop">
            EXPLORE THE STORE <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
