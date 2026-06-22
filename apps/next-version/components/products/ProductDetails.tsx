//displays full product information on the product detail page
//image on the left, info on the right
"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/useCartSore";
//types
interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
}
interface ProductDetailsProps {
  product: Product;
}
//component
export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  //pull addItem action from Zustand cart store
  const addItem = useCartStore((state) => state.addItem);
  //add to cart with visual feedback
  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800
                   text-[14px] transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div
          className="relative w-full md:w-[420px] h-[320px] md:h-[420px]
                        rounded-xl overflow-hidden bg-blue-50 shrink-0"
        >
          {product.discount && (
            <span
              className="absolute top-3 left-3 z-10 bg-red-500 text-white
                             text-[12px] font-medium px-2 py-1 rounded"
            >
              -{product.discount}%
            </span>
          )}

          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
        </div>

        {/* ── Info section ── */}
        <div className="flex flex-col flex-1 gap-4">
          {/* Title */}
          <h1 className="text-[22px] font-semibold text-slate-800 leading-snug">
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(product.rating)
                      ? "fill-amber-400 stroke-amber-400"
                      : "stroke-slate-300 fill-slate-100"
                  }
                />
              ))}
            </div>
            <span className="text-[13px] font-medium text-slate-700">
              {product.rating}
            </span>
            <span className="text-[13px] text-slate-400">
              ·{" "}
              {new Intl.NumberFormat("en", { notation: "compact" }).format(
                product.reviews,
              )}{" "}
              reviews
            </span>
          </div>

          {/* Price section */}
          <div className="flex items-baseline gap-3">
            <span className="text-[28px] font-semibold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-[16px] text-slate-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-[14px] text-slate-500 leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-blue-50" />

          <div className="flex items-center gap-3">
            <Button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2
                         transition-all text-[14px] py-5
                         ${
                           added
                             ? "bg-green-500 hover:bg-green-500 text-white"
                             : "bg-blue-600 hover:bg-blue-500 text-white"
                         }`}
            >
              <ShoppingCart size={18} />
              {added ? "Added to cart!" : "Add to cart"}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-11 h-11 border-blue-100 hover:bg-blue-50"
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                size={18}
                className={
                  isWishlisted
                    ? "fill-red-500 stroke-red-500"
                    : "stroke-slate-400"
                }
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
