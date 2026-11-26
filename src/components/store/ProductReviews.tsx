'use client';

import React from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import type { ProductItem } from '@/lib/products';

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  fit: 'runs_small' | 'true_to_size' | 'runs_large';
  verified: boolean;
}

export function ProductReviews({ product }: { product: ProductItem }) {
  const reviews: ReviewItem[] = [
    {
      id: 'rev-1',
      author: 'Vikram Mehta',
      rating: 5,
      date: '2 WEEKS AGO',
      title: 'Sub-3 hour marathon weapon. Unmatched forefoot pop.',
      body: 'Clocked a 2:54:12 marathon personal best in this silhouette. The carbon vector plate has an immediate mechanical lever effect that spares the calves on late kilometers. Zero blisters straight out of the box.',
      fit: 'true_to_size',
      verified: true,
    },
    {
      id: 'rev-2',
      author: 'Ananya Sen',
      rating: 5,
      date: '3 WEEKS AGO',
      title: 'Lattice cushioning is unlike any standard EVA foam.',
      body: 'The 3D printed lattice actually pushes you forward rather than simply absorbing shock like spongy foam. Running on wet asphalt feels stable with the rubber contact nodes. Truly high-precision engineering.',
      fit: 'true_to_size',
      verified: true,
    },
    {
      id: 'rev-3',
      author: 'Rohan Deshmukh',
      rating: 4,
      date: '1 MONTH AGO',
      title: 'Incredible speed. Snug midfoot lockdown.',
      body: 'Slightly snug through the midfoot on the first 10 km run, but settled in once the monofilament mesh adapted to foot heat. If you have a wide foot, consider sizing up by a half size.',
      fit: 'runs_small',
      verified: true,
    },
  ];

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-line pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="micro-label text-smoke">CLIENT TELEMETRY</span>
          <h3 className="font-display font-extrabold text-xl md:text-2xl text-ink uppercase">
            VERIFIED REVIEWS & FIT FEEDBACK
          </h3>
        </div>
        <span className="micro-label text-smoke">
          {product.ratingCount} VERIFIED PURCHASERS
        </span>
      </div>

      {/* Rating & Fit Breakdown Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-8 border border-line bg-paper">
        {/* Overall Score */}
        <div className="md:col-span-4 flex flex-col justify-center items-center sm:items-start border-b md:border-b-0 md:border-r border-line pb-6 md:pb-0 md:pr-8">
          <p className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-none">
            {product.rating.toFixed(1)}
          </p>
          <div className="flex items-center gap-1 text-acid mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-ink text-ink stroke-1" />
            ))}
          </div>
          <p className="micro-label text-smoke text-[10px] mt-2">
            BASED ON {product.ratingCount} BENCHMARK REVIEWS
          </p>
        </div>

        {/* Rating Distribution Bars */}
        <div className="md:col-span-4 space-y-2 font-mono text-xs my-auto">
          <div className="flex items-center gap-3">
            <span className="w-6 text-smoke">5★</span>
            <div className="flex-1 h-2 bg-bone border border-line overflow-hidden">
              <div className="h-full bg-ink w-[88%]" />
            </div>
            <span className="w-8 text-right text-smoke">88%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 text-smoke">4★</span>
            <div className="flex-1 h-2 bg-bone border border-line overflow-hidden">
              <div className="h-full bg-ink w-[10%]" />
            </div>
            <span className="w-8 text-right text-smoke">10%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 text-smoke">3★</span>
            <div className="flex-1 h-2 bg-bone border border-line overflow-hidden">
              <div className="h-full bg-ink w-[2%]" />
            </div>
            <span className="w-8 text-right text-smoke">2%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 text-smoke">2★</span>
            <div className="flex-1 h-2 bg-bone border border-line overflow-hidden">
              <div className="h-full bg-ink w-[0%]" />
            </div>
            <span className="w-8 text-right text-smoke">0%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 text-smoke">1★</span>
            <div className="flex-1 h-2 bg-bone border border-line overflow-hidden">
              <div className="h-full bg-ink w-[0%]" />
            </div>
            <span className="w-8 text-right text-smoke">0%</span>
          </div>
        </div>

        {/* Fit Feedback Summary Gauge */}
        <div className="md:col-span-4 flex flex-col justify-center space-y-3 border-t md:border-t-0 md:border-l border-line pt-6 md:pt-0 md:pl-8">
          <span className="micro-label text-smoke">ANATOMICAL FIT SUMMARY</span>
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-smoke">RUNS SMALL (14%)</span>
              <span className="font-bold text-ink">TRUE TO SIZE (82%)</span>
              <span className="text-smoke">RUNS LARGE (4%)</span>
            </div>
            <div className="h-3 w-full bg-bone border border-line flex overflow-hidden">
              <div className="h-full bg-smoke/40 w-[14%]" title="Runs small" />
              <div className="h-full bg-acid w-[82%]" title="True to size" />
              <div className="h-full bg-smoke/40 w-[4%]" title="Runs large" />
            </div>
          </div>
          <p className="micro-label text-smoke text-[9px]">
            RECOMMENDATION: SELECT YOUR REGULAR RUNNING SHOE SIZE.
          </p>
        </div>
      </div>

      {/* Itemized Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-6 border border-line bg-paper space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line-soft pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-ink">{rev.author}</span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-status-success uppercase bg-status-success/10 px-2 py-0.5">
                    <CheckCircle className="w-3 h-3" />
                    VERIFIED OWNER
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-smoke font-mono text-[10px]">
                <span>FIT: {rev.fit.replace('_', ' ').toUpperCase()}</span>
                <span>//</span>
                <span>{rev.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-ink">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-ink text-ink" />
              ))}
            </div>

            <h4 className="font-display font-bold text-base text-ink">{rev.title}</h4>
            <p className="text-xs font-mono text-smoke leading-relaxed">{rev.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
