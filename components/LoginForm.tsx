"use client";

import { useFormState, useFormStatus } from "react-dom";
import { motion } from "motion/react";
import { authenticate, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending} style={{ width: "100%" }}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction] = useFormState(authenticate, initialState);

  return (
    <form action={formAction} className="form">
      {state.error && (
        <motion.div
          className="alert alert-error"
          role="alert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          {state.error}
        </motion.div>
      )}
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@company.com" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="••••••••" required autoComplete="current-password" />
      </div>
      <SubmitButton />
    </form>
  );
}
