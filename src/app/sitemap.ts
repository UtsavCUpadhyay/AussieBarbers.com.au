import type { MetadataRoute } from "next";

const BASE = "https://aussiebarbers.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/book", "/barbers"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
