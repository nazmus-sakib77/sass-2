import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { getPublishedPosts, getPublishedCaseStudies } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/pricing",
    "/blog",
    "/about",
    "/contact",
    "/get-quote",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const [posts, caseStudies] = await Promise.all([
    getPublishedPosts(),
    getPublishedCaseStudies(),
  ]);

  const postRoutes = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const workRoutes = caseStudies.map((cs) => ({
    url: `${SITE_URL}/work/${cs.slug}`,
    lastModified: cs.createdAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...workRoutes];
}
