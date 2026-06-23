// Auth0 client configuration for Next.js App Router
//exports handler for the catch-all Auth0 route
import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client();
