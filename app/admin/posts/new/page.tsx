import Link from "next/link";
import { createPost } from "@/lib/actions/posts";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <>
      <div className="dash-head">
        <div>
          <h1>New post</h1>
          <p>Write in Markdown. It&apos;s sanitized on render.</p>
        </div>
        <Link href="/admin/posts" className="btn btn-ghost btn-sm">← Back</Link>
      </div>
      <div className="panel">
        <PostForm action={createPost} submitLabel="Create post" />
      </div>
    </>
  );
}
