const required = ["AUTH_SECRET", "DATABASE_URL"];
const missing = required.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`Missing required environment variable(s): ${missing.join(", ")}`);
  process.exit(1);
}

console.log("Required environment variables are present.");
