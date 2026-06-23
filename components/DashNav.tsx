"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type DashLink = { href: string; label: string };

export default function DashNav({ links }: { links: DashLink[] }) {
  const pathname = usePathname();
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {links.map((l) => {
        const active = pathname === l.href || (l.href !== "/admin" && l.href !== "/portal" && pathname.startsWith(l.href));
        return (
          <Link key={l.href} href={l.href} className={`dash-link${active ? " active" : ""}`}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
