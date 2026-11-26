'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PROMO_CODES, validateAndCalculateDiscount } from '@/lib/discounts';

export interface CartItem {
  id: string; // unique item id (e.g. variantId)
  variantId: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  size: number;
  color: string;
  quantity: number;
  image: string;
  sku?: string;
  maxStock?: number;
}

export interface AppliedCoupon {
  code: string;
  kind: 'percent' | 'flat';
  value: number;
  discountAmount: number;
}

interface CartStore {
  isOpen: boolean;
  items: CartItem[];
  notes: string;
  appliedCoupon: AppliedCoupon | null;
  
  // Drawer controls
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Cart operations
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setNotes: (notes: string) => void;

  // Coupons
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Computed calculations
  itemCount: () => number;
  subtotal: () => number;
  discountTotal: () => number;
  shippingFee: () => number;
  grandTotal: () => number;
  freeShippingProgress: () => { threshold: number; remaining: number; percent: number };
}

const FREE_SHIPPING_THRESHOLD = 10000; // ₹10,000
const STANDARD_SHIPPING_FEE = 250; // ₹250 for orders below threshold

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      isOpen: false,
      items: [],
      notes: '',
      appliedCoupon: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.variantId === item.variantId || (i.productId === item.productId && i.size === item.size && i.color === item.color)
          );

          let updatedItems: CartItem[];
          if (existingIndex > -1) {
            updatedItems = [...state.items];
            const currentItem = updatedItems[existingIndex];
            const newQty = currentItem.quantity + item.quantity;
            const max = item.maxStock || 10;
            updatedItems[existingIndex] = {
              ...currentItem,
              quantity: Math.min(newQty, max),
            };
          } else {
            updatedItems = [...state.items, item];
          }

          // Recalculate coupon if applied
          let coupon = state.appliedCoupon;
          if (coupon) {
            const rawSubtotal = updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
            const check = validateAndCalculateDiscount(coupon.code, rawSubtotal);
            if (check.valid && check.rule) {
              coupon = {
                code: coupon.code,
                kind: check.rule.kind,
                value: check.rule.value,
                discountAmount: check.discountAmount,
              };
            } else {
              coupon = null;
            }
          }

          return { items: updatedItems, appliedCoupon: coupon, isOpen: true };
        }),

      removeItem: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((i) => i.id !== id && i.variantId !== id);
          let coupon = state.appliedCoupon;
          if (coupon && updatedItems.length > 0) {
            const rawSubtotal = updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
            const check = validateAndCalculateDiscount(coupon.code, rawSubtotal);
            if (check.valid && check.rule) {
              coupon = {
                code: coupon.code,
                kind: check.rule.kind,
                value: check.rule.value,
                discountAmount: check.discountAmount,
              };
            } else {
              coupon = null;
            }
          } else if (updatedItems.length === 0) {
            coupon = null;
          }

          return { items: updatedItems, appliedCoupon: coupon };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.id !== id && i.variantId !== id),
            };
          }

          const updatedItems = state.items.map((i) => {
            if (i.id === id || i.variantId === id) {
              const max = i.maxStock || 10;
              return { ...i, quantity: Math.min(quantity, max) };
            }
            return i;
          });

          let coupon = state.appliedCoupon;
          if (coupon) {
            const rawSubtotal = updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
            const check = validateAndCalculateDiscount(coupon.code, rawSubtotal);
            if (check.valid && check.rule) {
              coupon = {
                code: coupon.code,
                kind: check.rule.kind,
                value: check.rule.value,
                discountAmount: check.discountAmount,
              };
            } else {
              coupon = null;
            }
          }

          return { items: updatedItems, appliedCoupon: coupon };
        }),

      clearCart: () => set({ items: [], appliedCoupon: null, notes: '' }),

      setNotes: (notes) => set({ notes }),

      applyCoupon: (code) => {
        const subtotal = get().subtotal();
        const check = validateAndCalculateDiscount(code, subtotal);

        if (!check.valid || !check.rule) {
          return { success: false, message: check.message };
        }

        set({
          appliedCoupon: {
            code: check.rule.code,
            kind: check.rule.kind,
            value: check.rule.value,
            discountAmount: check.discountAmount,
          },
        });

        return {
          success: true,
          message: `Code ${check.rule.code} applied (${check.rule.description}).`,
        };
      },

      removeCoupon: () => set({ appliedCoupon: null }),

      itemCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

      subtotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

      discountTotal: () => get().appliedCoupon?.discountAmount || 0,

      shippingFee: () => {
        const sub = get().subtotal();
        if (sub === 0 || sub >= FREE_SHIPPING_THRESHOLD) return 0;
        return STANDARD_SHIPPING_FEE;
      },

      grandTotal: () => {
        const sub = get().subtotal();
        if (sub === 0) return 0;
        const discount = get().discountTotal();
        const shipping = get().shippingFee();
        return Math.max(0, sub - discount + shipping);
      },

      freeShippingProgress: () => {
        const sub = get().subtotal();
        const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub);
        const percent = Math.min(100, Math.round((sub / FREE_SHIPPING_THRESHOLD) * 100));
        return {
          threshold: FREE_SHIPPING_THRESHOLD,
          remaining,
          percent,
        };
      },
    }),
    {
      name: 'kinetiq-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        notes: state.notes,
        appliedCoupon: state.appliedCoupon,
      }),
    }
  )
);
