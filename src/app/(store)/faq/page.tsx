'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  category: string;
  items: FAQItem[];
}

const FAQS: FAQSection[] = [
  {
    category: 'SIZING & BIOMECHANICAL FIT',
    items: [
      {
        q: 'How do KINETIQ silhouettes fit compared to standard athletic shoes?',
        a: 'Our silhouettes are engineered on an anatomical foot last with a natural 4mm to 6mm drop. They fit true to size for 94% of runners. If you have a wide forefoot (2E or above) or prefer extra room for ultra-distance foot swelling, we recommend ordering a half size up (e.g., US 9.5 instead of US 9.0).',
      },
      {
        q: 'Does the carbon vector plate require a break-in period?',
        a: 'The full-length carbon vector plate is pre-flexed during autoclave manufacturing. While functional immediately out of the box, we recommend a 15–20 km adaptation phase for your plantar fascia to calibrate to the 88.4% energy return characteristics.',
      },
      {
        q: 'What is the operational lifespan of the 3D-printed K-LATTICE midsole?',
        a: 'Unlike traditional EVA foams that pack out and lose cushioning after 450 km, our additive Voronoi lattice retains 96.2% of its structural elasticity and rebound geometry beyond 1,000 km of road wear.',
      },
    ],
  },
  {
    category: 'PAYMENTS & CASHFREE GATEWAY',
    items: [
      {
        q: 'Which payment instruments are accepted on KINETIQ?',
        a: 'We process all domestic payments in Indian Rupees (₹ INR) via the Cashfree Payments gateway. We accept UPI (Google Pay, PhonePe, Paytm, CRED), all major Credit/Debit Cards (Visa, MasterCard, RuPay, Amex), Net Banking across 50+ Indian banks, and cardless EMI options.',
      },
      {
        q: 'Is GST included in the product price?',
        a: 'Yes. All displayed prices on KINETIQ are 100% inclusive of 18% GST. A compliant GST tax invoice with our GSTIN and HSN code (640411) is automatically generated upon order completion and accessible inside your customer account dashboard.',
      },
      {
        q: 'What happens if my payment is deducted but the order status fails?',
        a: 'Our system reconciles payments server-side directly against Cashfree HMAC-verified webhooks. In the rare event of a bank timeout where funds are debited without order confirmation, our automated ledger reconciles within 15 minutes, or Cashfree automatically reverses the debited amount to your source bank within 24 to 48 banking hours.',
      },
    ],
  },
  {
    category: 'SHIPPING, FULFILLMENT & LOGISTICS',
    items: [
      {
        q: 'What are the delivery timelines across India?',
        a: 'All consignments are dispatched from our Bengaluru fulfillment center via BlueDart Air Priority. Tier 1 Metro cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai) receive delivery within 24 to 48 hours. Tier 2 and Tier 3 destinations arrive within 48 to 72 hours. Remote zones require 3 to 5 business days.',
      },
      {
        q: 'What are the shipping fees?',
        a: 'We provide complimentary BlueDart Air shipping across India on all orders of ₹5,000 or above. For orders below ₹5,000, a flat nominal express shipping fee of ₹250 is applied at checkout.',
      },
      {
        q: 'How do I monitor live transit telemetry?',
        a: 'As soon as your pair is packed and assigned an Air Waybill (AWB), you will receive an SMS and email notification with a live tracking link. You can also monitor your dispatch stages anytime at /account/orders.',
      },
    ],
  },
  {
    category: '14-DAY COMPLIMENTARY EXCHANGES & RETURNS',
    items: [
      {
        q: 'What is the KINETIQ return and exchange policy?',
        a: 'We offer a 14-day zero-friction exchange policy on all unworn footwear in its original packaging. You may request a size replacement or a full refund back to your original payment instrument.',
      },
      {
        q: 'How is the reverse pickup coordinated?',
        a: 'Once an exchange or return is initiated from your account, our logistics partner BlueDart schedules a doorstep inspection and reverse pickup within 24 hours. There are no reverse shipping charges.',
      },
      {
        q: 'How quickly are refunds credited?',
        a: 'Once the returned silhouette arrives at our Bengaluru facility and passes technical inspection (unworn, original tags intact), refunds are processed via Cashfree within 2 hours. Funds reflect in your source account within 2–5 banking days depending on your bank.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    '0-0': true,
    '1-0': true,
  });

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <section className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="acid">KNOWLEDGE BASE</Badge>
          <span className="micro-label text-smoke">SPECIFICATIONS & PROTOCOLS</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.92]">
          FREQUENTLY ASKED
          <br />
          <span className="text-smoke">QUESTIONS.</span>
        </h1>
        <p className="font-mono text-sm text-smoke max-w-2xl">
          Everything you need to know about KINETIQ additive engineering, Cashfree INR transactions, BlueDart Air dispatch, and sizing calibration.
        </p>
      </section>

      {/* FAQ Sections */}
      <div className="space-y-12">
        {FAQS.map((section, secIdx) => (
          <div key={secIdx} className="space-y-4">
            <div className="border-b border-line pb-2">
              <span className="micro-label text-smoke">{section.category}</span>
            </div>

            <div className="space-y-3">
              {section.items.map((item, itemIdx) => {
                const key = `${secIdx}-${itemIdx}`;
                const isOpen = !!openItems[key];

                return (
                  <div
                    key={itemIdx}
                    className="border border-line bg-paper hover:border-ink transition-colors"
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-display font-bold text-base sm:text-lg uppercase tracking-tight text-ink">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-smoke shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-ink' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm font-mono text-smoke leading-relaxed border-t border-line/60 pt-4 bg-bone/40">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Support Banner */}
      <div className="border border-line bg-bone p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-bold text-xl uppercase tracking-tight">STILL HAVE AN UNANSWERED INQUIRY?</h3>
          <p className="font-mono text-xs text-smoke mt-1">
            Our Bengaluru engineering concierge is available Monday through Saturday.
          </p>
        </div>
        <Button asChild className="bg-ink text-bone hover:bg-ink/90 font-mono text-xs shrink-0">
          <Link href="/contact">
            CONTACT CONCIERGE <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
