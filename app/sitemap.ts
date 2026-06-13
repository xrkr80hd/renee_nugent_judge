import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/qualifications",
  "/judicial-philosophy",
  "/events",
  "/volunteer",
  "/donate",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
