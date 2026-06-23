import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    const [newLeads, totalLeads, publishedPosts, caseStudies, activeProjects] =
      await Promise.all([
        db.lead.count({ where: { status: "NEW" } }),
        db.lead.count(),
        db.post.count({ where: { published: true } }),
        db.caseStudy.count(),
        db.project.count({ where: { status: { not: "LAUNCHED" } } }),
      ]);
    return { newLeads, totalLeads, publishedPosts, caseStudies, activeProjects };
  } catch {
    return null;
  }
}

export default async function AdminOverview() {
  const counts = await getCounts();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Overview</h1>
          <p>Your studio at a glance.</p>
        </div>
      </div>

      {!counts ? (
        <div className="panel empty">
          Database not reachable yet. Run <code>prisma migrate deploy</code> and{" "}
          <code>prisma db seed</code>, then refresh.
        </div>
      ) : (
        <div className="stat-cards">
          <Link href="/admin/leads" className="stat-card">
            <div className="n flame-text">{counts.newLeads}</div>
            <div className="l">New leads</div>
          </Link>
          <Link href="/admin/leads" className="stat-card">
            <div className="n">{counts.totalLeads}</div>
            <div className="l">Total leads</div>
          </Link>
          <Link href="/admin/posts" className="stat-card">
            <div className="n">{counts.publishedPosts}</div>
            <div className="l">Published posts</div>
          </Link>
          <Link href="/admin/case-studies" className="stat-card">
            <div className="n">{counts.caseStudies}</div>
            <div className="l">Case studies</div>
          </Link>
          <Link href="/admin/projects" className="stat-card">
            <div className="n">{counts.activeProjects}</div>
            <div className="l">Active projects</div>
          </Link>
        </div>
      )}

      <div className="panel">
        <h2>Quick actions</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/admin/leads" className="btn btn-ghost btn-sm">Manage leads</Link>
          <Link href="/admin/posts" className="btn btn-ghost btn-sm">Write a post</Link>
          <Link href="/admin/case-studies" className="btn btn-ghost btn-sm">Add case study</Link>
          <Link href="/admin/clients" className="btn btn-ghost btn-sm">Add client</Link>
          <Link href="/admin/projects" className="btn btn-ghost btn-sm">New project</Link>
        </div>
      </div>
    </>
  );
}
