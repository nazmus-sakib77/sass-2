import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get a quote",
  description: "Tell us about your project and get a tailored quote from Tomotik.",
};

export default function GetQuotePage() {
  return (
    <section className="page-head">
      <div className="container">
        <div className="grid grid-2" style={{ alignItems: "start", gap: 48 }}>
          <Reveal>
            <p className="eyebrow">Get a quote</p>
            <h1>Let&apos;s scope your project.</h1>
            <p className="section-lead" style={{ marginBottom: 28 }}>
              Share a few details and we&apos;ll come back with a clear plan, timeline, and price.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {site.process.map((s) => (
                <li key={s.step} style={{ display: "flex", gap: 12 }}>
                  <span className="mono flame-text" style={{ fontWeight: 700 }}>{s.step}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card">
              <LeadForm variant="quote" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
