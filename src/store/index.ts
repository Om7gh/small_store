import { ProductType } from "@/type/ProductType";
import { create } from "zustand";

type Store = {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  product: ProductType | null;
  setProduct: (product: ProductType) => void;
};

const useStore = create<Store>()((set) => ({
  quantity: 1,
  increaseQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
  decreaseQuantity: () =>
    set((state) => ({ quantity: Math.max(state.quantity - 1, 1) })),
  product: null,
  setProduct: (product: ProductType) => set((_) => ({ product })),
}));

export default useStore;
