'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Trash2, Plus, Minus, Tag, ShieldCheck, Truck, RefreshCw, ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { PROMO_CODES } from '@/lib/discounts';
import { Button } from '@/components/ui/button';

// Curated technical accessories for the "Complete Your Kit" module
const COMPLETE_KIT_ITEMS = [
  {
    id: 'acc-socks-01',
    variantId: 'var-acc-socks-white',
    productId: 'acc-socks-01',
    name: 'K-MERINO VENTILATED SOCKS',
    price: 1299,
    size: 10,
    color: 'Optic White',
    image: '/images/products/socks-white.svg',
    slug: 'k-merino-socks',
    specs: 'Merino Wool · Seamless Toe · Compression Arch',
  },
  {
    id: 'acc-insoles-01',
    variantId: 'var-acc-insoles-carbon',
    productId: 'acc-insoles-01',
    name: 'PROPULSION CARBON INSOLES',
    price: 2499,
    size: 10,
    color: 'Carbon Black',
    image: '/images/products/insoles.svg',
    slug: 'propulsion-carbon-insoles',
    specs: 'Aerospace Carbon · High Energy Return',
  },
];

export function CartPageClient() {
  const {
    items,
    removeItem,
    updateQuantity,
    addItem,
    subtotal,
    discountTotal,
    shippingFee,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingProgress,
    notes,
    setNotes,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const { remaining, percent } = freeShippingProgress();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError('');
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-bone/30">
        <div className="w-20 h-20 border border-line bg-paper flex items-center justify-center text-smoke mb-6 shadow-sm">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-sm text-smoke max-w-md mt-3 font-mono uppercase tracking-wider leading-relaxed">
          Nothing engineered yet. Browse our performance silhouettes and add your gear.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link href="/shop" className="flex-1">
            <Button variant="primary" className="w-full h-12">
              BROWSE ALL FOOTWEAR
            </Button>
          </Link>
          <Link href="/collections/pulse" className="flex-1">
            <Button variant="secondary" className="w-full h-12">
              EXPLORE PULSE
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Editorial Title & Metric */}
      <div className="border-b border-line pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="micro-label text-smoke">BAG MANIFEST // REVIEW & EDIT</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase mt-1">
            SHOPPING BAG
          </h1>
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-smoke flex items-center gap-3">
          <span>{items.reduce((acc, i) => acc + i.quantity, 0)} UNITS TOTAL</span>
          <span className="text-line">|</span>
          <span className="text-ink font-bold">ALL PRICES IN INR (₹)</span>
        </div>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="bg-paper border border-line p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-bone border border-line flex items-center justify-center text-ink flex-shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-ink">
              {remaining === 0 ? (
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> COMPLIMENTARY EXPRESS DISPATCH ACTIVATED
                </span>
              ) : (
                <span>
                  ADD ₹{remaining.toLocaleString('en-IN')} MORE FOR FREE INSURED EXPRESS DISPATCH
                </span>
              )}
            </p>
            <p className="text-[11px] text-smoke font-mono">
              Threshold: ₹10,000 · Dispatches within 24h from KINETIQ Lab
            </p>
          </div>
        </div>
        <div className="w-full sm:w-48">
          <div className="w-full h-2 bg-bone border border-line overflow-hidden">
            <div
              className="h-full bg-acid transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Bag Items (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-line bg-paper divide-y divide-line">
            {items.map((item) => (
              <div
                key={`${item.variantId || item.id}-${item.size}`}
                className="p-6 flex flex-col sm:flex-row gap-6 relative group"
              >
                {/* Product Image */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 bg-bone border border-line relative flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="150px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-smoke font-mono text-xs">
                      KINETIQ
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="micro-label text-smoke">SPEC // {item.color}</span>
                        <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-ink">
                          <Link href={`/product/${item.slug || 'pulse-01'}`} className="hover:text-smoke transition-colors">
                            {item.name}
                          </Link>
                        </h2>
                      </div>
                      <p className="font-mono text-lg font-bold text-ink">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-smoke">
                      <span className="bg-bone px-2 py-0.5 border border-line">
                        SIZE: US {item.size}
                      </span>
                      <span>COLORWAY: {item.color}</span>
                      <span>UNIT: ₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Actions & Stepper */}
                  <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="micro-label text-smoke">QTY:</span>
                      <div className="flex items-center border border-line bg-bone">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-smoke hover:text-ink hover:bg-paper transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-mono text-sm font-bold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-smoke hover:text-ink hover:bg-paper transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-smoke hover:text-clay text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>REMOVE ITEM</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Special Delivery Instructions / Notes */}
          <div className="border border-line bg-paper p-6">
            <label htmlFor="delivery-notes" className="micro-label text-smoke block mb-2">
              SPECIAL DELIVERY INSTRUCTIONS // OPTIONAL
            </label>
            <textarea
              id="delivery-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Leave at reception, call recipient before gate entry, specific landmark..."
              className="w-full p-3 text-xs font-mono bg-bone border border-line focus:outline-none focus:border-ink resize-none"
            />
          </div>

          {/* Complete Your Kit Cross-Sell Module */}
          <div className="border border-line bg-paper p-6">
            <div className="border-b border-line pb-4 mb-4 flex items-center justify-between">
              <div>
                <span className="micro-label text-smoke">RECOMMENDED PAIRINGS</span>
                <h3 className="font-display font-bold text-lg uppercase tracking-tight">
                  COMPLETE YOUR TECHNICAL KIT
                </h3>
              </div>
              <span className="text-[11px] font-mono text-smoke uppercase">COMPLIMENTARY DISPATCH</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPLETE_KIT_ITEMS.map((acc) => (
                <div key={acc.id} className="p-4 border border-line bg-bone/40 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-paper border border-line relative flex-shrink-0">
                    <Image
                      src={acc.image}
                      alt={acc.name}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-xs truncate">{acc.name}</p>
                    <p className="text-[10px] text-smoke font-mono truncate">{acc.specs}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold">₹{acc.price.toLocaleString('en-IN')}</span>
                      <Button
                        variant="secondary"
                        className="text-[10px] h-7 px-2.5"
                        onClick={() => addItem({ ...acc, quantity: 1 })}
                      >
                        + ADD
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sticky Order Summary (4 columns) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="border border-line bg-paper p-6 shadow-sm">
            <span className="micro-label text-smoke block mb-1">FINANCIAL SUMMARY</span>
            <h2 className="font-display font-bold text-2xl uppercase tracking-tight border-b border-line pb-4 mb-6">
              ORDER SUMMARY
            </h2>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-smoke">
                <span className="uppercase">SUBTOTAL</span>
                <span className="text-ink font-bold">₹{subtotal().toLocaleString('en-IN')}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between items-center text-emerald-700">
                  <span className="uppercase">PROMO CODE ({appliedCoupon.code})</span>
                  <span>-₹{discountTotal().toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-smoke">
                <span className="uppercase">SHIPPING ESTIMATE</span>
                <span className="text-ink font-bold">
                  {shippingFee() === 0 ? 'COMPLIMENTARY' : `₹${shippingFee().toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="flex justify-between items-center text-smoke">
                <span className="uppercase">GST (18% INCLUDED)</span>
                <span className="text-smoke">₹{Math.round((grandTotal() * 0.18) / 1.18).toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-4 border-t border-line flex justify-between items-baseline">
                <span className="font-display font-bold text-base uppercase text-ink">TOTAL DUE</span>
                <span className="font-display font-bold text-2xl text-ink">
                  ₹{grandTotal().toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="mt-6 pt-6 border-t border-line">
              <span className="micro-label text-smoke block mb-2">PROMOTIONAL CODE</span>
              {appliedCoupon ? (
                <div className="p-3 bg-acid/15 border border-acid/50 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span><strong>{appliedCoupon.code}</strong> (-₹{appliedCoupon.discountAmount.toLocaleString('en-IN')})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-smoke hover:text-clay uppercase text-[10px] underline font-bold"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. KINETIQ10"
                      className="flex-1 px-3 py-2 text-xs font-mono uppercase bg-bone border border-line focus:outline-none focus:border-ink"
                    />
                    <Button type="submit" variant="secondary" className="text-xs px-4 h-9">
                      APPLY
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-clay font-mono">{couponError}</p>
                  )}
                  <p className="text-[10px] text-smoke font-mono">
                    Try: <code className="text-ink font-bold">KINETIQ10</code> or <code className="text-ink font-bold">FIRSTDROP</code>
                  </p>
                </form>
              )}
            </div>

            {/* Primary Checkout CTA */}
            <div className="mt-6 space-y-3">
              <Link href="/checkout" className="block">
                <Button variant="acid" className="w-full h-14 flex items-center justify-between px-6 text-sm font-bold shadow-md">
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/shop" className="block text-center">
                <span className="text-xs font-mono uppercase tracking-wider text-smoke hover:text-ink underline">
                  ← CONTINUE SHOPPING
                </span>
              </Link>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="border border-line bg-paper p-5 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-ink flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-mono uppercase font-bold text-ink">OFFICIAL CASHFREE GATEWAY</p>
                <p className="text-[11px] text-smoke font-mono">End-to-end encrypted 256-bit payment verification.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-4 h-4 text-ink flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-mono uppercase font-bold text-ink">14-DAY HASSLE-FREE RETURNS</p>
                <p className="text-[11px] text-smoke font-mono">Unworn pairs with original packaging eligible for free exchange.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
