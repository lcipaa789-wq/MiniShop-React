//display a single product inside the porduct grid
"use client"; //required ebecause we use useState (client-side interactivity)

import { useState } from "react";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartSore"; //Zustand store
import Link from "next/link";
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  //pull addItem action directly from the global cart store
  const addItem = useCartStore((state) => state.addItem);
  //add porduct to cart and show "Added!" feddback for 1.8s
  function handleAddToCart(e: React.MouseEvent) {
    //prevent Link navigation when clicking the cart button
    e.preventDefault();
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
    <Link href={`/products/${product.id}`} className="block">
      <div className="w-full rounded-xl border border-blue-100 bg-white overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
        <div className="relative bg-blue-50 h-48 overflow-hidden">
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            className="absolute top-1.5 right-1.5 w-8 h-8 rounded-full bg-white/80
                       border border-blue-100 hover:bg-white"
          >
            <Heart
              size={14}
              className={
                isWishlisted
                  ? "fill-red-500 stroke-red-500"
                  : "stroke-slate-400"
              }
            />
          </Button>
        </div>

        <div className="px-3 pt-3 pb-3 flex flex-col flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[16px] font-semibold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-[12px] text-slate-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-[13px] text-slate-600 leading-snug line-clamp-2 mb-2">
            {product.title}
          </p>

          <div className="flex items-center gap-1 mb-3">
            <Star size={12} className="fill-amber-400 stroke-amber-400" />
            <span className="text-[12px] font-medium text-slate-700">
              {product.rating}
            </span>
            <span className="text-[12px] text-slate-400">
              · {formatReviews(product.reviews)} reviews
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            className={`w-full flex items-center justify-center gap-2 mt-auto
                       transition-all text-[13px]
                       ${
                         added
                           ? "bg-green-500 hover:bg-green-500 text-white"
                           : "bg-blue-600 hover:bg-blue-500 text-white"
                       }`}
          >
            <ShoppingCart size={14} />
            {added ? "Added!" : "Add to cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
