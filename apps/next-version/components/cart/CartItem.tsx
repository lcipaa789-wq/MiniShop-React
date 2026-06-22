//displays a single item inside the cart drawer
"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/useCartSore";
//types
interface CartItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
  };
}
export default function CartItem({ item }: CartItemProps) {
  //pull actons from Zustand cart store
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  return (
    <div className="flex gap-3 py-4 border-b border-blue-50 last:border-0">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-blue-50 shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 gap-1">
        <p className="text-[13px] font-medium text-slate-800 line-clamp-2 leading-snug">
          {item.title}
        </p>

        <p className="text-[13px] font-semibold text-blue-600">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {/* Quantity controls — minus, count, plus */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 rounded-md border-blue-100 hover:bg-blue-50"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </Button>

            <span className="w-6 text-center text-[13px] font-medium text-slate-700">
              {item.quantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 rounded-md border-blue-100 hover:bg-blue-50"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            className="w-7 h-7 text-slate-400 hover:text-red-500 hover:bg-red-50"
            aria-label="Remove item"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
