// components/products/ProductGrid.tsx
import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import Link from "next/link";

interface ProductGridProps {
  search?: string;
  category?: string;
}

export default async function ProductGrid({
  search,
  category,
}: ProductGridProps) {
  const products = await prisma.product.findMany({
    where: {
      // filter by category if provided
      ...(category && { category: category as Category }),
      // filter by search if provided
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      {search && (
        <p className="text-[14px] text-slate-500">
          Found{" "}
          <span className="font-medium text-slate-800">{products.length}</span>
          results for &quot;{search}&quot;
        </p>
      )}

      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <p className="text-[16px] text-slate-400">No products found</p>
          <Link href="/" className="text-[14px] text-blue-600 hover:underline">
            Clear filters
          </Link>
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
  );
}
