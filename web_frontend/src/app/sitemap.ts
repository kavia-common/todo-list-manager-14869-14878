import type { MetadataRoute } from "next";

// Ensure static export compatibility for sitemap.xml
export const dynamic = "force-static";
export const revalidate = false;

// PUBLIC_INTERFACE
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "/health",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
