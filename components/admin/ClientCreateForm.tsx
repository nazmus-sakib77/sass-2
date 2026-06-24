"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createClient, type ClientFormState } from "@/lib/actions/clients";

const initialState: ClientFormState = { ok: false };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Creating…" : "Create client"}
    </button>
  );
}

export default function ClientCreateForm() {
  const [state, formAction] = useFormState(createClient, initialState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state.ok]);

  return (
    <form ref={ref} action={formAction} className="form">
      {state.error && <div className="alert alert-error">{state.error}</div>}
      {state.ok && state.message && <div className="alert alert-success">{state.message}</div>}
      <div className="form-row">
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-password">Temporary password</label>
        <input id="c-password" name="password" type="text" minLength={8} placeholder="At least 8 characters" required />
        <span className="form-note">Share this with the client; they sign in at /login. Stored bcrypt-hashed.</span>
      </div>
      <Submit />
    </form>
  );
}
