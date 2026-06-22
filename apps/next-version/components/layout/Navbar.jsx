// components/layout/Navbar.jsx
//top navigation bar: logo, search, login, cart with badge
"use client";

import { useCartStore } from "@/hooks/useCartSore";
import { Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import CartDrawer from "../cart/CartDrawer";

export default function Navbar() {
  //locat state for the search input value
  const [search, setSearch] = useState("");

  // subscribe to totalItems from Zustand store
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <nav
      className="sticky top-0 z-50 flex items-center gap-6 px-6 py-3
                     border-b border-blue-100 bg-white"
    >
      <Link
        href="/"
        className="text-[18px] font-semibold text-blue-600 whitespace-nowrap"
      >
        MiniShop
      </Link>

      <div className="relative flex-1 max-w-2xl">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="pl-10 bg-blue-50 border-blue-100 focus-visible:ring-blue-300"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-slate-600 hover:bg-blue-50"
        >
          <User size={18} />
          <span className="text-[14px] hidden sm:inline">Log in</span>
        </Button>

        <CartDrawer />
      </div>
    </nav>
  );
}
