'use client';

import React, { useState } from 'react';
import { Users, Search, UserCheck, ShoppingBag, MapPin, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  ltv: number;
  preferredSize: number;
  joinedDate: string;
  city: string;
  state: string;
}

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rohan Verma',
    email: 'athlete@kinetiq.design',
    phone: '+91 98765 43210',
    totalOrders: 3,
    ltv: 45497,
    preferredSize: 10.0,
    joinedDate: '15 Oct 2026',
    city: 'Bengaluru',
    state: 'Karnataka',
  },
  {
    id: 'cust-2',
    name: 'Ananya Sharma',
    email: 'ananya.s@studio.in',
    phone: '+91 98111 22334',
    totalOrders: 2,
    ltv: 34998,
    preferredSize: 8.5,
    joinedDate: '28 Oct 2026',
    city: 'Bengaluru',
    state: 'Karnataka',
  },
  {
    id: 'cust-3',
    name: 'Kabir Mehta',
    email: 'kabir.m@runclub.org',
    phone: '+91 99887 76655',
    totalOrders: 4,
    ltv: 62496,
    preferredSize: 11.0,
    joinedDate: '02 Sep 2026',
    city: 'New Delhi',
    state: 'Delhi',
  },
  {
    id: 'cust-4',
    name: 'Priya Iyer',
    email: 'priya.iyer@gmail.com',
    phone: '+91 91234 56789',
    totalOrders: 1,
    ltv: 12999,
    preferredSize: 7.5,
    joinedDate: '10 Nov 2026',
    city: 'Chennai',
    state: 'Tamil Nadu',
  },
];

export function AdminCustomersClient() {
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="micro-label text-smoke">CLIENT BIOMETRIC DATABASE</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
            REGISTERED CUSTOMERS ({customers.length})
          </h2>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-smoke absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, city..."
            className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-paper border border-line focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="border border-line bg-paper overflow-x-auto shadow-sm">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-bone border-b border-line text-[10px] text-smoke uppercase tracking-wider">
            <tr>
              <th className="p-3 pl-4">CUSTOMER NAME</th>
              <th className="p-3">PHONE</th>
              <th className="p-3">LOCATION</th>
              <th className="p-3">SIZE SPEC</th>
              <th className="p-3">ORDERS</th>
              <th className="p-3">LIFETIME VALUE</th>
              <th className="p-3 pr-4 text-right">PROFILE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-bone/20 transition-colors">
                <td className="p-3 pl-4">
                  <p className="font-bold text-ink">{c.name}</p>
                  <p className="text-[10px] text-smoke">{c.email}</p>
                </td>
                <td className="p-3 text-smoke">{c.phone}</td>
                <td className="p-3 text-smoke">
                  {c.city}, {c.state}
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-bone border border-line text-[10px] font-bold">
                    US {c.preferredSize.toFixed(1)}
                  </span>
                </td>
                <td className="p-3 font-bold">{c.totalOrders}</td>
                <td className="p-3 font-bold text-ink">
                  ₹{c.ltv.toLocaleString('en-IN')}
                </td>
                <td className="p-3 pr-4 text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedCust(c)}
                    className="h-8 text-[11px]"
                  >
                    INSPECT
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-paper border border-line w-full max-w-md shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <span className="micro-label text-smoke">CLIENT BIOMETRIC RECORD</span>
                <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-ink mt-0.5">
                  {selectedCust.name}
                </h3>
                <p className="font-mono text-xs text-smoke">{selectedCust.email}</p>
              </div>
              <button onClick={() => setSelectedCust(null)} className="p-1.5 text-smoke hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-bone border border-line grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <span className="text-smoke text-[10px] block uppercase">LIFETIME SPEND</span>
                <span className="font-display font-bold text-lg text-ink">₹{selectedCust.ltv.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-smoke text-[10px] block uppercase">TOTAL DISPATCHES</span>
                <span className="font-display font-bold text-lg text-ink">{selectedCust.totalOrders} ORDERS</span>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs text-smoke">
              <div className="flex justify-between py-1 border-b border-line">
                <span>PREFERRED SHOE SIZE:</span>
                <span className="text-ink font-bold">US {selectedCust.preferredSize}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line">
                <span>REGISTERED LOCATION:</span>
                <span className="text-ink">{selectedCust.city}, {selectedCust.state}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line">
                <span>JOIN DATE:</span>
                <span className="text-ink">{selectedCust.joinedDate}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>SECURITY CLEARANCE:</span>
                <span className="text-emerald-700 font-bold">VERIFIED CUSTOMER</span>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full h-11 text-xs font-bold"
              onClick={() => setSelectedCust(null)}
            >
              CLOSE AUDIT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
