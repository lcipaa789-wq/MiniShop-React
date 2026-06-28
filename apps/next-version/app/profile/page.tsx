// User profile page — shows Auth0 user info and order statistics.
// redirects to login if not authenticated.
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth0 } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ShoppingBag, Star, Package } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login");

  const user = session.user;

  // fetch user's order stats
  const orders = await prisma.order.findMany({
    where: { userId: user.sub },
    include: { items: true },
  });

  //  stats
  const totalSpent = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.total, 0);

  const totalItems = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0,
  );

  const stats = [
    {
      label: "Orders",
      value: orders.length,
      icon: <ShoppingBag size={18} className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Items bought",
      value: totalItems,
      icon: <Package size={18} className="text-purple-500" />,
      bg: "bg-purple-50",
    },
    {
      label: "Total spent",
      value: `$${totalSpent.toFixed(2)}`,
      icon: <Star size={18} className="text-amber-500" />,
      bg: "bg-amber-50",
    },
  ];

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div
        className="bg-white rounded-2xl border border-blue-100 p-6 mb-6
                      flex items-center gap-5"
      >
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name ?? "User"}
            className="w-20 h-20 rounded-full border-4 border-blue-100 shrink-0"
          />
        )}

        <div className="flex flex-col gap-1">
          <h1 className="text-[20px] font-semibold text-slate-800">
            {user.name}
          </h1>
          <p className="text-[14px] text-slate-500">{user.email}</p>
          <span
            className="text-[12px] text-blue-600 bg-blue-50 px-2 py-0.5
                           rounded-full w-fit mt-1"
          >
            Member
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-blue-100 p-4
                       flex flex-col gap-2"
          >
            <div
              className={`w-8 h-8 rounded-lg ${stat.bg}
                            flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <p className="text-[18px] font-bold text-slate-800">{stat.value}</p>
            <p className="text-[12px] text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
        <div
          className="px-5 py-4 border-b border-blue-50 flex items-center
                        justify-between"
        >
          <h2 className="text-[15px] font-semibold text-slate-800">
            Recent Orders
          </h2>
          <Link
            href="/orders"
            className="text-[13px] text-blue-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-[14px] text-slate-400">No orders yet</p>
          </div>
        ) : (
          <div className="divide-y divide-blue-50">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="px-5 py-4 flex items-center
                                             justify-between"
              >
                <div>
                  <p className="text-[13px] font-medium text-slate-800">
                    #{order.id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-[12px] text-slate-400">
                    {order.items.length} items ·{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-semibold text-slate-800">
                    ${order.total.toFixed(2)}
                  </p>
                  <span
                    className="text-[11px] text-amber-600 bg-amber-50
                                   px-2 py-0.5 rounded-full"
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
