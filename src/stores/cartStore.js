import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      likedItems: new Set(),

      addToCart: (item) =>
        set((state) => ({
          cartItems: [...state.cartItems, item],
          likedItems: new Set(state.likedItems).add(item.id),
        })),

      removeFromCart: (id) =>
        set((state) => {
          const newLikedItems = new Set(state.likedItems);
          newLikedItems.delete(id);
          return {
            cartItems: state.cartItems.filter((item) => item.id !== id),
            likedItems: newLikedItems,
          };
        }),

      likeItem: (id) =>
        set((state) => {
          const liked = new Set(state.likedItems);
          liked.add(id);
          return { likedItems: liked };
        }),

      unlikeItem: (id) =>
        set((state) => {
          const liked = new Set(state.likedItems);
          liked.delete(id);
          return { likedItems: liked };
        }),

      isLiked: (id) => get().likedItems.has(id),
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({
        cartItems: state.cartItems,
        likedItems: Array.from(state.likedItems), // serialize Set
      }),
      // rehydrate Set from array
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        likedItems: new Set(persistedState.likedItems),
      }),
    }
  )
);

export default useCartStore;
