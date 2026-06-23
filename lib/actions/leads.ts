"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { isEmail, optionalStr, str } from "@/lib/validation";
import { LeadStatus } from "@prisma/client";

export type LeadFormState = {
  ok: boolean;
  error?: string;
  message?: string;
};

/** Public: capture a lead from the marketing forms. No auth required. */
export async function createLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name = str(formData.get("name"));
  const email = str(formData.get("email"));
  const message = str(formData.get("message"));

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!isEmail(email)) return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 5) return { ok: false, error: "Please tell us a little about your project." };

  try {
    await db.lead.create({
      data: {
        name,
        email,
        service: optionalStr(formData.get("service")),
        budget: optionalStr(formData.get("budget")),
        timeline: optionalStr(formData.get("timeline")),
        message,
      },
    });
  } catch {
    return { ok: false, error: "Something went wrong saving your enquiry. Please try again." };
  }

  return { ok: true, message: "Thanks — your enquiry is in. We'll be in touch within one business day." };
}

/** Admin-only helpers below. */

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAdmin();
  await db.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

export async function updateLeadNotes(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get("id"));
  const notes = optionalStr(formData.get("notes"));
  if (!id) return;
  await db.lead.update({ where: { id }, data: { notes } });
  revalidatePath("/admin/leads");
}

export async function deleteLead(id: string) {
  await requireAdmin();
  await db.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}
