//renders a grid of ProductCard components
//fetches products from /api/products and renders them in a responsive frid
//thit is a server components - no "use client" needed, fetch runs on the server

import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/lib/prisma";
//type
//matches the Prisma product model
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
//runs on the server - fetches products from our API route
//cache: "no-store" means always fresh data (no caching)

//component
export default async function ProductGrid() {
  //await the products - this runs on the server before the page renders
  const products: Product[] = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 p-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 3} // preload first 3 images for LCP performance
          />
        ))}
      </div>
    </>
  );
}
