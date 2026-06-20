//renders a grid of ProductCard components
"use client";
import ProductCard from "./ProductCard";
//temporary
import { mockProducts } from "@/temporary/mockProducts";

export default function ProductGrid() {
  //temporary
  function handleAddToCart(id: string) {
    console.log("Added to cart:", id);
  }
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 p-4">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
