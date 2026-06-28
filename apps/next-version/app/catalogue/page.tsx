//catologue page - shows all products with filetering by category, price range
//and sorting options. Server Component - filters apolies directly in prisma query
//all filtering and sorting happens in the Prisma'
//the page re-renders automatically when URL search params change
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";
import { Category } from "@prisma/client";

//types
interface PageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low", value: "price_asc" },
  { label: "Price: High", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
];
//component
export default async function CataloguePage({ searchParams }: PageProps) {
  //await serchParams - required in Next.js 15 App Router
  //searchParams is bow a Promise, not a plain object
  const { category, sort, minPrice, maxPrice } = await searchParams;
  //build Prisma orderBy from sort param
  //we use an IIFE (immediately invoked function) to keep the logic clean
  //and avoid repeatin the variable name multiple times with if/else
  const orderBy = (() => {
    switch (sort) {
      //sort by price ascending - chepest first
      case "price_asc":
        return { price: "asc" as const };
      //sort most expensive first
      case "price_desc":
        return { price: "desc" as const };
      case "rating":
        return { rating: "desc" as const };
      case "reviews":
        return { reviews: "desc" as const };
      //default - newest product first
      default:
        return { createdAt: "desc" as const };
    }
  })();

  //fetch products from DB with all active filters
  //all filtering happens in a single Prisma query - no client side filtering
  //the spread operator (...) conditionally adds fields to the where object:
  //if category is undefined, no catefory filter is applied at all
  const products = await prisma.product.findMany({
    where: {
      // filter by category only if a category param is present in the URL
      ...(category && { category: category as Category }),

      // filter by price range only if at least one price param is present
      ...(minPrice || maxPrice
        ? {
            price: {
              // gte = "greater than or equal" — minimum price
              ...(minPrice ? { gte: parseFloat(minPrice) } : {}),
              // lte = "less than or equal" — maximum price
              ...(maxPrice ? { lte: parseFloat(maxPrice) } : {}),
            },
          }
        : {}),
    },
    // apply the sort order we built above
    orderBy,
  });
  return (
    <main>
      <Suspense fallback={null}>
        <CategoryFilter />
      </Suspense>

      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[20px] font-semibold text-slate-800">
              Catalogue
            </h1>
            <p className="text-[13px] text-slate-400 mt-0.5">
              {products.length} products
            </p>
          </div>

          <Suspense fallback={null}>
            <SortSelect current={sort} />
          </Suspense>
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-[15px] text-slate-400">No products found</p>
            <a
              href="/catalogue"
              className="text-[14px] text-blue-600 hover:underline"
            >
              Clear filters
            </a>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 3}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
import SortSelect from "@/components/products/SortSelect";
