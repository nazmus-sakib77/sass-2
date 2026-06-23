"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createLead, type LeadFormState } from "@/lib/actions/leads";

const initialState: LeadFormState = { ok: false };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Sending…" : label}
    </button>
  );
}

export default function LeadForm({
  variant = "quote",
}: {
  variant?: "quote" | "contact";
}) {
  const [state, formAction] = useFormState(createLead, initialState);

  if (state.ok) {
    return (
      <div className="alert alert-success" role="status">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="form">
      {state.error && (
        <div className="alert alert-error" role="alert">
          {state.error}
        </div>
      )}

      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@company.com" required />
        </div>
      </div>

      {variant === "quote" && (
        <>
          <div className="form-row">
            <div className="field">
              <label htmlFor="service">Service</label>
              <select id="service" name="service" defaultValue="">
                <option value="" disabled>Select a service</option>
                <option>Web Platform</option>
                <option>Product Design</option>
                <option>Growth Engineering</option>
                <option>Full-stack build</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="budget">Budget</label>
              <select id="budget" name="budget" defaultValue="">
                <option value="" disabled>Select a range</option>
                <option>&lt; $2,500</option>
                <option>$2,500 – $7,500</option>
                <option>$7,500 – $20,000</option>
                <option>$20,000+</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="timeline">Timeline</label>
            <select id="timeline" name="timeline" defaultValue="">
              <option value="" disabled>When do you need it?</option>
              <option>ASAP</option>
              <option>1–2 months</option>
              <option>3–6 months</option>
              <option>Just exploring</option>
            </select>
          </div>
        </>
      )}

      <div className="field">
        <label htmlFor="message">
          {variant === "quote" ? "Project details" : "Message"}
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={
            variant === "quote"
              ? "Tell us what you're building, the goals, and anything we should know."
              : "How can we help?"
          }
          required
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <SubmitButton label={variant === "quote" ? "Send enquiry" : "Send message"} />
        <span className="form-note">We reply within one business day.</span>
      </div>
    </form>
  );
}
