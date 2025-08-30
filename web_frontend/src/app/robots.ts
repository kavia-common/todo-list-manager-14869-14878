import type { MetadataRoute } from "next";

// Ensure static export compatibility for robots.txt
export const dynamic = "force-static";
export const revalidate = false;

// PUBLIC_INTERFACE
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: undefined,
  };
}
