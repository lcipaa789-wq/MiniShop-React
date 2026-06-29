// Admin edit product page — pre-fills the form with existing product data.
// Uses react-hook-form + zod validation, same as the new product form.
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// validation schema — same as new product form
const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Must be a valid URL"),
  price: z
    .string()
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, {
      message: "Must be a positive number",
    }),
  oldPrice: z
    .string()
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, {
      message: "Must be a positive number",
    }),
  discount: z.string().refine(
    (v) => {
      const n = parseInt(v);
      return !isNaN(n) && n >= 0 && n <= 100;
    },
    { message: "Must be 0-100" },
  ),
  rating: z.string().refine(
    (v) => {
      const n = parseFloat(v);
      return !isNaN(n) && n >= 0 && n <= 5;
    },
    { message: "Must be 0-5" },
  ),
  reviews: z
    .string()
    .refine((v) => !isNaN(parseInt(v)) && parseInt(v) >= 0, {
      message: "Must be positive",
    }),
  category: z.enum(["ELECTRONICS", "CLOTHING", "HOME", "SPORTS", "BEAUTY"]),
});

type ProductFormData = z.infer<typeof productSchema>;

const categories = [
  "ELECTRONICS",
  "CLOTHING",
  "HOME",
  "SPORTS",
  "BEAUTY",
] as const;

//components
export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  //fetch existing product data and pre-fill the form
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/admin/products/${id}`);
      const product = await res.json();

      //pre-fill form with existing values — convert numbers to strings
      //because react-hook-form uses string inputs
      reset({
        title: product.title,
        description: product.description,
        image: product.image,
        price: product.price.toString(),
        oldPrice: product.oldPrice.toString(),
        discount: product.discount.toString(),
        rating: product.rating.toString(),
        reviews: product.reviews.toString(),
        category: product.category,
      });
      setFetching(false);
    }
    fetchProduct();
  }, [id, reset]);

  //submit — calls PATCH /api/admin/products/[id]
  async function onSubmit(data: ProductFormData) {
    setLoading(true);
    await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/products");
    router.refresh();
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-[22px] font-semibold text-slate-800 mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-slate-700">
            Title
          </label>
          <Input {...register("title")} />
          {errors.title && (
            <p className="text-[12px] text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-slate-700">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="border border-slate-200 rounded-lg px-3 py-2 text-[14px]
                       resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.description && (
            <p className="text-[12px] text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-slate-700">
            Image URL
          </label>
          <Input {...register("image")} />
          {errors.image && (
            <p className="text-[12px] text-red-500">{errors.image.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Price ($)
            </label>
            <Input {...register("price")} />
            {errors.price && (
              <p className="text-[12px] text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Old Price ($)
            </label>
            <Input {...register("oldPrice")} />
            {errors.oldPrice && (
              <p className="text-[12px] text-red-500">
                {errors.oldPrice.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Discount (%)
            </label>
            <Input {...register("discount")} />
            {errors.discount && (
              <p className="text-[12px] text-red-500">
                {errors.discount.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Rating
            </label>
            <Input {...register("rating")} />
            {errors.rating && (
              <p className="text-[12px] text-red-500">
                {errors.rating.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Reviews
            </label>
            <Input {...register("reviews")} />
            {errors.reviews && (
              <p className="text-[12px] text-red-500">
                {errors.reviews.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-slate-700">
            Category
          </label>
          <select
            {...register("category")}
            className="border border-slate-200 rounded-lg px-3 py-2 text-[14px]
                       focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            {isSubmitting || loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
