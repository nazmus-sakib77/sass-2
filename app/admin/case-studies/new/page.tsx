import Link from "next/link";
import { createCaseStudy } from "@/lib/actions/case-studies";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export default function NewCaseStudyPage() {
  return (
    <>
      <div className="dash-head">
        <div>
          <h1>New case study</h1>
          <p>Showcase a project. Body is Markdown.</p>
        </div>
        <Link href="/admin/case-studies" className="btn btn-ghost btn-sm">← Back</Link>
      </div>
      <div className="panel">
        <CaseStudyForm action={createCaseStudy} submitLabel="Create case study" />
      </div>
    </>
  );
}
