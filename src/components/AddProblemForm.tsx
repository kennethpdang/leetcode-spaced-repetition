"use client";

import { useActionState, useEffect, useRef } from "react";
import { addProblemAction } from "@/app/actions/card-actions";
import FormMessage from "@/components/FormMessage";
import { EMPTY_RESULT } from "@/lib/action-result";
import { submitWithoutReset } from "@/lib/submit-without-reset";

export default function AddProblemForm() {
  const [result, formAction, isAdding] = useActionState(addProblemAction, EMPTY_RESULT);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (result.success) {
      formRef.current?.reset();
    }
  }, [result]);

  return (
    <div className="panel">
      <form ref={formRef} action={formAction} onSubmit={submitWithoutReset(formAction)} className="add-form">
        <label className="field">
          <span className="field-label">LeetCode problem number</span>
          <input
            className="text-input"
            name="problemNumber"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="e.g. 1"
            autoComplete="off"
            required
          />
        </label>
        <button type="submit" className="button button-primary" disabled={isAdding}>
          {isAdding ? "Adding…" : "Add problem"}
        </button>
      </form>
      <div className="add-form-messages">
        <FormMessage result={result} />
      </div>
    </div>
  );
}
