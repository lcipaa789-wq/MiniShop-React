// Top Sales page — shows most popular products sorted by review count.
// also highlights the top 3 products with a special badge.
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import { TrendingUp } from "lucide-react";

export default async function TopSalesPage() {
  // sort by reviews count — most reviewed = most popular
  const products = await prisma.product.findMany({
    orderBy: { reviews: "desc" },
  });

  return (
    <main className="px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
          <TrendingUp size={20} className="text-amber-500" />
        </div>
        <div>
          <h1 className="text-[20px] font-semibold text-slate-800">
            Top Sales
          </h1>
          <p className="text-[13px] text-slate-400">Most popular products</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {products.slice(0, 3).map((product, index) => (
          <div key={product.id} className="relative">
            <div
              className={`absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full
                            flex items-center justify-center text-[12px] font-bold
                            ${
                              index === 0
                                ? "bg-amber-400 text-white"
                                : index === 1
                                  ? "bg-slate-300 text-slate-700"
                                  : "bg-amber-700 text-white"
                            }`}
            >
              #{index + 1}
            </div>
            <ProductCard product={product} priority={true} />
          </div>
        ))}
      </div>

      <h2 className="text-[15px] font-medium text-slate-600 mb-3">
        More popular items
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {products.slice(3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
