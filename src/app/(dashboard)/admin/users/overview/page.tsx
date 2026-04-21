import UserList from "@/components/layout/admin/UserList";
import createClient from "@/lib/supabase/server";

export default async function UsersOverviewPage() {
  const supabase = await createClient();

  const { data: users } = await supabase.from("profiles").select("*");
  const { data: phoneNumbers } = await supabase.from("address").select("*");

  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold">Manage Users</h2>
      <p className="mt-2 text-text/80">
        View user accounts and permissions in one place.
      </p>
      <UserList users={users} phoneNumbers={phoneNumbers} />
    </main>
  );
}
