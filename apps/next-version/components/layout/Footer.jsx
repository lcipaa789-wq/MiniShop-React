// components/layout/Footer.tsx
// Site footer — blue background matching the navbar.
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2563EB] border-t border-blue-700 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-white" />
              <span className="text-white text-[18px] font-bold">MiniShop</span>
            </div>
            <p className="text-blue-200 text-[13px] max-w-[200px] leading-relaxed">
              Your favourite online store for quality products.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <p className="text-white text-[13px] font-semibold mb-1">Shop</p>
              <Link
                href="/"
                className="text-blue-200 text-[13px] hover:text-white transition-colors"
              >
                Catalog
              </Link>
              <Link
                href="/?sort=top"
                className="text-blue-200 text-[13px] hover:text-white transition-colors"
              >
                Top Sales
              </Link>
              <Link
                href="/?discount=true"
                className="text-blue-200 text-[13px] hover:text-white transition-colors"
              >
                Sales
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-white text-[13px] font-semibold mb-1">
                Account
              </p>
              <Link
                href="/orders"
                className="text-blue-200 text-[13px] hover:text-white transition-colors"
              >
                My Orders
              </Link>
              <Link
                href="/profile"
                className="text-blue-200 text-[13px] hover:text-white transition-colors"
              >
                Profile
              </Link>
              <Link
                href="/help"
                className="text-blue-200 text-[13px] hover:text-white transition-colors"
              >
                Help
              </Link>
            </div>
          </div>
        </div>

        <div
          className="border-t border-blue-500 mt-8 pt-5 flex flex-col sm:flex-row
                        items-center justify-between gap-2"
        >
          <p className="text-blue-200 text-[12px]">
            © 2026 MiniShop. All rights reserved.
          </p>
          <p className="text-blue-300 text-[12px]">
            Built with Next.js · Prisma · Auth0
          </p>
        </div>
      </div>
    </footer>
  );
}
