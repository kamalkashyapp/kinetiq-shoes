'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Package,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MetricCard {
  label: string;
  value: string;
  subtext: string;
  change: string;
  isPositive: boolean;
}

const KPIS: MetricCard[] = [
  {
    label: 'GROSS REVENUE (INR)',
    value: '₹3,48,250',
    subtext: 'Authoritative server revenue this month',
    change: '+24.8% vs last month',
    isPositive: true,
  },
  {
    label: 'TOTAL ORDERS',
    value: '26',
    subtext: '100% Cashfree authorized checkouts',
    change: '+18% velocity',
    isPositive: true,
  },
  {
    label: 'AVERAGE ORDER VALUE (AOV)',
    value: '₹13,394',
    subtext: 'Calculated across all fulfilled carts',
    change: '+6.2% vs baseline',
    isPositive: true,
  },
  {
    label: 'STORE CONVERSION RATE',
    value: '3.42%',
    subtext: 'Visitor to completed payment funnel',
    change: '+0.8% increase',
    isPositive: true,
  },
];

const LOW_STOCK_ITEMS = [
  {
    id: 'var-pulse-01-105',
    name: 'PULSE 01',
    color: 'Acid Ghost',
    size: 10.5,
    stock: 2,
    threshold: 5,
  },
  {
    id: 'var-terra-01-90',
    name: 'TERRA GRAVITY 01',
    color: 'Basalt / Clay',
    size: 9.0,
    stock: 3,
    threshold: 5,
  },
  {
    id: 'var-form-01-110',
    name: 'FORM MONO 01',
    color: 'Pure Bone',
    size: 11.0,
    stock: 1,
    threshold: 5,
  },
];

const RECENT_ORDERS = [
  {
    orderNumber: 'KQ-0293B8',
    customer: 'Rohan Verma',
    email: 'athlete@kinetiq.design',
    date: '24 Nov 2026, 10:45 AM',
    items: 'PULSE 01 (US 10.0)',
    total: 13499,
    status: 'paid',
  },
  {
    orderNumber: 'KQ-918231',
    customer: 'Ananya Sharma',
    email: 'ananya.s@studio.in',
    date: '24 Nov 2026, 09:12 AM',
    items: 'PULSE SPEED CARBON (US 8.5)',
    total: 18999,
    status: 'packed',
  },
  {
    orderNumber: 'KQ-847291',
    customer: 'Kabir Mehta',
    email: 'kabir.m@runclub.org',
    date: '23 Nov 2026, 04:30 PM',
    items: 'TERRA GRAVITY 01 (US 11.0)',
    total: 16999,
    status: 'shipped',
  },
  {
    orderNumber: 'KQ-781920',
    customer: 'Priya Iyer',
    email: 'priya.iyer@gmail.com',
    date: '22 Nov 2026, 02:15 PM',
    items: 'FORM MONO 01 (US 7.5)',
    total: 12999,
    status: 'delivered',
  },
];

export default function AdminOverviewPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[10px] font-mono font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            PAID
          </span>
        );
      case 'packed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 text-[10px] font-mono font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            PACKED
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-700 text-[10px] font-mono font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            IN TRANSIT
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-[10px] font-mono font-bold uppercase">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            DELIVERED
          </span>
        );
      default:
        return <span className="text-smoke text-[10px] font-mono uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="micro-label text-smoke">COMMAND CENTER // STORE TELEMETRY</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-ink mt-1">
            OPERATIONS OVERVIEW
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <Button variant="primary" size="sm" className="h-10 text-xs font-bold">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              NEW SILHOUETTE
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="secondary" size="sm" className="h-10 text-xs">
              VIEW ALL ORDERS
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPIS.map((kpi, idx) => (
          <div key={idx} className="border border-line bg-paper p-6 shadow-sm space-y-3">
            <span className="micro-label text-smoke block">{kpi.label}</span>
            <div className="font-display font-extrabold text-3xl text-ink tracking-tight">
              {kpi.value}
            </div>
            <div className="pt-2 border-t border-line/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-700 font-bold">{kpi.change}</span>
              <span className="text-smoke truncate max-w-[120px]">{kpi.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Grid: Low Stock Alert & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders Feed (8 columns) */}
        <div className="lg:col-span-8 border border-line bg-paper shadow-sm">
          <div className="p-6 border-b border-line flex items-center justify-between">
            <div>
              <span className="micro-label text-smoke">LIVE COMMERCE AUDIT</span>
              <h2 className="font-display font-bold text-xl uppercase tracking-tight">
                RECENT ORDERS
              </h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-mono uppercase text-smoke hover:text-ink flex items-center gap-1 font-bold underline"
            >
              <span>DISPATCH DESK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-line overflow-x-auto">
            {RECENT_ORDERS.map((ord) => (
              <div key={ord.orderNumber} className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-bone/20 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-ink">
                      {ord.orderNumber}
                    </span>
                    {getStatusBadge(ord.status)}
                  </div>
                  <p className="font-mono text-xs text-smoke">
                    {ord.customer} · {ord.items}
                  </p>
                  <p className="text-[10px] font-mono text-smoke">{ord.date}</p>
                </div>

                <div className="text-right font-mono">
                  <span className="font-bold text-sm text-ink block">
                    ₹{ord.total.toLocaleString('en-IN')}
                  </span>
                  <Link
                    href="/admin/orders"
                    className="text-[10px] uppercase text-smoke hover:text-ink underline"
                  >
                    MANAGE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Watchlist & Gateway Status (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Low Stock Card */}
          <div className="border border-line bg-paper p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-clay border-b border-line pb-3">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-display font-bold text-base uppercase tracking-tight">
                LOW INVENTORY ALERTS
              </h3>
            </div>

            <p className="font-mono text-xs text-smoke">
              Sizes below critical safety threshold (&lt; 5 units remaining):
            </p>

            <div className="space-y-3">
              {LOW_STOCK_ITEMS.map((item) => (
                <div key={item.id} className="p-3 bg-bone border border-line flex items-center justify-between font-mono text-xs">
                  <div>
                    <p className="font-bold text-ink">{item.name}</p>
                    <p className="text-[10px] text-smoke">
                      US {item.size} // {item.color}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 bg-clay/10 border border-clay text-clay font-bold text-xs">
                      {item.stock} LEFT
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/admin/products" className="block pt-2">
              <Button variant="secondary" className="w-full text-xs h-9">
                RESTOCK INVENTORY
              </Button>
            </Link>
          </div>

          {/* Cashfree PG Status Card */}
          <div className="border border-line bg-paper p-6 shadow-sm space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="font-display font-bold text-base uppercase text-ink">
                PAYMENT GATEWAY
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-2 text-smoke text-[11px]">
              <div className="flex justify-between">
                <span>GATEWAY:</span>
                <span className="text-ink font-bold">CASHFREE PG</span>
              </div>
              <div className="flex justify-between">
                <span>ENVIRONMENT:</span>
                <span className="text-ink font-bold">SANDBOX (INR)</span>
              </div>
              <div className="flex justify-between">
                <span>API VERSION:</span>
                <span className="text-ink">2023-08-01</span>
              </div>
              <div className="flex justify-between">
                <span>WEBHOOK SIGNATURE:</span>
                <span className="text-emerald-700 font-bold">HMAC-SHA256 ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
