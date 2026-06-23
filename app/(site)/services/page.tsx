import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web platforms, product design, and growth engineering — full-stack builds from Tomotik.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h1>Everything you need to ship a modern product.</h1>
            <p className="section-lead">
              We design, build, and grow full-stack web products — and we own the outcome end to end.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            {site.services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.06}>
                <div className="card" style={{ height: "100%" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 14 }} className="flame-text">
                    {svc.icon}
                  </div>
                  <h3 style={{ fontSize: "1.3rem", marginBottom: 10 }}>{svc.title}</h3>
                  <p style={{ color: "var(--text-muted)", marginBottom: 16 }}>{svc.summary}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {svc.points.map((p) => (
                      <li key={p} style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
                        <span className="flame-text">→ </span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-head">
            <div>
              <p className="eyebrow">Process</p>
              <h2 className="section-title">A tight, transparent build loop</h2>
            </div>
          </div>
          <div className="grid grid-2">
            {site.process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.05}>
                <div className="card" style={{ display: "flex", gap: 18 }}>
                  <span className="mono flame-text" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                    {step.step}
                  </span>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: 6 }}>{step.title}</h3>
                    <p style={{ color: "var(--text-muted)" }}>{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Link href="/get-quote" className="btn btn-primary">Start a project</Link>
          </div>
        </div>
      </section>
    </>
  );
}
