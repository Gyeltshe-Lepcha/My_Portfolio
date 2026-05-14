import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");
const secret = crypto.randomBytes(32).toString("hex");

if (fs.existsSync(envPath)) {
  const current = fs.readFileSync(envPath, "utf8");
  if (/^AUTH_SECRET=/m.test(current)) {
    console.log(".env.local already contains AUTH_SECRET. No changes made.");
    process.exit(0);
  }

  fs.appendFileSync(envPath, `\nAUTH_SECRET="${secret}"\n`);
  console.log("Added AUTH_SECRET to existing .env.local.");
  process.exit(0);
}

fs.writeFileSync(
  envPath,
  [
    `AUTH_SECRET="${secret}"`,
    "AUTH_TRUST_HOST=true",
    "NEXT_PUBLIC_APP_URL=http://localhost:3000",
    "",
  ].join("\n")
);

console.log("Created .env.local with a persistent AUTH_SECRET.");
