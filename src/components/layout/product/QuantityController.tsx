"use client";

import useStore from "@/store";

export default function QuantityController() {
  const { quantity, increaseQuantity, decreaseQuantity } = useStore();
  return (
    <div className="flex items-center gap-4">
      <button
        className="h-8 w-8 flex items-center justify-center  border border-accent/20 bg-accent/10 text-sm font-medium text-text hover:bg-accent/20 transition-colors duration-150"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <span className="text-sm font-medium text-text">{quantity}</span>
      <button
        className="h-8 w-8 flex items-center justify-center  border border-accent/20 bg-accent/10 text-sm font-medium text-text hover:bg-accent/20 transition-colors duration-150"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
}
