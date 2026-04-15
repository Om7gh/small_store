import UpdateAddress from "@/components/layout/customer/UpdateAddress";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import createClient from "@/lib/supabase/server";
import { toast } from "sonner";

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    toast.error("You must be logged in to view your account details.");
    return <div>Please log in to view your account details.</div>;
  }

  const { data: address } = await supabase
    .from("address")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  console.log("Fetched address:", address);

  return (
    <div className="mx-auto h-full w-full max-w-4xl px-4 py-4 sm:px-6 sm:py-8">
      <UpdateAddress address={address} />
    </div>
  );
}
