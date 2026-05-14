import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/security";

async function requireUser(req) {
  const session = await auth();
  if (!session?.user?.id) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const limited = rateLimit(`projects:${session.user.id}:${req.method}`, 40, 60_000);
  if (!limited.ok) return { error: NextResponse.json({ error: "Too many requests" }, { status: 429 }) };
  return { session };
}

export async function POST(req) {
  const guard = await requireUser(req);
  if (guard.error) return guard.error;

  const schema = z.object({
    title: z.string().min(2).max(120),
    description: z.string().min(3).max(1500),
    imageUrl: z.string().max(500).optional().nullable(),
    tags: z.array(z.string().max(40)).default([]),
    featured: z.boolean().default(false),
  });
  const data = schema.parse(await req.json());
  const profile = await prisma.portfolioProfile.findUnique({ where: { userId: guard.session.user.id } });
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const project = await prisma.project.create({ data: { ...data, profileId: profile.id } });
  return NextResponse.json({ project }, { status: 201 });
}
