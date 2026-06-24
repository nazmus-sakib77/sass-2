import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs) return { title: "Case study not found" };

  return {
    title: cs.title,
    description: cs.summary,
    openGraph: {
      title: cs.title,
      description: cs.summary,
      type: "article",
      images: cs.coverImage ? [{ url: cs.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: cs.title,
      description: cs.summary,
      images: cs.coverImage ? [cs.coverImage] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs) notFound();

  const html = renderMarkdown(cs.body);

  return (
    <article className="section" style={{ paddingTop: 64 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <Link href="/work" className="flame-text" style={{ fontSize: "0.9rem" }}>← All work</Link>
        <div className="work-card-meta" style={{ marginTop: 20 }}>
          {cs.category && <span>{cs.category}</span>}
          {cs.client && <span>· {cs.client}</span>}
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", margin: "10px 0 18px" }}>{cs.title}</h1>
        <p className="section-lead" style={{ marginBottom: 24 }}>{cs.summary}</p>

        {cs.result && (
          <div className="card" style={{ display: "inline-block", marginBottom: 28, borderColor: "var(--flame-2)" }}>
            <span className="stat-label">Result</span>
            <div className="stat-num flame-text" style={{ fontSize: "1.6rem" }}>{cs.result}</div>
          </div>
        )}

        {cs.coverImage && (
          <div
            className="work-card-cover"
            style={{ backgroundImage: `url(${cs.coverImage})`, borderRadius: "var(--radius)", marginBottom: 32 }}
          />
        )}

        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

        <div style={{ marginTop: 44, paddingTop: 28, borderTop: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: 12 }}>Want results like this?</h2>
          <Link href="/get-quote" className="btn btn-primary">Start a project</Link>
        </div>
      </div>
    </article>
  );
}
