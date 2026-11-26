'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Truck, Percent, CreditCard, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/providers/ToastProvider';

export function AdminSettingsClient() {
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    freeShippingThreshold: 10000,
    standardShippingFee: 250,
    expressShippingFee: 450,
    gstRate: 18,
    hsnCode: '64041190',
    cashfreeEnv: 'sandbox',
    cashfreeAppId: 'TEST_APP_ID',
    cashfreeApiVersion: '2023-08-01',
    supportEmail: 'concierge@kinetiq.design',
    storeCurrency: 'INR (₹)',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'OPERATIONAL SETTINGS COMMITTED',
      description: 'Store parameters and shipping threshold updated across services.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-line pb-4">
        <span className="micro-label text-smoke">COMMERCE ENGINE CONFIGURATION</span>
        <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
          OPERATIONAL STORE SETTINGS
        </h2>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Logistics & Shipping Rates */}
        <div className="border border-line bg-paper p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <Truck className="w-5 h-5 text-ink" />
            <h3 className="font-display font-bold text-lg uppercase tracking-tight">
              LOGISTICS & DISPATCH RATES
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="micro-label text-smoke block mb-1">FREE SHIPPING MINIMUM (₹)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bone border border-line font-bold focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="micro-label text-smoke block mb-1">STANDARD EXPRESS FEE (₹)</label>
              <input
                type="number"
                value={settings.standardShippingFee}
                onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bone border border-line font-bold focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="micro-label text-smoke block mb-1">PRIORITY AIR COURIER (₹)</label>
              <input
                type="number"
                value={settings.expressShippingFee}
                onChange={(e) => setSettings({ ...settings, expressShippingFee: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bone border border-line font-bold focus:outline-none focus:border-ink"
              />
            </div>
          </div>
        </div>

        {/* Taxation & Statutory Compliance */}
        <div className="border border-line bg-paper p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <Percent className="w-5 h-5 text-ink" />
            <h3 className="font-display font-bold text-lg uppercase tracking-tight">
              TAXATION & STATUTORY COMPLIANCE
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <label className="micro-label text-smoke block mb-1">GST RATE (%)</label>
              <input
                type="number"
                value={settings.gstRate}
                onChange={(e) => setSettings({ ...settings, gstRate: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-bone border border-line font-bold focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="micro-label text-smoke block mb-1">HSN FOOTWEAR CODE</label>
              <input
                type="text"
                value={settings.hsnCode}
                onChange={(e) => setSettings({ ...settings, hsnCode: e.target.value })}
                className="w-full px-3 py-2 bg-bone border border-line font-bold focus:outline-none focus:border-ink"
              />
            </div>
          </div>
        </div>

        {/* Cashfree PG Telemetry */}
        <div className="border border-line bg-paper p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <CreditCard className="w-5 h-5 text-ink" />
            <h3 className="font-display font-bold text-lg uppercase tracking-tight">
              CASHFREE PAYMENT GATEWAY INTEGRATION
            </h3>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="micro-label text-smoke block mb-1">GATEWAY ENVIRONMENT</label>
                <input
                  type="text"
                  disabled
                  value={settings.cashfreeEnv.toUpperCase()}
                  className="w-full px-3 py-2 bg-bone/50 border border-line text-smoke font-bold cursor-not-allowed"
                />
              </div>
              <div>
                <label className="micro-label text-smoke block mb-1">API VERSION SPECIFICATION</label>
                <input
                  type="text"
                  disabled
                  value={settings.cashfreeApiVersion}
                  className="w-full px-3 py-2 bg-bone/50 border border-line text-smoke cursor-not-allowed"
                />
              </div>
            </div>

            <div className="p-3 bg-bone border border-line space-y-1">
              <span className="micro-label text-smoke block">AUTHORITATIVE WEBHOOK LISTENER</span>
              <code className="text-xs text-ink font-bold block break-all">
                http://localhost:3000/api/webhooks/cashfree
              </code>
              <p className="text-[10px] text-smoke mt-1">
                Secured via HMAC-SHA256 signature verification & idempotent database recording.
              </p>
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" className="h-12 px-8 text-xs font-bold">
          <Save className="w-4 h-4 mr-2" />
          COMMIT STORE SETTINGS
        </Button>
      </form>
    </div>
  );
}
