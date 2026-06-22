//sliding cart drawer - opens fron the right when the cart icon is clicked
//uses shadcn Sheet component for the slide-in abunatuib
"use client";
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

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());
  return (
    <Sheet>
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

      <SheetContent className="flex flex-col w-full sm:max-w-md border-blue-100">
        {/* Header */}
        <SheetHeader className="border-b border-blue-50 pb-4">
          <SheetTitle className="text-[16px] font-semibold text-slate-800">
            Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <ShoppingCart size={40} className="text-blue-200" />
              <p className="text-[14px] text-slate-400">Your cart is empty</p>
            </div>
          ) : (
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

            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
