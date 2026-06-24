import Link from "next/link";
import { db } from "@/lib/db";
import { deleteCaseStudy } from "@/lib/actions/case-studies";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

async function getCaseStudies() {
  try {
    return await db.caseStudy.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  } catch {
    return null;
  }
}

export default async function AdminCaseStudiesPage() {
  const items = await getCaseStudies();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Case studies</h1>
          <p>{items ? `${items.length} total` : "Manage your portfolio"}</p>
        </div>
        <Link href="/admin/case-studies/new" className="btn btn-primary btn-sm">New case study</Link>
      </div>

      {items === null ? (
        <div className="panel empty">Database not reachable. Run migrations and seed, then refresh.</div>
      ) : items.length === 0 ? (
        <div className="panel empty">No case studies yet. Add your first one.</div>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr><th>Order</th><th>Title</th><th>Client</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((cs) => (
                <tr key={cs.id}>
                  <td className="mono">{cs.order}</td>
                  <td>
                    <strong style={{ color: "var(--text)" }}>{cs.title}</strong>
                    <br />
                    <span className="mono" style={{ fontSize: "0.8rem" }}>/{cs.slug}</span>
                  </td>
                  <td>{cs.client ?? "—"}</td>
                  <td>
                    <span className={`badge badge-${cs.published ? "WON" : "LOST"}`}>
                      {cs.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/admin/case-studies/${cs.id}`} className="btn btn-ghost btn-sm">Edit</Link>
                      {cs.published && <Link href={`/work/${cs.slug}`} className="btn btn-ghost btn-sm" target="_blank">View</Link>}
                      <DeleteButton action={deleteCaseStudy.bind(null, cs.id)} confirmText={`Delete "${cs.title}"?`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
