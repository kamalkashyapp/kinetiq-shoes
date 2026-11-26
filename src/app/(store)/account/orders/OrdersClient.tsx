'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Calendar,
  Truck,
  Printer,
  ChevronRight,
  X,
  Repeat,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { printOrderInvoice } from '@/lib/invoice';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/providers/ToastProvider';

interface OrderItem {
  id: string;
  name: string;
  slug: string;
  size: number;
  color: string;
  unitPrice: number;
  quantity: number;
  image?: string;
}

interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'paid' | 'packed' | 'shipped' | 'delivered';
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  trackingAwb?: string;
}

// Initial customer order history (including sample orders and live placed orders)
const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-kq-0293b8',
    orderNumber: 'KQ-0293B8',
    date: '24 Nov 2026',
    status: 'paid',
    subtotal: 14999,
    discount: 1500,
    shipping: 0,
    tax: 2059,
    total: 13499,
    items: [
      {
        id: 'pulse-01-item',
        name: 'PULSE 01',
        slug: 'pulse-01',
        size: 10.0,
        color: 'Acid Ghost',
        unitPrice: 14999,
        quantity: 1,
      },
    ],
    shippingAddress: {
      fullName: 'Rohan Verma',
      line1: 'Flat 402, Gravity Towers, 100 Feet Rd',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 98765 43210',
    },
    trackingAwb: 'BD-0293B8-9401',
  },
  {
    id: 'ord-kq-781920',
    orderNumber: 'KQ-781920',
    date: '12 Nov 2026',
    status: 'delivered',
    subtotal: 16999,
    discount: 0,
    shipping: 0,
    tax: 2593,
    total: 16999,
    items: [
      {
        id: 'terra-01-item',
        name: 'TERRA GRAVITY 01',
        slug: 'terra-gravity-01',
        size: 10.0,
        color: 'Basalt / Clay',
        unitPrice: 16999,
        quantity: 1,
      },
    ],
    shippingAddress: {
      fullName: 'Rohan Verma',
      line1: 'Flat 402, Gravity Towers, 100 Feet Rd',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 98765 43210',
    },
    trackingAwb: 'BD-781920-3382',
  },
];

