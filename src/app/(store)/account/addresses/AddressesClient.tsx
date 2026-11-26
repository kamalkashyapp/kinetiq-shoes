'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Check,
  Building,
  Home,
  Briefcase,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/providers/ToastProvider';

interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const PINCODE_LOOKUP: Record<string, { city: string; state: string }> = {
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat' },
  '411001': { city: 'Pune', state: 'Maharashtra' },
  '302001': { city: 'Jaipur', state: 'Rajasthan' },
  '160001': { city: 'Chandigarh', state: 'Punjab' },
  '682001': { city: 'Kochi', state: 'Kerala' },
  '122001': { city: 'Gurugram', state: 'Haryana' },
};

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Home',
    fullName: 'Rohan Verma',
    phone: '+91 98765 43210',
    line1: 'Flat 402, Gravity Towers, 100 Feet Rd',
    line2: 'Opposite Indiranagar Club',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Lab Office',
    fullName: 'Rohan Verma',
    phone: '+91 98765 43210',
    line1: 'KINETIQ Design Studio, Floor 3',
    line2: 'Embassy Tech Village, Outer Ring Rd',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    isDefault: false,
  },
];

export function AddressesClient() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    label: 'Home',
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    isDefault: false,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      label: 'Home',
      fullName: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: 'Karnataka',
      pincode: '',
      isDefault: addresses.length === 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditingId(addr.id);
    setForm({
      label: addr.label,
      fullName: addr.fullName,
      phone: addr.phone,
      line1: addr.line1,
      line2: addr.line2 || '',
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });
    setIsModalOpen(true);
  };

  const handlePincodeChange = (pincode: string) => {
    const clean = pincode.replace(/[^0-9]/g, '').slice(0, 6);
    setForm((prev) => ({
      ...prev,
      pincode: clean,
      ...(PINCODE_LOOKUP[clean] ? PINCODE_LOOKUP[clean] : {}),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.line1 || !form.city || form.pincode.length !== 6) {
      toast({
        title: 'INCOMPLETE DETAILS',
        description: 'Please provide recipient name, street address, and valid 6-digit PIN.',
        type: 'warn',
      });
      return;
    }

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => {
          if (a.id === editingId) {
            return {
              ...a,
              ...form,
            };
          }
          if (form.isDefault) {
            return { ...a, isDefault: false };
          }
          return a;
        })
      );
      toast({ title: 'ADDRESS UPDATED', type: 'success' });
    } else {
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        ...form,
      };

      if (form.isDefault) {
        setAddresses((prev) => [
          newAddress,
          ...prev.map((a) => ({ ...a, isDefault: false })),
        ]);
      } else {
        setAddresses((prev) => [...prev, newAddress]);
      }
      toast({ title: 'NEW ADDRESS REGISTERED', type: 'success' });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast({ title: 'ADDRESS REMOVED', type: 'default' });
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    toast({ title: 'DEFAULT DESTINATION SET', type: 'success' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="micro-label text-smoke">DOMESTIC DESTINATIONS</span>
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
            SAVED ADDRESSES ({addresses.length})
          </h2>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenAdd} className="h-10 text-xs">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          ADD NEW DESTINATION
        </Button>
      </div>

      {/* Grid of Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-6 border bg-paper relative flex flex-col justify-between space-y-4 shadow-sm transition-colors ${
              addr.isDefault ? 'border-ink ring-1 ring-ink' : 'border-line'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-base uppercase text-ink">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="micro-label px-2 py-0.5 bg-ink text-paper text-[9px] font-bold">
                      DEFAULT DISPATCH
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="p-1.5 text-smoke hover:text-ink transition-colors"
                    aria-label="Edit address"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="p-1.5 text-smoke hover:text-clay transition-colors"
                    aria-label="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="font-mono text-sm font-bold text-ink">{addr.fullName}</p>
              <div className="font-mono text-xs text-smoke mt-1 space-y-0.5 leading-relaxed">
                <p>{addr.line1}</p>
                {addr.line2 && <p>{addr.line2}</p>}
                <p>
                  {addr.city}, {addr.state} — <strong className="text-ink">{addr.pincode}</strong>
                </p>
                <p>Phone: {addr.phone}</p>
              </div>
            </div>

            {!addr.isDefault && (
              <div className="pt-3 border-t border-line/60">
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="font-mono text-xs uppercase text-smoke hover:text-ink tracking-wider font-bold underline"
                >
                  SET AS DEFAULT DISPATCH DESTINATION
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Address Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-paper border border-line w-full max-w-lg shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="font-display font-bold text-xl uppercase tracking-tight">
                {editingId ? 'EDIT DESTINATION' : 'NEW DISPATCH DESTINATION'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-smoke hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="micro-label text-smoke block mb-1">LABEL (E.G. HOME / LAB)</label>
                  <input
                    type="text"
                    required
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="micro-label text-smoke block mb-1">PHONE (+91)</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="micro-label text-smoke block mb-1">RECIPIENT FULL NAME</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Rohan Verma"
                  className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="micro-label text-smoke block mb-1">STREET ADDRESS / HOUSE</label>
                <input
                  type="text"
                  required
                  value={form.line1}
                  onChange={(e) => setForm({ ...form, line1: e.target.value })}
                  placeholder="Flat 402, Gravity Towers, 100 Feet Rd"
                  className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="micro-label text-smoke block mb-1">LANDMARK / SUITE (OPTIONAL)</label>
                <input
                  type="text"
                  value={form.line2}
                  onChange={(e) => setForm({ ...form, line2: e.target.value })}
                  placeholder="Opposite Indiranagar Club"
                  className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="micro-label text-smoke block mb-1">PIN CODE</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="560001"
                    className="w-full px-3 py-2 bg-bone border border-line font-bold focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="micro-label text-smoke block mb-1">CITY</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Bengaluru"
                    className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="micro-label text-smoke block mb-1">STATE</label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full px-3 py-2 bg-bone border border-line focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="default-chk"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="accent-ink"
                />
                <label htmlFor="default-chk" className="cursor-pointer">
                  Set as primary dispatch destination
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="submit" variant="primary" className="flex-1 h-11 text-xs font-bold">
                  SAVE DESTINATION
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  className="h-11 text-xs"
                >
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
