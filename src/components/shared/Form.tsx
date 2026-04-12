"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import createClient from "@/lib/supabase/client";
import { useAuth } from "@/providers/userContext";

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

export default function CustomForm() {
  const { id } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormInput, undefined, AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "",
      city: "",
      street: "",
      postalCode: undefined,
      phone: undefined,
    },
  });

  async function onSubmit(data: AddressFormValues) {
    const supabase = createClient();
    const addressRow = {
      user_id: id,
      state: data.state.trim(),
      city: data.city.trim(),
      street: data.street.trim(),
      postal_code: data.postalCode,
      phone: data.phone,
    };

    const { error } = await supabase.from("address").insert(addressRow);
    if (error) {
      console.error(error);
      return;
    }
    reset();
  }

  return (
    <div className="flex flex-col gap-10 shadow-lg  bg-primary/2 p-6  h-full w-full">
      <h2 className="self-start md:self-center">Fill Your Address:</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-6 place-items-center grid grid-cols-1 md:grid-cols-2  shadow-lg w-full"
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
          {isSubmitting ? "Saving..." : "Save address"}
        </Button>
      </form>
    </div>
  );
}
