export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

export function shortSuffix(id = "") {
  return id.replace(/[^a-z0-9]/gi, "").slice(-4).toLowerCase() || Math.random().toString(36).slice(2, 6);
}

export function publicIdentifierFor(user) {
  return user?.publicIdentifier || user?.username || user?.slug || `user${shortSuffix(user?.id)}`;
}
