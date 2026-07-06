import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <section className="page-head">
      <div className="container">
        <div className="grid grid-2" style={{ alignItems: "start", gap: 48 }}>
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1>Say hello.</h1>
            <p className="section-lead" style={{ marginBottom: 28 }}>
              A question, an idea, or a second opinion on something web-related —
              we answer every message within one business day.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              <li>
                <div className="stat-label">Email</div>
                <a href={`mailto:${site.email}`} className="flame-text" style={{ fontSize: "1.1rem" }}>
                  {site.email}
                </a>
              </li>
              {site.phone && (
                <li>
                  <div className="stat-label">Phone / WhatsApp</div>
                  <span style={{ fontSize: "1.05rem" }}>{site.phone}</span>
                </li>
              )}
              <li>
                <div className="stat-label">Location</div>
                <span style={{ fontSize: "1.05rem" }}>{site.location}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card">
              <LeadForm variant="contact" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
