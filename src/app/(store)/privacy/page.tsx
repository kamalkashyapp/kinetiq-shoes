import React from 'react';
import Link from 'next/link';
import { Shield, Lock, EyeOff, FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Privacy Policy & Data Telemetry — KINETIQ',
  description:
    'Our commitment to data sovereignty: salted SHA-256 hashing, RBI tokenized payments, and zero third-party advertising trackers.',
};

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-12">
      {/* Header */}
      <section className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="acid">DATA SOVEREIGNTY</Badge>
          <span className="micro-label text-smoke">REVISION 2026.1 · EFFECTIVE IMMEDIATELY</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.92]">
          PRIVACY &
          <br />
          <span className="text-smoke">DATA PROTOCOL.</span>
        </h1>
        <p className="font-mono text-sm text-smoke">
          KINETIQ operates on a principle of radical data minimization. We collect only what is strictly necessary to fabricate, authorize, and dispatch your footwear.
        </p>
      </section>

      {/* Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
        <div className="border border-line bg-paper p-5 space-y-2">
          <EyeOff className="w-5 h-5 text-ink mb-1" />
          <div className="font-bold text-ink uppercase">// ZERO THIRD-PARTY PIXELS</div>
          <p className="text-smoke leading-relaxed">
            We do not embed third-party surveillance scripts, Meta Pixels, or cross-site tracking cookies.
          </p>
        </div>

        <div className="border border-line bg-paper p-5 space-y-2">
          <Lock className="w-5 h-5 text-ink mb-1" />
          <div className="font-bold text-ink uppercase">// RBI COMPLIANT PAYMENT</div>
          <p className="text-smoke leading-relaxed">
            All card transactions are tokenized via Cashfree PG in compliance with Reserve Bank of India directives.
          </p>
        </div>

        <div className="border border-line bg-paper p-5 space-y-2">
          <Shield className="w-5 h-5 text-ink mb-1" />
          <div className="font-bold text-ink uppercase">// SALTED TELEMETRY HASH</div>
          <p className="text-smoke leading-relaxed">
            Server analytics hashes client IP addresses with rotating daily cryptographic salt before storage.
          </p>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-10 font-mono text-xs text-smoke leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
            01 // INFORMATION WE COLLECT
          </h2>
          <p>
            When you execute an order or register a biometric account, we retain:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-ink">
            <li>Identity Information: Name and email address authenticated via Google OAuth or encrypted credentials.</li>
            <li>Fulfillment Telemetry: Physical shipping address, contact phone number, and postal code for BlueDart routing.</li>
            <li>Biomechanical Fitting Preferences: Footwear size, preferred collection discipline, and archived order histories.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
            02 // PAYMENT DATA & RBI TOKENIZATION
          </h2>
          <p>
            KINETIQ does not store, process, or transmit full 16-digit credit/debit card numbers, expiration dates, or Card Verification Values (CVV). All payment processing occurs inside sandboxed, PCI-DSS Level 1 certified infrastructure provided by Cashfree Payments India Private Limited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
            03 // FIRST-PARTY ANALYTICS
          </h2>
          <p>
            We operate our own first-party analytics ingestion engine (/api/track) solely to detect website bottlenecks, conversion funnel drop-offs, and browser compatibility issues. We do not sell, rent, or trade your telemetry to programmatic advertising exchanges.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
            04 // RIGHT TO ERASURE & DATA SOVEREIGNTY
          </h2>
          <p>
            In compliance with applicable Indian data protection frameworks, you maintain the irrevocable right to permanently delete your account, saved addresses, biometric fit profiles, and marketing subscriptions. You may execute this directly at{' '}
            <Link href="/account/settings" className="text-ink underline font-bold">
              /account/settings
            </Link>{' '}
            under the Account Danger Zone.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="pt-8 border-t border-line flex justify-between items-center">
        <span className="font-mono text-xs text-smoke">Questions? Contact privacy@kinetiq.run</span>
        <Button asChild variant="outline" className="font-mono text-xs">
          <Link href="/terms">VIEW TERMS OF SERVICE</Link>
        </Button>
      </div>
    </div>
  );
}
