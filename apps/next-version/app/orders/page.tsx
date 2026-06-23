//order page - shows all past orders for the logged-in users
//redirects to login if not authenticated

import { redirect } from "next/navigation";
import { statusConfig, timelineSteps } from "@/components/lucide-icons/icons";

import { ShoppingBag } from "lucide-react";
import { auth0 } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function OrdersPage() {
  //get current user session - redirect to login if not authenticated
  const session = await auth0.getSession();
  if (!session) redirect("auth/login");
  //fetch all orders for this user directly fro, DB via Prisma'
  const orders = await prisma.order.findMany({
    where: { userId: session.user.sub },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[24px] font-semibold text-slate-800">
            My Orders
          </h1>
          <p className="text-[14px] text-slate-400 mt-0.5">
            {orders.length} {orders.length === 1 ? "order" : "orders"} total
          </p>
        </div>
        <Link
          href="/"
          className="text-[13px] text-blue-600 hover:underline font-medium"
        >
          Continue shopping →
        </Link>
      </div>

      {orders.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-24 gap-4 text-center
                        border border-blue-100 rounded-2xl bg-blue-50/30"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <ShoppingBag size={28} className="text-blue-400" />
          </div>
          <div>
            <p className="text-[16px] font-medium text-slate-700">
              No orders yet
            </p>
            <p className="text-[14px] text-slate-400 mt-1">
              When you place an order, it will appear here
            </p>
          </div>
          <Link
            href="/"
            className="mt-2 px-5 py-2 bg-blue-600 text-white text-[14px]
                       font-medium rounded-lg hover:bg-blue-500 transition-colors"
          >
            Start shopping
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {orders.map((order) => {
          const status = statusConfig[order.status];
          const isCancelled = order.status === "CANCELLED";

          return (
            <div
              key={order.id}
              className="border border-blue-100 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <div className="px-5 py-4 border-b border-blue-50 flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-slate-800">
                      Order #{order.id.slice(-8).toUpperCase()}
                    </span>

                    <span
                      className={`flex items-center gap-1 text-[11px] font-medium
                                     px-2 py-0.5 rounded-full border
                                     ${status.color} ${status.bgColor}`}
                    >
                      {status.icon}
                      {status.label}
                    </span>
                  </div>
                  <span className="text-[12px] text-slate-400">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-[12px] text-slate-400">Total</p>
                  <p className="text-[16px] font-semibold text-slate-800">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* ── Status timeline — hidden for cancelled orders ── */}
              {!isCancelled && (
                <div className="px-5 py-4 border-b border-blue-50 bg-slate-50/50">
                  <div className="flex items-center justify-between relative">
                    {/* Progress line behind the dots */}
                    <div className="absolute left-0 right-0 top-[14px] h-[2px] bg-blue-100 mx-6" />
                    <div
                      className="absolute left-0 top-[14px] h-[2px] bg-blue-500 mx-6 transition-all"
                      style={{
                        width: `${((status.step - 1) / 3) * 100}%`,
                      }}
                    />

                    {timelineSteps.map((step, index) => {
                      const stepNum = index + 1;
                      const isCompleted = status.step >= stepNum;
                      const isCurrent = status.step === stepNum;

                      return (
                        <div
                          key={step.label}
                          className="flex flex-col items-center gap-1.5 z-10"
                        >
                          {/* Step dot */}
                          <div
                            className={`w-7 h-7 rounded-full flex items-center
                                          justify-center border-2 transition-all
                                          ${
                                            isCompleted
                                              ? "bg-blue-600 border-blue-600 text-white"
                                              : "bg-white border-blue-200 text-slate-400"
                                          }
                                          ${isCurrent ? "ring-4 ring-blue-100" : ""}`}
                          >
                            {step.icon}
                          </div>

                          <span
                            className={`text-[11px] font-medium
                                           ${isCompleted ? "text-blue-600" : "text-slate-400"}`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="px-5 py-4 flex flex-col gap-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div
                      className="relative w-14 h-14 rounded-xl overflow-hidden
                                    bg-blue-50 shrink-0 border border-blue-100"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 items-center justify-between min-w-0">
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-slate-800 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-[12px] text-slate-400 mt-0.5">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-[14px] font-semibold text-slate-800 ml-4 shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="px-5 py-3 bg-slate-50/50 border-t border-blue-50
                              flex items-center justify-between"
              >
                <span className="text-[12px] text-slate-400">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] text-slate-500">
                    Order total:
                  </span>
                  <span className="text-[14px] font-semibold text-slate-800">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
