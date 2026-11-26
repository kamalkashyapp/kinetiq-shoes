'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Truck,
  MapPin,
  Mail,
  Phone,
  User,
  ShoppingBag,
  Sparkles,
  AlertCircle,
  QrCode,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { PROMO_CODES } from '@/lib/discounts';
import { Button } from '@/components/ui/button';

// Major Indian PIN code lookup directory for instant auto-fill
const PINCODE_LOOKUP: Record<string, { city: string; state: string }> = {
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat' },
  '411001': { city: 'Pune', state: 'Maharashtra' },
  '302001': { city: 'Jaipur', state: 'Rajasthan' },
  '160001': { city: 'Chandigarh', state: 'Punjab' },
  '682001': { city: 'Kochi', state: 'Kerala' },
  '122001': { city: 'Gurugram', state: 'Haryana' },
  '201301': { city: 'Noida', state: 'Uttar Pradesh' },
};

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export function CheckoutClient() {
  const router = useRouter();
  const {
    items,
    clearCart,
    subtotal,
    discountTotal,
    appliedCoupon,
    notes,
  } = useCartStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    line1: '',
    line2: '',
    pincode: '',
    city: '',
    state: 'Karnataka',
    saveInfo: true,
  });

  const handlePincodeChange = (pincode: string) => {
    const cleanPin = pincode.replace(/[^0-9]/g, '').slice(0, 6);
    setFormData((prev) => ({
      ...prev,
      pincode: cleanPin,
      ...(PINCODE_LOOKUP[cleanPin] ? PINCODE_LOOKUP[cleanPin] : {}),
    }));
  };

  const rawSubtotal = subtotal();
  const shippingFee = shippingMethod === 'express' ? 450 : rawSubtotal >= 10000 ? 0 : 250;
  const discount = discountTotal();
  const grandTotal = Math.max(0, rawSubtotal - discount + shippingFee);

  const isContactValid =
    formData.email.includes('@') && formData.phone.replace(/[^0-9]/g, '').length >= 10;
  const isAddressValid =
    formData.fullName.trim().length >= 2 &&
    formData.line1.trim().length >= 4 &&
    formData.city.trim().length >= 2 &&
    formData.pincode.length === 6;

  const handleProceedToPayment = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Authoritative Server-Side Order Creation
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            variantId: i.variantId,
            productId: i.productId,
            slug: i.slug,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
          })),
          shippingAddress: {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            line1: formData.line1,
            line2: formData.line2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: 'IN',
          },
          shippingMethod,
          discountCode: appliedCoupon?.code,
          notes,
        }),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize order on server');
      }

      const { orderId, orderNumber, paymentSessionId, mode } = orderData;

      // 2. Cashfree Payment Execution
      if (mode === 'cashfree' && typeof window !== 'undefined' && (window as any).Cashfree) {
        // Load production/sandbox Cashfree Drop SDK
        const cashfree = (window as any).Cashfree({ mode: 'sandbox' });
        cashfree.checkout({
          paymentSessionId,
          redirectTarget: '_self',
        });
      } else {
        // Simulated sandbox payment authorization
        // Call verification endpoint to transition order to 'paid' and atomically decrement stock
        const verifyRes = await fetch('/api/checkout/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            orderNumber,
            paymentId: `cf_sandbox_pay_${Date.now()}`,
            simulateSuccess: true,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          clearCart();
          router.push(`/order/${orderId || orderNumber}?status=paid`);
        } else {
          throw new Error('Payment simulation could not be verified');
        }
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Payment initiation failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <ShoppingBag className="w-12 h-12 text-smoke mb-4" />
        <h1 className="font-display text-3xl font-bold uppercase">NO ITEMS TO CHECK OUT</h1>
        <p className="font-mono text-xs text-smoke uppercase mt-2">Your shopping bag is currently empty.</p>
        <Link href="/shop" className="mt-6">
          <Button variant="primary">RETURN TO SHOP</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone/20">
      {/* Secure Checkout Header */}
      <header className="border-b border-line bg-paper sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-smoke hover:text-ink text-xs font-mono uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">RETURN TO BAG</span>
          </Link>

          <Link href="/" className="font-display font-extrabold text-2xl tracking-tighter text-ink">
            KINETIQ
          </Link>

          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-smoke">
            <Lock className="w-3.5 h-3.5 text-ink" />
            <span className="hidden sm:inline">100% SECURE CHECKOUT</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: 4-Step Checkout Stepper (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Information */}
            <div className="border border-line bg-paper p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    currentStep > 1 ? 'bg-ink text-paper' : 'bg-acid text-ink'
                  }`}>
                    {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                  </span>
                  <h2 className="font-display font-bold text-lg uppercase tracking-tight">
                    CONTACT INFORMATION
                  </h2>
                </div>
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-mono uppercase text-smoke hover:text-ink underline"
                  >
                    EDIT
                  </button>
                )}
              </div>

              {currentStep === 1 ? (
                <div className="space-y-4">
                  <div>
                    <label className="micro-label text-smoke block mb-1.5">
                      EMAIL ADDRESS // ORDER CONFIRMATION
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-smoke absolute left-3 top-3.5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="athlete@kinetiq.design"
                        className="w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-bone border border-line focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="micro-label text-smoke block mb-1.5">
                      MOBILE PHONE // SMS DELIVERY UPDATES (+91)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-smoke absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-bone border border-line focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      className="w-full h-11"
                      disabled={!isContactValid}
                      onClick={() => setCurrentStep(2)}
                    >
                      CONTINUE TO SHIPPING ADDRESS
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="font-mono text-xs text-smoke">
                  <p className="text-ink font-bold">{formData.email}</p>
                  <p>{formData.phone}</p>
                </div>
              )}
            </div>

            {/* Step 2: Shipping Address */}
            <div className="border border-line bg-paper p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    currentStep > 2 ? 'bg-ink text-paper' : currentStep === 2 ? 'bg-acid text-ink' : 'bg-bone text-smoke border border-line'
                  }`}>
                    {currentStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
                  </span>
                  <h2 className="font-display font-bold text-lg uppercase tracking-tight">
                    DELIVERY ADDRESS
                  </h2>
                </div>
                {currentStep > 2 && (
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-mono uppercase text-smoke hover:text-ink underline"
                  >
                    EDIT
                  </button>
                )}
              </div>

              {currentStep === 2 ? (
                <div className="space-y-4">
                  <div>
                    <label className="micro-label text-smoke block mb-1.5">FULL RECIPIENT NAME</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-smoke absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Rohan Verma"
                        className="w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-bone border border-line focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="micro-label text-smoke block mb-1.5">
                      STREET ADDRESS // HOUSE, FLAT, BUILDING
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-smoke absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.line1}
                        onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                        placeholder="Flat 402, Gravity Towers, 100 Feet Rd"
                        className="w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-bone border border-line focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="micro-label text-smoke block mb-1.5">
                      APARTMENT, SUITE, LANDMARK // OPTIONAL
                    </label>
                    <input
                      type="text"
                      value={formData.line2}
                      onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                      placeholder="Opposite Indiranagar Club"
                      className="w-full px-4 py-2.5 text-sm font-mono bg-bone border border-line focus:outline-none focus:border-ink"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="micro-label text-smoke block mb-1.5">PIN CODE (6 DIGITS)</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={formData.pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        placeholder="560001"
                        className="w-full px-4 py-2.5 text-sm font-mono font-bold bg-bone border border-line focus:outline-none focus:border-ink"
                      />
                    </div>

                    <div>
                      <label className="micro-label text-smoke block mb-1.5">CITY</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Bengaluru"
                        className="w-full px-4 py-2.5 text-sm font-mono bg-bone border border-line focus:outline-none focus:border-ink"
                      />
                    </div>

                    <div>
                      <label className="micro-label text-smoke block mb-1.5">STATE</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm font-mono bg-bone border border-line focus:outline-none focus:border-ink"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      className="w-full h-11"
                      disabled={!isAddressValid}
                      onClick={() => setCurrentStep(3)}
                    >
                      CONTINUE TO SHIPPING METHOD
                    </Button>
                  </div>
                </div>
              ) : currentStep > 2 ? (
                <div className="font-mono text-xs text-smoke">
                  <p className="text-ink font-bold">{formData.fullName}</p>
                  <p>{formData.line1}{formData.line2 ? `, ${formData.line2}` : ''}</p>
                  <p>{formData.city}, {formData.state} — {formData.pincode}, India</p>
                </div>
              ) : null}
            </div>

            {/* Step 3: Shipping Method */}
            <div className="border border-line bg-paper p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    currentStep > 3 ? 'bg-ink text-paper' : currentStep === 3 ? 'bg-acid text-ink' : 'bg-bone text-smoke border border-line'
                  }`}>
                    {currentStep > 3 ? <Check className="w-3.5 h-3.5" /> : '3'}
                  </span>
                  <h2 className="font-display font-bold text-lg uppercase tracking-tight">
                    DELIVERY SPEED
                  </h2>
                </div>
                {currentStep > 3 && (
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-mono uppercase text-smoke hover:text-ink underline"
                  >
                    EDIT
                  </button>
                )}
              </div>

              {currentStep === 3 ? (
                <div className="space-y-4">
                  {/* Standard Option */}
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`p-4 border block cursor-pointer transition-colors ${
                      shippingMethod === 'standard'
                        ? 'border-ink bg-bone/60'
                        : 'border-line hover:border-smoke'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping_method"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="accent-ink"
                        />
                        <div>
                          <p className="font-display font-bold text-sm text-ink">
                            STANDARD EXPRESS (3–5 BUSINESS DAYS)
                          </p>
                          <p className="font-mono text-xs text-smoke">
                            BlueDart / Delhivery surface express with door-to-door tracking
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-ink">
                        {rawSubtotal >= 10000 ? 'FREE' : '₹250'}
                      </span>
                    </div>
                  </label>

                  {/* Priority Air Courier Option */}
                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`p-4 border block cursor-pointer transition-colors ${
                      shippingMethod === 'express'
                        ? 'border-ink bg-bone/60'
                        : 'border-line hover:border-smoke'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping_method"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-ink"
                        />
                        <div>
                          <p className="font-display font-bold text-sm text-ink">
                            PRIORITY AIR COURIER (1–2 BUSINESS DAYS)
                          </p>
                          <p className="font-mono text-xs text-smoke">
                            Guaranteed next-flight air cargo dispatch with dedicated handling
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-ink">₹450</span>
                    </div>
                  </label>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      className="w-full h-11"
                      onClick={() => setCurrentStep(4)}
                    >
                      CONTINUE TO PAYMENT
                    </Button>
                  </div>
                </div>
              ) : currentStep > 3 ? (
                <div className="font-mono text-xs text-smoke flex items-center justify-between">
                  <span>{shippingMethod === 'express' ? 'PRIORITY AIR COURIER (1-2 DAYS)' : 'STANDARD EXPRESS (3-5 DAYS)'}</span>
                  <span className="text-ink font-bold">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
              ) : null}
            </div>

            {/* Step 4: Payment via Cashfree */}
            <div className="border border-line bg-paper p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-line pb-4 mb-4">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                  currentStep === 4 ? 'bg-acid text-ink' : 'bg-bone text-smoke border border-line'
                }`}>
                  4
                </span>
                <h2 className="font-display font-bold text-lg uppercase tracking-tight">
                  PAYMENT GATEWAY // CASHFREE
                </h2>
              </div>

              {currentStep === 4 && (
                <div className="space-y-6">
                  {errorMessage && (
                    <div className="p-3 bg-clay/10 border border-clay text-clay text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Payment Gateway Info Badge */}
                  <div className="border border-line bg-bone/40 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="micro-label text-smoke">PAYMENT ENGINE</span>
                      <span className="font-mono text-xs font-bold bg-ink text-paper px-2 py-0.5">
                        CASHFREE PG SANDBOX
                      </span>
                    </div>

                    <p className="text-xs font-mono text-smoke leading-relaxed">
                      All major Indian payment methods supported: UPI (Google Pay, PhonePe, Paytm, CRED),
                      Visa, Mastercard, RuPay, and NetBanking across 50+ banks.
                    </p>

                    <div className="pt-2 border-t border-line/60 grid grid-cols-3 gap-2 text-center text-[10px] font-mono uppercase tracking-wider text-smoke">
                      <div className="p-2 border border-line bg-paper flex flex-col items-center gap-1">
                        <QrCode className="w-4 h-4 text-ink" />
                        <span>INSTANT UPI</span>
                      </div>
                      <div className="p-2 border border-line bg-paper flex flex-col items-center gap-1">
                        <CreditCard className="w-4 h-4 text-ink" />
                        <span>CARDS</span>
                      </div>
                      <div className="p-2 border border-line bg-paper flex flex-col items-center gap-1">
                        <Lock className="w-4 h-4 text-ink" />
                        <span>NETBANKING</span>
                      </div>
                    </div>
                  </div>

                  {/* Authoritative Server Total Reminder */}
                  <div className="p-3 bg-bone border border-line flex items-center justify-between text-xs font-mono">
                    <span className="text-smoke">FINAL PAYABLE IN INR:</span>
                    <span className="font-display font-bold text-xl text-ink">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Primary Trigger Button */}
                  <Button
                    variant="acid"
                    className="w-full h-14 flex items-center justify-between px-6 text-sm font-bold shadow-lg"
                    disabled={isSubmitting}
                    onClick={handleProceedToPayment}
                  >
                    <span>
                      {isSubmitting ? 'PROCESSING PAYMENT ENCRYPTION...' : `PAY ₹${grandTotal.toLocaleString('en-IN')} WITH CASHFREE`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <p className="text-[10px] text-smoke text-center font-mono uppercase tracking-wider">
                    BY CLICKING PAY, YOU AGREE TO KINETIQ TERMS OF SALE AND AUTHORIZE CASHFREE TO PROCESS THIS TRANSACTION.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Sticky Order Summary (5 columns) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="border border-line bg-paper p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                <h3 className="font-display font-bold text-lg uppercase tracking-tight">
                  BAG SUMMARY ({items.reduce((acc, i) => acc + i.quantity, 0)})
                </h3>
                <Link href="/cart" className="text-xs font-mono uppercase text-smoke hover:text-ink underline">
                  EDIT
                </Link>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.variantId || item.id}-${item.size}`} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-bone border border-line relative flex-shrink-0">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-xs truncate">{item.name}</p>
                      <p className="micro-label text-smoke">US {item.size} // {item.color}</p>
                      <p className="font-mono text-xs text-smoke mt-0.5">QTY: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-xs font-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="border-t border-line mt-6 pt-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-smoke">
                  <span>SUBTOTAL</span>
                  <span className="text-ink font-bold">₹{rawSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-emerald-700">
                    <span>DISCOUNT ({appliedCoupon.code})</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-smoke">
                  <span>SHIPPING</span>
                  <span className="text-ink font-bold">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-smoke">
                  <span>TAX (18% GST INCLUDED)</span>
                  <span className="text-smoke">₹{Math.round((grandTotal * 0.18) / 1.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-line pt-3 flex justify-between items-baseline">
                  <span className="font-display font-bold text-sm uppercase">TOTAL PAYABLE</span>
                  <span className="font-display font-bold text-xl text-ink">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Assurance */}
            <div className="border border-line bg-bone/30 p-4 space-y-2 text-xs font-mono text-smoke">
              <div className="flex items-center gap-2 text-ink font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>SERVER-AUTHORITATIVE COMMERCE</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Stock is locked and decremented atomically upon Cashfree authorization.
                Order states transition strictly one-directional with complete audit trails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
