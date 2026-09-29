import { z } from "zod";

export const VIDEO_KEY = "campaignVideos";
export const videoSchema = z.object({ id: z.string(), title: z.string().max(160), url: z.string().max(2048) });
export type CampaignVideo = z.infer<typeof videoSchema>;
export const initialVideos: CampaignVideo[] = [{ id: "original", title: "Renee's Campaign Video", url: "/videos/renee-campaign.mp4" }];

export function videoSource(value: string): { kind: "file" | "embed"; src: string } | null {
  if (value === initialVideos[0].url) return { kind: "file", src: value };
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" || u.username || u.password) return null;
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    if (host === "drive.google.com") {
      const id = u.pathname.match(/\/file\/d\/([\w-]+)/)?.[1] || u.searchParams.get("id");
      return id && /^[\w-]+$/.test(id) ? { kind: "embed", src: `https://drive.google.com/file/d/${id}/preview` } : null;
    }
    if (["youtube.com", "m.youtube.com", "youtu.be"].includes(host)) {
      const id = host === "youtu.be" ? u.pathname.slice(1) : u.searchParams.get("v") || u.pathname.match(/^\/(?:shorts|embed)\/([\w-]+)/)?.[1];
      return id && /^[\w-]{11}$/.test(id) ? { kind: "embed", src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&playsinline=1` } : null;
    }
    if (host === "vimeo.com") {
      const id = u.pathname.match(/^\/(\d+)$/)?.[1];
      return id ? { kind: "embed", src: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1` } : null;
    }
    if (/\.(mp4|webm)$/i.test(u.pathname)) return { kind: "file", src: u.href };
  } catch { /* Invalid URL. */ }
  return null;
}

export function parseVideos(value?: string | null): CampaignVideo[] {
  if (value == null) return initialVideos;
  const videos = z.array(videoSchema).max(100).parse(JSON.parse(value));
  if (videos.some(video => !videoSource(video.url))) throw new Error("Invalid video list");
  return videos;
}
