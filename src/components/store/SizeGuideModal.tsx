'use client';

import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: number) => void;
  selectedSize?: number;
}

const SIZE_CHART = [
  { usMen: 7.0, usWomen: 8.5, eu: 40.0, uk: 6.0, cm: 25.0, in: 9.84 },
  { usMen: 7.5, usWomen: 9.0, eu: 40.5, uk: 6.5, cm: 25.5, in: 10.04 },
  { usMen: 8.0, usWomen: 9.5, eu: 41.0, uk: 7.0, cm: 26.0, in: 10.24 },
  { usMen: 8.5, usWomen: 10.0, eu: 42.0, uk: 7.5, cm: 26.5, in: 10.43 },
  { usMen: 9.0, usWomen: 10.5, eu: 42.5, uk: 8.0, cm: 27.0, in: 10.63 },
  { usMen: 9.5, usWomen: 11.0, eu: 43.0, uk: 8.5, cm: 27.5, in: 10.83 },
  { usMen: 10.0, usWomen: 11.5, eu: 44.0, uk: 9.0, cm: 28.0, in: 11.02 },
  { usMen: 10.5, usWomen: 12.0, eu: 44.5, uk: 9.5, cm: 28.5, in: 11.22 },
  { usMen: 11.0, usWomen: 12.5, eu: 45.0, uk: 10.0, cm: 29.0, in: 11.42 },
  { usMen: 11.5, usWomen: 13.0, eu: 45.5, uk: 10.5, cm: 29.5, in: 11.61 },
  { usMen: 12.0, usWomen: 13.5, eu: 46.0, uk: 11.0, cm: 30.0, in: 11.81 },
];

export function SizeGuideModal({
  isOpen,
  onClose,
  onSelectSize,
  selectedSize,
}: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Anatomical Size Guide"
        className="relative z-10 w-full max-w-2xl bg-paper border border-line shadow-drawer p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="acid">SIZE GUIDE</Badge>
              <span className="micro-label text-smoke">ANATOMICAL CONVERSION</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-ink uppercase">
              KINETIQ FIT ARCHITECTURE
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1.5 text-smoke hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle & Guide Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bone p-4 border border-line">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-smoke" />
            <span className="micro-label text-smoke">MEASUREMENT UNIT:</span>
          </div>
          <div className="flex border border-line bg-paper">
            <button
              type="button"
              onClick={() => setUnit('cm')}
              className={`px-4 py-1.5 text-xs font-mono uppercase transition-colors ${
                unit === 'cm' ? 'bg-ink text-bone font-bold' : 'text-smoke hover:text-ink'
              }`}
            >
              CENTIMETERS (CM)
            </button>
            <button
              type="button"
              onClick={() => setUnit('in')}
              className={`px-4 py-1.5 text-xs font-mono uppercase transition-colors ${
                unit === 'in' ? 'bg-ink text-bone font-bold' : 'text-smoke hover:text-ink'
              }`}
            >
              INCHES (IN)
            </button>
          </div>
        </div>

        {/* Conversion Table */}
        <div className="overflow-x-auto border border-line">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-bone border-b border-line text-smoke micro-label text-[9px]">
              <tr>
                <th className="p-3">US MEN</th>
                <th className="p-3">US WOMEN</th>
                <th className="p-3">EU</th>
                <th className="p-3">UK</th>
                <th className="p-3">FOOT LENGTH ({unit.toUpperCase()})</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SIZE_CHART.map((row) => {
                const isCurrent = selectedSize === row.usMen;
                return (
                  <tr
                    key={row.usMen}
                    className={`hover:bg-bone/50 transition-colors ${
                      isCurrent ? 'bg-acid/10 font-bold' : ''
                    }`}
                  >
                    <td className="p-3 font-bold text-ink">{row.usMen.toFixed(1)}</td>
                    <td className="p-3 text-smoke">{row.usWomen.toFixed(1)}</td>
                    <td className="p-3 text-smoke">{row.eu.toFixed(1)}</td>
                    <td className="p-3 text-smoke">{row.uk.toFixed(1)}</td>
                    <td className="p-3 text-ink">
                      {unit === 'cm' ? `${row.cm.toFixed(1)} cm` : `${row.in.toFixed(2)} in`}
                    </td>
                    <td className="p-3 text-right">
                      {onSelectSize && (
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSize(row.usMen);
                            onClose();
                          }}
                          className={`px-2.5 py-1 text-[10px] uppercase border transition-colors ${
                            isCurrent
                              ? 'border-ink bg-ink text-bone'
                              : 'border-line hover:border-ink'
                          }`}
                        >
                          {isCurrent ? 'SELECTED' : 'CHOOSE'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Foot Measurement Method */}
        <div className="p-4 border border-line bg-paper space-y-2">
          <p className="micro-label font-bold text-ink">HOW TO MEASURE YOUR FOOT LENGTH</p>
          <ol className="text-xs font-mono text-smoke space-y-1 list-decimal list-inside">
            <li>Place a sheet of blank paper against a flat vertical wall on a hard surface.</li>
            <li>Stand upright with your heel firmly touching the wall.</li>
            <li>Mark the furthest point of your longest toe with a pencil perpendicular to the floor.</li>
            <li>Measure from the edge of the sheet to the pencil mark in centimeters.</li>
          </ol>
        </div>

        <Button variant="secondary" className="w-full" onClick={onClose}>
          CLOSE CONVERSION MATRIX
        </Button>
      </div>
    </div>
  );
}
