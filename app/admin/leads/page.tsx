import { db } from "@/lib/db";
import { LeadStatusSelect, LeadNotes, LeadDelete } from "@/components/admin/LeadControls";

export const dynamic = "force-dynamic";

async function getLeads() {
  try {
    return await db.lead.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return null;
  }
}

function fmtDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  if (leads === null) {
    return (
      <>
        <div className="dash-head"><div><h1>Leads</h1></div></div>
        <div className="panel empty">Database not reachable. Run migrations and seed, then refresh.</div>
      </>
    );
  }

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Leads</h1>
          <p>
            {counts.NEW ?? 0} new · {leads.length} total · {counts.WON ?? 0} won
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="panel empty">No leads yet. Enquiries from the quote and contact forms appear here.</div>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Name / Email</th>
                <th>Service</th>
                <th>Budget</th>
                <th>Message &amp; notes</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>
                    <strong style={{ color: "var(--text)" }}>{l.name}</strong>
                    <br />
                    <a href={`mailto:${l.email}`} className="flame-text" style={{ fontSize: "0.85rem" }}>{l.email}</a>
                  </td>
                  <td>{l.service ?? "—"}</td>
                  <td>{l.budget ?? "—"}</td>
                  <td style={{ minWidth: 260, maxWidth: 340 }}>
                    <div style={{ marginBottom: 8 }}>{l.message}</div>
                    {l.timeline && <div style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginBottom: 8 }}>Timeline: {l.timeline}</div>}
                    <LeadNotes id={l.id} notes={l.notes} />
                  </td>
                  <td><LeadStatusSelect id={l.id} status={l.status} /></td>
                  <td className="mono" style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>{fmtDate(l.createdAt)}</td>
                  <td><LeadDelete id={l.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
