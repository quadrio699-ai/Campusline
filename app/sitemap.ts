import type { MetadataRoute } from "next";

// TODO: replace with your real deployed URL once it's live on Vercel.
const siteUrl = "https://campusline.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
