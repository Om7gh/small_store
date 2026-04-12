"use client";
import useStore from "@/store";
import CartItem from "./CartItems";

export default function Cart() {
  const { product, removeProduct, totalPrice } = useStore();

  if (product.length === 0)
    return (
      <div className="mx-auto my-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-text">Your Cart</h1>
        <p className="text-center text-text/80 mt-4">
          Your cart is currently empty. Start adding some products!
        </p>
      </div>
    );

  return (
    <div className="my-2 w-full sm:my-4">
      <h2 className="mb-2 text-center text-lg font-semibold text-accent sm:mb-4 sm:text-xl">
        Your Cart
      </h2>
      <p className="mb-4 text-center text-xs text-text/70 sm:text-sm">
        {product.length} {product.length === 1 ? "item" : "items"}
      </p>
      <p className="mb-4 text-right text-xs text-accent font-bold  sm:text-sm">
        Total: {Number(totalPrice().toFixed(2))} MAD
      </p>
      <div className="max-h-[52vh] space-y-3 overflow-y-auto pr-1 sm:max-h-[56vh] sm:space-y-4">
        {product.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            removeProduct={removeProduct}
          />
        ))}
      </div>
      <div className="mt-5 flex justify-stretch sm:mt-6 sm:justify-end">
        <button className="inline-flex w-full items-center justify-center  bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:w-auto">
          Checkout
        </button>
      </div>
    </div>
  );
}
