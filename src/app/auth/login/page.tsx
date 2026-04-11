import Login from "@/components/layout/login";

type LoginPageProps = {
  searchParams?: Promise<{ next?: string; error?: string }>;
};

export default async function Page({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  let next = params?.next ?? "/";

  if (!next.startsWith("/")) {
    next = "/";
  }

  const actionUrl = `/auth/signin-google?next=${encodeURIComponent(next)}`;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Login actionUrl={actionUrl} errorMessage={params?.error} />
    </main>
  );
}
