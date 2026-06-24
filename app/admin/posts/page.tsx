import Link from "next/link";
import { db } from "@/lib/db";
import { deletePost } from "@/lib/actions/posts";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

async function getPosts() {
  try {
    return await db.post.findMany({ orderBy: { updatedAt: "desc" } });
  } catch {
    return null;
  }
}

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Blog posts</h1>
          <p>{posts ? `${posts.length} total` : "Manage your blog"}</p>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary btn-sm">New post</Link>
      </div>

      {posts === null ? (
        <div className="panel empty">Database not reachable. Run migrations and seed, then refresh.</div>
      ) : posts.length === 0 ? (
        <div className="panel empty">No posts yet. Write your first one.</div>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr><th>Title</th><th>Slug</th><th>Status</th><th>Updated</th><th></th></tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td><strong style={{ color: "var(--text)" }}>{p.title}</strong></td>
                  <td className="mono" style={{ fontSize: "0.82rem" }}>/{p.slug}</td>
                  <td>
                    <span className={`badge badge-${p.published ? "WON" : "LOST"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="mono" style={{ fontSize: "0.8rem" }}>
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/admin/posts/${p.id}`} className="btn btn-ghost btn-sm">Edit</Link>
                      {p.published && <Link href={`/blog/${p.slug}`} className="btn btn-ghost btn-sm" target="_blank">View</Link>}
                      <DeleteButton action={deletePost.bind(null, p.id)} confirmText={`Delete "${p.title}"?`} />
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
