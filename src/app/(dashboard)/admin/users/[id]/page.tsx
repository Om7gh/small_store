import UpdateUserRole from "@/components/layout/admin/UpdateUserRole";
import createClient from "@/lib/supabase/server";

export default async function UserDetailPage({
  params,
  role,
}: {
  params: Promise<{ id: string }>;
  role: string;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!user) {
    return (
      <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">User Not Found</h2>
        <p className="mt-2 text-text/80">
          The user you are trying to edit does not exist.
        </p>
      </main>
    );
  }
  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold">Update User Role</h2>
      <p className="mt-2 text-text/80">Change the role of the selected user.</p>
      <UpdateUserRole id={id} role={user.role} />
    </main>
  );
}
