//sliding cart drawer - opens fron the right when the cart icon is clicked
//uses shadcn Sheet component for the slide-in abunatuib
"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/hooks/useCartSore";
import CartItem from "@/components/cart/CartItem";
import { useState } from "react";

export default function CartDrawer() {
  const router = useRouter();
  //states from Zustand store
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const [open, setOpen] = useState(false);
  //checkout handler
  //sends cart items to POST /api/orders, clears cart on success
  //redirects to /orders page. if user not logged in - redirects to login
  async function handleCheckout() {
    // check if logged in — redirect to login if not
    const res = await fetch("/api/orders", { method: "GET" });
    if (res.status === 401) {
      setOpen(false);
      router.push("/auth/login");
      return;
    }
    setOpen(false);
    // navigate to checkout page — Stripe form is there

    router.push("/checkout");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Shopping cart"
          className="relative hover:bg-blue-50"
        >
          <ShoppingCart size={20} className="text-slate-600" />

          {totalItems > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full
                             bg-blue-600 text-white text-[11px] font-medium
                             flex items-center justify-center"
            >
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      {/* ── Drawer content — slides in from the right ── */}
      <SheetContent className="flex flex-col w-full sm:max-w-md border-blue-100">
        {/* Header */}
        <SheetHeader className="border-b border-blue-50 pb-4">
          <SheetTitle className="text-[16px] font-semibold text-slate-800">
            Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        {/* ── Cart items list — scrollable if many items ── */}
        <div className="flex-1 overflow-y-auto py-2">
          {items.length === 0 ? (
            // Empty cart state
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <ShoppingCart size={40} className="text-blue-200" />
              <p className="text-[14px] text-slate-400">Your cart is empty</p>
            </div>
          ) : (
            // Render each cart item via CartItem component
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-blue-50 pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-slate-500">Total</span>
              <span className="text-[18px] font-semibold text-slate-800">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
