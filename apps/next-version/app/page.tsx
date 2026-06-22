import HeroBanner from "@/components/layout/HeroBanner";
import ProductGrid from "@/components/products/ProductGrid";

import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main>
      <HeroBanner />
      <ProductGrid />
    </main>
  );
}
