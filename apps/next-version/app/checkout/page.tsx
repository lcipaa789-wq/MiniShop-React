//checkout page - shows order summary and Stripe payment form
//redirects to login if not authenticated
//fetches PaymentIntent from our API, then renders the Stripe Element form
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth";
import CheckoutClient from "@/components/checkout/CheckoutClient";
export default async function CheckoutPage() {
  //require authentication - quest checkout not supported
  const session = await auth0.getSession();
  if (!session) redirect("/auth/login");
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-[22px] font-semibold text-slate-800 mb-6">
        Checkout
      </h1>

      <CheckoutClient />
    </main>
  );
}
