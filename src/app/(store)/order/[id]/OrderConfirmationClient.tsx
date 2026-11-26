'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderConfirmationProps {
  orderId: string;
}

export function OrderConfirmationClient({ orderId }: OrderConfirmationProps) {
  // Compute estimated delivery date (3-5 business days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const orderNumber = orderId.startsWith('KQ-') ? orderId : `KQ-${orderId.slice(0, 6).toUpperCase()}`;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Header Banner */}
      <div className="border border-line bg-paper p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
        {/* Subtle accent corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-acid/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 bg-acid/20 border border-acid text-ink flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-ink stroke-[1.75]" />
        </div>

        <span className="micro-label text-smoke">TRANSACTION AUTHORIZED & SECURED</span>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight uppercase mt-2">
          ORDER CONFIRMED
        </h1>

        <p className="font-mono text-sm sm:text-base text-smoke max-w-lg mx-auto mt-4 leading-relaxed">
          Your order <strong className="text-ink font-bold">{orderNumber}</strong> has been received and queued for high-precision inspection in the KINETIQ lab.
        </p>

        {/* Status Pill */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-bone border border-line font-mono text-xs text-ink uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>PAYMENT VERIFIED // CASHFREE PG</span>
          <span className="text-smoke">·</span>
          <span className="font-bold">STATUS: PREPARING SHIPMENT</span>
        </div>
      </div>

      {/* Primary Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Estimated Delivery */}
        <div className="border border-line bg-paper p-6 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 bg-bone border border-line flex items-center justify-center text-ink flex-shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="micro-label text-smoke">ESTIMATED DELIVERY</span>
            <p className="font-display font-bold text-base mt-1 text-ink">{formattedDelivery}</p>
            <p className="text-xs font-mono text-smoke mt-0.5">Dispatches via BlueDart Express Air</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border border-line bg-paper p-6 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 bg-bone border border-line flex items-center justify-center text-ink flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="micro-label text-smoke">DELIVERY DESTINATION</span>
            <p className="font-display font-bold text-base mt-1 text-ink">Bengaluru, KA 560001</p>
            <p className="text-xs font-mono text-smoke mt-0.5">Standard Insured Delivery</p>
          </div>
        </div>

        {/* Payment Receipt */}
        <div className="border border-line bg-paper p-6 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 bg-bone border border-line flex items-center justify-center text-ink flex-shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="micro-label text-smoke">PAYMENT AUTHORIZED</span>
            <p className="font-display font-bold text-base mt-1 text-ink">Cashfree PG · 100% Paid</p>
            <p className="text-xs font-mono text-smoke mt-0.5">Authoritative Signature Verified</p>
          </div>
        </div>
      </div>

      {/* Order Items Table & Invoice Summary */}
      <div className="border border-line bg-paper mt-8 p-6 sm:p-8 shadow-sm">
        <div className="border-b border-line pb-4 flex items-center justify-between">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight">
            ORDER MANIFEST
          </h2>
          <span className="font-mono text-xs text-smoke uppercase">
            REF: {orderNumber}
          </span>
        </div>

        {/* Sample itemized breakdown */}
        <div className="divide-y divide-line my-4">
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-bone border border-line relative flex-shrink-0 flex items-center justify-center font-mono text-xs text-smoke font-bold">
                PULSE
              </div>
              <div>
                <p className="font-display font-bold text-base text-ink">PULSE 01</p>
                <p className="micro-label text-smoke mt-0.5">SIZE: US 10.0 // Acid Ghost // QTY: 1</p>
              </div>
            </div>
            <p className="font-mono text-sm font-bold text-ink">₹14,999</p>
          </div>
        </div>

        {/* Financial Subtotals */}
        <div className="border-t border-line pt-4 space-y-2 font-mono text-xs max-w-xs ml-auto">
          <div className="flex justify-between text-smoke">
            <span>SUBTOTAL</span>
            <span className="text-ink font-bold">₹14,999</span>
          </div>
          <div className="flex justify-between text-smoke">
            <span>SHIPPING</span>
            <span className="text-emerald-700 font-bold">COMPLIMENTARY</span>
          </div>
          <div className="flex justify-between text-smoke">
            <span>GST (18% INCLUDED)</span>
            <span>₹2,288</span>
          </div>
          <div className="border-t border-line pt-3 flex justify-between items-baseline text-sm">
            <span className="font-bold text-ink uppercase">TOTAL PAID</span>
            <span className="font-display font-bold text-lg text-ink">₹14,999</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link href={`/order/${orderId}/track`} className="flex-1">
          <Button variant="acid" className="w-full h-12 flex items-center justify-center gap-2 font-bold shadow-md">
            <Truck className="w-4 h-4" />
            <span>TRACK SHIPMENT TIMELINE</span>
          </Button>
        </Link>

        <Button
          variant="secondary"
          onClick={handlePrint}
          className="flex-1 h-12 flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>DOWNLOAD TAX INVOICE (PDF)</span>
        </Button>

        <Link href="/shop" className="flex-1">
          <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2">
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
