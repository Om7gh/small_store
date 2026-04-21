"use client";

import { useRouter } from "next/navigation";

export default function UserList({
  users,
  phoneNumbers,
}: {
  users: any[] | null;
  phoneNumbers: any[] | null;
}) {
  const router = useRouter();
  return (
    <div className="mt-6">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left text-sm font-semibold text-accent/80">
              Name
            </th>
            <th className="border-b px-4 py-2 text-left text-sm font-semibold text-accent/80">
              Email
            </th>
            <th className="border-b px-4 py-2 text-left text-sm font-semibold text-accent/80">
              Role
            </th>
            <th className="border-b px-4 py-2 text-left text-sm font-semibold text-accent/80">
              Phone
            </th>
            <th className="border-b px-4 py-2 text-left text-sm font-semibold text-accent/80">
              Edit Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="border-b px-4 py-2">{user.full_name}</td>
              <td className="border-b px-4 py-2">{user.email}</td>
              <td className="border-b px-4 py-2">{user.role}</td>
              <td className="border-b px-4 py-2">
                {phoneNumbers?.find((pn) => pn.user_id === user.id)?.phone}
              </td>
              <td className="border-b px-4 py-2">
                <button
                  className="rounded bg-accent/10 text-accent px-3 py-1 text-sm  hover:bg-accent/90 hover:text-text transition-colors"
                  onClick={() => {
                    router.push(`/admin/users/${user.id}`);
                  }}
                >
                  Edit Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
