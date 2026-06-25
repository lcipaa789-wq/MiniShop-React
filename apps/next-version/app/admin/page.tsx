//admin dashboard - shows key stats: products, orders, revenue
import { prisma } from "@/lib/prisma";
import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  //fetch data
  const [productCount, orderCount, orders] = await Promise.all([
    prisma.product.count(), //total number of products
    prisma.order.count(), //total number of orders
    prisma.order.findMany({
      //all orders for revenue calc
      select: { total: true, status: true },
    }),
  ]);
  //calculate total revenue - exclude cancelled orders since they werent paid
  const revenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.total, 0);
  //count orders that still need to be processed
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  //stat card definitions
  //each stat has a label, computed value, icon, and background color
  const stats = [
    {
      label: "Total Products",
      value: productCount,
      icon: <Package size={20} className="text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Total Orders",
      value: orderCount,
      icon: <ShoppingBag size={20} className="text-purple-600" />,
      bg: "bg-purple-50",
    },
    {
      label: "Revenue",
      // toFixed(2) ensures format like $1,234.56 instead of $1234.5678
      value: `$${revenue.toFixed(2)}`,
      icon: <DollarSign size={20} className="text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: <TrendingUp size={20} className="text-amber-600" />,
      bg: "bg-amber-50",
    },
  ];
  return (
    <div className="p-8">
      <h1 className="text-[22px] font-semibold text-slate-800 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3"
          >
            <div
              className={`w-10 h-10 rounded-lg ${stat.bg}
                            flex items-center justify-center`}
            >
              {stat.icon}
            </div>

            <div>
              <p className="text-[24px] font-bold text-slate-800">
                {stat.value}
              </p>

              <p className="text-[13px] text-slate-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-[15px] font-semibold text-slate-800">
            Recent Orders
          </h2>
        </div>

        <RecentOrders />
      </div>
    </div>
  );
}

//recents orders
//separate async Server Component for the recent orders table
//fetches its own data - decoupled from the parent dashboard component
async function RecentOrders() {
  //fetch only the 5 most recent orders - "take: 5" is the limit in SQL
  const orders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }, //newest first
    include: { items: true }, //inlude items to show item count
  });
  return (
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
            Status
          </th>
          <th className="px-5 py-3 text-[12px] font-medium text-slate-500">
            Date
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
              {order.items.length}
            </td>

            <td className="px-5 py-3 text-[13px] text-slate-800 font-medium">
              ${order.total.toFixed(2)}
            </td>

            <td className="px-5 py-3">
              <span
                className="text-[11px] font-medium px-2 py-0.5
                               rounded-full bg-amber-100 text-amber-700"
              >
                {order.status}
              </span>
            </td>

            <td className="px-5 py-3 text-[13px] text-slate-500">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
