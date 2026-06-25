//display a single product inside the porduct grid
"use client"; //required ebecause we use useState (client-side interactivity)

import { useState } from "react";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartSore"; //Zustand store
import Link from "next/link";
import { useRouter } from "next/navigation";
interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    oldPrice: number;
    discount: number;
    rating: number;
    reviews: number;
  };
  priority?: boolean;
}
export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  //pull addItem action directly from the global cart store
  const addItem = useCartStore((state) => state.addItem);
  //navigate to product detal page on card click
  function handleCardClick() {
    router.push(`products/${product.id}`);
  }

  // Toggle wishlist — stopPropagation prevents card navigation
  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  }
  //add porduct to cart and show "Added!" feddback for 1.8s
  function handleAddToCart(e: React.MouseEvent) {
    //prevent Link navigation when clicking the cart button

    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }
  //formal large review counts(185129 -> 185k)
  function formatReviews(count: number): string {
    return new Intl.NumberFormat("en", { notation: "compact" }).format(count);
  }
  return (
    // Link wraps entire card — clicking navigates to product detail page
    <div
      onClick={handleCardClick}
      className="w-full rounded-2xl border border-slate-100 bg-white overflow-hidden
                 flex flex-col group cursor-pointer
                 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="relative bg-slate-50 h-44 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.discount && (
          <span
            className="absolute top-2 left-2 bg-red-500 text-white text-[11px]
                             font-medium px-1.5 py-0.5 rounded"
          >
            -{product.discount}%
          </span>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-sm
                       border-0 hover:bg-white-50"
        >
          <Heart
            size={14}
            className={
              isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-slate-400"
            }
          />
        </Button>
      </div>

      <div className="px-3 pt-3 pb-3 flex flex-col flex-1">
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[15px] font-semibold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-slate-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-[12px] text-slate-600 leading-snug line-clamp-2 mb-2">
          {product.title}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <Star size={12} className="fill-amber-400 stroke-amber-400" />
          <span className="text-[11px] font-medium text-slate-700">
            {product.rating}
          </span>
          <span className="text-[12px] text-slate-400">
            · {formatReviews(product.reviews)} reviews
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          size="sm"
          className={`w-full flex items-center justify-center gap-1.5 mt-auto
                       transition-all text-[13px]
                       ${
                         added
                           ? "bg-green-500 hover:bg-green-500 text-white"
                           : "bg-blue-600 hover:bg-blue-500 text-white"
                       }`}
        >
          <ShoppingCart size={13} />
          {added ? "Added!" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
