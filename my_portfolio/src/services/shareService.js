import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashIp } from "@/lib/security";
import { getPortfolioByOwnerId } from "@/services/portfolioService";

export async function resolveShareLink(identifier) {
  if (!process.env.DATABASE_URL || !identifier) return null;

  const shareLink = await prisma.shareLink.findFirst({
    where: {
      OR: [{ slug: identifier }, { customAlias: identifier }],
    },
    include: { user: true },
  });

  if (!shareLink || !shareLink.active) return null;
  if (shareLink.expiresAt && shareLink.expiresAt < new Date()) return null;

  const requestHeaders = await headers();
  const userAgent = requestHeaders.get("user-agent") || "";
  const referrer = requestHeaders.get("referer") || "";
  const forwardedFor = requestHeaders.get("x-forwarded-for") || "";

  await prisma.$transaction([
    prisma.shareLink.update({
      where: { id: shareLink.id },
      data: {
        visitCount: { increment: 1 },
        lastOpenedAt: new Date(),
      },
    }),
    prisma.visitorAnalytics.create({
      data: {
        userId: shareLink.userId,
        shareLinkId: shareLink.id,
        path: `/view/${identifier}`,
        userAgent,
        referrer,
        ipHash: hashIp(forwardedFor),
      },
    }),
  ]);

  return getPortfolioByOwnerId(shareLink.userId);
}
