'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Smartphone,
  Monitor,
  Tablet,
  Share2,
  Users,
  Repeat,
  ArrowDown,
  Calendar,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FunnelStep {
  name: string;
  count: number;
  percentOfTotal: number;
  dropoffRate: number;
  stage: string;
}

const FUNNEL_DATA: FunnelStep[] = [
  {
    name: '1. STOREFRONT SESSIONS',
    count: 12480,
    percentOfTotal: 100,
    dropoffRate: 0,
    stage: 'Discovery & Home / Catalog Browsing',
  },
  {
    name: '2. SILHOUETTE DETAIL VIEWS (PDP)',
    count: 7738,
    percentOfTotal: 62.0,
    dropoffRate: 38.0,
    stage: 'Interactive 360 Spin & Sizing Inspection',
  },
  {
    name: '3. BAG ADDITIONS (CART)',
    count: 3494,
    percentOfTotal: 28.0,
    dropoffRate: 54.8,
    stage: 'Size Selection & Cart Drawer Engagement',
  },
  {
    name: '4. CHECKOUT INITIATED',
    count: 1747,
    percentOfTotal: 14.0,
    dropoffRate: 50.0,
    stage: 'Shipping Destination & Courier Selection',
  },
  {
    name: '5. CASHFREE AUTHORIZED ORDERS',
    count: 427,
    percentOfTotal: 3.42,
    dropoffRate: 75.6,
    stage: '100% Signature Verified Payments',
  },
];

const DAILY_TREND = [
  { day: 'Mon', revenue: 38500, orders: 3 },
  { day: 'Tue', revenue: 52400, orders: 4 },
  { day: 'Wed', revenue: 44200, orders: 3 },
  { day: 'Thu', revenue: 61800, orders: 5 },
  { day: 'Fri', revenue: 78900, orders: 6 },
  { day: 'Sat', revenue: 94200, orders: 7 },
  { day: 'Sun', revenue: 86500, orders: 6 },
];

const TOP_PRODUCTS = [
  { name: 'PULSE 01', collection: 'PULSE', units: 142, revenue: 2129858 },
  { name: 'TERRA GRAVITY 01', collection: 'TERRA', units: 98, revenue: 1665902 },
  { name: 'PULSE SPEED CARBON', collection: 'PULSE', units: 84, revenue: 1595916 },
  { name: 'FORM MONO 01', collection: 'FORM', units: 64, revenue: 831936 },
];

