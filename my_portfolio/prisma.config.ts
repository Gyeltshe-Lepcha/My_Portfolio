import "dotenv/config";
import { defineConfig } from "prisma/config";

function normalizePostgresUrl(url: string) {
  try {
    const parsed = new URL(url);
    const sslMode = parsed.searchParams.get("sslmode");
    if (sslMode === "require" || sslMode === "prefer" || sslMode === "verify-ca") {
      parsed.searchParams.set("sslmode", "verify-full");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma Migrate should use Neon's direct connection URL, not the pooled
    // `-pooler` host. The app runtime can still use DATABASE_URL via PrismaPg.
    url: normalizePostgresUrl(
      process.env.DIRECT_URL || process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres"
    ),
  },
});
