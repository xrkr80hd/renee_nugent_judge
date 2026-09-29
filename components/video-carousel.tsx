"use client";

import { useEffect, useState } from "react";
import { CampaignVideo, videoSource } from "@/lib/videos";
import { ShareVideo } from "@/components/share-video";
import { Button } from "@/components/ui/button";

export function VideoCarousel({ videos }: { videos: CampaignVideo[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rotating, setRotating] = useState(true);
  const video = videos[index] || videos[0];
  const source = video && videoSource(video.url);
  function move(next: number) { setPlaying(false); setIndex((next + videos.length) % videos.length); }

  useEffect(() => {
    function fromHash() {
      const id = window.location.hash.slice(1).replace(/^video-/, "");
      const selected = videos.findIndex(item => item.id === id);
      if (selected >= 0) { setIndex(selected); setPlaying(false); document.getElementById("campaign-video")?.scrollIntoView(); }
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [videos]);

  useEffect(() => {
    if (!rotating || playing || videos.length < 2 || source?.kind === "file") return;
    const timer = window.setTimeout(() => { setIndex((index + 1) % videos.length); setPlaying(false); }, 8000);
    return () => window.clearTimeout(timer);
  }, [index, playing, rotating, videos.length, source?.kind]);

  if (!video || !source) return null;
  return <div role="region" aria-label="Campaign video carousel">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <h3 className="font-serif text-2xl font-semibold">{video.title}</h3>
      {videos.length > 1 && <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => move(index - 1)} aria-label="Previous video">Previous</Button>
        <span className="text-sm">{index + 1} / {videos.length}</span>
        <Button variant="outline" onClick={() => move(index + 1)} aria-label="Next video">Next</Button>
        <Button variant="ghost" onClick={() => setRotating(!rotating)}>{rotating ? "Pause rotation" : "Resume rotation"}</Button>
      </div>}
    </div>
    <div className="aspect-video overflow-hidden rounded-lg bg-primary text-white shadow-judicial">
      {source.kind === "file" ? <video key={video.id} src={source.src} poster={video.id === "original" ? "/images/renee-video-poster.jpg" : undefined} aria-label={video.title} className="h-full w-full" autoPlay muted playsInline controls preload="metadata" onPlay={() => setPlaying(true)} onEnded={() => { if (rotating && videos.length > 1) move(index + 1); }} /> : playing ? <iframe key={video.id} title={video.title} src={source.src} className="h-full w-full border-0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> : <button type="button" onClick={() => setPlaying(true)} className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center focus-visible:ring-4 focus-visible:ring-secondary">
        <span className="text-5xl" aria-hidden="true">▶</span><span className="text-xl font-semibold">Play {video.title}</span>
      </button>}
    </div>
    <ShareVideo key={video.id} videoId={video.id} title={video.title} />
    <p className="text-sm text-muted-foreground">Videos start muted when supported. Use the player controls for sound. Select Next to browse videos.</p>
  </div>;
}
