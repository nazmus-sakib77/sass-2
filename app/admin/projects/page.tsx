import { db } from "@/lib/db";
import { createProject, updateProject, addProjectUpdate, deleteProject } from "@/lib/actions/projects";
import { PROJECT_STATUSES, STATUS_LABEL } from "@/lib/labels";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [clients, projects] = await Promise.all([
      db.user.findMany({ where: { role: "CLIENT" }, orderBy: { name: "asc" } }),
      db.project.findMany({
        orderBy: { updatedAt: "desc" },
        include: {
          client: true,
          updates: { orderBy: { createdAt: "desc" } },
        },
      }),
    ]);
    return { clients, projects };
  } catch {
    return null;
  }
}

export default async function AdminProjectsPage() {
  const data = await getData();

  if (data === null) {
    return (
      <>
        <div className="dash-head"><div><h1>Projects</h1></div></div>
        <div className="panel empty">Database not reachable. Run migrations and seed, then refresh.</div>
      </>
    );
  }

  const { clients, projects } = data;

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Projects</h1>
          <p>{projects.length} total · {clients.length} clients</p>
        </div>
      </div>

      <div className="panel">
        <h2>New project</h2>
        {clients.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>Add a client first on the Clients page.</p>
        ) : (
          <form action={createProject} className="form">
            <div className="form-row">
              <div className="field">
                <label htmlFor="p-title">Title</label>
                <input id="p-title" name="title" required />
              </div>
              <div className="field">
                <label htmlFor="p-client">Client</label>
                <select id="p-client" name="clientId" defaultValue="" required>
                  <option value="" disabled>Select a client</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="p-desc">Description</label>
              <textarea id="p-desc" name="description" style={{ minHeight: 70 }} />
            </div>
            <button type="submit" className="btn btn-primary">Create project</button>
          </form>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="panel empty">No projects yet.</div>
      ) : (
        projects.map((p) => (
          <div key={p.id} className="panel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
              <div>
                <h2 style={{ marginBottom: 4 }}>{p.title}</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  {p.client.name} · {p.client.email}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span className={`badge badge-${p.status}`}>{STATUS_LABEL[p.status]}</span>
                <DeleteButton action={deleteProject.bind(null, p.id)} confirmText={`Delete "${p.title}"?`} />
              </div>
            </div>

            <div className="progress" style={{ margin: "14px 0 20px" }}>
              <span style={{ width: `${p.progress}%` }} />
            </div>

            <div className="grid grid-2" style={{ gap: 20 }}>
              {/* Edit status / progress */}
              <form action={updateProject.bind(null, p.id)} className="form" style={{ gap: 12 }}>
                <strong style={{ fontSize: "0.9rem" }}>Update status</strong>
                <div className="field">
                  <label htmlFor={`title-${p.id}`}>Title</label>
                  <input id={`title-${p.id}`} name="title" defaultValue={p.title} />
                </div>
                <div className="field">
                  <label htmlFor={`desc-${p.id}`}>Description</label>
                  <textarea id={`desc-${p.id}`} name="description" defaultValue={p.description ?? ""} style={{ minHeight: 60 }} />
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor={`status-${p.id}`}>Status</label>
                    <select id={`status-${p.id}`} name="status" defaultValue={p.status}>
                      {PROJECT_STATUSES.map((s) => (
                        <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor={`progress-${p.id}`}>Progress %</label>
                    <input id={`progress-${p.id}`} name="progress" type="number" min={0} max={100} defaultValue={p.progress} />
                  </div>
                </div>
                <button type="submit" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }}>Save</button>
              </form>

              {/* Add update + timeline */}
              <div>
                <form action={addProjectUpdate.bind(null, p.id)} className="form" style={{ gap: 12, marginBottom: 18 }}>
                  <strong style={{ fontSize: "0.9rem" }}>Post a timeline update</strong>
                  <div className="field">
                    <label htmlFor={`ut-${p.id}`}>Update title</label>
                    <input id={`ut-${p.id}`} name="title" required />
                  </div>
                  <div className="field">
                    <label htmlFor={`ub-${p.id}`}>Details</label>
                    <textarea id={`ub-${p.id}`} name="body" style={{ minHeight: 60 }} required />
                  </div>
                  <button type="submit" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }}>Add update</button>
                </form>

                {p.updates.length > 0 && (
                  <ul className="timeline">
                    {p.updates.slice(0, 4).map((u) => (
                      <li key={u.id}>
                        <span className="timeline-date">{new Date(u.createdAt).toLocaleString()}</span>
                        <div style={{ color: "var(--text)", fontWeight: 600 }}>{u.title}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{u.body}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
