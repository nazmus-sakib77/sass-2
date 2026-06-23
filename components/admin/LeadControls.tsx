"use client";

import { useTransition } from "react";
import type { LeadStatus } from "@prisma/client";
import { updateLeadStatus, updateLeadNotes, deleteLead } from "@/lib/actions/leads";
import { LEAD_STATUSES, LEAD_STATUS_LABEL } from "@/lib/labels";

export function LeadStatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  const [pending, start] = useTransition();
  return (
    <select
      className="badge"
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as LeadStatus;
        start(() => updateLeadStatus(id, next));
      }}
      style={{ cursor: "pointer" }}
    >
      {LEAD_STATUSES.map((s) => (
        <option key={s} value={s}>
          {LEAD_STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}

export function LeadNotes({ id, notes }: { id: string; notes: string | null }) {
  return (
    <form action={updateLeadNotes} className="inline-form" style={{ flexDirection: "column", alignItems: "stretch" }}>
      <input type="hidden" name="id" value={id} />
      <textarea name="notes" defaultValue={notes ?? ""} placeholder="Add a note…" />
      <button type="submit" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }}>
        Save note
      </button>
    </form>
  );
}

export function LeadDelete({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this lead permanently?")) start(() => deleteLead(id));
      }}
    >
      Delete
    </button>
  );
}
