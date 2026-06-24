import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function fmt(d: Date | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const html = renderMarkdown(post.body);

  return (
    <article className="section" style={{ paddingTop: 64 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/blog" className="flame-text" style={{ fontSize: "0.9rem" }}>← All posts</Link>
        <p className="eyebrow" style={{ marginTop: 20 }}>{fmt(post.publishedAt)}</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", margin: "10px 0 18px" }}>{post.title}</h1>
        <p className="section-lead" style={{ marginBottom: 28 }}>{post.excerpt}</p>
        {post.coverImage && (
          <div
            className="work-card-cover"
            style={{ backgroundImage: `url(${post.coverImage})`, borderRadius: "var(--radius)", marginBottom: 32 }}
          />
        )}
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
