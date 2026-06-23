//protect routes that require authentication
//Auth0 middleware runs on every request an dmanages session cookie

import type { NextRequest } from "next/server";
import { auth0 } from "@/lib/auth";
export async function middleware(request: NextRequest) {
  return await auth0.middleware(request);
}
export const config = {
  //run middleware on all routes except static files and API routes
  matches: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
