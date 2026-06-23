import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { site } from "@/lib/content";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the Tomotik admin and client portal.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const callbackUrl = searchParams.callbackUrl || "/dashboard";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Link href="/" className="brand" style={{ justifyContent: "center", marginBottom: 28, display: "flex" }}>
          <span className="brand-mark" aria-hidden />
          {site.name}
        </Link>

        <div className="card">
          <h1 style={{ fontSize: "1.5rem", marginBottom: 6 }}>Welcome back</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: 22, fontSize: "0.95rem" }}>
            Sign in to your admin dashboard or client portal.
          </p>
          <LoginForm callbackUrl={callbackUrl} />
        </div>

        <p style={{ textAlign: "center", color: "var(--text-dim)", marginTop: 20, fontSize: "0.88rem" }}>
          Need access? <Link href="/contact" className="flame-text">Get in touch</Link>.
        </p>
      </div>
    </main>
  );
}
