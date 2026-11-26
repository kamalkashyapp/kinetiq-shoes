'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Copy,
  Check,
  ArrowLeft,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderTrackingProps {
  orderId: string;
}

export function OrderTrackingClient({ orderId }: OrderTrackingProps) {
  const [copied, setCopied] = useState(false);
  const awbNumber = `BD-${orderId.slice(0, 6).toUpperCase()}-9401`;
  const orderNumber = orderId.startsWith('KQ-') ? orderId : `KQ-${orderId.slice(0, 6).toUpperCase()}`;

  const handleCopyAWB = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(awbNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const milestones = [
    {
      title: 'ORDER CONFIRMED & SECURED',
      desc: 'Cashfree transaction authorized. Order queued in central inventory system.',
      time: 'Today, 10:45 AM',
      status: 'completed',
    },
    {
      title: 'LAB INSPECTION & TECHNICAL PACKAGING',
      desc: 'Dual-foot laser balance check and K-BOX packaging initiated.',
      time: 'Today, 02:15 PM',
      status: 'in_progress',
    },
    {
      title: 'HANDED TO BLUEDART EXPRESS AIR',
      desc: 'Air waybill generated and ready for priority airport transfer.',
      time: 'Estimated Tomorrow, 09:00 AM',
      status: 'upcoming',
    },
    {
      title: 'IN TRANSIT // REGIONAL DISTRIBUTION HUB',
      desc: 'Sorting through Bengaluru Central Air Hub.',
      time: 'Estimated 2 Days',
      status: 'upcoming',
    },
    {
      title: 'OUT FOR DELIVERY & CONTACTLESS RECEIPT',
      desc: 'OTP verified handover at delivery address.',
      time: 'Estimated 3–4 Days',
      status: 'upcoming',
    },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href={`/order/${orderId}`}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-smoke hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ORDER SUMMARY</span>
        </Link>
      </div>

      {/* Main Carrier Card */}
      <div className="border border-line bg-paper p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <span className="micro-label text-smoke">LIVE LOGISTICS TELEMETRY</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-1">
              SHIPMENT TRACKING
            </h1>
            <p className="font-mono text-xs text-smoke mt-1">ORDER REF: {orderNumber}</p>
          </div>

          <div className="bg-bone border border-line p-3 flex items-center justify-between sm:justify-start gap-4">
            <div>
              <span className="micro-label text-smoke block">AIR WAYBILL (AWB)</span>
              <span className="font-mono text-sm font-bold text-ink">{awbNumber}</span>
            </div>
            <button
              onClick={handleCopyAWB}
              className="p-2 border border-line bg-paper text-smoke hover:text-ink transition-colors"
              aria-label="Copy tracking number"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Carrier Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 py-4 border-y border-line/60 font-mono text-xs">
          <div>
            <span className="text-smoke block text-[10px] uppercase">CARRIER SERVICE</span>
            <span className="font-bold text-ink">BlueDart Apex Express Air</span>
          </div>
          <div>
            <span className="text-smoke block text-[10px] uppercase">SERVICE LEVEL</span>
            <span className="font-bold text-ink">Insured Priority Cargo</span>
          </div>
          <div>
            <span className="text-smoke block text-[10px] uppercase">DELIVERY DESTINATION</span>
            <span className="font-bold text-ink">Bengaluru, KA, India</span>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="mt-8 space-y-8 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-line">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative flex items-start gap-6 pl-10">
              {/* Milestone Indicator Icon */}
              <div
                className={`absolute left-0 top-0.5 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs ${
                  m.status === 'completed'
                    ? 'bg-ink text-paper ring-4 ring-paper'
                    : m.status === 'in_progress'
                    ? 'bg-acid text-ink ring-4 ring-acid/20 animate-pulse'
                    : 'bg-bone text-smoke border border-line ring-4 ring-paper'
                }`}
              >
                {m.status === 'completed' ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : m.status === 'in_progress' ? (
                  <Clock className="w-4 h-4 text-ink" />
                ) : (
                  <span className="text-[10px]">{idx + 1}</span>
                )}
              </div>

              {/* Milestone Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-display font-bold text-base text-ink tracking-tight uppercase">
                    {m.title}
                  </h3>
                  <span className="font-mono text-xs text-smoke">{m.time}</span>
                </div>
                <p className="font-mono text-xs text-smoke mt-1 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Strip */}
      <div className="border border-line bg-bone/30 p-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Headphones className="w-5 h-5 text-ink flex-shrink-0" />
          <div>
            <p className="font-display font-bold text-sm uppercase">NEED LOGISTICS SUPPORT?</p>
            <p className="font-mono text-xs text-smoke">Our engineering concierge is available 24/7 for order routing inquiries.</p>
          </div>
        </div>
        <Link href="/contact">
          <Button variant="secondary" className="text-xs h-9">
            CONTACT CONCIERGE
          </Button>
        </Link>
      </div>
    </div>
  );
}