export function OrdersClient() {
  const [orders] = useState<CustomerOrder[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const { addItem, openCart } = useCartStore();
  const { toast } = useToast();

  const handleDownloadInvoice = (order: CustomerOrder) => {
    printOrderInvoice({
      orderNumber: order.orderNumber,
      invoiceDate: order.date,
      customerName: order.shippingAddress.fullName,
      customerEmail: 'athlete@kinetiq.design',
      customerPhone: order.shippingAddress.phone,
      shippingAddress: {
        line1: order.shippingAddress.line1,
        line2: order.shippingAddress.line2,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        pincode: order.shippingAddress.pincode,
      },
      paymentMethod: 'Cashfree PG',
      paymentId: `cf_pay_${order.orderNumber}`,
      items: order.items.map((i) => ({
        name: i.name,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalPrice: i.unitPrice * i.quantity,
      })),
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping,
      tax: order.tax,
      grandTotal: order.total,
    });
  };

  const handleReorder = (order: CustomerOrder) => {
    order.items.forEach((item) => {
      addItem({
        id: `${item.id}-reorder-${Date.now()}`,
        variantId: `${item.id}-var`,
        productId: item.slug,
        name: item.name,
        slug: item.slug,
        price: item.unitPrice,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        image: '',
      });
    });

    toast({
      title: 'SILHOUETTES REORDERED',
      description: `Added ${order.items.length} items from ${order.orderNumber} to bag.`,
      type: 'success',
    });

    openCart();
  };

  const getStatusBadge = (status: CustomerOrder['status']) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bone border border-line text-xs font-mono font-bold text-ink uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>PAID // PREPARING DISPATCH</span>
          </span>
        );
      case 'packed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bone border border-line text-xs font-mono font-bold text-ink uppercase">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>PACKED IN LAB</span>
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-acid/20 border border-acid text-xs font-mono font-bold text-ink uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>IN TRANSIT // BLUEDART AIR</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-xs font-mono font-bold text-emerald-800 uppercase">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>DELIVERED & VERIFIED</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="micro-label text-smoke">CLIENT COMMERCE LOG</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
            ORDER HISTORY ({orders.length})
          </h2>
        </div>
        <p className="font-mono text-xs text-smoke">
          Authoritative server records · 14-day exchange eligibility
        </p>
      </div>

      {/* Orders List */}
      <div className="border border-line bg-paper divide-y divide-line shadow-sm">
        {orders.map((order) => (
          <div key={order.id} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-bone/20 transition-colors">
            {/* Left: Summary */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display font-extrabold text-xl text-ink">
                  {order.orderNumber}
                </span>
                <span className="text-smoke font-mono text-xs">·</span>
                <span className="font-mono text-xs text-smoke flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {order.date}
                </span>
                {getStatusBadge(order.status)}
              </div>

              {/* Items in order */}
              <div className="space-y-1.5">
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-mono text-xs text-ink">
                    <strong className="font-bold">{item.name}</strong> — Size US {item.size} ({item.color}) · Qty: {item.quantity}
                  </p>
                ))}
              </div>

              <p className="font-mono text-xs text-smoke">
                Destination: {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
              </p>
            </div>

            {/* Right: Total & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
              <div className="text-left sm:text-right font-mono">
                <span className="text-smoke text-[10px] uppercase block">TOTAL AMOUNT</span>
                <span className="font-display font-bold text-xl text-ink">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                  className="text-xs h-9"
                >
                  VIEW DETAILS
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadInvoice(order)}
                  className="text-xs h-9 px-3"
                  title="Download Tax Invoice"
                >
                  <Printer className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Detail Modal / Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-paper border border-line w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <span className="micro-label text-smoke">ORDER MANIFEST SPECIFICATION</span>
                <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight mt-1 text-ink">
                  {selectedOrder.orderNumber}
                </h3>
                <p className="font-mono text-xs text-smoke mt-0.5">PLACED ON: {selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-smoke hover:text-ink hover:bg-bone transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & Carrier Tracker link */}
            <div className="p-4 bg-bone border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="micro-label text-smoke block">STATUS TELEMETRY</span>
                {getStatusBadge(selectedOrder.status)}
              </div>
              <Link href={`/order/${selectedOrder.id}/track`}>
                <Button variant="acid" size="sm" className="font-bold text-xs h-9">
                  <Truck className="w-3.5 h-3.5 mr-1.5" />
                  LIVE CARRIER TRACKING
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Itemized Table */}
            <div className="border border-line divide-y divide-line">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-display font-bold text-base text-ink">{item.name}</h4>
                    <p className="micro-label text-smoke mt-0.5">
                      SIZE: US {item.size} // {item.color} // QTY: {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold text-ink">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Ledger */}
            <div className="border border-line bg-bone/30 p-4 font-mono text-xs space-y-2">
              <div className="flex justify-between text-smoke">
                <span>SUBTOTAL:</span>
                <span className="text-ink font-bold">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>PROMO CODE DISCOUNT:</span>
                  <span>-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-smoke">
                <span>INSURED SHIPPING:</span>
                <span className="text-ink font-bold">
                  {selectedOrder.shipping === 0 ? 'COMPLIMENTARY' : `₹${selectedOrder.shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-smoke">
                <span>GST (18% INCLUDED):</span>
                <span>₹{selectedOrder.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-line pt-2 flex justify-between items-baseline text-sm">
                <span className="font-bold text-ink uppercase">TOTAL PAID:</span>
                <span className="font-display font-bold text-lg text-ink">
                  ₹{selectedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                onClick={() => handleDownloadInvoice(selectedOrder)}
                className="flex-1 h-11 text-xs"
              >
                <Printer className="w-4 h-4 mr-1.5" />
                PRINT TAX INVOICE
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleReorder(selectedOrder)}
                className="flex-1 h-11 text-xs"
              >
                <Repeat className="w-4 h-4 mr-1.5" />
                REORDER SILHOUETTES
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
