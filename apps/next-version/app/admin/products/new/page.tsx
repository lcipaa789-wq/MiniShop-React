//admin form to create a new product
//uses react-hook-form for form state management and zod for validation
//and validashion errors appear under each field in real time
"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//zod schema
//defines the shape and validation rules for the form
//zod automatically infers the TYpeScript type form the schema - no duplication
const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  image: z
    .string()
    .url("Must be a valid URL (e.g. https://images.unsplash.com/...)"),

  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Price must be a positive number",
    }),

  oldPrice: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Old price must be a positive number",
    }),

  discount: z.string().refine(
    (val) => {
      const n = parseInt(val);
      return !isNaN(n) && n >= 0 && n <= 100;
    },
    { message: "Discount must be between 0 and 100" },
  ),

  rating: z.string().refine(
    (val) => {
      const n = parseFloat(val);
      return !isNaN(n) && n >= 0 && n <= 5;
    },
    { message: "Rating must be between 0 and 5" },
  ),

  reviews: z
    .string()
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: "Reviews must be a positive number",
    }),
  category: z.enum(["ELECTRONICS", "CLOTHING", "HOME", "SPORTS", "BEAUTY"]),
});
//infer TypeScript type from the zod schema
//this means we only define the shape once - zod handles both calidation and types
type ProductFormData = z.infer<typeof productSchema>;
const categories = [
  "ELECTRONICS",
  "CLOTHING",
  "HOME",
  "SPORTS",
  "BEAUTY",
] as const;

//components
export default function NewProductPage() {
  const router = useRouter();
  //initialize react-hook-form with zod resolver -
  //zodResolver connects the zod schema to react-hook-form validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
  //called by handleSubmit only if all validations pass -
  //data is already typed and validated at this point
  async function onSubmit(data: ProductFormData) {
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/products");
    router.refresh();
  }
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-[22px] font-semibold text-slate-800 mb-6">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-slate-700">
            Title
          </label>

          <Input {...register("title")} placeholder="Wireless Headphones" />

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
            placeholder="Describe the product..."
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
          <Input
            {...register("image")}
            placeholder="https://images.unsplash.com/..."
          />
          {errors.image && (
            <p className="text-[12px] text-red-500">{errors.image.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Price ($)
            </label>
            <Input {...register("price")} placeholder="99.99" />
            {errors.price && (
              <p className="text-[12px] text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Old Price ($)
            </label>
            <Input {...register("oldPrice")} placeholder="149.99" />
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
            <Input {...register("discount")} placeholder="33" />
            {errors.discount && (
              <p className="text-[12px] text-red-500">
                {errors.discount.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Rating (0-5)
            </label>
            <Input {...register("rating")} placeholder="4.9" />
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
            <Input {...register("reviews")} placeholder="301" />
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
          {errors.category && (
            <p className="text-[12px] text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            {isSubmitting ? "Saving..." : "Add Product"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
