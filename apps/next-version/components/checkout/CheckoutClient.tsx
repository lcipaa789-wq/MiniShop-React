//client component - handle the full checkout flow
//reads cart from Zustand
//create a PaymentIntent via our API
//renders Stripe Element payment form
//on success - creates an order in our db and clears cart
"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements, //Stripe context provider - wraps the payment form
  PaymentElement, //stripe's pre-build card input UI
  useStripe, //hook to access the Stripe instance
  useElements, //hook to access the elements instance (form fields)
} from "@stripe/react-stripe-js";
import { useCartStore } from "@/hooks/useCartSore";
import { toast } from "sonner";
import Image from "next/image";
//Initialize Stripe outside component - avoids recreating on every render
//NEXT_PUBLIC_ prefix makes this env var available on the client side.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);
export default function CheckoutClient() {
  const router = useRouter();
  //clientSecret is returned by POST /api/stripe/payment-intent
  //its required to initialize Stripe Elements - null while loading
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const options = useMemo(() => {
    if (!clientSecret) return null;
    return {
      clientSecret,
      appearance: {
        theme: "stripe" as const,
        variables: {
          colorPrimary: "#2563EB",
          borderRadius: "8px",
          fontFamily: "inherit",
        },
      },
    };
  }, [clientSecret]);
  //read cart state form Zustand - item the user is buying
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  //redirect if cart is empty
  //if the user navigates to /checkout with an empty cart
  //redirect them to the home page instead of showing an emptu checkout
  useEffect(() => {
    if (items.length === 0 && !isPaid) {
      router.push("/");
    }
  }, [items, router, isPaid]);
  //create PaymentIntent on mount
  //a PaymentIntent represents the intent to collect payment
  //we create in server-side to keep the secret key hidden from the browser
  //the API return a clientSecret which us safe ti yse ib tge ckuebt
  useEffect(() => {
    if (items.length === 0) return;
    async function createPaymentIntent() {
      try {
        const res = await fetch("/api/stripe/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalPrice, // in dollars — API converts to cents
            items, // passed as metadata to Stripe
          }),
        });
        const data = await res.json();
        //store the clientSecret - this triggers Stripe Elements to initialize
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Failed to create payment intent:", error);
        toast.error("Failed to initialize checkout. Please try again.");
      }
    }
    createPaymentIntent();
  }, []);
  //loading state
  //show a spinner while watching for the PaymentIntent to be created
  //without clientSecret, Stripe Elements cant render
  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-20">
        <div
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent
                        rounded-full animate-spin"
        />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-[16px] font-semibold text-slate-800">
          Order Summary
        </h2>

        <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-4 py-3
                         border-b border-blue-50 last:border-0"
            >
              <div
                className="relative w-12 h-12 rounded-lg overflow-hidden
                              bg-blue-50 shrink-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 items-center justify-between min-w-0">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-slate-800 line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-slate-400">
                    Qty: {item.quantity}
                  </p>
                </div>

                <span className="text-[13px] font-semibold text-slate-800 ml-3 shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between px-4 py-3 bg-blue-50/50">
            <span className="text-[14px] font-medium text-slate-600">
              Total
            </span>
            <span className="text-[18px] font-bold text-slate-800">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[16px] font-semibold text-slate-800 mb-4">
          Payment Details
        </h2>

        {options && (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm
              totalPrice={totalPrice}
              onPaymentSuccess={() => setIsPaid(true)}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}
function PaymentForm({
  totalPrice,
  onPaymentSuccess,
}: {
  totalPrice: number;
  onPaymentSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      // confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required", // don't redirect for card payments
      });

      if (error) {
        toast.error(error.message ?? "Payment failed");
        setIsLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // payment succeeded — create order in our DB
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, total: totalPrice }),
        });

        if (res.ok) {
          onPaymentSuccess();
          // Clear cart and redirect to success page
          clearCart();
          toast.success("Payment successful! 🎉");
          router.push("/checkout/success");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="bg-white rounded-xl border border-blue-100 p-5">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white
                   font-medium rounded-xl transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div
              className="w-4 h-4 border-2 border-white border-t-transparent
                            rounded-full animate-spin"
            />
            Processing...
          </span>
        ) : (
          `Pay $${totalPrice.toFixed(2)}`
        )}
      </button>

      <p className="text-[12px] text-slate-400 text-center">
        🔒 Secured by Stripe. Your payment info is never stored on our servers.
      </p>
    </form>
  );
}
