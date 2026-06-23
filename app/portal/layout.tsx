import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashNav from "@/components/DashNav";
import LogoutButton from "@/components/LogoutButton";
import { site } from "@/lib/content";
import "../admin.css";

const links = [{ href: "/portal", label: "My projects" }];

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/portal");

  const adminLinks = session.user.role === "ADMIN" ? [{ href: "/admin", label: "← Admin" }] : [];

  return (
    <div className="dash">
      <aside className="dash-side">
        <Link href="/" className="dash-brand">
          <span className="brand-mark" aria-hidden />
          {site.name}
        </Link>
        <span className="dash-navlabel">Client portal</span>
        <DashNav links={[...links, ...adminLinks]} />
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
