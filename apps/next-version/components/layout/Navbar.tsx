// components/layout/Navbar.jsx
//top navigation bar: logo, search, login, cart with badge
"use client";
import { User as UserIcon } from "lucide-react";

import { Button } from "../ui/button";

import Link from "next/link";
import CartDrawer from "../cart/CartDrawer";
import SearchBar from "./SearchBar";
import Image from "next/image";
import SideMenu from "./SideMenu";

interface NavbarUser {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  sub?: string;
}
interface NavbarProps {
  user?: NavbarUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3
                     bg-[#2563EB] border-b border-blue-700"
    >
      <SideMenu user={user} />

      <Link
        href="/"
        className="text-[18px] font-bold text-white whitespace-nowrap mr-2"
      >
        MiniShop
      </Link>

      <SearchBar />

      <div className="flex items-center gap-1 ml-auto">
        {user ? (
          <div className="flex items-center gap-2">
            {/* Avatar */}
            {user?.picture && (
              <Image
                src={user.picture}
                alt={user?.name ?? "User"}
                width={32}
                height={32}
                className=" rounded-full border-2 border-white/30"
              />
            )}

            {/* Logout */}
            <a href="/auth/logout">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white text-[13px]"
              >
                Log out
              </Button>
            </a>
          </div>
        ) : (
          <a href="/auth/login">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-white hover:bg-white/10 hover:text-white"
            >
              <UserIcon size={18} />
              <span className="text-[14px] hidden sm:inline">Log in</span>
            </Button>
          </a>
        )}

        {/* Cart drawer */}
        <CartDrawer />
      </div>
    </nav>
  );
}
