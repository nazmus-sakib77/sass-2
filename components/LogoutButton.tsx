"use client";

import { logout } from "@/lib/actions/auth";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <form action={logout}>
      <button type="submit" className={className ?? "btn btn-ghost btn-sm"}>
        Sign out
      </button>
    </form>
  );
}
