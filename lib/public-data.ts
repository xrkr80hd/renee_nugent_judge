import { campaign } from "@/content/campaign";
import { prisma } from "@/lib/db";

export async function getHomepageHeadline() {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: "homepageHeadline" } });
    return setting?.value ?? campaign.hero.headline;
  } catch {
    return campaign.hero.headline;
  }
}

export async function getDonationDisclaimer() {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: "donationDisclaimer" } });
    return setting?.value ?? "Political contributions are subject to applicable campaign finance laws.";
  } catch {
    return "Political contributions are subject to applicable campaign finance laws.";
  }
}

export async function getPublishedEvents(take?: number) {
  try {
    return await prisma.event.findMany({
      where: { isPublished: true, startsAt: { gte: new Date() } },
      orderBy: [{ sortOrder: "asc" }, { startsAt: "asc" }],
      take
    });
  } catch {
    return [];
  }
}

export async function getPublishedEndorsements() {
  try {
    return await prisma.endorsement.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
    });
  } catch {
    return [];
  }
}
