"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function VisitAlertPing() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const shouldTrack = pathname === "/" || pathname === "/volunteer" || pathname === "/donate" || pathname === "/contact";
    if (!shouldTrack) return;

    void fetch("/api/alerts/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        title: document.title || "Campaign page"
      }),
      keepalive: true
    });
  }, [pathname]);

  return null;
}
