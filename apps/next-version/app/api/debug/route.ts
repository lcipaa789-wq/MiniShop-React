// app/api/debug/route.ts
// Temporary debug route — shows current session data including roles.
// DELETE THIS FILE after debugging!
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth";

export async function GET() {
  const session = await auth0.getSession();
  return NextResponse.json(session?.user ?? { error: "No session" });
}
