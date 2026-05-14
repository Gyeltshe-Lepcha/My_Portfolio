import crypto from "crypto";

const buckets = new Map();

export function hashIp(value = "") {
  return crypto.createHash("sha256").update(`${value}:${process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev"}`).digest("hex");
}

export function rateLimit(key, limit = 8, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };

  if (bucket.resetAt < now) {
    bucket.count = 0;
    bucket.resetAt = now + windowMs;
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  return {
    ok: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}
