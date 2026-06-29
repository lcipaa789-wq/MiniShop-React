//slide-in side menu - opens from the left when the hamburger button is clicked
"use client";
import { menuItems } from "@/components/lucide-icons/menuItems";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { LogIn, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
//types
interface SideMenuProps {
  user?: {
    name?: string | null;
    picture?: string | null;
    email?: string | null;
  } | null;
}
export default function SideMenu({ user }: SideMenuProps) {
  //controls whether the Sheet is open
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="text-white hover:bg-white/10 hover:text-white"
        >
          <Menu size={22} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[280px] p-0 flex flex-col border-r border-blue-100"
      >
        <SheetHeader className="bg-[#2563EB] px-5 pt-6 pb-5 text-left">
          <SheetTitle className="text-white text-[20px] font-bold">
            MiniShop
          </SheetTitle>

          {user ? (
            <div className="flex items-center gap-3 mt-3">
              {user.picture && (
                <Image
                  src={user.picture}
                  alt={user.name ?? "User"}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white/30"
                />
              )}
              <div>
                <p className="text-white text-[14px] font-medium">
                  {user.name}
                </p>
                <p className="text-blue-200 text-[12px]">{user.email}</p>
              </div>
            </div>
          ) : (
            // Not logged in — show login prompt
            <p className="text-blue-200 text-[13px] mt-2">
              Sign in to view your orders
            </p>
          )}
        </SheetHeader>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg
                           text-slate-700 hover:bg-blue-50 hover:text-blue-600
                           transition-colors text-[14px] font-medium"
              >
                <span className="text-slate-400 group-hover:text-blue-500">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 my-4" />

          {user ? (
            <a
              href="/auth/logout"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              Log Out
            </a>
          ) : (
            <a
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <LogIn size={18} />
              Log In
            </a>
          )}
        </nav>

        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">
            © 2026 MiniShop. All rights reserved.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
