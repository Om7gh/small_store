export default async function ProductDetailPage(params: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params.params;
  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-accent">Product Detail</h2>
    </main>
  );
}
