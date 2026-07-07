import type { MetadataRoute } from "next";
import { SERVICES, BARBERS, slugify, getSuburbPages } from "@/lib/site";
import { POSTS } from "@/lib/blog";

const BASE = "https://aussiebarbers.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/book",
    "/barbers",
    "/services",
    "/blog",
    "/membership",
    "/gift-cards",
    "/corporate",
    "/weddings",
  ];
  const servicePaths = SERVICES.map((s) => `/services/${slugify(s.name)}`);
  const suburbPaths = getSuburbPages().map((s) => `/mobile-barber/${s.slug}`);
  const barberPaths = BARBERS.map((b) => `/barber/${b.slug}`);
  const blogPaths = POSTS.map((p) => `/blog/${p.slug}`);

  return [...staticPaths, ...servicePaths, ...suburbPaths, ...barberPaths, ...blogPaths].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path.startsWith("/mobile-barber") ? 0.7 : 0.8,
  }));
}
