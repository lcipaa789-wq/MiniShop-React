/**
 * Purpose:
 * Create and reuse a single Prisma Client instance.
 *
 * Why:
 * During development, Next.js reloads modules frequently.
 * Without this pattern, multiple Prisma connections can be created.
 *
 * How it works:
 * We store the Prisma Client in the global object
 * and reuse it across hot reloads.
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], //logs every SQL query in terminal - useful during dev
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
