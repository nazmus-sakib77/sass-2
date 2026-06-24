"use client";

import { useTransition } from "react";

export default function DeleteButton({
  action,
  label = "Delete",
  confirmText = "Delete this item permanently?",
  className = "btn btn-danger btn-sm",
}: {
  action: () => void | Promise<void>;
  label?: string;
  confirmText?: string;
  className?: string;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      className={className}
      disabled={pending}
      onClick={() => {
        if (confirm(confirmText)) start(async () => { await action(); });
      }}
    >
      {pending ? "…" : label}
    </button>
  );
}
