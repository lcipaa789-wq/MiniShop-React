// Success page — shown after successful payment.
// Links to orders page so user can track their order.
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-16 text-center">
      <div
        className="w-20 h-20 rounded-full bg-green-50 flex items-center
                      justify-center mx-auto mb-6"
      >
        <CheckCircle size={40} className="text-green-500" />
      </div>

      <h1 className="text-[24px] font-semibold text-slate-800 mb-2">
        Payment Successful!
      </h1>
      <p className="text-[15px] text-slate-500 mb-8">
        Thank you for your order. We will send you a confirmation email shortly.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          href="/orders"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white
                     font-medium rounded-xl transition-colors text-center"
        >
          View My Orders
        </Link>
        <Link
          href="/"
          className="w-full py-3 border border-blue-100 text-slate-600
                     hover:bg-blue-50 font-medium rounded-xl transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
