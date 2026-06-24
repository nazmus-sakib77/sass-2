"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

type PostDefaults = {
  title?: string;
  slug?: string;
  excerpt?: string;
  body?: string;
  coverImage?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
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

export default function PostForm({
  action,
  defaults = {},
  submitLabel = "Save post",
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaults?: PostDefaults;
  submitLabel?: string;
}) {
  const [slug, setSlug] = useState(defaults.slug ?? "");
  const slugEdited = useRef(Boolean(defaults.slug));

  function autoSlug(title: string) {
    if (slugEdited.current) return;
    setSlug(
      title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "")
    );
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
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => { slugEdited.current = true; setSlug(e.target.value); }}
            placeholder="auto-from-title"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" name="excerpt" defaultValue={defaults.excerpt} style={{ minHeight: 70 }} required />
      </div>

      <div className="field">
        <label htmlFor="coverImage">Cover image URL</label>
        <input id="coverImage" name="coverImage" defaultValue={defaults.coverImage ?? ""} placeholder="https://…" />
      </div>

      <div className="field">
        <label htmlFor="body">Body (Markdown)</label>
        <textarea id="body" name="body" defaultValue={defaults.body} style={{ minHeight: 280, fontFamily: "var(--font-mono)" }} required />
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="seoTitle">SEO title</label>
          <input id="seoTitle" name="seoTitle" defaultValue={defaults.seoTitle ?? ""} />
        </div>
        <div className="field">
          <label htmlFor="seoDescription">SEO description</label>
          <input id="seoDescription" name="seoDescription" defaultValue={defaults.seoDescription ?? ""} />
        </div>
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
        <input type="checkbox" name="published" defaultChecked={defaults.published} style={{ width: 18, height: 18 }} />
        <span>Published (visible on /blog)</span>
      </label>

      <Save label={submitLabel} />
    </form>
  );
}
