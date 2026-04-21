import CreateProductForm from "@/components/layout/admin/CreateProduct";

export default async function ProductInventoryPage() {
  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-2xl  font-bold text-text relative">
        <span className="text-accent text-7xl opacity-5 absolute">Create</span>{" "}
        Create Product
      </h2>
      <CreateProductForm />
    </main>
  );
}
