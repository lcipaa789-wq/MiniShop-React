//admin Api route for porduct creation
//POST /api/admin/products - creates a new product in the database
//Protected by isAdmin() - return 403 if the user doesnt gave the admin role
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
//POST - create a new porduct
export async function POST(request: Request) {
  //verify amdin role before proceeding - security check on every request
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  //parse numeric fields - from sends all values as strings
  //so we conver them to the correct types before saving to DB
  const product = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      image: body.image,
      price: parseFloat(body.price),
      oldPrice: parseFloat(body.oldPrice),
      discount: parseInt(body.discount),
      rating: parseFloat(body.rating),
      reviews: parseInt(body.reviews),
      category: body.category as Category,
    },
  });
  //201 created - standard HTTP status for successful resource creation
  return NextResponse.json(product, { status: 201 });
}
