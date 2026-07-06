import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get a free quote",
  description:
    "Tell us about your project. We reply within one business day and send a fixed written quote within two — no obligation.",
};

const nextSteps = [
  {
    step: "01",
    title: "We reply within one business day",
    body: "A real person — not a bot — reads every enquiry and replies with first thoughts and any questions.",
  },
  {
    step: "02",
    title: "Free 30-minute scoping call",
    body: "We talk goals, budget, and timeline. If we're not the right fit for your project, we'll say so and point you somewhere good.",
  },
  {
    step: "03",
    title: "Fixed quote within two business days",
    body: "A written quote with the scope, price, and timeline. No obligation, and the price you approve is the price you pay.",
  },
];

export default function GetQuotePage() {
  return (
    <section className="page-head">
      <div className="container">
        <div className="grid grid-2" style={{ alignItems: "start", gap: 48 }}>
          <Reveal>
            <p className="eyebrow">Get a quote</p>
            <h1>Tell us what you&apos;re building.</h1>
            <p className="section-lead" style={{ marginBottom: 28 }}>
              A few details are enough to get started — here&apos;s exactly what
              happens after you hit send.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {nextSteps.map((s) => (
                <li key={s.step} style={{ display: "flex", gap: 12 }}>
                  <span className="mono flame-text" style={{ fontWeight: 700 }}>{s.step}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginTop: 24 }}>
              Prefer email? Write to{" "}
              <a href={`mailto:${site.email}`} className="flame-text">{site.email}</a>
            </p>
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
