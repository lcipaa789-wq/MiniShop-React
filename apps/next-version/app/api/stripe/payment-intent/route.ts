//POST /api/stripe/payment-intent
//creates a Stripe PaymentIntent for the cart total

//returns the clientsSecret which the frontend uses to confirm payment

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth0 } from "@/lib/auth";

export async function POST(request: Request) {
  //only logged in users can checkout
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { amount, items } = await request.json();
  try {
    //create a PaymentIntent - amount must be in cents (multiply by 100)
    // $99.99 = 9999 cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      //store cart metadata for reference after payment
      metadata: {
        userId: session.user.sub,
        itemCount: items.length,
      },
    });
    //return the ClientSecret to the frontend - its used to confirm payment
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("[POST /api/stripe/payment-intent]", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 },
    );
  }
}
