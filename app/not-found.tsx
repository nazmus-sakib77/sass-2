import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div>
        <p className="eyebrow">404</p>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", marginBottom: 14 }}>
          This page went up in <span className="flame-text">flames.</span>
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </div>
    </main>
  );
}
