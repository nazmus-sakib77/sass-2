import { db } from "@/lib/db";
import { deleteClient } from "@/lib/actions/clients";
import ClientCreateForm from "@/components/admin/ClientCreateForm";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

async function getClients() {
  try {
    return await db.user.findMany({
      where: { role: "CLIENT" },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { projects: true } } },
    });
  } catch {
    return null;
  }
}

export default async function AdminClientsPage() {
  const clients = await getClients();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Clients</h1>
          <p>{clients ? `${clients.length} client${clients.length === 1 ? "" : "s"}` : "Manage portal access"}</p>
        </div>
      </div>

      <div className="panel">
        <h2>Add a client</h2>
        <ClientCreateForm />
      </div>

      {clients === null ? (
        <div className="panel empty">Database not reachable. Run migrations and seed, then refresh.</div>
      ) : clients.length === 0 ? (
        <div className="panel empty">No clients yet. Create one above to give them portal access.</div>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Projects</th><th>Since</th><th></th></tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td><strong style={{ color: "var(--text)" }}>{c.name}</strong></td>
                  <td>{c.email}</td>
                  <td className="mono">{c._count.projects}</td>
                  <td className="mono" style={{ fontSize: "0.8rem" }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <DeleteButton
                      action={deleteClient.bind(null, c.id)}
                      confirmText={`Delete ${c.name}? This also deletes their projects.`}
                    />
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
