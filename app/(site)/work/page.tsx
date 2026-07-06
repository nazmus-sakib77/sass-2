import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { getPublishedCaseStudies } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from Tomotik — what we built, for whom, and what it changed.",
};

export default async function WorkPage() {
  const items = await getPublishedCaseStudies();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Work</p>
            <h1>Selected work.</h1>
            <p className="section-lead">
              Projects we&apos;re proud of — each case study covers what we built,
              for whom, and what it changed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {items.length === 0 ? (
            <div className="card" style={{ textAlign: "center", color: "var(--text-muted)" }}>
              We&apos;re writing up our first case studies now. Want to see work relevant
              to your project? <Link href="/get-quote" className="flame-text">Ask us on a call</Link>.
            </div>
          ) : (
            <Stagger className="grid grid-3">
              {items.map((cs) => (
                <StaggerItem key={cs.id} style={{ display: "flex" }}>
                  <Link href={`/work/${cs.slug}`} className="work-card" style={{ width: "100%" }}>
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
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </>
  );
}
