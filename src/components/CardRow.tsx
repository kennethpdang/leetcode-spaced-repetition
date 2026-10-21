"use client";

import { useState, useTransition } from "react";
import { removeCardAction, solveCardAction } from "@/app/actions/card-actions";
import ConfirmDialog from "@/components/ConfirmDialog";
import FormMessage from "@/components/FormMessage";
import { ActionResult, EMPTY_RESULT, failure } from "@/lib/action-result";
import { CardView, describeDueDate, describeInterval, pluralizeDays } from "@/lib/card-view";

type PendingAction = "solve" | "remove" | null;

export default function CardRow({ card }: { card: CardView }) {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [result, setResult] = useState<ActionResult>(EMPTY_RESULT);
  const [isSaving, startSaving] = useTransition();

  const problemName = `${card.problemNumber}. ${card.title}`;
  const isOverdue = card.status.group === "overdue";
  const isSolveDialog = pendingAction === "solve";

  function closeDialog() {
    setPendingAction(null);
  }

  function confirmPendingAction() {
    startSaving(async () => {
      let actionResult: ActionResult;
      try {
        if (isSolveDialog) {
          actionResult = await solveCardAction(card.id);
        } else {
          actionResult = await removeCardAction(card.id);
        }
      } catch {
        actionResult = failure("Something went wrong. Please try again.");
      }
      setResult(actionResult);
      setPendingAction(null);
    });
  }

  return (
    <li className={isOverdue ? "card-row card-row-overdue" : "card-row"}>
      <button
        type="button"
        className={card.status.isSolvedToday ? "check-circle check-circle-done" : "check-circle"}
        disabled={card.status.isSolvedToday}
        aria-label={card.status.isSolvedToday ? `${problemName} solved today` : `Mark ${problemName} as solved`}
        title={card.status.isSolvedToday ? "Solved today" : "Mark as solved"}
        onClick={() => {
          setResult(EMPTY_RESULT);
          setPendingAction("solve");
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="card-body">
        <a className="card-title" href={`https://leetcode.com/problems/${card.slug}/`} target="_blank" rel="noreferrer">
          {problemName}
        </a>
        <div className="card-meta">
          <span className={`difficulty difficulty-${card.difficulty.toLowerCase()}`}>{card.difficulty}</span>
          <span className={isOverdue ? "card-due-overdue" : undefined}>{describeDueDate(card.status)}</span>
          <span>{describeInterval(card.status)}</span>
        </div>
        <FormMessage result={result} />
      </div>

      <button
        type="button"
        className="remove-button"
        aria-label={`Remove ${problemName}`}
        onClick={() => {
          setResult(EMPTY_RESULT);
          setPendingAction("remove");
        }}
      >
        Remove
      </button>

      <ConfirmDialog
        isOpen={pendingAction !== null}
        title={isSolveDialog ? "Mark as solved?" : "Remove this problem?"}
        message={
          isSolveDialog
            ? `Did you solve ${problemName}? Its next review will be in ${pluralizeDays(card.status.nextIntervalDays)}.`
            : `${problemName} and its review history will be removed from your list.`
        }
        confirmLabel={isSolveDialog ? "Yes, I solved it" : "Remove"}
        isBusy={isSaving}
        onConfirm={confirmPendingAction}
        onCancel={closeDialog}
      />
    </li>
  );
}
