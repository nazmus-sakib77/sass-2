import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — a product studio building fast, modern full-stack web platforms.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1>A small studio with a serious obsession for shipping.</h1>
            <p className="section-lead">
              {site.name} is a product studio. We pair sharp design with full-stack engineering to
              turn ideas into live products — fast, reliable, and built to grow.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Stagger className="grid grid-3">
            {site.stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="card stat" style={{ height: "100%" }}>
                  <span className="stat-num flame-text">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Stagger className="grid grid-2">
            <StaggerItem>
              <div className="card" style={{ height: "100%" }}>
                <h3 style={{ fontSize: "1.3rem", marginBottom: 10 }}>How we think</h3>
                <p style={{ color: "var(--text-muted)" }}>
                  Systems over one-offs. We build design systems and typed codebases so every
                  project is fast to extend and a pleasure to maintain. No mystery code, no surprises.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card" style={{ height: "100%" }}>
                <h3 style={{ fontSize: "1.3rem", marginBottom: 10 }}>How we work</h3>
                <p style={{ color: "var(--text-muted)" }}>
                  Tight increments, frequent demos, and a single point of contact. You always know
                  what we&apos;re building, why, and what&apos;s next.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
          <div style={{ marginTop: 40 }}>
            <Link href="/contact" className="btn btn-primary">Work with us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
