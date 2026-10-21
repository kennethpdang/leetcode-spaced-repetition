"use client";

import { useActionState, useState } from "react";
import { createAccountAction, signInAction } from "@/app/actions/auth-actions";
import FormMessage from "@/components/FormMessage";
import TimeZoneInput from "@/components/TimeZoneInput";
import { EMPTY_RESULT } from "@/lib/action-result";
import { submitWithoutReset } from "@/lib/submit-without-reset";

type AuthMode = "signIn" | "createAccount";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [signInResult, signInFormAction, isSigningIn] = useActionState(signInAction, EMPTY_RESULT);
  const [createAccountResult, createAccountFormAction, isCreatingAccount] = useActionState(createAccountAction, EMPTY_RESULT);

  const isCreatingMode = mode === "createAccount";
  const formAction = isCreatingMode ? createAccountFormAction : signInFormAction;
  const result = isCreatingMode ? createAccountResult : signInResult;
  const isBusy = isCreatingMode ? isCreatingAccount : isSigningIn;

  return (
    <div className="panel auth-card">
      <div>
        <h1 className="auth-title">{isCreatingMode ? "Create your account" : "Welcome back"}</h1>
        <p className="auth-subtitle">Spaced repetition for your LeetCode problems.</p>
      </div>

      <form action={formAction} onSubmit={submitWithoutReset(formAction)} className="auth-form" key={mode}>
        {isCreatingMode && (
          <div className="name-fields">
            <label className="field">
              <span className="field-label">First name</span>
              <input className="text-input" name="firstName" autoComplete="given-name" required />
            </label>
            <label className="field">
              <span className="field-label">Last name</span>
              <input className="text-input" name="lastName" autoComplete="family-name" required />
            </label>
          </div>
        )}
        <label className="field">
          <span className="field-label">Email</span>
          <input className="text-input" type="email" name="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span className="field-label">Password</span>
          <input
            className="text-input"
            type="password"
            name="password"
            autoComplete={isCreatingMode ? "new-password" : "current-password"}
            minLength={isCreatingMode ? 8 : undefined}
            required
          />
        </label>
        <TimeZoneInput />
        <FormMessage result={result} />
        <button type="submit" className="button button-primary" disabled={isBusy}>
          {isCreatingMode ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="auth-switch">
        {isCreatingMode ? "Already have an account? " : "New here? "}
        <button
          type="button"
          className="link-button"
          onClick={() => {
            setMode(isCreatingMode ? "signIn" : "createAccount");
          }}
        >
          {isCreatingMode ? "Sign in" : "Create an account"}
        </button>
      </p>
    </div>
  );
}
