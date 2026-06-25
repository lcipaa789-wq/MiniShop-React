// client component — inline dropdown to change an order's status directly from the table.
// calls PATCH /api/admin/orders/[id] with the new status value.
// after a successful update, calls router.refresh() to re-fetch the orders list
// without a full page reload — same pattern as DeleteProductButton.
"use client";

import { useRouter } from "next/navigation";

//all possible order statuses — must match the OrderStatus enum in schema.prisma
const statuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

// status color map — applied to the select element itself for visual clarity ──
const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

interface OrderStatusSelectProps {
  id: string; // order ID — used in the PATCH request URL
  status: string; // current order status — sets the initial selected value
}

//component
export default function OrderStatusSelect({
  id,
  status,
}: OrderStatusSelectProps) {
  const router = useRouter();

  // called whenever the admin selects a new status from the dropdown.
  // sends PATCH request immediately — no save button needed for quick workflow.
  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: e.target.value }),
    });

    // refresh the page data to reflect the new status in the table
    router.refresh();
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      // apply color based on current status — updates visually when changed
      className={`text-[12px] font-medium px-2 py-1 rounded-full
                 border-0 cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-blue-300
                 ${statusColors[status]}`}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
