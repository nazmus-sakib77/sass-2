import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashNav from "@/components/DashNav";
import LogoutButton from "@/components/LogoutButton";
import { site } from "@/lib/content";
import "../admin.css";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/posts", label: "Blog posts" },
  { href: "/admin/case-studies", label: "Case studies" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/projects", label: "Projects" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defence-in-depth: middleware already guards /admin, but verify here too.
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "ADMIN") redirect("/portal");

  return (
    <div className="dash">
      <aside className="dash-side">
        <Link href="/" className="dash-brand">
          <span className="brand-mark" aria-hidden />
          {site.name}
        </Link>
        <span className="dash-navlabel">Admin</span>
        <DashNav links={links} />
        <div className="dash-side-foot">
          <div className="dash-user">
            <strong>{session.user.name}</strong>
            {session.user.email}
          </div>
          <LogoutButton />
        </div>
      </aside>
      <div className="dash-main">{children}</div>
    </div>
  );
}
