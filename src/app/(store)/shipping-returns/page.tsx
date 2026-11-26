import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, ShieldCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Shipping & Returns Protocol — KINETIQ',
  description:
    'BlueDart Air domestic express dispatch timelines, complimentary shipping thresholds, and our 14-day exchange protocol.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <section className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="acid">LOGISTICS PROTOCOL</Badge>
          <span className="micro-label text-smoke">BLUEDART AIR · DOMESTIC ONLY</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.92]">
          SHIPPING &
          <br />
          <span className="text-smoke">RETURNS POLICY.</span>
        </h1>
        <p className="font-mono text-sm text-smoke max-w-2xl">
          Engineered transparency. All KINETIQ consignments are packed in protective structural cardboard and dispatched directly from our Bengaluru atelier.
        </p>
      </section>

      {/* 1. Shipping Matrix */}
      <section className="space-y-6">
        <div>
          <span className="micro-label text-smoke">TRANSIT TIMELINES</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight mt-1">
            DOMESTIC AIR LOGISTICS
          </h2>
        </div>

        <div className="border border-line overflow-hidden bg-paper">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-bone border-b border-line text-ink">
                <th className="p-4 sm:p-5 font-bold uppercase">DESTINATION REGION</th>
                <th className="p-4 sm:p-5 font-bold uppercase">CARRIER SERVICE</th>
                <th className="p-4 sm:p-5 font-bold uppercase">ESTIMATED TRANSIT</th>
                <th className="p-4 sm:p-5 font-bold uppercase">TARIFF (ORDERS &lt; ₹5,000)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr>
                <td className="p-4 sm:p-5 font-bold text-ink">
                  TIER 1 METROS
                  <span className="block text-[10px] text-smoke font-normal mt-0.5">
                    Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata
                  </span>
                </td>
                <td className="p-4 sm:p-5 text-smoke">BlueDart Air Priority</td>
                <td className="p-4 sm:p-5 font-bold text-ink">24 – 48 Hours</td>
                <td className="p-4 sm:p-5 text-smoke">₹250 flat / Free ≥ ₹5,000</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-ink">
                  TIER 2 URBAN
                  <span className="block text-[10px] text-smoke font-normal mt-0.5">
                    Pune, Ahmedabad, Jaipur, Kochi, Chandigarh, Lucknow
                  </span>
                </td>
                <td className="p-4 sm:p-5 text-smoke">BlueDart Air Express</td>
                <td className="p-4 sm:p-5 font-bold text-ink">48 – 72 Hours</td>
                <td className="p-4 sm:p-5 text-smoke">₹250 flat / Free ≥ ₹5,000</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-ink">
                  REST OF INDIA & REMOTE
                  <span className="block text-[10px] text-smoke font-normal mt-0.5">
                    North East, J&K, Island Territories, Deep Interior
                  </span>
                </td>
                <td className="p-4 sm:p-5 text-smoke">BlueDart Surface / Air</td>
                <td className="p-4 sm:p-5 font-bold text-ink">3 – 5 Business Days</td>
                <td className="p-4 sm:p-5 text-smoke">₹250 flat / Free ≥ ₹5,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-smoke">
          <div className="border border-line bg-bone p-4 space-y-1">
            <span className="font-bold text-ink block uppercase">// SAME-DAY DISPATCH</span>
            Orders authorized prior to 14:00 IST Monday–Friday dispatch the same day.
          </div>
          <div className="border border-line bg-bone p-4 space-y-1">
            <span className="font-bold text-ink block uppercase">// TAMPER PROOF SEAL</span>
            Consignments are secured inside reinforced moisture-barrier packaging.
          </div>
          <div className="border border-line bg-bone p-4 space-y-1">
            <span className="font-bold text-ink block uppercase">// LIVE SMS TELEMETRY</span>
            Receive automated real-time checkpoint updates via BlueDart SMS.
          </div>
        </div>
      </section>

      {/* 2. 14-Day Exchange Protocol */}
      <section className="space-y-6">
        <div>
          <span className="micro-label text-smoke">REVERSE LOGISTICS</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight mt-1">
            14-DAY EXCHANGE PROTOCOL
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-line bg-paper p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-acid bg-ink px-2 py-0.5 inline-block">
              STEP 01
            </span>
            <h3 className="font-display font-bold text-lg uppercase">INITIATE REQUEST</h3>
            <p className="font-mono text-xs text-smoke leading-relaxed">
              Navigate to your customer dashboard at /account/orders and select the order and silhouette requiring an exchange.
            </p>
          </div>

          <div className="border border-line bg-paper p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-acid bg-ink px-2 py-0.5 inline-block">
              STEP 02
            </span>
            <h3 className="font-display font-bold text-lg uppercase">DOORSTEP PICKUP</h3>
            <p className="font-mono text-xs text-smoke leading-relaxed">
              Our courier collects the silhouette from your delivery address within 24–48 hours. Ensure the original shoe box and tags are intact.
            </p>
          </div>

          <div className="border border-line bg-paper p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-acid bg-ink px-2 py-0.5 inline-block">
              STEP 03
            </span>
            <h3 className="font-display font-bold text-lg uppercase">ATELIER CHECK</h3>
            <p className="font-mono text-xs text-smoke leading-relaxed">
              Upon arrival at our Bengaluru lab, our quality technicians conduct a 15-minute inspection for outdoor wear or structural strain.
            </p>
          </div>

          <div className="border border-line bg-paper p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-acid bg-ink px-2 py-0.5 inline-block">
              STEP 04
            </span>
            <h3 className="font-display font-bold text-lg uppercase">REPLACEMENT / REFUND</h3>
            <p className="font-mono text-xs text-smoke leading-relaxed">
              Your calibrated size replacement is dispatched on express air, or a 100% refund is initiated back to your original payment card/UPI.
            </p>
          </div>
        </div>
      </section>

      {/* Conditions Checklist */}
      <section className="border border-line bg-bone p-8 space-y-4">
        <h3 className="font-display font-bold text-xl uppercase tracking-tight">
          RETURN ELIGIBILITY CHECKLIST
        </h3>
        <ul className="font-mono text-xs text-smoke space-y-2 list-disc list-inside">
          <li>Footwear must be unworn outdoors (indoor trying on hard surfaces is acceptable).</li>
          <li>Original protective packaging, tissue wrap, and carbon-fiber swing tags must remain intact.</li>
          <li>Return or exchange must be initiated within 14 calendar days of confirmed delivery timestamp.</li>
          <li>Footwear marked as "Final Archived Sale" during flash drops is eligible for size exchange only.</li>
        </ul>
      </section>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-line">
        <Button asChild variant="outline" className="font-mono text-xs">
          <Link href="/faq">BROWSE LOGISTICS FAQ</Link>
        </Button>
        <Button asChild className="bg-ink text-bone hover:bg-ink/90 font-mono text-xs">
          <Link href="/account/orders">
            ACCESS YOUR ORDERS <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
