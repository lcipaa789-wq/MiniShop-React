// components/layout/Navbar.jsx
//top navigation bar: logo, search, login, cart with badge
"use client";
import { User } from "lucide-react";

import { Button } from "../ui/button";

import Link from "next/link";
import CartDrawer from "../cart/CartDrawer";
import SearchBar from "./SearchBar";

export default function Navbar() {
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

      <SearchBar />

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
