import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

marked.setOptions({ gfm: true, breaks: true });

/** Render trusted-author Markdown to sanitized HTML (no raw HTML injection). */
export function renderMarkdown(md: string): string {
  const raw = marked.parse(md ?? "", { async: false }) as string;
  return DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
}
