import createClient from "@/lib/supabase/server";
import Image from "next/image";

export default async function OrderDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  const { data: orderItems } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  let products = [];
  if (orderItems) {
    const productIds = orderItems.map((item) => item.product_id);
    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    products = productsData || [];
  }

  const { data: shippingAddress } = await supabase
    .from("address")
    .select("*")
    .eq("id", data?.address_id)
    .single();

  const statusLabel = data?.status || "Unknown";
  const isPending = statusLabel.toLowerCase() === "pending";

  return (
    <section className="w-full p-4 shadow-2xl shadow-black/20 sm:p-6 md:p-10">
      <div className="relative flex flex-wrap items-start justify-between gap-4 sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-text/60">
            Purchase Summary
          </p>
          <h2 className="mt-2 text-3xl font-black text-text md:text-4xl">
            Order Details
          </h2>
        </div>
        <p className="flex items-center gap-1 bg-orange-500/15 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-orange-300 shadow-lg shadow-orange-950/30 sm:px-4 sm:text-sm">
          <span>{statusLabel}</span>
          {isPending ? (
            <span
              className="inline-flex items-center"
              aria-label="waiting status"
            >
              <span
                className="animate-bounce"
                style={{ animationDelay: "0ms" }}
              >
                .
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "150ms" }}
              >
                .
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "300ms" }}
              >
                .
              </span>
            </span>
          ) : null}
        </p>
      </div>

      <div className="relative mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5  p-4 backdrop-blur-sm md:p-6">
          {orderItems?.map((item) => {
            const currentProduct = products?.find(
              (p) => p.id === item.product_id,
            );

            return (
              <article
                key={item.id}
                className="  p-4 shadow-xl shadow-black/10"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
                  {currentProduct?.image_url ? (
                    <div className="h-44 overflow-hidden bg-black/30 sm:h-40">
                      <Image
                        src={currentProduct.image_url}
                        alt={currentProduct?.name || "Product image"}
                        width={500}
                        height={500}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="grid h-44 place-content-center  text-sm text-text/60 sm:h-40">
                      Image unavailable
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-text/80">
                    <h3 className="text-xl font-bold text-text">
                      {currentProduct?.name || "Product"}
                    </h3>
                    <p>
                      <span className="text-text/60">Quantity:</span>{" "}
                      {item.quantity}
                    </p>
                    <p>
                      <span className="text-text/60">Price per item:</span>{" "}
                      {item.price_at_time} MAD
                    </p>
                    <p className="line-clamp-3 text-text/70">
                      {currentProduct?.description ||
                        "No description available."}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}

          <div className="bg-accent/20 p-4 shadow-lg ">
            <p className="text-lg font-bold text-text">
              Total:{" "}
              <span className="text-accent">{data?.total_amount} MAD</span>
            </p>
          </div>
        </div>

        <aside className="space-y-5 p-4 backdrop-blur-sm sm:p-6">
          <div className="  p-4">
            <h3 className="mb-3 text-lg font-bold text-primary">
              Shipping Address
            </h3>
            <div className="space-y-1 text-sm text-text/80">
              <p>
                <span className="text-text/60">Street:</span>{" "}
                {shippingAddress?.street}
              </p>
              <p>
                <span className="text-text/60">City:</span>{" "}
                {shippingAddress?.city}
              </p>
              <p>
                <span className="text-text/60">State:</span>{" "}
                {shippingAddress?.state}
              </p>
              <p>
                <span className="text-text/60">Postal Code:</span>{" "}
                {shippingAddress?.postal_code}
              </p>
              <p>
                <span className="text-text/60">Country:</span> Morocco
              </p>
              <p>
                <span className="text-text/60">Phone:</span>{" "}
                {shippingAddress?.phone}
              </p>
            </div>
          </div>

          <div className="  p-4">
            <h3 className="mb-2 text-lg font-bold text-primary">Order Date</h3>
            <p className="text-text/80">
              {data?.created_at
                ? new Date(data.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="  p-4">
            <h3 className="mb-2 text-lg font-bold text-primary">
              Payment Method
            </h3>
            <p className="capitalize text-text/80">
              {data?.payment_method || "N/A"}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
