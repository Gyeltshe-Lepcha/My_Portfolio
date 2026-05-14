"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify, shortSuffix } from "@/lib/slug";

async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");
  return session.user;
}

async function profileIdFor(userId) {
  const profile = await prisma.portfolioProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!profile) throw new Error("Portfolio profile was not found.");
  return profile.id;
}

export async function updateProfileAction(_prevState, formData) {
  try {
    formData = formData || _prevState;
    const user = await requireUser();
    const schema = z.object({
      displayName: z.string().min(2).max(80),
      headline: z.string().max(160).optional(),
      bio: z.string().max(2000).optional(),
      location: z.string().max(120).optional(),
      avatarUrl: z.string().max(500).optional(),
      username: z.string().min(3).max(60),
      slug: z.string().min(3).max(72),
    });
    const data = schema.parse({
      displayName: formData.get("displayName"),
      headline: formData.get("headline") || undefined,
      bio: formData.get("bio") || undefined,
      location: formData.get("location") || undefined,
      avatarUrl: formData.get("avatarUrl") || undefined,
      username: slugify(formData.get("username")),
      slug: slugify(formData.get("slug")),
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        username: data.username,
        slug: data.slug,
        publicIdentifier: data.slug,
        profile: {
          update: {
            displayName: data.displayName,
            headline: data.headline,
            bio: data.bio,
            location: data.location,
            avatarUrl: data.avatarUrl,
          },
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error) {
    return { error: error.message || "Unable to update profile." };
  }
}

export async function updateHeroAction(_prevState, formData) {
  try {
    formData = formData || _prevState;
    const user = await requireUser();
    const profileId = await profileIdFor(user.id);
    const schema = z.object({
      eyebrow: z.string().max(40),
      title: z.string().max(80),
      highlighted: z.string().max(80),
      subtitle: z.string().min(10).max(2500),
      primaryCta: z.string().max(80).optional(),
      secondaryCta: z.string().max(80).optional(),
      imageUrl: z.string().max(500).optional(),
      badgeLabel: z.string().max(80).optional(),
      badgeTitle: z.string().max(80).optional(),
    });
    const data = schema.parse(Object.fromEntries(formData));

    await prisma.heroSection.upsert({
      where: { profileId },
      update: data,
      create: { ...data, profileId },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error) {
    return { error: error.message || "Unable to update hero section." };
  }
}

export async function updateContactAction(_prevState, formData) {
  try {
    formData = formData || _prevState;
    const user = await requireUser();
    const profileId = await profileIdFor(user.id);
    const data = {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      email: String(formData.get("email") || "") || null,
      primaryCta: String(formData.get("primaryCta") || "") || null,
      secondaryCta: String(formData.get("secondaryCta") || "") || null,
    };

    await prisma.contactInfo.upsert({
      where: { profileId },
      update: data,
      create: { ...data, profileId },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error) {
    return { error: error.message || "Unable to update contact section." };
  }
}

export async function createShareLinkAction(_prevState, formData) {
  try {
    formData = formData || _prevState;
    const user = await requireUser();
    const title = String(formData.get("title") || "Portfolio share");
    const aliasInput = slugify(formData.get("customAlias"));
    const base = aliasInput || slugify(formData.get("slug")) || slugify(user.name || user.email) || `user-${shortSuffix(user.id)}`;
    const slug = `${base}-${shortSuffix(user.id)}`;

    await prisma.shareLink.create({
      data: {
        userId: user.id,
        title,
        note: String(formData.get("note") || "") || null,
        customAlias: aliasInput || null,
        slug,
        expiresAt: formData.get("expiresAt") ? new Date(String(formData.get("expiresAt"))) : null,
      },
    });

    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error) {
    return { error: error.message || "Unable to create share link." };
  }
}

export async function updateSectionJsonAction(_prevState, formData) {
  try {
    formData = formData || _prevState;
    const user = await requireUser();
    const profileId = await profileIdFor(user.id);
    const section = String(formData.get("section"));
    const items = JSON.parse(String(formData.get("items") || "[]"));

    if (!Array.isArray(items) && section !== "about") {
      throw new Error("Section payload must be a JSON array.");
    }

    if (section === "about") {
      const about = items;
      await prisma.aboutSection.upsert({
        where: { profileId },
        update: {
          title: about.title || "About Me",
          details: about.details || [],
          abilities: about.abilities || [],
          progress: about.progress || [],
        },
        create: {
          profileId,
          title: about.title || "About Me",
          details: about.details || [],
          abilities: about.abilities || [],
          progress: about.progress || [],
        },
      });
    }

    if (section === "services") {
      await prisma.experience.deleteMany({ where: { profileId, type: "service" } });
      await prisma.experience.createMany({
        data: items.map((item, order) => ({
          profileId,
          title: item.title,
          description: item.description || "",
          icon: item.icon || "✨",
          type: "service",
          order,
        })),
      });
    }

    if (section === "projects") {
      await prisma.project.deleteMany({ where: { profileId } });
      await prisma.project.createMany({
        data: items.map((item, order) => ({
          profileId,
          title: item.title,
          description: item.description || "",
          imageUrl: item.imageUrl || item.image || null,
          tags: item.tags || [],
          featured: Boolean(item.featured),
          order,
        })),
      });
    }

    if (section === "education") {
      await prisma.experience.deleteMany({ where: { profileId, type: "education" } });
      await prisma.experience.createMany({
        data: items.map((item, order) => ({
          profileId,
          title: item.title || item.degree,
          organization: item.organization || item.institution || null,
          period: item.period || null,
          description: item.description || "",
          actionLabel: item.actionLabel || item.buttonText || "View Details →",
          type: "education",
          order,
        })),
      });
    }

    if (section === "gallery") {
      await prisma.mediaAsset.deleteMany({ where: { profileId } });
      await prisma.mediaAsset.createMany({
        data: items.map((item, order) => ({
          profileId,
          url: item.url || item.src,
          alt: item.alt || item.title || "",
          title: item.title || null,
          order,
        })),
      });
    }

    if (section === "socialLinks") {
      await prisma.socialLink.deleteMany({ where: { profileId } });
      await prisma.socialLink.createMany({
        data: items.map((item, order) => ({
          profileId,
          label: item.label,
          url: item.url,
          icon: item.icon || null,
          order,
        })),
      });
    }

    revalidatePath("/");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error) {
    return { error: error.message || "Unable to update section." };
  }
}

export async function toggleShareLinkAction(formData) {
  const user = await requireUser();
  const id = String(formData.get("id"));
  const active = formData.get("active") === "true";

  await prisma.shareLink.updateMany({
    where: { id, userId: user.id },
    data: { active: !active },
  });

  revalidatePath("/dashboard");
}
