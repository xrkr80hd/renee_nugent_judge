import { sendAlert } from "@/lib/alerts";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

function normalizedPath(path: string) {
  if (!path.startsWith("/")) return "/";
  return path.slice(0, 120);
}

function cookieKey(path: string) {
  const safe = path.replace(/[^a-zA-Z0-9_-]/g, "_");
  return `visit_alert_${safe}`;
}

export async function POST(req: Request) {
  const enabled = process.env.PAGE_VISIT_ALERTS_ENABLED === "true";
  if (!enabled) return NextResponse.json({ ok: true, skipped: "disabled" });

  const body = (await req.json().catch(() => null)) as { path?: string; title?: string } | null;
  const path = normalizedPath(body?.path || "/");
  const title = String(body?.title || "Page visit");
  const throttleMinutes = Number(process.env.PAGE_VISIT_ALERT_THROTTLE_MINUTES || "30");
  const key = cookieKey(path);

  const store = await cookies();
  if (store.get(key)?.value === "1") {
    return NextResponse.json({ ok: true, skipped: "throttled" });
  }

  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for") || "";
  const userAgent = headerStore.get("user-agent") || "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";

  await sendAlert({
    type: "page_visit",
    title: `Page Visit: ${title}`,
    path,
    occurredAt: new Date().toISOString(),
    data: {
      ip,
      userAgent
    }
  });

  store.set(key, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.max(5, throttleMinutes) * 60
  });

  return NextResponse.json({ ok: true });
}
