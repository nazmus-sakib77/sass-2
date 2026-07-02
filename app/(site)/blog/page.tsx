import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { getPublishedPosts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on design, engineering, and shipping product from the Tomotik team.",
};

function fmt(d: Date | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Blog</p>
            <h1>Field notes from the studio.</h1>
            <p className="section-lead">Design, engineering, and lessons from shipping real products.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {posts.length === 0 ? (
            <div className="card" style={{ textAlign: "center", color: "var(--text-muted)" }}>
              No posts published yet. Check back soon.
            </div>
          ) : (
            <Stagger className="grid grid-3">
              {posts.map((p) => (
                <StaggerItem key={p.id} style={{ display: "flex" }}>
                  <Link href={`/blog/${p.slug}`} className="work-card" style={{ width: "100%" }}>
                    <div
                      className="work-card-cover"
                      style={p.coverImage ? { backgroundImage: `url(${p.coverImage})` } : undefined}
                    />
                    <div className="work-card-body">
                      <div className="work-card-meta">{fmt(p.publishedAt)}</div>
                      <h3>{p.title}</h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{p.excerpt}</p>
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
