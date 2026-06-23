import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { STATUS_LABEL } from "@/lib/labels";

export const dynamic = "force-dynamic";

async function getMyProjects(userId: string) {
  try {
    return await db.project.findMany({
      where: { clientId: userId },
      orderBy: { updatedAt: "desc" },
      include: {
        updates: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });
  } catch {
    return [];
  }
}

export default async function PortalHome() {
  const session = await auth();
  const userId = session!.user.id;
  const projects = await getMyProjects(userId);

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Welcome, {session!.user.name}</h1>
          <p>Here&apos;s the status of your projects.</p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="panel empty">
          You don&apos;t have any projects yet. We&apos;ll add them here as soon as your work kicks off.
        </div>
      ) : (
        <div className="portal-grid">
          {projects.map((p) => {
            const latest = p.updates[0];
            return (
              <Link key={p.id} href={`/portal/${p.id}`} className="card" style={{ display: "block" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span className={`badge badge-${p.status}`}>{STATUS_LABEL[p.status]}</span>
                  <span className="mono" style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>{p.progress}%</span>
                </div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>{p.title}</h3>
                <div className="progress" style={{ marginBottom: 14 }}>
                  <span style={{ width: `${p.progress}%` }} />
                </div>
                {latest ? (
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    <strong style={{ color: "var(--text)" }}>{latest.title}</strong> — {latest.body.slice(0, 90)}
                    {latest.body.length > 90 ? "…" : ""}
                  </p>
                ) : (
                  <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>No updates yet.</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
