// GET /api/products — returns all products from the database.
// Supports optional search query: /api/products?search=keyboard
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  // Extract search query from URL params (e.g. ?search=keyboard)
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";

  try {
    const products = await prisma.product.findMany({
      // If search is provided, filter by title or description (case-insensitive)
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      // Newest products first
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
