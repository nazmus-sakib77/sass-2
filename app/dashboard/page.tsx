import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Role router: sends ADMIN to /admin, CLIENT to /portal. */
export default async function DashboardRedirect() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");
  redirect("/portal");
}
