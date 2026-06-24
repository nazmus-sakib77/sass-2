import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateCaseStudy } from "@/lib/actions/case-studies";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({ params }: { params: { id: string } }) {
  const cs = await db.caseStudy.findUnique({ where: { id: params.id } }).catch(() => null);
  if (!cs) notFound();

  const action = updateCaseStudy.bind(null, cs.id);

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Edit case study</h1>
          <p className="mono" style={{ fontSize: "0.82rem" }}>/work/{cs.slug}</p>
        </div>
        <Link href="/admin/case-studies" className="btn btn-ghost btn-sm">← Back</Link>
      </div>
      <div className="panel">
        <CaseStudyForm
          action={action}
          submitLabel="Save changes"
          defaults={{
            title: cs.title,
            slug: cs.slug,
            client: cs.client,
            category: cs.category,
            summary: cs.summary,
            body: cs.body,
            coverImage: cs.coverImage,
            result: cs.result,
            order: cs.order,
            published: cs.published,
          }}
        />
      </div>
    </>
  );
}
