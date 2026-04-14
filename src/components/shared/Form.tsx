"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { storeUserAddress } from "@/actions/storeUserAddress";
import { createOrder } from "@/actions/createOrder";
import { updateAddressInfo } from "@/actions/updateAddressInfo";

const formSchema = z.object({
  state: z
    .string()
    .min(5, "State must be at least 5 characters.")
    .max(32, "State must be at most 32 characters."),
  city: z
    .string()
    .min(20, "City must be at least 20 characters.")
    .max(100, "City must be at most 100 characters."),
  street: z.string().min(1, "Please select a state."),
  postalCode: z.coerce.number().min(1, "Please select your postal code."),
  phone: z.coerce.number().min(1, "Please select your phone number."),
});

type AddressFormInput = z.input<typeof formSchema>;
type AddressFormValues = z.output<typeof formSchema>;
type PrefillAddress = {
  state?: string | null;
  city?: string | null;
  street?: string | null;
  postalCode?: number | null;
  phone?: number | null;
};

export default function CustomForm({
  address: formAddress,
}: {
  address: PrefillAddress | null;
}) {
  const [isConfirming, startConfirming] = useTransition();
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormInput, undefined, AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: formAddress?.state ?? "",
      city: formAddress?.city ?? "",
      street: formAddress?.street ?? "",
      postalCode: formAddress?.postalCode ?? undefined,
      phone: formAddress?.phone ?? undefined,
    },
  });
  const { product, removeAllProducts, totalPrice } = useStore();

  async function onSubmit(data: AddressFormValues) {
    const formData = new FormData();
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("street", data.street);
    formData.append("postalCode", data.postalCode.toString());
    formData.append("phone", data.phone.toString());

    try {
      if (
        formAddress?.city &&
        formAddress?.state &&
        formAddress?.street &&
        formAddress?.postalCode &&
        formAddress?.phone
      ) {
        console.log("Updating address with data:", data);
        await updateAddressInfo(formData);
        toast.success("Address updated successfully.");
      } else {
        await storeUserAddress(formData);
        toast.success("Address saved successfully.");
      }
      reset(data);
      toast.success("Address saved successfully.");
    } catch (error) {
      console.error("Error storing user address:", error);
      toast.error("Failed to save address.");
    }
  }

  function onConfirmOrder() {
    setOrderError(null);
    setOrderSuccess(null);

    if (!product.length) {
      setOrderError("Your cart is empty.");
      return;
    }

    startConfirming(async () => {
      try {
        const orderTotal = totalPrice().toFixed(2);

        await createOrder({
          items: product.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            priceAtTime: item.price,
          })),
          paymentMethod: "cod",
        });

        removeAllProducts();
        setOrderSuccess(
          `Order confirmed successfully. Total: ${orderTotal} MAD`,
        );
        router.push("/customer");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to confirm order.";
        toast.error(message, { position: "top-center" });
        setOrderError(message);
      }
    });
  }

  return (
    <div className="flex flex-col gap-10 shadow-lg  bg-primary/2 p-6  h-full w-full">
      <h2 className="self-start md:self-center">Fill Your Address:</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-6 place-items-center grid grid-cols-1 md:grid-cols-2  shadow-lg w-full p-4"
      >
        <Field>
          <FieldLabel htmlFor="state">State</FieldLabel>
          <Input
            id="state"
            aria-invalid={!!errors.state}
            {...register("state")}
          />
          <FieldError errors={[errors.state]} className="text-rose-400" />
        </Field>

        <Field>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Input id="city" aria-invalid={!!errors.city} {...register("city")} />
          <FieldError errors={[errors.city]} className="text-rose-400" />
        </Field>

        <Field>
          <FieldLabel htmlFor="street">Street</FieldLabel>
          <Input
            id="street"
            aria-invalid={!!errors.street}
            {...register("street")}
          />
          <FieldError errors={[errors.street]} className="text-rose-400" />
        </Field>

        <Field>
          <FieldLabel htmlFor="postalCode">Postal code</FieldLabel>
          <Input
            id="postalCode"
            type="number"
            inputMode="numeric"
            aria-invalid={!!errors.postalCode}
            {...register("postalCode")}
          />
          <FieldError errors={[errors.postalCode]} className="text-rose-400" />
        </Field>

        <Field className="md:col-span-2 ">
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldError errors={[errors.phone]} className="text-rose-400" />
        </Field>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full self-end bg-accent/50 py-4 px-6  hover:bg-primary/50 focus:bg-primary/50"
        >
          {isSubmitting
            ? "Saving..."
            : formAddress
              ? "Update address"
              : "Save address"}
        </Button>
      </form>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Note:</h3>
        <p className="text-sm text-muted-foreground">
          Please make sure to fill in all the required fields accurately. This
          information is crucial for the successful delivery of your order.
        </p>
        {orderError ? (
          <p className="text-sm text-rose-500">{orderError}</p>
        ) : null}
        {orderSuccess ? (
          <p className="text-sm text-emerald-500">{orderSuccess}</p>
        ) : null}
        <Button
          type="button"
          onClick={onConfirmOrder}
          disabled={isConfirming || isSubmitting}
        >
          {isConfirming ? "Confirming..." : "confirm order"}
        </Button>
      </div>
    </div>
  );
}
