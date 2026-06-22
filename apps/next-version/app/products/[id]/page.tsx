//dynamic product detail page - renders based on the poruduct ID in the URL
//this is a serveer component - fetches product directly from DB via PRIsma
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetails from "@/components/products/ProductDetails";
//types
interface PageProps {
  params: Promise<{ id: string }>;
}
//component
export default async function ProductPage({ params }: PageProps) {
  //await params - required in Next.js 15 app router
  const { id } = await params;
  //fetch the product by id derectlly from NEON via Prisma
  const product = await prisma.product.findUnique({
    where: { id },
  });
  //if not found - show Next.js 404 page
  if (!product) return notFound();
  return (
    <>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </main>
    </>
  );
}
