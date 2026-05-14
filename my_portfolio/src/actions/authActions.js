"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify, shortSuffix } from "@/lib/slug";
import { defaultPortfolio } from "@/data/defaultPortfolio";

const authSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

function requireDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for authentication and dashboard writes.");
  }
}

export async function signupAction(_prevState, formData) {
  try {
    requireDatabase();
    const parsed = authSchema.parse({
      name: formData.get("name") || undefined,
      email: String(formData.get("email") || "").toLowerCase(),
      password: formData.get("password"),
    });

    const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (existing) return { error: "An account with this email already exists." };

    const passwordHash = await bcrypt.hash(parsed.password, 12);
    const baseSlug = slugify(parsed.name || parsed.email.split("@")[0]);

    await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        passwordHash,
        username: `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`,
        slug: `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`,
        publicIdentifier: `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`,
        profile: {
          create: {
            displayName: parsed.name || defaultPortfolio.profile.displayName,
            headline: defaultPortfolio.profile.headline,
            bio: defaultPortfolio.profile.bio,
            location: defaultPortfolio.profile.location,
            avatarUrl: defaultPortfolio.profile.avatarUrl,
            hero: { create: defaultPortfolio.hero },
            about: {
              create: {
                title: defaultPortfolio.about.title,
                details: defaultPortfolio.about.details,
                abilities: defaultPortfolio.about.abilities,
                progress: defaultPortfolio.about.progress,
              },
            },
            contact: { create: defaultPortfolio.contact },
            projects: { create: defaultPortfolio.projects.map(({ imageUrl, ...project }, order) => ({ ...project, imageUrl, order })) },
            experiences: {
              create: [
                ...defaultPortfolio.services.map((service, order) => ({
                  title: service.title,
                  description: service.description,
                  icon: service.icon,
                  type: "service",
                  order,
                })),
                ...defaultPortfolio.education.map((item, order) => ({
                  title: item.title,
                  organization: item.organization,
                  period: item.period,
                  description: item.description,
                  actionLabel: item.actionLabel,
                  type: "education",
                  order,
                })),
                ...defaultPortfolio.about.experience.map((title, order) => ({ title, type: "experience", order })),
              ],
            },
            socialLinks: { create: defaultPortfolio.socialLinks.map((link, order) => ({ ...link, order })) },
            mediaAssets: { create: defaultPortfolio.gallery.map((asset, order) => ({ url: asset.url, alt: asset.alt, order })) },
          },
        },
      },
    });

    await signIn("credentials", {
      email: parsed.email,
      password: parsed.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) return { error: "Account created, but login failed. Please sign in." };
    if (error?.message?.includes("NEXT_REDIRECT")) throw error;
    return { error: error.message || "Unable to create account." };
  }
}

export async function loginAction(_prevState, formData) {
  try {
    await signIn("credentials", {
      email: String(formData.get("email") || "").toLowerCase(),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) return { error: "Invalid email or password." };
    if (error?.message?.includes("NEXT_REDIRECT")) throw error;
    return { error: "Unable to sign in." };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
