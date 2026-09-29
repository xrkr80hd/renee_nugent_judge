import { cache } from "react";
import { prisma } from "@/lib/db";
import { initialVideos, parseVideos, VIDEO_KEY } from "@/lib/videos";

export const getVideos = cache(async () => {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: VIDEO_KEY } });
    return parseVideos(row?.value);
  } catch {
    return initialVideos;
  }
});
