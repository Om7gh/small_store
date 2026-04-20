"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import updateProductInfo from "@/actions/admin/updateProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const UpdateProductSchema = z.object({
  name: z.string().min(5).max(30),
  description: z.string().min(10).max(200),
  price: z.coerce.number().positive(),
  category: z.string().min(3).max(30),
  image_url: z.string(),
  stock: z.coerce.number().int().nonnegative(),
});

export default function UpdateProductForm({
  product,
  productId,
}: {
  product: any;
  productId: string;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<
    z.input<typeof UpdateProductSchema>,
    undefined,
    z.output<typeof UpdateProductSchema>
  >({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      category: product.category || "",
      image_url: product.image_url || "",
      stock: product.stock || 0,
    },
  });
  const [img, setImg] = useState(product.image_url || "");

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImg(dataUrl);
        setValue("image_url", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(data: z.infer<typeof UpdateProductSchema>) {
    try {
      const formData = new FormData();
      formData.append("id", productId);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("category", data.category);
      formData.append("image_url", data.image_url);
      formData.append("stock", data.stock.toString());
      await updateProductInfo(formData);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update product",
      );
    }
  }

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4">
        <h2 className="flex flex-wrap items-center gap-1 text-lg font-semibold text-text sm:gap-2">
          Update Product{" "}
          <span className="ml-0 text-sm font-normal text-text sm:ml-2">
            ID: {productId}
          </span>
        </h2>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
            <Field className="p-4 pt-4 shadow-lg lg:col-span-1 lg:sticky lg:top-4 lg:self-start">
              <FieldLabel
                htmlFor="image_url"
                className="text-sm font-bold text-accent mb-4 block"
              >
                Product Image
              </FieldLabel>
              <div className="flex flex-col items-start gap-4 sm:gap-6">
                <div className="relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-lg p-1 bg-accent/15  max-w-xs sm:max-w-sm lg:max-w-none">
                  {img ? (
                    <Image
                      src={img}
                      alt="Preview"
                      className="object-cover h-full w-full"
                      width={400}
                      height={400}
                    />
                  ) : (
                    <span className="text-xs text-text">No Image</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    id="image_url"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onImageChange}
                  />
                  <label
                    htmlFor="image_url"
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm font-medium text-text shadow-sm transition-colors focus:outline-none border-accent hover:border-accent/50   sm:w-auto"
                  >
                    Change Image
                  </label>
                  <p className="text-xs text-slate-500">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              </div>
              <FieldError
                className="mt-2 text-xs text-rose-500"
                errors={[errors.image_url]}
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2 lg:gap-6">
              <Field className="p-4 shadow-lg md:col-span-2">
                <FieldLabel
                  htmlFor="name"
                  className="text-sm font-bold text-accent"
                >
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  className="mt-1.5 focus:border-accent focus:ring-indigo-500"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                <FieldError
                  className="mt-1 text-xs text-rose-500"
                  errors={[errors.name]}
                />
              </Field>

              <Field className="p-4 shadow-lg md:col-span-2">
                <FieldLabel
                  htmlFor="description"
                  className="text-sm font-bold text-accent"
                >
                  Description
                </FieldLabel>
                <Input
                  id="description"
                  className="mt-1.5 focus:border-accent focus:ring-indigo-500"
                  aria-invalid={!!errors.description}
                  {...register("description")}
                />
                <FieldError
                  className="mt-1 text-xs text-rose-500"
                  errors={[errors.description]}
                />
              </Field>

              <Field className="p-4 shadow-lg">
                <FieldLabel
                  htmlFor="price"
                  className="text-sm font-bold text-accent"
                >
                  Price ($)
                </FieldLabel>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  className="mt-1.5 focus:border-accent focus:ring-indigo-500"
                  aria-invalid={!!errors.price}
                  {...register("price")}
                />
                <FieldError
                  className="mt-1 text-xs text-rose-500"
                  errors={[errors.price]}
                />
              </Field>

              <Field className="p-4 shadow-lg">
                <FieldLabel
                  htmlFor="stock"
                  className="text-sm font-bold text-accent"
                >
                  Stock
                </FieldLabel>
                <Input
                  id="stock"
                  type="number"
                  step="1"
                  className="mt-1.5 focus:border-accent focus:ring-indigo-500"
                  aria-invalid={!!errors.stock}
                  {...register("stock")}
                />
                <FieldError
                  className="mt-1 text-xs text-rose-500"
                  errors={[errors.stock]}
                />
              </Field>

              <Field className="p-4 shadow-lg md:col-span-2">
                <FieldLabel
                  htmlFor="category"
                  className="text-sm font-bold text-accent"
                >
                  Category
                </FieldLabel>
                <Input
                  id="category"
                  className="mt-1.5 focus:border-accent focus:ring-indigo-500"
                  aria-invalid={!!errors.category}
                  {...register("category")}
                />
                <FieldError
                  className="mt-1 text-xs text-rose-500"
                  errors={[errors.category]}
                />
              </Field>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-stretch pt-2 sm:mt-4 sm:justify-end sm:pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-text"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
