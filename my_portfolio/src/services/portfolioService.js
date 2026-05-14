import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { defaultPortfolio } from "@/data/defaultPortfolio";

function isExpectedDatabaseSetupError(error) {
  return ["P1000", "P1001", "P2021"].includes(error?.code);
}

function normalizeProfile(user) {
  if (!user?.profile) return defaultPortfolio;

  const profile = user.profile;
  const serviceItems = profile.experiences.filter((item) => item.type === "service");
  const educationItems = profile.experiences.filter((item) => item.type === "education");

  return {
    owner: {
      id: user.id,
      name: user.name,
      username: user.username,
      slug: user.slug,
      publicIdentifier: user.publicIdentifier,
    },
    profile: {
      displayName: profile.displayName,
      headline: profile.headline,
      bio: profile.bio,
      location: profile.location,
      avatarUrl: profile.avatarUrl,
    },
    hero: profile.hero || defaultPortfolio.hero,
    services: serviceItems.length
      ? serviceItems.map((item) => ({
          id: item.id,
          icon: item.icon || "✨",
          title: item.title,
          description: item.description || "",
        }))
      : defaultPortfolio.services,
    about: {
      ...(profile.about || defaultPortfolio.about),
      details: Array.isArray(profile.about?.details) ? profile.about.details : defaultPortfolio.about.details,
      experience: profile.experiences
        .filter((item) => item.type === "experience")
        .map((item) => item.title),
    },
    projects: profile.projects,
    education: educationItems.length ? educationItems : defaultPortfolio.education,
    gallery: profile.mediaAssets.length ? profile.mediaAssets : defaultPortfolio.gallery,
    contact: profile.contact || defaultPortfolio.contact,
    socialLinks: profile.socialLinks.length ? profile.socialLinks : defaultPortfolio.socialLinks,
  };
}

const includePortfolio = {
  profile: {
    include: {
      hero: true,
      about: true,
      projects: { where: { isVisible: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }] },
      skills: { where: { isVisible: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }] },
      experiences: { where: { isVisible: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }] },
      contact: true,
      socialLinks: { where: { isVisible: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] },
      mediaAssets: { where: { isVisible: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }] },
    },
  },
};

export const getDefaultPortfolio = cache(async () => defaultPortfolio);

export const getPortfolioByOwnerId = cache(async (userId) => {
  if (!process.env.DATABASE_URL || !userId) return defaultPortfolio;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: includePortfolio,
    });
    return normalizeProfile(user);
  } catch (error) {
    if (!isExpectedDatabaseSetupError(error)) {
      console.error("Failed to load portfolio by owner id", error);
    }
    return defaultPortfolio;
  }
});

export const getPrimaryPortfolio = cache(async () => {
  if (!process.env.DATABASE_URL) return defaultPortfolio;

  try {
    const user = await prisma.user.findFirst({
      where: { profile: { isPublic: true } },
      orderBy: { createdAt: "asc" },
      include: includePortfolio,
    });
    return normalizeProfile(user);
  } catch (error) {
    if (!isExpectedDatabaseSetupError(error)) {
      console.error("Failed to load primary portfolio", error);
    }
    return defaultPortfolio;
  }
});

export async function getPortfolioBySlug(slug) {
  if (!process.env.DATABASE_URL || !slug) return slug === defaultPortfolio.owner.slug ? defaultPortfolio : null;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ slug }, { username: slug }, { publicIdentifier: slug }],
      profile: { isPublic: true },
    },
    include: includePortfolio,
  });

  return user ? normalizeProfile(user) : null;
}
