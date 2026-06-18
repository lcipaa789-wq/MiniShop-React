/**
 * purpose:
 * return all products from database
 *
 * why:
 * the frontend needs a single source of truth for product data
 *
 * how it works:
 * 1.query all products using Prisma'
 * 2.return them as JSON
 * 3.handle unexpected server errors
 */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    //retrieve all products from database
    const products = await prisma.product.findMany();
    //return products as JSON
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
