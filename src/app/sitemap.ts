import type { MetadataRoute } from "next";
import { SERVICES, slugify, getSuburbPages } from "@/lib/site";

const BASE = "https://aussiebarbers.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = ["", "/book", "/barbers", "/services"];
  const servicePaths = SERVICES.map((s) => `/services/${slugify(s.name)}`);
  const suburbPaths = getSuburbPages().map((s) => `/mobile-barber/${s.slug}`);

  return [...staticPaths, ...servicePaths, ...suburbPaths].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path.startsWith("/mobile-barber") ? 0.7 : 0.8,
  }));
}
