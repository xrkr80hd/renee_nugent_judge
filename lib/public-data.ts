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
      orderBy: { startsAt: "asc" },
      take
    });
  } catch {
    return [
      {
        id: "fallback-event",
        title: "Campaign Events Coming Soon",
        startsAt: new Date("2026-11-03T08:00:00-06:00"),
        location: "Grant Parish, Louisiana",
        description: "Meet and greet dates, speaking engagements, and campaign events will be posted soon.",
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
}

export async function getPublishedEndorsements() {
  try {
    return await prisma.endorsement.findMany({
      where: { isPublished: true },
      orderBy: [{ category: "asc" }, { createdAt: "desc" }]
    });
  } catch {
    return [];
  }
}
