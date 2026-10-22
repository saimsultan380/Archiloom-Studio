import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { canonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/projects/", "/services/", "/about/", "/contact/"];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: canonicalUrl(path),
      lastModified: now,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/projects/" ? 0.9 : 0.8,
    })),
    ...projects.map((project) => ({
      url: canonicalUrl(`/projects/${project.id}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
