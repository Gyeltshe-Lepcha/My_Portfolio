"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireDatabaseUrl } from "@/lib/config";
import { slugify, shortSuffix } from "@/lib/slug";
import { defaultPortfolio } from "@/data/defaultPortfolio";

const authSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128).optional(),
}).refine((data) => !data.confirmPassword || data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

function requireDatabase() {
  requireDatabaseUrl();
}

export async function signupAction(_prevState, formData) {
  try {
    requireDatabase();
    const parsed = authSchema.parse({
      name: formData.get("name") || undefined,
      email: String(formData.get("email") || "").toLowerCase(),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const passwordHash = await bcrypt.hash(parsed.password, 12);
    const baseSlug = slugify(parsed.name || parsed.email.split("@")[0]);
    const username = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
    const publicIdentifier = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: parsed.email },
          { username },
          { slug },
          { publicIdentifier },
        ],
      },
      select: { email: true, username: true, slug: true, publicIdentifier: true },
    });

    if (existing?.email === parsed.email) return { error: "An account with this email already exists." };
    if (existing) return { error: "Generated username is already taken. Please try again." };

    await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        passwordHash,
        username,
        slug,
        publicIdentifier,
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

    return { ok: true, message: "Account created successfully. Redirecting to login..." };
  } catch (error) {
    if (error?.message?.includes("NEXT_REDIRECT")) throw error;
    if (error?.issues?.[0]?.message) return { error: error.issues[0].message };
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
