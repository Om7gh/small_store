import { ProductType } from "@/type/ProductType";
import { create } from "zustand";

export type ProductItem = ProductType & {
  quantity: number;
};

type Store = {
  product: ProductItem[];
  setProduct: (product: ProductType, stock: number) => void;
  addQuantity: (productId: number, stock: number) => void;
  removeQuantity: (productId: number) => void;
  removeProduct: (productId: number) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  toggleAuthModal: () => void;
  isCartModalOpen: boolean;
  openCartModal: () => void;
  closeCartModal: () => void;
  toggleCartModal: () => void;
};

const useStore = create<Store>()((set) => ({
  product: [],
  setProduct: (product, stock) => {
    set((state) => {
      const existingProductIndex = state.product.findIndex(
        (item) => item.id === product.id,
      );

      if (existingProductIndex >= 0) {
        const updatedProducts = [...state.product];
        if (updatedProducts[existingProductIndex].quantity < stock) {
          updatedProducts[existingProductIndex].quantity += 1;
        }
        return { product: updatedProducts };
      } else {
        if (stock <= 0) {
          return state;
        }

        return {
          product: [...state.product, { ...product, quantity: 1 }],
        };
      }
    });
  },
  addQuantity: (productId, stock) => {
    set((state) => {
      const updatedProducts = [...state.product];
      const productIndex = updatedProducts.findIndex(
        (item) => item.id === productId,
      );
      if (productIndex >= 0 && updatedProducts[productIndex].quantity < stock) {
        updatedProducts[productIndex].quantity += 1;
      }

      return { product: updatedProducts };
    });
  },
  removeQuantity: (productId) => {
    set((state) => {
      const updatedProducts = [...state.product];
      const productIndex = updatedProducts.findIndex(
        (item) => item.id === productId,
      );

      if (productIndex >= 0) {
        updatedProducts[productIndex].quantity -= 1;
        if (updatedProducts[productIndex].quantity <= 0) {
          updatedProducts.splice(productIndex, 1);
        }
      }

      return { product: updatedProducts };
    });
  },
  removeProduct: (productId) => {
    set((state) => {
      const updatedProducts = state.product.filter(
        (item) => item.id !== productId,
      );
      return { product: updatedProducts };
    });
  },
  isAuthModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  toggleAuthModal: () =>
    set((state) => ({
      isAuthModalOpen: !state.isAuthModalOpen,
    })),
  isCartModalOpen: false,
  openCartModal: () => set({ isCartModalOpen: true }),
  closeCartModal: () => set({ isCartModalOpen: false }),
  toggleCartModal: () =>
    set((state) => ({
      isCartModalOpen: !state.isCartModalOpen,
    })),
}));

export default useStore;
