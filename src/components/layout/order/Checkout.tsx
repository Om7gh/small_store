import ProductCheckout from "./ProductCheckout";
import UserAddress from "./UserAddress";

export default function CheckoutPage() {
  return (
    <div className="p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UserAddress />
        <ProductCheckout />
      </div>
    </div>
  );
}
