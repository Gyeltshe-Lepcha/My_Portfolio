import "server-only";
import { LOCAL_DATABASE_URL, normalizePostgresUrl } from "./urlConfig";

function readEnv(name, fallback = "") {
  return process.env[name] || fallback;
}

function requireEnv(name, value) {
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }
  return value;
}

const nodeEnv = readEnv("NODE_ENV", "development");
const isProduction = nodeEnv === "production";
const authSecret = readEnv("AUTH_SECRET") || readEnv("NEXTAUTH_SECRET");
const databaseUrl = readEnv("DATABASE_URL");
const directUrl = readEnv("DIRECT_URL") || databaseUrl;

export const appConfig = {
  nodeEnv,
  isProduction,
  appUrl: readEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  cloudinaryUrl: readEnv("CLOUDINARY_URL"),
};

export const authConfig = {
  secret: authSecret,
  trustHost: true,
  sessionMaxAge: 30 * 24 * 60 * 60,
  sessionCookieName: `${isProduction ? "__Secure-" : ""}authjs.session-token`,
  secureCookies: isProduction,
};

export function requireAuthSecret() {
  return requireEnv("AUTH_SECRET", authSecret);
}

export const databaseConfig = {
  hasDatabaseUrl: Boolean(databaseUrl),
  runtimeUrl: normalizePostgresUrl(databaseUrl || LOCAL_DATABASE_URL),
  migrateUrl: normalizePostgresUrl(directUrl || LOCAL_DATABASE_URL),
};

export function requireDatabaseUrl() {
  return requireEnv("DATABASE_URL", databaseUrl);
}
