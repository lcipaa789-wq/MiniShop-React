// lib/admin.ts
import { auth0 } from "@/lib/auth";

const ROLES_CLAIM = "https://minishop.com/roles";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

export async function isAdmin(): Promise<boolean> {
  const session = await auth0.getSession();
  if (!session) return false;

  // Check Auth0 roles claim
  const roles: string[] = session.user[ROLES_CLAIM] ?? [];
  if (roles.includes("admin")) return true;

  // Fallback — check by admin email from .env
  return session.user.email === ADMIN_EMAIL;
}
