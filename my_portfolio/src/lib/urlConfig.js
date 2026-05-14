export const LOCAL_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/postgres";

export function normalizePostgresUrl(url) {
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
