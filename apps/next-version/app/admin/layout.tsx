//protects all /admin routes -redirects to home if user is not admin
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //check if current user has admin role - redirect if not
  const admin = await isAdmin();
  if (!admin) redirect("/");
  return (
    <div className="flex min-h-screen">
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-slate-900 text-white flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-700">
          <p className="text-[15px] font-bold text-white">MiniShop</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Admin Panel</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg
                       text-[13px] text-slate-300 hover:bg-slate-800
                       hover:text-white transition-colors"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg
                       text-[13px] text-slate-300 hover:bg-slate-800
                       hover:text-white transition-colors"
          >
            <Package size={16} />
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg
                       text-[13px] text-slate-300 hover:bg-slate-800
                       hover:text-white transition-colors"
          >
            <ShoppingBag size={16} />
            Orders
          </Link>
        </nav>

        {/* Back to store */}
        <div className="px-3 py-4 border-t border-slate-700">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg
                       text-[13px] text-slate-400 hover:text-white
                       hover:bg-slate-800 transition-colors"
          >
            ← Back to store
          </Link>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 bg-slate-50 overflow-auto">{children}</main>
    </div>
  );
}
