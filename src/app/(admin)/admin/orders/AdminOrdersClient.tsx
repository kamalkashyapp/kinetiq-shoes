'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Printer,
  X,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { printOrderInvoice } from '@/lib/invoice';
import { useToast } from '@/providers/ToastProvider';

interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  status: 'pending' | 'paid' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  items: Array<{
    name: string;
    size: number;
    color: string;
    unitPrice: number;
    quantity: number;
  }>;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  trackingAwb?: string;
  notes?: string;
}

const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'ord-1',
    orderNumber: 'KQ-0293B8',
    customerName: 'Rohan Verma',
    customerEmail: 'athlete@kinetiq.design',
    customerPhone: '+91 98765 43210',
    date: '24 Nov 2026, 10:45 AM',
    status: 'paid',
    subtotal: 14999,
    discount: 1500,
    shipping: 0,
    tax: 2059,
    total: 13499,
    items: [
      {
        name: 'PULSE 01',
        size: 10.0,
        color: 'Acid Ghost',
        unitPrice: 14999,
        quantity: 1,
      },
    ],
    shippingAddress: {
      line1: 'Flat 402, Gravity Towers, 100 Feet Rd',
      line2: 'Opposite Indiranagar Club',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
    },
    trackingAwb: 'BD-0293B8-9401',
    notes: 'Please verify carbon insole placement.',
  },
  {
    id: 'ord-2',
    orderNumber: 'KQ-918231',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.s@studio.in',
    customerPhone: '+91 98111 22334',
    date: '24 Nov 2026, 09:12 AM',
    status: 'packed',
    subtotal: 18999,
    discount: 0,
    shipping: 0,
    tax: 2898,
    total: 18999,
    items: [
      {
        name: 'PULSE SPEED CARBON',
        size: 8.5,
        color: 'Solar White',
        unitPrice: 18999,
        quantity: 1,
      },
    ],
    shippingAddress: {
      line1: 'House 14, Koramangala 4th Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
    },
    trackingAwb: 'BD-918231-4190',
  },
  {
    id: 'ord-3',
    orderNumber: 'KQ-847291',
    customerName: 'Kabir Mehta',
    customerEmail: 'kabir.m@runclub.org',
    customerPhone: '+91 99887 76655',
    date: '23 Nov 2026, 04:30 PM',
    status: 'shipped',
    subtotal: 16999,
    discount: 1000,
    shipping: 450,
    tax: 2516,
    total: 16449,
    items: [
      {
        name: 'TERRA GRAVITY 01',
        size: 11.0,
        color: 'Basalt / Clay',
        unitPrice: 16999,
        quantity: 1,
      },
    ],
    shippingAddress: {
      line1: 'A-201, Shanti Niketan',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110021',
    },
    trackingAwb: 'BD-847291-7712',
  },
  {
    id: 'ord-4',
    orderNumber: 'KQ-781920',
    customerName: 'Priya Iyer',
    customerEmail: 'priya.iyer@gmail.com',
    customerPhone: '+91 91234 56789',
    date: '22 Nov 2026, 02:15 PM',
    status: 'delivered',
    subtotal: 12999,
    discount: 0,
    shipping: 0,
    tax: 1982,
    total: 12999,
    items: [
      {
        name: 'FORM MONO 01',
        size: 7.5,
        color: 'Pure Bone',
        unitPrice: 12999,
        quantity: 1,
      },
    ],
    shippingAddress: {
      line1: 'Flat 5B, Marina Heights',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600028',
    },
    trackingAwb: 'BD-781920-3382',
  },
];

