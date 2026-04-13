"use client";

import useStore from "@/store";
import Image from "next/image";

export default function ProductCheckout() {
  const { product, totalPrice, hasHydrated } = useStore();

  if (!hasHydrated) {
    return (
      <div className="flex flex-col gap-10 bg-accent/5 p-4 shadow-lg">
        <h2 className="self-start md:self-center">
          Products you have selected:
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4" />
        <p className="text-lg font-bold self-end">
          Total: <span>0.00</span>MAD
        </p>
      </div>
    );
  }

  const totalPriceValue = totalPrice().toFixed(2);
  return (
    <div className="flex flex-col gap-10 bg-accent/5 p-4 shadow-lg h-full">
      <h2 className="self-start md:self-center">Products you have selected:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 h-full">
        {product.map((item) => (
          <li
            key={item.id}
            className="flex justify-between h-fit  gap-4 shadow-lg p-4"
          >
            <div className="w-15 h-15 md:w-25 md:h-25  overflow-hidden">
              <Image
                src={item.image_url}
                alt={item.name}
                width={600}
                height={600}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs md:text-sm text-text/50 font-semibold">
                {item.name}
              </p>
              <p className="text-xs md:text-sm font-normal">
                Quantity: {item.quantity}
              </p>
              <p className="text-xs md:text-sm font-normal">
                Price: {item.price} MAD
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-lg font-bold self-end">
        Total: <span>{totalPriceValue}</span>MAD
      </p>
    </div>
  );
}
