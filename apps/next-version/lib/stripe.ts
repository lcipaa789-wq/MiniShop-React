//Stripe server-side client - used in API routes to create PaymentIntents
//never import this on client side - it contains the secret key
import Stripe from "stripe";

//Singleton pattern - reuse the same Stripe instance across requests
//instead of creating a new one on every API call
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
