import { db } from "@/lib/db";

/**
 * Public read helpers. Each is wrapped so a missing/unmigrated database
 * degrades gracefully (empty results) instead of crashing public pages.
 */

export async function getPublishedCaseStudies(limit?: number) {
  try {
    return await db.caseStudy.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string) {
  try {
    return await db.caseStudy.findFirst({ where: { slug, published: true } });
  } catch {
    return null;
  }
}

export async function getPublishedPosts(limit?: number) {
  try {
    return await db.post.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await db.post.findFirst({ where: { slug, published: true } });
  } catch {
    return null;
  }
}
