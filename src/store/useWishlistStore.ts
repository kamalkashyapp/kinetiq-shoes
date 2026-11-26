'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistStore {
  items: string[]; // Product slugs
  toggleWishlist: (slug: string) => boolean;
  addToWishlist: (slug: string) => void;
  removeFromWishlist: (slug: string) => void;
  clearWishlist: () => void;
  isInWishlist: (slug: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: ['pulse-01', 'terra-gravity-01'], // Seed with 2 items for immediate visual fidelity
      toggleWishlist: (slug: string) => {
        const current = get().items;
        const exists = current.includes(slug);
        if (exists) {
          set({ items: current.filter((s) => s !== slug) });
          return false;
        } else {
          set({ items: [...current, slug] });
          return true;
        }
      },
      addToWishlist: (slug: string) => {
        const current = get().items;
        if (!current.includes(slug)) {
          set({ items: [...current, slug] });
        }
      },
      removeFromWishlist: (slug: string) => {
        set({ items: get().items.filter((s) => s !== slug) });
      },
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (slug: string) => get().items.includes(slug),
    }),
    {
      name: 'kinetiq-wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
