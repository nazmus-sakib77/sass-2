import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updatePost } from "@/lib/actions/posts";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await db.post.findUnique({ where: { id: params.id } }).catch(() => null);
  if (!post) notFound();

  const action = updatePost.bind(null, post.id);

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Edit post</h1>
          <p className="mono" style={{ fontSize: "0.82rem" }}>/blog/{post.slug}</p>
        </div>
        <Link href="/admin/posts" className="btn btn-ghost btn-sm">← Back</Link>
      </div>
      <div className="panel">
        <PostForm
          action={action}
          submitLabel="Save changes"
          defaults={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            body: post.body,
            coverImage: post.coverImage,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
            published: post.published,
          }}
        />
      </div>
    </>
  );
}
