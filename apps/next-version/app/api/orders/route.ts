//POST /api/orders - creates a new orderfrom the current cart
//GET /api/orders - returns all orders for the logged-in user
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
//GET fentch all orders for the current user
export async function GET() {
  //get current user session  - returns null if not logged in
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.sub }, //sub is the Auth0 user ID
      include: {
        items: true, //include all order items
      },
      orderBy: { createdAt: "desc" }, // newest orders first
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("[GET /api/orders]", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
//POST create a new order from cart items
export async function POST(request: Request) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { items, total } = body;

    //create order with all items in a single transaction
    //if any part fails, the entire order is rolled back
    const order = await prisma.order.create({
      data: {
        userId: session.user.sub,
        total,
        status: "PENDING",
        items: {
          create: items.map(
            (item: {
              id: string;
              title: string;
              image: string;
              price: number;
              quantity: number;
            }) => ({
              productId: item.id,
              title: item.title, // snapshot at time of purchase
              image: item.image, // snapshot
              price: item.price, // snapshot
              quantity: item.quantity,
            }),
          ),
        },
      },
      include: { items: true },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("[POST /api/orders]", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
