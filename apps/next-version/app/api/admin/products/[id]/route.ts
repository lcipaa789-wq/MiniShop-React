//admin API routes for a single product by ID
//PATCH /api/admin/products/[id] - update product fields
//DELETE /api/admin/products/[id] - delete product and its ORderItem
//both routes are porotected by isAdmin() - return 403 if not admin
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

//PATCH - update existing product
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  //verify admin role
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  //await params - required in Next.js 15 app Router
  const { id } = await params;
  const body = await request.json();
  //update the product - parse numeric fields from strings just like POST
  const product = await prisma.product.update({
    where: { id },
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
  return NextResponse.json(product);
}
//DELETE - remove a product and its related OrderItems
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  //verify admin role
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;

  //delete OrderItems first - they have foreign key reference to Product
  //if we delete the Product first, the DB throws a foreign key constraint error

  await prisma.orderItem.deleteMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
