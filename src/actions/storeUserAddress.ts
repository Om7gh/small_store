"use server";

import createClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function storeUserAddress(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in to store an address.");
  }

  const addressData = {
    user_id: user.id,
    state: formData.get("state") as string,
    city: formData.get("city") as string,
    street: formData.get("street") as string,
    postal_code: Number(formData.get("postalCode")),
    phone: Number(formData.get("phone")),
  };

  const { error } = await supabase.from("address").insert(addressData);
  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error inserting address:", error);
    }
    throw new Error("Failed to store user address.");
  }

  revalidatePath("/checkout");
}
