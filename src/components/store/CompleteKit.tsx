'use client';

import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/providers/ToastProvider';
import { generateProductSvg } from '@/lib/assets';

interface KitItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
}

export function CompleteKit() {
  const { addItem, openCart } = useCartStore();
  const { toast } = useToast();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const accessories: KitItem[] = [
    {
      id: 'acc-socks',
      name: 'MERINO ANTI-BLISTER SOCKS',
      subtitle: 'Targeted compression arch support',
      price: 1800,
      image: generateProductSvg({ collection: 'pulse', name: 'MERINO SOCKS', colorway: 'Graphite', angle: 'top', aspectRatio: '1-1' }),
    },
    {
      id: 'acc-care',
      name: 'CARBON HYDROPHOBIC CARE KIT',
      subtitle: 'Water & stain barrier shield',
      price: 2400,
      image: generateProductSvg({ collection: 'form', name: 'CARE KIT', colorway: 'Bone', angle: 'top', aspectRatio: '1-1' }),
    },
    {
      id: 'acc-laces',
      name: 'LOCKDOWN KEVLAR SPEED LACES',
      subtitle: 'Zero stretch aramid fibers',
      price: 950,
      image: generateProductSvg({ collection: 'terra', name: 'SPEED LACES', colorway: 'Basalt', angle: 'top', aspectRatio: '1-1' }),
    },
  ];

  const handleAddAccessory = (item: KitItem) => {
    addItem({
      id: item.id,
      variantId: item.id,
      productId: item.id,
      name: item.name,
      slug: item.id,
      price: item.price,
      size: 0,
      color: 'Standard',
      quantity: 1,
      image: item.image,
    });

    setAddedIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== item.id));
    }, 1500);

    toast({
      title: 'ACCESSORY PACKED',
      description: `${item.name} added to bag.`,
      type: 'success',
      action: {
        label: 'VIEW BAG',
        onClick: () => openCart(),
      },
    });
  };

  return (
    <section className="space-y-4">
      <div className="border-b border-line pb-2 flex justify-between items-center">
        <span className="micro-label text-smoke">COMPLETE THE KIT // ESSENTIAL ACCESSORIES</span>
        <span className="text-[9px] font-mono text-smoke">SHIPS IN SAME PACKAGE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accessories.map((acc) => {
          const isAdded = addedIds.includes(acc.id);
          return (
            <div key={acc.id} className="p-4 border border-line bg-paper flex items-center justify-between gap-4">
              <div className="w-14 h-14 bg-bone border border-line overflow-hidden shrink-0">
                <img src={acc.image} alt={acc.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-xs uppercase truncate text-ink">{acc.name}</p>
                <p className="text-[10px] text-smoke font-mono truncate">{acc.subtitle}</p>
                <p className="font-mono text-xs font-bold text-ink mt-1">₹{acc.price.toLocaleString('en-IN')}</p>
              </div>
              <button
                type="button"
                onClick={() => handleAddAccessory(acc)}
                className={`p-2 border transition-colors shrink-0 ${
                  isAdded
                    ? 'border-status-success bg-status-success text-paper'
                    : 'border-line hover:border-ink bg-paper text-ink'
                }`}
                aria-label={`Add ${acc.name} to bag`}
              >
                {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
