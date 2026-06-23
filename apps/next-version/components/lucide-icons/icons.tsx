import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";

export const statusConfig: Record<
  string,
  {
    label: string;
    color: string;
    bgColor: string;
    icon: React.ReactNode;
    step: number; // current step in timeline (1-4)
  }
> = {
  PENDING: {
    label: "Pending",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    icon: <Clock size={13} />,
    step: 1,
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    icon: <Package size={13} />,
    step: 2,
  },
  SHIPPED: {
    label: "Shipped",
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
    icon: <Truck size={13} />,
    step: 3,
  },
  DELIVERED: {
    label: "Delivered",
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    icon: <CheckCircle size={13} />,
    step: 4,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
    icon: <XCircle size={13} />,
    step: 0,
  },
};

// ── Timeline steps ─────────────────────────────────────────────────────────────
export const timelineSteps = [
  { label: "Placed", icon: <Clock size={14} /> },
  { label: "Confirmed", icon: <Package size={14} /> },
  { label: "Shipped", icon: <Truck size={14} /> },
  { label: "Delivered", icon: <CheckCircle size={14} /> },
];