export function AdminAnalyticsClient() {
  const [dateRange, setDateRange] = useState<'7D' | '30D' | '90D'>('7D');

  const maxRevenue = Math.max(...DAILY_TREND.map((d) => d.revenue));

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="micro-label text-smoke">FIRST-PARTY TELEMETRY PIPELINE</span>
          <h1 className="font-display font-extrabold text-3xl uppercase tracking-tight text-ink">
            COMMERCE & CONVERSION ANALYTICS
          </h1>
        </div>

        {/* Date Range Selector */}
        <div className="flex border border-line bg-paper p-1 gap-1 font-mono text-xs">
          {(['7D', '30D', '90D'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 uppercase transition-colors ${
                dateRange === range
                  ? 'bg-ink text-paper font-bold'
                  : 'text-smoke hover:text-ink'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border border-line bg-paper p-6 shadow-sm space-y-2 font-mono">
          <span className="micro-label text-smoke">TOTAL STORE SESSIONS</span>
          <div className="font-display font-extrabold text-3xl text-ink">12,480</div>
          <p className="text-[11px] text-emerald-700 font-bold">+14.2% vs previous period</p>
        </div>

        <div className="border border-line bg-paper p-6 shadow-sm space-y-2 font-mono">
          <span className="micro-label text-smoke">PERIOD REVENUE (INR)</span>
          <div className="font-display font-extrabold text-3xl text-ink">₹4,56,500</div>
          <p className="text-[11px] text-emerald-700 font-bold">+28.5% volume surge</p>
        </div>

        <div className="border border-line bg-paper p-6 shadow-sm space-y-2 font-mono">
          <span className="micro-label text-smoke">AVERAGE BASKET (AOV)</span>
          <div className="font-display font-extrabold text-3xl text-ink">₹13,833</div>
          <p className="text-[11px] text-smoke">Standard 1.4 pairs per cart</p>
        </div>

        <div className="border border-line bg-paper p-6 shadow-sm space-y-2 font-mono">
          <span className="micro-label text-smoke">BLENDED CONVERSION</span>
          <div className="font-display font-extrabold text-3xl text-ink">3.42%</div>
          <p className="text-[11px] text-emerald-700 font-bold">Top decile footwear benchmark</p>
        </div>
      </div>

      {/* Conversion Funnel Analysis */}
      <div className="border border-line bg-paper p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-4">
          <div>
            <span className="micro-label text-smoke">FULL SHOPPING FUNNEL PROGRESSION</span>
            <h2 className="font-display font-bold text-xl uppercase tracking-tight">
              SESSION-TO-PAYMENT FUNNEL
            </h2>
          </div>
          <span className="font-mono text-xs text-smoke">
            Zero third-party cookies · Session-based telemetry
          </span>
        </div>

        {/* Funnel Visual Bars */}
        <div className="space-y-4">
          {FUNNEL_DATA.map((step, idx) => (
            <div key={idx} className="space-y-1.5 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className="font-bold text-ink">{step.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-smoke text-[11px]">{step.stage}</span>
                  <span className="font-bold text-ink">{step.count.toLocaleString('en-IN')}</span>
                  <span className="bg-bone border border-line px-2 py-0.5 font-bold text-[10px]">
                    {step.percentOfTotal}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-8 bg-bone border border-line overflow-hidden relative flex items-center px-3">
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                    idx === 4 ? 'bg-acid' : idx === 3 ? 'bg-ink/80' : 'bg-ink/30'
                  }`}
                  style={{ width: `${step.percentOfTotal}%` }}
                />
                <span className="relative z-10 text-[10px] font-bold text-ink">
                  {step.percentOfTotal}% of total sessions
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column: Daily Trend & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Daily Revenue Chart (7 columns) */}
        <div className="lg:col-span-7 border border-line bg-paper p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <span className="micro-label text-smoke">7-DAY VOLUME TELEMETRY</span>
              <h3 className="font-display font-bold text-lg uppercase tracking-tight">
                DAILY REVENUE & ORDERS
              </h3>
            </div>
            <span className="font-mono text-xs text-smoke">TOTAL: ₹4.56L</span>
          </div>

          {/* SVG Bar Chart */}
          <div className="pt-4 flex items-end justify-between gap-3 h-52">
            {DAILY_TREND.map((d, i) => {
              const heightPercent = Math.round((d.revenue / maxRevenue) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="font-mono text-[10px] text-smoke opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{Math.round(d.revenue / 1000)}k
                  </span>
                  <div
                    className="w-full bg-ink group-hover:bg-acid transition-colors border border-line"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="font-mono text-xs font-bold text-ink uppercase">{d.day}</span>
                  <span className="font-mono text-[10px] text-smoke">{d.orders} ord</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Silhouettes Table (5 columns) */}
        <div className="lg:col-span-5 border border-line bg-paper p-6 shadow-sm space-y-4">
          <div className="border-b border-line pb-3">
            <span className="micro-label text-smoke">BEST-PERFORMING GEAR</span>
            <h3 className="font-display font-bold text-lg uppercase tracking-tight">
              TOP SILHOUETTES
            </h3>
          </div>

          <div className="divide-y divide-line font-mono text-xs">
            {TOP_PRODUCTS.map((prod, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-ink">{prod.name}</p>
                  <p className="text-[10px] text-smoke">
                    {prod.collection} · {prod.units} PAIRS SOLD
                  </p>
                </div>
                <span className="font-bold text-ink">
                  ₹{prod.revenue.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources & Device Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Device Distribution */}
        <div className="border border-line bg-paper p-6 shadow-sm space-y-4">
          <span className="micro-label text-smoke block">DEVICE COMPOSITION</span>
          <h4 className="font-display font-bold text-base uppercase tracking-tight">
            PLATFORM RATIO
          </h4>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-smoke">
                <Smartphone className="w-4 h-4 text-ink" /> MOBILE
              </span>
              <span className="font-bold text-ink">68%</span>
            </div>
            <div className="w-full h-1.5 bg-bone overflow-hidden">
              <div className="h-full bg-ink w-[68%]" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="flex items-center gap-2 text-smoke">
                <Monitor className="w-4 h-4 text-ink" /> DESKTOP
              </span>
              <span className="font-bold text-ink">26%</span>
            </div>
            <div className="w-full h-1.5 bg-bone overflow-hidden">
              <div className="h-full bg-ink w-[26%]" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="flex items-center gap-2 text-smoke">
                <Tablet className="w-4 h-4 text-ink" /> TABLET
              </span>
              <span className="font-bold text-ink">6%</span>
            </div>
            <div className="w-full h-1.5 bg-bone overflow-hidden">
              <div className="h-full bg-ink w-[6%]" />
            </div>
          </div>
        </div>

        {/* Acquisition Channels */}
        <div className="border border-line bg-paper p-6 shadow-sm space-y-4">
          <span className="micro-label text-smoke block">ATTRIBUTION TELEMETRY</span>
          <h4 className="font-display font-bold text-base uppercase tracking-tight">
            TOP TRAFFIC CHANNELS
          </h4>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-line">
              <span className="text-smoke">META / INSTAGRAM ADS</span>
              <span className="font-bold text-ink">44%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-line">
              <span className="text-smoke">DIRECT NAVIGATION</span>
              <span className="font-bold text-ink">28%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-line">
              <span className="text-smoke">ORGANIC RUNNING SEARCH</span>
              <span className="font-bold text-ink">18%</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-smoke">ATHLETE FORUMS & REFERRALS</span>
              <span className="font-bold text-ink">10%</span>
            </div>
          </div>
        </div>

        {/* Retention & Cohort Metric */}
        <div className="border border-line bg-paper p-6 shadow-sm space-y-4">
          <span className="micro-label text-smoke block">REPEAT ATHLETES</span>
          <h4 className="font-display font-bold text-base uppercase tracking-tight">
            30-DAY COHORT RETENTION
          </h4>

          <div className="space-y-2 font-mono">
            <div className="font-display font-bold text-4xl text-ink">24.6%</div>
            <p className="text-xs text-smoke leading-relaxed">
              Nearly 1 in 4 verified runners order a second silhouette or complete their kit within 30 days of initial delivery.
            </p>
            <div className="pt-2 text-[10px] text-emerald-700 font-bold uppercase">
              ● +3.8% RETENTION ACCELERATION
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
