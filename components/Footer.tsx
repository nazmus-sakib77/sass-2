import Link from "next/link";
import { site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 14 }}>
              <span className="brand-mark" aria-hidden />
              {site.name}
            </Link>
            <p style={{ color: "var(--text-muted)", maxWidth: 320, marginTop: 14 }}>
              {site.description}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: 16 }}>
              Explore
            </h4>
            <ul className="footer-links">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-dim)", marginBottom: 16 }}>
              Get in touch
            </h4>
            <ul className="footer-links">
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><Link href="/get-quote">Get a free quote</Link></li>
              <li><Link href="/login">Client portal</Link></li>
              <li><a href={site.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span className="mono">{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
