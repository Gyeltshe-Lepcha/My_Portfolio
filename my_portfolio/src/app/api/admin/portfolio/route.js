import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getPortfolioByOwnerId } from "@/services/portfolioService";
import { rateLimit } from "@/lib/security";

async function requireAdminRequest(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const limited = rateLimit(`admin:${session.user.id}:${req.method}`, 60, 60_000);
  if (!limited.ok) {
    return { error: NextResponse.json({ error: "Too many requests" }, { status: 429 }) };
  }

  return { session };
}

export async function GET(req) {
  const guard = await requireAdminRequest(req);
  if (guard.error) return guard.error;

  const portfolio = await getPortfolioByOwnerId(guard.session.user.id);
  return NextResponse.json({ portfolio });
}

export async function PATCH(req) {
  const guard = await requireAdminRequest(req);
  if (guard.error) return guard.error;

  const schema = z.object({
    displayName: z.string().min(2).max(80).optional(),
    headline: z.string().max(160).nullable().optional(),
    bio: z.string().max(2000).nullable().optional(),
    location: z.string().max(120).nullable().optional(),
    avatarUrl: z.string().max(500).nullable().optional(),
  });

  const data = schema.parse(await req.json());

  const profile = await prisma.portfolioProfile.update({
    where: { userId: guard.session.user.id },
    data,
  });

  return NextResponse.json({ profile });
}
