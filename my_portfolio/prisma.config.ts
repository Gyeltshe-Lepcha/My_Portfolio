import "dotenv/config";
import { defineConfig } from "prisma/config";
import { LOCAL_DATABASE_URL, normalizePostgresUrl } from "./src/lib/urlConfig";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma Migrate should use Neon's direct connection URL, not the pooled
    // `-pooler` host. The app runtime can still use DATABASE_URL via PrismaPg.
    url: normalizePostgresUrl(
      process.env.DIRECT_URL || process.env.DATABASE_URL || LOCAL_DATABASE_URL
    ),
  },
});
