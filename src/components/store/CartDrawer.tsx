'use client';

import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus, Tag, Check, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function CartDrawer() {
  const pathname = usePathname();
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
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
  const [showNotes, setShowNotes] = useState(false);

  const { threshold, remaining, percent } = freeShippingProgress();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  if (!isOpen || pathname?.startsWith('/admin')) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Surface */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
        className="relative z-10 w-full max-w-md bg-paper text-ink h-full flex flex-col shadow-2xl border-l border-line transition-transform duration-300"
      >
        {/* Header */}
        <div className="p-6 border-b border-line flex items-center justify-between bg-paper">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold tracking-tight">BAG</span>
            <span className="micro-label text-smoke bg-bone px-2 py-0.5 border border-line">
              [{items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 ? 'UNIT' : 'UNITS'}]
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 text-smoke hover:text-ink hover:bg-bone border border-transparent hover:border-line transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {items.length > 0 && (
          <div className="bg-bone px-6 py-3 border-b border-line">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider mb-1.5">
              <span>
                {remaining === 0 ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> COMPLIMENTARY EXPRESS SHIPPING UNLOCKED
                  </span>
                ) : (
                  <span>
                    ADD <strong className="text-ink font-bold">₹{remaining.toLocaleString('en-IN')}</strong> FOR FREE EXPRESS SHIPPING
                  </span>
                )}
              </span>
              <span className="text-smoke text-[10px]">{percent}%</span>
            </div>
            <div className="w-full h-1.5 bg-paper border border-line overflow-hidden">
              <div
                className="h-full bg-acid transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            /* Designed Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 border border-line flex items-center justify-center text-smoke mb-6 bg-bone">
                <ShoppingBag className="w-7 h-7 stroke-1" />
              </div>
              <p className="font-display text-2xl font-bold tracking-tight uppercase">
                YOUR BAG IS EMPTY
              </p>
              <p className="text-xs text-smoke max-w-xs mt-2 font-mono uppercase tracking-wider leading-relaxed">
                Nothing engineered yet. Explore our technical collections and find your fit.
              </p>
              <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
                <Link href="/shop" onClick={closeCart}>
                  <Button variant="primary" className="w-full">
                    BROWSE ALL FOOTWEAR
                  </Button>
                </Link>
                <Link href="/collections/pulse" onClick={closeCart}>
                  <Button variant="secondary" className="w-full">
                    EXPLORE PULSE SERIES
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.variantId || item.id}-${item.size}`}
                  className="p-4 border border-line bg-paper flex gap-4 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-bone border border-line relative flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-smoke text-[10px] font-mono">
                        KINETIQ
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/product/${item.slug || 'pulse-01'}`}
                        onClick={closeCart}
                        className="font-display font-bold text-sm tracking-tight hover:text-smoke truncate pr-4"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-smoke hover:text-clay p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>

                    <p className="micro-label text-smoke mt-0.5">
                      SIZE: US {item.size} // {item.color}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-line bg-bone">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-smoke hover:text-ink hover:bg-paper transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-bold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-smoke hover:text-ink hover:bg-paper transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <p className="font-mono text-sm font-bold text-ink">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Module */}
              <div className="pt-2 border-t border-line/60">
                {appliedCoupon ? (
                  <div className="p-3 bg-acid/15 border border-acid/50 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-ink" />
                      <span>
                        CODE: <strong>{appliedCoupon.code}</strong> (-₹{appliedCoupon.discountAmount.toLocaleString('en-IN')})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-smoke hover:text-clay uppercase text-[10px] tracking-wider underline font-bold"
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
                        placeholder="PROMO CODE (e.g. KINETIQ10)"
                        className="flex-1 px-3 py-2 text-xs font-mono uppercase bg-bone border border-line focus:outline-none focus:border-ink"
                      />
                      <Button type="submit" variant="secondary" className="text-xs px-4 h-9">
                        APPLY
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-clay font-mono">{couponError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Order Notes Collapsible */}
              <div className="pt-2 border-t border-line/60">
                <button
                  type="button"
                  onClick={() => setShowNotes(!showNotes)}
                  className="flex items-center justify-between w-full text-xs font-mono uppercase text-smoke hover:text-ink py-1"
                >
                  <span>{showNotes ? 'HIDE DELIVERY INSTRUCTIONS' : '+ ADD DELIVERY INSTRUCTIONS / NOTES'}</span>
                  {showNotes ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {showNotes && (
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specific delivery gate, call before arrival, or packaging instructions..."
                    className="w-full mt-2 p-2.5 text-xs font-mono bg-bone border border-line focus:outline-none focus:border-ink resize-none"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Breakdown & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-6 border-t border-line bg-bone/40 space-y-4">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between items-center text-smoke">
                <span className="uppercase">SUBTOTAL</span>
                <span className="font-bold text-ink">₹{subtotal().toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between items-center text-emerald-700">
                  <span className="uppercase">DISCOUNT ({appliedCoupon.code})</span>
                  <span>-₹{discountTotal().toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-smoke">
                <span className="uppercase">ESTIMATED SHIPPING</span>
                <span className="font-bold text-ink">
                  {shippingFee() === 0 ? 'FREE' : `₹${shippingFee().toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="pt-2 border-t border-line flex justify-between items-center text-sm font-mono">
                <span className="font-bold text-ink uppercase">ESTIMATED TOTAL</span>
                <span className="font-display font-bold text-lg text-ink">
                  ₹{grandTotal().toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Link href="/checkout" onClick={closeCart} className="block">
                <Button variant="acid" className="w-full h-12 flex items-center justify-between px-6 font-bold shadow-md">
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/cart" onClick={closeCart} className="block">
                <Button variant="secondary" className="w-full h-10 text-xs">
                  VIEW FULL BAG ({items.length})
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-smoke font-mono uppercase tracking-widest pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-smoke" />
              <span>CASHFREE PG · 256-BIT ENCRYPTION · FREE 14-DAY EXCHANGES</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
