import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { appConfig, databaseConfig } from "./config";

const globalForPrisma = globalThis;

const adapter = new PrismaPg({
  connectionString: databaseConfig.runtimeUrl,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: appConfig.nodeEnv === "development" ? ["warn"] : [],
  });

if (!appConfig.isProduction) {
  globalForPrisma.prisma = prisma;
}
