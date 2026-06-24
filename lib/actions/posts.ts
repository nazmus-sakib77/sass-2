"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { optionalStr, slugify, str } from "@/lib/validation";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
}

function parsePostForm(formData: FormData) {
  const title = str(formData.get("title"));
  const slug = slugify(str(formData.get("slug")) || title);
  const published = formData.get("published") === "on";
  return {
    title,
    slug,
    excerpt: str(formData.get("excerpt")),
    body: str(formData.get("body")),
    coverImage: optionalStr(formData.get("coverImage")),
    seoTitle: optionalStr(formData.get("seoTitle")),
    seoDescription: optionalStr(formData.get("seoDescription")),
    published,
  };
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const data = parsePostForm(formData);
  if (!data.title || !data.slug) throw new Error("Title and slug are required.");

  await db.post.create({
    data: {
      ...data,
      publishedAt: data.published ? new Date() : null,
    },
  });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();
  const data = parsePostForm(formData);
  if (!data.title || !data.slug) throw new Error("Title and slug are required.");

  const existing = await db.post.findUnique({ where: { id } });
  // Set publishedAt the first time it goes live; keep it stable afterwards.
  const publishedAt =
    data.published && !existing?.publishedAt ? new Date() : existing?.publishedAt ?? null;

  await db.post.update({
    where: { id },
    data: { ...data, publishedAt },
  });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  await db.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}
