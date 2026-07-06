import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { site } from "@/lib/content";
import { getPublishedCaseStudies } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const caseStudies = await getPublishedCaseStudies(3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Independent design &amp; development studio</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1>
              Websites that <span className="flame-text">win you customers.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="hero-lead">
              Tomotik is a small studio that designs and builds fast, modern websites
              and web apps for small businesses. Fixed quotes, honest timelines, and
              one team from first call to launch.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="hero-cta">
              <Link href="/get-quote" className="btn btn-primary">
                Get a free quote
              </Link>
              <Link href="/work" className="btn btn-ghost">
                See our work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="container" style={{ paddingBottom: 24 }}>
        <Stagger className="grid grid-3">
          {site.stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="stat">
                <span className="stat-num flame-text">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div className="grid-head">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="section-title">Three ways we can help</h2>
            </div>
            <Link href="/services" className="btn btn-ghost btn-sm">
              All services
            </Link>
          </div>
          <Stagger className="grid grid-3">
            {site.services.map((svc) => (
              <StaggerItem key={svc.title}>
                <div className="card" style={{ height: "100%" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 14 }} className="flame-text">
                    {svc.icon}
                  </div>
                  <h3 style={{ fontSize: "1.3rem", marginBottom: 10 }}>{svc.title}</h3>
                  <p style={{ color: "var(--text-muted)", marginBottom: 16 }}>{svc.summary}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {svc.points.map((p) => (
                      <li key={p} style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
                        <span className="flame-text">→ </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Work (DB-driven) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-head">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="section-title">Recent case studies</h2>
            </div>
            <Link href="/work" className="btn btn-ghost btn-sm">
              View all work
            </Link>
          </div>

          {caseStudies.length === 0 ? (
            <div className="card" style={{ textAlign: "center", color: "var(--text-muted)" }}>
              We&apos;re writing up our first case studies now. Want to see work relevant
              to your project? <Link href="/get-quote" className="flame-text">Ask us on a call</Link>.
            </div>
          ) : (
            <Stagger className="grid grid-3">
              {caseStudies.map((cs) => (
                <StaggerItem key={cs.id} style={{ display: "flex" }}>
                  <Link href={`/work/${cs.slug}`} className="work-card" style={{ width: "100%" }}>
                    <div
                      className="work-card-cover"
                      style={cs.coverImage ? { backgroundImage: `url(${cs.coverImage})` } : undefined}
                    />
                    <div className="work-card-body">
                      <div className="work-card-meta">
                        {cs.category && <span>{cs.category}</span>}
                        {cs.client && <span>· {cs.client}</span>}
                      </div>
                      <h3>{cs.title}</h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{cs.summary}</p>
                      {cs.result && <div className="work-card-result">{cs.result}</div>}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-head">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-title">From first call to launch</h2>
            </div>
          </div>
          <Stagger className="grid grid-2">
            {site.process.map((step) => (
              <StaggerItem key={step.step}>
                <div className="card" style={{ display: "flex", gap: 18, height: "100%" }}>
                  <span className="mono flame-text" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                    {step.step}
                  </span>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: 6 }}>{step.title}</h3>
                    <p style={{ color: "var(--text-muted)" }}>{step.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div
              className="card"
              style={{
                textAlign: "center",
                padding: "56px 28px",
                background: "linear-gradient(135deg, rgba(255,77,0,0.08), rgba(255,176,32,0.04))",
                borderColor: "var(--border-strong)",
              }}
            >
              <h2 className="section-title" style={{ marginBottom: 12 }}>
                Got something to build?
              </h2>
              <p className="section-lead" style={{ margin: "0 auto 28px" }}>
                Tell us what you need. We reply within one business day, offer a free
                30-minute call, and send a fixed quote within two — no pressure, no jargon.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/get-quote" className="btn btn-primary">Get a free quote</Link>
                <Link href="/contact" className="btn btn-ghost">Ask a question</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
