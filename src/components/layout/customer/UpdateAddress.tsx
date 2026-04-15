"use client";

import { updateAddressInfo } from "@/actions/updateAddressInfo";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addressSchema = z.object({
  state: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  street: z.string().min(2).max(200),
  postal_code: z.string().regex(/^\d{5}$/),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/),
});

export default function UpdateAddress({
  address,
}: {
  address: z.infer<typeof addressSchema>;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      state: address?.state || "",
      city: address?.city || "",
      street: address?.street || "",
      postal_code: address?.postal_code || "",
      phone: address?.phone || "",
    },
  });

  async function onSubmit(data: any) {
    const formaDta = new FormData();
    for (const key in data) {
      formaDta.append(key, data[key]);
    }
    try {
      await updateAddressInfo(formaDta);
      toast.success("Address updated successfully!");
    } catch (error) {
      toast.error("Failed to update address. Please try again.");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full grid-cols-1 gap-6 p-4 shadow-lg sm:p-6 md:grid-cols-2"
    >
      <Field className="w-full">
        <FieldLabel htmlFor="state">State</FieldLabel>
        <Input
          id="state"
          aria-invalid={!!errors.state}
          {...register("state")}
        />
        <FieldError errors={[errors.state]} className="text-rose-400" />
      </Field>

      <Field className="w-full">
        <FieldLabel htmlFor="city">City</FieldLabel>
        <Input id="city" aria-invalid={!!errors.city} {...register("city")} />
        <FieldError errors={[errors.city]} className="text-rose-400" />
      </Field>

      <Field className="w-full">
        <FieldLabel htmlFor="street">Street</FieldLabel>
        <Input
          id="street"
          aria-invalid={!!errors.street}
          {...register("street")}
        />
        <FieldError errors={[errors.street]} className="text-rose-400" />
      </Field>

      <Field className="w-full">
        <FieldLabel htmlFor="postal_code">Postal code</FieldLabel>
        <Input
          id="postal_code"
          type="number"
          inputMode="numeric"
          aria-invalid={!!errors.postal_code}
          {...register("postal_code")}
        />
        <FieldError errors={[errors.postal_code]} className="text-rose-400" />
      </Field>

      <Field className="w-full md:col-span-2">
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
        className="w-full self-end bg-accent/50 px-6 py-4 hover:bg-primary/50 focus:bg-primary/50 sm:w-fit"
      >
        {isSubmitting ? "Saving..." : "Update address"}
      </Button>
    </form>
  );
}
