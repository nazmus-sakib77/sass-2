import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getPublishedCaseStudies } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies — full-stack platforms, marketing sites, and products built by Tomotik.",
};

export default async function WorkPage() {
  const items = await getPublishedCaseStudies();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Work</p>
            <h1>Products we&apos;ve set on fire.</h1>
            <p className="section-lead">A selection of platforms, sites, and systems we&apos;ve designed and shipped.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {items.length === 0 ? (
            <div className="card" style={{ textAlign: "center", color: "var(--text-muted)" }}>
              Case studies are on their way. <Link href="/get-quote" className="flame-text">Start your own project</Link>.
            </div>
          ) : (
            <div className="grid grid-3">
              {items.map((cs, i) => (
                <Reveal key={cs.id} delay={i * 0.05}>
                  <Link href={`/work/${cs.slug}`} className="work-card" style={{ height: "100%" }}>
                    <div className="work-card-cover" style={cs.coverImage ? { backgroundImage: `url(${cs.coverImage})` } : undefined} />
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
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
