import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/me.webp`, ...PROJECTS.map((p) => `${SITE_URL}${p.cover.src}`)],
    },
    {
      url: `${SITE_URL}/testimonials`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
