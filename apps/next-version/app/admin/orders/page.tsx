// admin orders list — shows all orders across all users with ability to change status.
// server Component — fetches all orders from DB directly via Prisma.
// status changes are handled by OrderStatusSelect (client component).

import { prisma } from "@/lib/prisma";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

// dtatus badge color map
// maps each OrderStatus value to a Tailwind color pair for the badge.
// update this if new statuses are added to the Prisma enum.
const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

// component
export default async function AdminOrdersPage() {
  // fetch all orders with their items — include items to show item count per order
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" }, // newest orders first
  });

  return (
    <div className="p-8">
      <h1 className="text-[22px] font-semibold text-slate-800 mb-6">Orders</h1>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Order
              </th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Items
              </th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Total
              </th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Date
              </th>

              <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-[13px] font-medium text-slate-800">
                  #{order.id.slice(-6).toUpperCase()}
                </td>

                <td className="px-5 py-3 text-[13px] text-slate-600">
                  {order.items.length} items
                </td>

                <td className="px-5 py-3 text-[13px] font-medium text-slate-800">
                  ${order.total.toFixed(2)}
                </td>

                <td className="px-5 py-3 text-[13px] text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                <td className="px-5 py-3">
                  <OrderStatusSelect id={order.id} status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
