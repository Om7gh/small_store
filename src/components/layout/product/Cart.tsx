"use client";
import useStore from "@/store";

export default function Cart() {
  const { product } = useStore();
  return (
    <div className="mx-auto my-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-text">Your Cart</h1>
      <p className="text-center text-text/80 mt-4">
        Your cart is currently empty. Start adding some products!
      </p>
    </div>
  );
}
