import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/privacy", "/terms"];

  return routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.4,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          es: `${SITE_URL}/es${path}`,
        },
      },
    })),
  );
}
