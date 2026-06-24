import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { STATUS_LABEL } from "@/lib/labels";

export const dynamic = "force-dynamic";

async function getOwnedProject(projectId: string, userId: string, isAdmin: boolean) {
  try {
    return await db.project.findFirst({
      // CRITICAL: a CLIENT may only read projects they own. Admins may read any.
      where: isAdmin ? { id: projectId } : { id: projectId, clientId: userId },
      include: {
        client: true,
        updates: { orderBy: { createdAt: "desc" } },
      },
    });
  } catch {
    return null;
  }
}

export default async function PortalProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const session = await auth();
  const userId = session!.user.id;
  const isAdmin = session!.user.role === "ADMIN";

  const project = await getOwnedProject(params.projectId, userId, isAdmin);
  // Returns 404 (not 403) so we don't leak whether another client's project exists.
  if (!project) notFound();

  return (
    <>
      <div className="dash-head">
        <div>
          <Link href="/portal" className="flame-text" style={{ fontSize: "0.9rem" }}>← My projects</Link>
          <h1 style={{ marginTop: 10 }}>{project.title}</h1>
          {project.description && <p>{project.description}</p>}
        </div>
        <span className={`badge badge-${project.status}`}>{STATUS_LABEL[project.status]}</span>
      </div>

      <div className="panel">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <strong>Progress</strong>
          <span className="mono flame-text">{project.progress}%</span>
        </div>
        <div className="progress"><span style={{ width: `${project.progress}%` }} /></div>
      </div>

      <div className="panel">
        <h2>Timeline</h2>
        {project.updates.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No updates yet. We&apos;ll post progress here as we go.</p>
        ) : (
          <ul className="timeline">
            {project.updates.map((u) => (
              <li key={u.id}>
                <span className="timeline-date">{new Date(u.createdAt).toLocaleString()}</span>
                <div style={{ color: "var(--text)", fontWeight: 600, fontSize: "1.05rem", margin: "2px 0 4px" }}>{u.title}</div>
                <div style={{ color: "var(--text-muted)" }}>{u.body}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
