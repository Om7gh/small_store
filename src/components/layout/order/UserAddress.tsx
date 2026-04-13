import CustomForm from "@/components/shared/Form";
import createClient from "@/lib/supabase/server";

export default async function UserAddress() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <CustomForm address={null} />;
  }

  const { data: address } = await supabase
    .from("address")
    .select("state, city, street, postal_code, phone")
    .eq("user_id", user.id)
    .maybeSingle();

  const mappedAddress = address
    ? {
        state: address.state,
        city: address.city,
        street: address.street,
        postalCode: address.postal_code,
        phone: address.phone,
      }
    : null;

  return <CustomForm address={mappedAddress} />;
}