export function AdminOrdersClient() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [newAwbInput, setNewAwbInput] = useState('');
  const { toast } = useToast();

  const filteredOrders = orders.filter((o) => {
    const matchesTab = activeTab === 'all' || o.status === activeTab;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleUpdateStatus = (
    orderId: string,
    newStatus: AdminOrder['status'],
    awb?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated = {
            ...o,
            status: newStatus,
            ...(awb ? { trackingAwb: awb } : {}),
          };
          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(updated);
          }
          return updated;
        }
        return o;
      })
    );

    toast({
      title: 'STATUS TRANSITION AUDITED',
      description: `Order transitioned to ${newStatus.toUpperCase()}.`,
      type: 'success',
    });
  };

  const handlePrint = (order: AdminOrder) => {
    printOrderInvoice({
      orderNumber: order.orderNumber,
      invoiceDate: order.date,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      shippingAddress: order.shippingAddress,
      paymentMethod: 'Cashfree PG Sandbox',
      paymentId: `cf_${order.orderNumber}`,
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

  const getStatusBadge = (status: AdminOrder['status']) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[10px] font-mono font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            PAID // AWAITING LAB PACKING
          </span>
        );
      case 'packed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 text-[10px] font-mono font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            PACKED // READY FOR COURIER
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-700 text-[10px] font-mono font-bold uppercase">
            <Truck className="w-3 h-3 text-blue-600" />
            IN TRANSIT (AIR)
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-[10px] font-mono font-bold uppercase">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            DELIVERED
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-clay/10 border border-clay text-clay text-[10px] font-mono font-bold uppercase">
            CANCELLED / REFUNDED
          </span>
        );
      default:
        return <span className="text-smoke text-[10px] font-mono">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="micro-label text-smoke">LOGISTICS & DISPATCH COMMAND</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
            ORDERS MANAGEMENT ({orders.length})
          </h2>
        </div>
        <p className="font-mono text-xs text-smoke">
          Authoritative one-directional state transitions
        </p>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-line pb-1">
          {['all', 'paid', 'packed', 'shipped', 'delivered', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors border ${
                activeTab === tab
                  ? 'bg-ink text-paper border-ink font-bold'
                  : 'bg-paper text-smoke border-line hover:text-ink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-smoke absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ref, name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-paper border border-line focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="border border-line bg-paper overflow-x-auto shadow-sm">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-bone border-b border-line text-[10px] text-smoke uppercase tracking-wider">
            <tr>
              <th className="p-3 pl-4">ORDER REF</th>
              <th className="p-3">CUSTOMER</th>
              <th className="p-3">DATE & TIME</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">TOTAL (INR)</th>
              <th className="p-3 pr-4 text-right">MANAGE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-bone/20 transition-colors">
                <td className="p-3 pl-4 font-bold text-ink">
                  {ord.orderNumber}
                </td>
                <td className="p-3">
                  <p className="font-bold text-ink">{ord.customerName}</p>
                  <p className="text-[10px] text-smoke">{ord.customerEmail}</p>
                </td>
                <td className="p-3 text-smoke">{ord.date}</td>
                <td className="p-3">{getStatusBadge(ord.status)}</td>
                <td className="p-3 font-bold text-ink">
                  ₹{ord.total.toLocaleString('en-IN')}
                </td>
                <td className="p-3 pr-4 text-right space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder(ord);
                      setNewAwbInput(ord.trackingAwb || `BD-${ord.orderNumber.replace('KQ-', '')}-AIR`);
                    }}
                    className="h-8 text-[11px]"
                  >
                    DETAILS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePrint(ord)}
                    className="h-8 px-2 text-[11px]"
                    title="Print Tax Invoice"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Drawer Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-paper border border-line w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <span className="micro-label text-smoke">DISPATCH CONTROL LEDGER</span>
                <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-ink mt-1">
                  ORDER {selectedOrder.orderNumber}
                </h3>
                <p className="font-mono text-xs text-smoke">RECORDED: {selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1.5 text-smoke hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Status & Transitions */}
            <div className="p-4 bg-bone border border-line space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="micro-label text-smoke">CURRENT ORDER STATUS:</span>
                {getStatusBadge(selectedOrder.status)}
              </div>

              {/* Status Transition Triggers */}
              <div className="pt-2 border-t border-line/60 flex flex-wrap gap-2">
                {selectedOrder.status === 'paid' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'packed')}
                    className="text-xs h-9 font-bold"
                  >
                    <Package className="w-3.5 h-3.5 mr-1.5" />
                    TRANSITION: PACK IN LAB
                  </Button>
                )}

                {selectedOrder.status === 'packed' && (
                  <div className="w-full space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAwbInput}
                        onChange={(e) => setNewAwbInput(e.target.value)}
                        placeholder="Air Waybill (e.g. BD-0293B8-AIR)"
                        className="flex-1 px-3 py-1.5 text-xs font-mono bg-paper border border-line focus:outline-none focus:border-ink font-bold"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped', newAwbInput)}
                        className="text-xs h-9 font-bold"
                      >
                        <Truck className="w-3.5 h-3.5 mr-1.5" />
                        DISPATCH // MARK SHIPPED
                      </Button>
                    </div>
                  </div>
                )}

                {selectedOrder.status === 'shipped' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'delivered')}
                    className="text-xs h-9 font-bold bg-emerald-700 hover:bg-emerald-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                    CONFIRM HANDOVER // MARK DELIVERED
                  </Button>
                )}

                {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                    className="text-xs h-9 text-clay border-clay hover:bg-clay hover:text-paper"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    CANCEL & REFUND
                  </Button>
                )}
              </div>
            </div>

            {/* Customer & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 border border-line bg-paper">
                <span className="text-smoke block text-[10px] uppercase">CUSTOMER IDENTIFIER</span>
                <p className="font-bold text-ink mt-0.5">{selectedOrder.customerName}</p>
                <p className="text-smoke">{selectedOrder.customerEmail}</p>
                <p className="text-smoke">{selectedOrder.customerPhone}</p>
              </div>

              <div className="p-3 border border-line bg-paper">
                <span className="text-smoke block text-[10px] uppercase">DISPATCH ADDRESS</span>
                <p className="text-ink mt-0.5">{selectedOrder.shippingAddress.line1}</p>
                {selectedOrder.shippingAddress.line2 && <p className="text-smoke">{selectedOrder.shippingAddress.line2}</p>}
                <p className="font-bold text-ink">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} — {selectedOrder.shippingAddress.pincode}</p>
              </div>
            </div>

            {/* Item Manifest */}
            <div className="border border-line divide-y divide-line">
              {selectedOrder.items.map((i, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between font-mono text-xs">
                  <div>
                    <p className="font-bold text-ink">{i.name}</p>
                    <p className="text-smoke text-[10px]">SIZE: US {i.size} // {i.color} · QTY: {i.quantity}</p>
                  </div>
                  <span className="font-bold text-ink">
                    ₹{(i.unitPrice * i.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Ledger */}
            <div className="p-3 bg-bone/40 border border-line font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-smoke">
                <span>SUBTOTAL:</span>
                <span className="text-ink font-bold">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>DISCOUNT:</span>
                  <span>-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-smoke">
                <span>SHIPPING:</span>
                <span>{selectedOrder.shipping === 0 ? 'FREE' : `₹${selectedOrder.shipping}`}</span>
              </div>
              <div className="border-t border-line pt-1 flex justify-between font-bold text-sm text-ink">
                <span>TOTAL DUE:</span>
                <span>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={() => handlePrint(selectedOrder)}
                className="flex-1 h-11 text-xs font-bold"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                PRINT TAX INVOICE
              </Button>
              <Button
                variant="secondary"
                onClick={() => setSelectedOrder(null)}
                className="h-11 text-xs"
              >
                CLOSE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
