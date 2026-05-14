import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis;

function normalizePostgresUrl(url) {
  if (!url) return url;

  try {
    const parsed = new URL(url);
    const sslMode = parsed.searchParams.get("sslmode");
    if (["require", "prefer", "verify-ca"].includes(sslMode)) {
      parsed.searchParams.set("sslmode", "verify-full");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

const adapter = new PrismaPg({
  connectionString: normalizePostgresUrl(
    process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres"
  ),
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn"] : [],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
