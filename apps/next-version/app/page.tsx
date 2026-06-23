import HeroBanner from "@/components/layout/HeroBanner";
import CategoryFilter from "@/components/products/CategoryFilter";
import ProductGrid from "@/components/products/ProductGrid";

import { Suspense } from "react";
interface PageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { search, category } = await searchParams;

  return (
    <main>
      <HeroBanner />
      <Suspense fallback={null}>
        <CategoryFilter />
      </Suspense>
      <ProductGrid search={search} category={category} />
    </main>
  );
}
