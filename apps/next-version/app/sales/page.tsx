// sales page — shows only products with a discount >= 20%.
// products sorted by discount percentage (highest first).
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import { Tag } from "lucide-react";

export default async function SalesPage() {
  // fetch only discounted products — sorted by biggest discount first
  const products = await prisma.product.findMany({
    where: { discount: { gte: 20 } },
    orderBy: { discount: "desc" },
  });

  return (
    <main className="px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
          <Tag size={20} className="text-red-500" />
        </div>
        <div>
          <h1 className="text-[20px] font-semibold text-slate-800">Sales</h1>
          <p className="text-[13px] text-slate-400">
            {products.length} items on sale
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
        {[
          { label: "All deals", min: 20 },
          { label: "20%+ off", min: 20 },
          { label: "25%+ off", min: 25 },
          { label: "30%+ off", min: 30 },
        ].map((pill) => (
          <span
            key={pill.label}
            className="px-3 py-1.5 rounded-full text-[13px] font-medium
                       bg-red-50 text-red-600 whitespace-nowrap border border-red-100"
          >
            {pill.label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 3}
          />
        ))}
      </div>
    </main>
  );
}
