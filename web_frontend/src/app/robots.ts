import type { MetadataRoute } from "next";

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
