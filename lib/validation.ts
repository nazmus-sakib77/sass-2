export function str(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export function optionalStr(value: FormDataEntryValue | null): string | null {
  const s = str(value);
  return s.length ? s : null;
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function clampInt(value: FormDataEntryValue | null, min: number, max: number): number {
  const n = Number.parseInt(str(value), 10);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
