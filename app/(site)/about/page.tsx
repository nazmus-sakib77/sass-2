import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is an independent, founder-led web studio in Dhaka working with clients worldwide — small on purpose, direct by design.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1>A small studio, on purpose.</h1>
            <p className="section-lead">
              {site.name} is an independent, founder-led studio based in Dhaka and
              working with clients worldwide. We stay small so the person you talk
              to on the first call is the same person designing and building your
              site — no account managers, no handoffs, no telephone game.
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
                <h3 style={{ fontSize: "1.3rem", marginBottom: 10 }}>How we work</h3>
                <p style={{ color: "var(--text-muted)" }}>
                  Every project gets a fixed written quote before it starts, a live
                  preview link from the first week, and two revision rounds built in.
                  You always know what&apos;s being built, what it costs, and when it lands.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card" style={{ height: "100%" }}>
                <h3 style={{ fontSize: "1.3rem", marginBottom: 10 }}>What you keep</h3>
                <p style={{ color: "var(--text-muted)" }}>
                  Everything. Your domain, hosting, code, and content live in accounts
                  registered in your name. When the final invoice is paid you hold every
                  password and file — nothing about your site depends on us.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
          <div style={{ marginTop: 40 }}>
            <Link href="/get-quote" className="btn btn-primary">Get a free quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
