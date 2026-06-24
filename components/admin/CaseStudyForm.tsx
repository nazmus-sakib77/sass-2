"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

type Defaults = {
  title?: string;
  slug?: string;
  client?: string | null;
  category?: string | null;
  summary?: string;
  body?: string;
  coverImage?: string | null;
  result?: string | null;
  order?: number;
  published?: boolean;
};

function Save({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}

export default function CaseStudyForm({
  action,
  defaults = {},
  submitLabel = "Save case study",
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaults?: Defaults;
  submitLabel?: string;
}) {
  const [slug, setSlug] = useState(defaults.slug ?? "");
  const slugEdited = useRef(Boolean(defaults.slug));

  function autoSlug(title: string) {
    if (slugEdited.current) return;
    setSlug(title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, ""));
  }

  return (
    <form action={action} className="form">
      <div className="form-row">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" defaultValue={defaults.title} onChange={(e) => autoSlug(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" value={slug} onChange={(e) => { slugEdited.current = true; setSlug(e.target.value); }} placeholder="auto-from-title" required />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="client">Client</label>
          <input id="client" name="client" defaultValue={defaults.client ?? ""} placeholder="Acme Inc." />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={defaults.category ?? ""} placeholder="Web Platform" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="summary">Summary</label>
        <textarea id="summary" name="summary" defaultValue={defaults.summary} style={{ minHeight: 70 }} required />
      </div>

      <div className="field">
        <label htmlFor="coverImage">Cover image URL</label>
        <input id="coverImage" name="coverImage" defaultValue={defaults.coverImage ?? ""} placeholder="https://…" />
      </div>

      <div className="field">
        <label htmlFor="body">Body (Markdown)</label>
        <textarea id="body" name="body" defaultValue={defaults.body} style={{ minHeight: 260, fontFamily: "var(--font-mono)" }} required />
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="result">Headline result</label>
          <input id="result" name="result" defaultValue={defaults.result ?? ""} placeholder="+180% conversions" />
        </div>
        <div className="field">
          <label htmlFor="order">Order</label>
          <input id="order" name="order" type="number" min={0} defaultValue={defaults.order ?? 0} />
        </div>
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
        <input type="checkbox" name="published" defaultChecked={defaults.published} style={{ width: 18, height: 18 }} />
        <span>Published (visible on /work and homepage)</span>
      </label>

      <Save label={submitLabel} />
    </form>
  );
}
