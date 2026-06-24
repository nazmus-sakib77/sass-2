"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { clampInt, optionalStr, slugify, str } from "@/lib/validation";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
}

function parseForm(formData: FormData) {
  const title = str(formData.get("title"));
  return {
    title,
    slug: slugify(str(formData.get("slug")) || title),
    client: optionalStr(formData.get("client")),
    category: optionalStr(formData.get("category")),
    summary: str(formData.get("summary")),
    body: str(formData.get("body")),
    coverImage: optionalStr(formData.get("coverImage")),
    result: optionalStr(formData.get("result")),
    order: clampInt(formData.get("order"), 0, 9999),
    published: formData.get("published") === "on",
  };
}

function revalidateAll(slug: string) {
  revalidatePath("/admin/case-studies");
  revalidatePath("/work");
  revalidatePath(`/work/${slug}`);
  revalidatePath("/");
}

export async function createCaseStudy(formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  if (!data.title || !data.slug) throw new Error("Title and slug are required.");
  await db.caseStudy.create({ data });
  revalidateAll(data.slug);
  redirect("/admin/case-studies");
}

export async function updateCaseStudy(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  if (!data.title || !data.slug) throw new Error("Title and slug are required.");
  await db.caseStudy.update({ where: { id }, data });
  revalidateAll(data.slug);
  redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string) {
  await requireAdmin();
  const cs = await db.caseStudy.delete({ where: { id } });
  revalidateAll(cs.slug);
}
