import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent project and retainer pricing from Tomotik.",
};

export default function PricingPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Pricing</p>
            <h1>Clear pricing. No surprises.</h1>
            <p className="section-lead">
              Fixed-scope projects or an ongoing partnership — pick the model that fits where you are.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Stagger className="grid grid-3">
            {site.pricing.map((tier) => (
              <StaggerItem key={tier.name}>
                <div
                  className="card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderColor: tier.featured ? "var(--flame-2)" : undefined,
                    background: tier.featured
                      ? "linear-gradient(135deg, rgba(255,77,0,0.08), rgba(255,176,32,0.03))"
                      : undefined,
                  }}
                >
                  {tier.featured && (
                    <span className="tag" style={{ alignSelf: "flex-start", marginBottom: 14, borderColor: "var(--flame-2)", color: "var(--flame-3)" }}>
                      Most popular
                    </span>
                  )}
                  <h3 style={{ fontSize: "1.4rem", marginBottom: 6 }}>{tier.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 12 }}>
                    <span className="stat-num flame-text" style={{ fontSize: "2rem" }}>{tier.price}</span>
                    <span style={{ color: "var(--text-dim)" }}>{tier.cadence}</span>
                  </div>
                  <p style={{ color: "var(--text-muted)", marginBottom: 18 }}>{tier.summary}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
                        <span className="flame-text">✓ </span>{f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/get-quote"
                    className={`btn ${tier.featured ? "btn-primary" : "btn-ghost"}`}
                    style={{ marginTop: "auto" }}
                  >
                    Get started
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-head">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="section-title">Common questions</h2>
            </div>
          </div>
          <Stagger className="grid grid-2">
            {site.faqs.map((faq) => (
              <StaggerItem key={faq.q}>
                <div className="card" style={{ height: "100%" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>{faq.q}</h3>
                  <p style={{ color: "var(--text-muted)" }}>{faq.a}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
