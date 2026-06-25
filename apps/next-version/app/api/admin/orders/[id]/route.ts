// Admin API route to update a single order's status.
// PATCH /api/admin/orders/[id] — accepts { status: OrderStatus } in the request body.
// Protected by isAdmin() — returns 403 if the user doesn't have the admin role.

import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

// ── PATCH — update order status ────────────────────────────────────────────────
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // Verify admin role on every request — never trust the client
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  // Extract the new status from the request body
  const { status } = await request.json();

  // Update only the status field — leave all other order fields unchanged
  const order = await prisma.order.update({
    where: { id },
    data: { status: status as OrderStatus },
  });

  return NextResponse.json(order);
}
