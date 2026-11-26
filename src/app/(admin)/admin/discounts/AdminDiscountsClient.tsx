'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Check, X, Percent, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROMO_CODES, type PromoRule } from '@/lib/discounts';
import { useToast } from '@/providers/ToastProvider';

export function AdminDiscountsClient() {
  const [coupons, setCoupons] = useState<PromoRule[]>(Object.values(PROMO_CODES));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    code: '',
    kind: 'percent' as 'percent' | 'flat',
    value: 15,
    minSubtotal: 10000,
    description: '',
  });

  const handleToggleActive = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
    toast({ title: 'COUPON STATE TOGGLED', type: 'success' });
  };

  const handleDelete = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    toast({ title: 'COUPON DELETED', type: 'default' });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = form.code.trim().toUpperCase();
    if (!cleanCode || form.value <= 0) {
      toast({ title: 'INVALID PARAMETERS', description: 'Code and positive value are required.', type: 'warn' });
      return;
    }

    const newCoupon: PromoRule = {
      code: cleanCode,
      kind: form.kind,
      value: Number(form.value),
      minSubtotal: Number(form.minSubtotal) || 0,
      description: form.description || `${form.value}${form.kind === 'percent' ? '%' : ' INR'} off`,
      isActive: true,
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    toast({ title: 'PROMOTIONAL CODE REGISTERED', description: `${cleanCode} is now active.`, type: 'success' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="micro-label text-smoke">PRICING RULES & PROMOTIONS</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
            DISCOUNT CODES ({coupons.length})
          </h2>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="h-10 text-xs font-bold">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          NEW PROMOTIONAL CODE
        </Button>
      </div>

      <div className="border border-line bg-paper overflow-x-auto shadow-sm">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-bone border-b border-line text-[10px] text-smoke uppercase tracking-wider">
            <tr>
              <th className="p-3 pl-4">CODE</th>
              <th className="p-3">TYPE</th>
              <th className="p-3">VALUE</th>
              <th className="p-3">MINIMUM SUB-TOTAL</th>
              <th className="p-3">SPECIFICATION</th>
              <th className="p-3">STATUS</th>
              <th className="p-3 pr-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {coupons.map((c) => (
              <tr key={c.code} className="hover:bg-bone/20 transition-colors">
                <td className="p-3 pl-4">
                  <span className="font-bold text-ink bg-bone px-2 py-1 border border-line text-xs">
                    {c.code}
                  </span>
                </td>
                <td className="p-3 uppercase">{c.kind}</td>
                <td className="p-3 font-bold text-ink">
                  {c.kind === 'percent' ? `${c.value}% OFF` : `₹${c.value.toLocaleString('en-IN')} OFF`}
                </td>
                <td className="p-3 text-smoke">
                  {c.minSubtotal === 0 ? 'NO MINIMUM' : `₹${c.minSubtotal.toLocaleString('en-IN')}`}
                </td>
                <td className="p-3 text-smoke">{c.description}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleActive(c.code)}
                    className={`px-2 py-0.5 border text-[10px] font-bold uppercase transition-colors ${
                      c.isActive
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                        : 'border-line bg-bone text-smoke'
                    }`}
                  >
                    {c.isActive ? 'ACTIVE' : 'DEACTIVATED'}
                  </button>
                </td>
                <td className="p-3 pr-4 text-right">
                  <button
                    onClick={() => handleDelete(c.code)}
                    className="p-1.5 border border-line hover:border-clay text-smoke hover:text-clay transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-paper border border-line w-full max-w-md shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="font-display font-bold text-xl uppercase tracking-tight">
                NEW PROMOTIONAL CODE
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-smoke hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 font-mono text-xs">
              <div>
                <label className="micro-label text-smoke block mb-1">COUPON CODE (UPPERCASE)</label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. MONSOON25"
                  className="w-full px-3 py-2 bg-bone border border-line font-bold uppercase focus:outline-none focus:border-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="micro-label text-smoke block mb-1">DISCOUNT KIND</label>
                  <select
                    value={form.kind}
                    onChange={(e) => setForm({ ...form, kind: e.target.value as any })}
                    className="w-full px-3 py-2 bg-bone border border-line uppercase focus:outline-none focus:border-ink"
                  >
                    <option value="percent">PERCENTAGE (%)</option>
                    <option value="flat">FLAT INR (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="micro-label text-smoke block mb-1">
                    VALUE ({form.kind === 'percent' ? '%' : '₹'})
                  </label>
                  <input
                    type="number"
                    required
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-bone border border-line font-bold focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="micro-label text-smoke block mb-1">MINIMUM ORDER SUB-TOTAL (₹)</label>
                <input
                  type="number"
                  value={form.minSubtotal}
                  onChange={(e) => setForm({ ...form, minSubtotal: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="micro-label text-smoke block mb-1">DESCRIPTION</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="15% off orders above ₹10,000"
                  className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <Button type="submit" variant="primary" className="flex-1 h-11 text-xs font-bold">
                  REGISTER CODE
                </Button>
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="h-11 text-xs">
                  CANCEL
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
