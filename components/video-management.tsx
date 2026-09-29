"use client";

import { useActionState } from "react";
import { addVideoAction, deleteVideoAction } from "@/lib/video-actions";
import type { CampaignVideo } from "@/lib/videos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function VideoRow({ video, index }: { video: CampaignVideo; index: number }) {
  const [result, action, pending] = useActionState(deleteVideoAction, {});
  return <li className="rounded-md border p-3">
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0"><p className="font-semibold">{index + 1}. {video.title}</p><p className="break-all text-sm text-muted-foreground">{video.url}</p></div>
      <form action={action} onSubmit={event => { if (!window.confirm("Remove this video from the carousel?")) event.preventDefault(); }}>
        <input type="hidden" name="id" value={video.id} />
        <Button type="submit" variant="outline" disabled={pending}>{pending ? "Deleting…" : "Delete"}</Button>
      </form>
    </div>
    {result.error && <p role="alert" className="mt-2 text-sm text-red-700">{result.error}</p>}
  </li>;
}

export function VideoManagement({ videos }: { videos: CampaignVideo[] }) {
  const [result, action, pending] = useActionState(addVideoAction, {});
  return <div className="grid gap-5">
    <p className="text-sm text-muted-foreground">Add a link to put a video on the homepage immediately. Delete removes it from the carousel, not from its original host.</p>
    <form action={action} className="grid gap-3">
      <label htmlFor="video-link" className="font-semibold">Video link</label>
      <Input id="video-link" name="url" type="url" placeholder="Paste video link" maxLength={2048} required />
      <label htmlFor="video-title" className="text-sm">Title (optional)</label>
      <Input id="video-title" name="title" placeholder="Campaign Video" maxLength={160} />
      <p className="text-sm text-muted-foreground">Google Drive links must be shared with Anyone with the link as Viewer. YouTube, Vimeo, and direct MP4/WebM links also work.</p>
      <Button type="submit" disabled={pending}>{pending ? "Adding…" : "Add Video Link"}</Button>
      <p role="status" className={result.error ? "text-sm text-red-700" : "text-sm text-primary"}>{result.error || result.success}</p>
    </form>
    <ol className="grid gap-3">{videos.map((video, index) => <VideoRow key={video.id} video={video} index={index} />)}</ol>
    {!videos.length && <p>No videos yet. Add a link above.</p>}
  </div>;
}
