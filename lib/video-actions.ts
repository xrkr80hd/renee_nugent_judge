"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { CampaignVideo, parseVideos, VIDEO_KEY, videoSource } from "@/lib/videos";

type Result = { error?: string; success?: string };

async function changeVideos(change: (videos: CampaignVideo[]) => CampaignVideo[]) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await prisma.$transaction(async tx => {
        const row = await tx.siteSetting.findUnique({ where: { key: VIDEO_KEY } });
        const value = JSON.stringify(change(parseVideos(row?.value)));
        await tx.siteSetting.upsert({ where: { key: VIDEO_KEY }, create: { key: VIDEO_KEY, value }, update: { value } });
      }, { isolationLevel: "Serializable" });
      revalidatePath("/");
      revalidatePath("/admin");
      return;
    } catch (error) {
      if (attempt < 2 && error && typeof error === "object" && "code" in error && ["P2034", "P2002"].includes(String(error.code))) continue;
      throw error;
    }
  }
}

export async function addVideoAction(_previous: Result, form: FormData): Promise<Result> {
  if (!(await isAdminAuthenticated())) return { error: "Please sign in again." };
  const url = String(form.get("url") || "").trim();
  const title = String(form.get("title") || "").trim().slice(0, 160) || "Campaign Video";
  if (url.length > 2048 || !videoSource(url)) return { error: "Use a Google Drive, YouTube, Vimeo, or direct HTTPS MP4/WebM video link." };
  try {
    await changeVideos(videos => {
      if (videos.length >= 100) throw new Error("limit");
      return [...videos, { id: randomUUID(), title, url }];
    });
    return { success: "Video added to the homepage." };
  } catch { return { error: "Could not save the video. Check the database connection and try again (maximum 100 videos)." }; }
}

export async function deleteVideoAction(_previous: Result, form: FormData): Promise<Result> {
  if (!(await isAdminAuthenticated())) return { error: "Please sign in again." };
  const id = String(form.get("id") || "");
  try {
    await changeVideos(videos => videos.filter(video => video.id !== id));
    return { success: "Video removed from the carousel." };
  } catch { return { error: "Could not delete the video. Please try again." }; }
}
