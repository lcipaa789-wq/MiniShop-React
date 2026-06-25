//admin products list page - shows all products in a table with edit and delete action
//server component - fetches products directly from database via Prisma
//Edit navigates to /admin/products/[id] , delete calls DELETE /api/admin/products/[id]
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

//component
export default async function AdminProductPage() {
  //fetch all products sorted by newest first
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[22px] font-semibold text-slate-800">Products</h1>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600
                     text-white text-[13px] font-medium rounded-lg
                     hover:bg-blue-500 transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Product
              </th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Category
              </th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Price
              </th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Rating
              </th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-10 h-10 rounded-lg overflow-hidden
                                    bg-slate-100 shrink-0"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>

                    <span className="text-[13px] font-medium text-slate-800 line-clamp-1">
                      {product.title}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-3">
                  <span
                    className="text-[11px] font-medium px-2 py-0.5
                                   rounded-full bg-blue-50 text-blue-600"
                  >
                    {product.category}
                  </span>
                </td>

                <td className="px-5 py-3 text-[13px] text-slate-800 font-medium">
                  ${product.price.toFixed(2)}
                </td>

                <td className="px-5 py-3 text-[13px] text-slate-600">
                  ⭐ {product.rating}
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-[12px] text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </Link>

                    <DeleteProductButton id={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
