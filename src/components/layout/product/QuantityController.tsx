"use client";

import useStore from "@/store";

export default function QuantityController({
  product,
  productId,
  stock,
}: {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  };
  productId: number;
  stock: number;
}) {
  const {
    addQuantity,
    removeQuantity,
    setProduct,
    product: cartProducts,
  } = useStore();
  const quantity =
    cartProducts.find((item) => item.id === productId)?.quantity || 0;

  const handleIncrease = () => {
    if (quantity === 0) {
      setProduct(product, stock);
      return;
    }

    addQuantity(productId, stock);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="h-8 w-8 flex items-center justify-center  border border-accent/20 bg-accent/10 text-sm font-medium text-text hover:bg-accent/20 transition-colors duration-150"
        onClick={() => removeQuantity(productId)}
      >
        -
      </button>
      <span className="text-sm font-medium text-text">{quantity}</span>
      <button
        type="button"
        disabled={stock <= 0 || quantity >= stock}
        className="h-8 w-8 flex items-center justify-center  border border-accent/20 bg-accent/10 text-sm font-medium text-text hover:bg-accent/20 transition-colors duration-150"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
}
