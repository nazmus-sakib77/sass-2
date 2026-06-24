"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { clampInt, optionalStr, str } from "@/lib/validation";
import type { ProjectStatus } from "@prisma/client";
import { PROJECT_STATUSES } from "@/lib/labels";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const title = str(formData.get("title"));
  const clientId = str(formData.get("clientId"));
  if (!title || !clientId) throw new Error("Title and client are required.");

  // Ensure the assigned user exists and is a client/admin record.
  const client = await db.user.findUnique({ where: { id: clientId } });
  if (!client) throw new Error("Selected client does not exist.");

  await db.project.create({
    data: {
      title,
      description: optionalStr(formData.get("description")),
      clientId,
    },
  });
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const statusRaw = str(formData.get("status")) as ProjectStatus;
  const status = PROJECT_STATUSES.includes(statusRaw) ? statusRaw : undefined;
  const progress = clampInt(formData.get("progress"), 0, 100);

  await db.project.update({
    where: { id },
    data: {
      status,
      progress,
      title: str(formData.get("title")) || undefined,
      description: optionalStr(formData.get("description")),
    },
  });
  revalidatePath("/admin/projects");
  revalidatePath(`/portal/${id}`);
  revalidatePath("/portal");
}

export async function addProjectUpdate(projectId: string, formData: FormData) {
  await requireAdmin();
  const title = str(formData.get("title"));
  const body = str(formData.get("body"));
  if (!title || !body) throw new Error("Update title and body are required.");

  await db.projectUpdate.create({ data: { projectId, title, body } });
  revalidatePath("/admin/projects");
  revalidatePath(`/portal/${projectId}`);
  revalidatePath("/portal");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await db.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}
