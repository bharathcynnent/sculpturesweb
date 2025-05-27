// src/stores/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const existing = get().cartItems.find((i) => i.id === item.id);
        if (existing) return;
        set((state) => ({
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        }));
      },
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
    }),
    { name: 'cart-storage' }
  )
);

export default useCartStore;
