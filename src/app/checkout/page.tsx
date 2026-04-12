import COD from "@/components/layout/COD";
import CheckoutPage from "@/components/layout/order/Checkout";

export default function page() {
  return (
    <div className="max-w-7xl w-full m-auto min-h-screen  h-screen p-4">
      <CheckoutPage />
      <COD />
    </div>
  );
}
