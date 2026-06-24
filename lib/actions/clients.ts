"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { isEmail, str } from "@/lib/validation";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
}

export type ClientFormState = { ok: boolean; error?: string; message?: string };

export async function createClient(
  _prev: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  await requireAdmin();

  const name = str(formData.get("name"));
  const email = str(formData.get("email")).toLowerCase();
  const password = str(formData.get("password"));

  if (name.length < 2) return { ok: false, error: "Name is required." };
  if (!isEmail(email)) return { ok: false, error: "A valid email is required." };
  if (password.length < 8) return { ok: false, error: "Temp password must be at least 8 characters." };

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return { ok: false, error: "A user with that email already exists." };

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.create({ data: { name, email, passwordHash, role: "CLIENT" } });

  revalidatePath("/admin/clients");
  revalidatePath("/admin/projects");
  return { ok: true, message: `Client ${name} created.` };
}

export async function deleteClient(id: string) {
  await requireAdmin();
  // Cascade removes the client's projects + updates (schema onDelete: Cascade).
  await db.user.delete({ where: { id } });
  revalidatePath("/admin/clients");
  revalidatePath("/admin/projects");
}
