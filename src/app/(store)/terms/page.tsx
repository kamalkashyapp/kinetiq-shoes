import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Terms of Service — KINETIQ',
  description:
    'Legal framework, authoritative server-side pricing terms, Cashfree PG settlement rules, and 6-month structural warranty.',
};

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-12">
      {/* Header */}
      <section className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="acid">LEGAL FRAMEWORK</Badge>
          <span className="micro-label text-smoke">REVISION 2026.1 · JURISDICTION: BENGALURU</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.92]">
          TERMS OF
          <br />
          <span className="text-smoke">SERVICE.</span>
        </h1>
        <p className="font-mono text-sm text-smoke">
          By accessing the KINETIQ storefront, deploying checkout transactions, or creating an account, you enter into a binding contractual agreement with KINETIQ Footwear Labs.
        </p>
      </section>

      {/* Terms Content */}
      <div className="space-y-10 font-mono text-xs text-smoke leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
            01 // SERVER-SIDE PRICE AUTHORITY
          </h2>
          <p>
            All catalog pricing, discounts, applicable taxes (18% GST), and shipping tariffs are calculated exclusively by our server-side database engine. The client application (browser) is an interface only; any attempt to alter, mock, or tamper with item amounts, coupon logic, or checkout payloads will cause immediate server-side transaction rejection.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
            02 // CURRENCY & PAYMENT SETTLEMENT
          </h2>
          <p>
            All domestic retail transactions are settled in Indian Rupees (₹ INR). Payments are processed via Cashfree Payments India Private Limited. An order is deemed binding only after our server verifies the cryptographic HMAC-SHA256 signature delivered via Cashfree webhook telemetry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
            03 // 6-MONTH STRUCTURAL WARRANTY
          </h2>
          <p>
            KINETIQ guarantees that our 3D-printed K-Lattice midsoles and full-length carbon vector plates will remain free from material failure, structural snapping, and delamination for a duration of six (6) months from delivery date under standard running, trail, or lifestyle use. This warranty excludes normal cosmetic wear and tear, abrasion from improper terrain, or intentional structural modifications.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
            04 // INTELLECTUAL PROPERTY & FICTIONAL ENTITY
          </h2>
          <p>
            KINETIQ is an independent, proprietary kinetic footwear concept. All industrial silhouette geometries, Voronoi computational cushioning scripts, visual trademarks, and technical copy are the exclusive intellectual property of KINETIQ Footwear Labs. All product references, engineering metrics, and model names are original.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-ink">
            05 // GOVERNING LAW & JURISDICTION
          </h2>
          <p>
            These Terms of Service are governed by and construed in accordance with the substantive laws of India, including the Information Technology Act, 2000. Any legal proceedings or dispute arbitrations arising from storefront transactions shall be submitted to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="pt-8 border-t border-line flex justify-between items-center">
        <span className="font-mono text-xs text-smoke">Questions regarding terms? legal@kinetiq.run</span>
        <Button asChild variant="outline" className="font-mono text-xs">
          <Link href="/privacy">VIEW PRIVACY PROTOCOL</Link>
        </Button>
      </div>
    </div>
  );
}
