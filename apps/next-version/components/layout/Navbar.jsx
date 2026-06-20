// components/layout/Navbar.jsx
"use client";

import { useCartStore } from "@/hooks/useCartSore";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  // subscribe to totalItems from Zustand store
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-blue-100 bg-white">
      <span className="text-[16px] font-medium text-slate-800">MiniShop</span>

      <div className="relative">
        <ShoppingCart size={22} className="text-slate-600" />

        {totalItems > 0 && (
          <span
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                           bg-blue-600 text-white text-[11px] font-medium
                           flex items-center justify-center"
          >
            {totalItems}
          </span>
        )}
      </div>
    </nav>
  );
}
