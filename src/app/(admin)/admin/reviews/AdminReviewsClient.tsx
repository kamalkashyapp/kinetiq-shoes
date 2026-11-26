'use client';

import React, { useState } from 'react';
import { Star, Check, X, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/providers/ToastProvider';

interface Review {
  id: string;
  productName: string;
  reviewer: string;
  rating: number;
  title: string;
  body: string;
  fitFeedback: 'runs_small' | 'true_to_size' | 'runs_large';
  date: string;
  isApproved: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productName: 'PULSE 01',
    reviewer: 'Arjun Nambiar',
    rating: 5,
    title: 'Dual-density foam is unprecedented on long intervals',
    body: 'Paced 15km tempo session on Sunday morning. Energy return on the forefoot rocker is distinctly noticeable past kilometer 8.',
    fitFeedback: 'true_to_size',
    date: '23 Nov 2026',
    isApproved: true,
  },
  {
    id: 'rev-2',
    productName: 'PULSE SPEED CARBON',
    reviewer: 'Meera Sen',
    rating: 5,
    title: 'Carbon plate stiffness is dialed perfectly',
    body: 'Zero wasted lateral torque. Lightweight upper holds the midfoot securely without any lace pressure hot spots.',
    fitFeedback: 'true_to_size',
    date: '24 Nov 2026',
    isApproved: false,
  },
  {
    id: 'rev-3',
    productName: 'TERRA GRAVITY 01',
    reviewer: 'Siddharth Rao',
    rating: 4,
    title: 'Exceptional mud clearing on Western Ghats trails',
    body: 'Deep multidirectional lugs bit cleanly through damp granite and red clay. Only note: toe box runs marginally snug, recommend half size up.',
    fitFeedback: 'runs_small',
    date: '21 Nov 2026',
    isApproved: true,
  },
  {
    id: 'rev-4',
    productName: 'FORM MONO 01',
    reviewer: 'Devika Patel',
    rating: 5,
    title: 'Cleanest silhouette in my rotation',
    body: 'Subtle micro-labels and near-silent colorway. Transitions from design studio to evening effortlessly.',
    fitFeedback: 'true_to_size',
    date: '19 Nov 2026',
    isApproved: false,
  },
];

export function AdminReviewsClient() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: true } : r))
    );
    toast({ title: 'REVIEW APPROVED', description: 'Review published to storefront PDP.', type: 'success' });
  };

  const handleReject = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: false } : r))
    );
    toast({ title: 'REVIEW UNPUBLISHED', type: 'warn' });
  };

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast({ title: 'REVIEW REMOVED FROM QUEUE', type: 'default' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="micro-label text-smoke">COMMUNITY & ATHLETE FEEDBACK</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
            REVIEWS MODERATION QUEUE ({reviews.length})
          </h2>
        </div>
        <p className="font-mono text-xs text-smoke">
          Verified purchaser reviews require operator approval before storefront publication
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className={`p-6 border bg-paper shadow-sm transition-colors space-y-3 ${
              rev.isApproved ? 'border-line' : 'border-amber-400 bg-amber-50/20'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-3">
              <div>
                <span className="font-display font-bold text-sm text-ink">{rev.productName}</span>
                <span className="text-smoke font-mono text-xs ml-2">by {rev.reviewer} ({rev.date})</span>
              </div>

              <div className="flex items-center gap-3">
                {/* 5-star rating */}
                <div className="flex text-ink">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-ink text-ink' : 'text-smoke/30'
                      }`}
                    />
                  ))}
                </div>

                <span
                  className={`micro-label px-2 py-0.5 border ${
                    rev.isApproved
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'border-amber-400 bg-amber-100 text-amber-900 font-bold'
                  }`}
                >
                  {rev.isApproved ? 'APPROVED' : 'AWAITING APPROVAL'}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-base text-ink">{rev.title}</h4>
              <p className="font-mono text-xs text-smoke mt-1 leading-relaxed">{rev.body}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <span className="text-smoke">
                FIT GAUGING: <strong className="text-ink uppercase">{rev.fitFeedback.replace('_', ' ')}</strong>
              </span>

              <div className="flex items-center gap-2">
                {!rev.isApproved ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(rev.id)}
                    className="h-8 text-[11px] font-bold bg-emerald-700 hover:bg-emerald-800"
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    APPROVE REVIEW
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(rev.id)}
                    className="h-8 text-[11px]"
                  >
                    UNPUBLISH
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(rev.id)}
                  className="h-8 text-[11px] text-clay border-clay hover:bg-clay hover:text-paper"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
