"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

export function ShareVideo({ videoId, title = "Renee Dugas Nugent — Campaign Video" }: { videoId?: string; title?: string }) {
  const [message, setMessage] = useState("");
  const [manualUrl, setManualUrl] = useState("");

  async function share(copyOnly = false) {
    const url = new URL(videoId ? `/#video-${encodeURIComponent(videoId)}` : "/#campaign-video", window.location.origin).href;
    setMessage("");
    setManualUrl("");
    if (!copyOnly && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied! Paste it to share.");
    } catch {
      setManualUrl(url);
      setMessage("Copy the link below to share.");
    }
  }

  return (
    <div className="mt-2">
      <button type="button" onClick={() => share(true)} className="mr-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">
        Copy Video Link
      </button>
      <button type="button" onClick={() => share()} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">
        <Share2 className="size-4" aria-hidden="true" /> Share Video
      </button>
      <p role="status" className="text-sm text-muted-foreground">{message}</p>
      {manualUrl && (
        <input
          aria-label="Video sharing link"
          readOnly
          value={manualUrl}
          onFocus={(event) => event.currentTarget.select()}
          className="mt-2 w-full rounded-md border border-primary/25 bg-white p-3 text-sm"
        />
      )}
    </div>
  );
}
