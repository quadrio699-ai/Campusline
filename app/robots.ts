import type { MetadataRoute } from "next";

// TODO: replace with your real deployed URL once it's live on Vercel.
const siteUrl = "https://campusline.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
