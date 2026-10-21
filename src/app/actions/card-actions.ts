"use server";

import { revalidatePath } from "next/cache";
import { ActionResult, failure, success } from "@/lib/action-result";
import { getCurrentUser } from "@/lib/current-user";
import { deleteCard } from "@/lib/repositories/card-repository";
import { addProblem, solveCard } from "@/lib/services/card-service";

const SIGNED_OUT_MESSAGE = "Your session has ended. Please sign in again.";
const MAXIMUM_PROBLEM_NUMBER = 100000;

function parseProblemNumber(formData: FormData): number | null {
  const value = formData.get("problemNumber");
  if (typeof value !== "string" || !/^\d+$/.test(value.trim())) {
    return null;
  }
  const problemNumber = Number(value.trim());
  if (problemNumber < 1 || problemNumber > MAXIMUM_PROBLEM_NUMBER) {
    return null;
  }
  return problemNumber;
}

export async function addProblemAction(previousState: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) {
    return failure(SIGNED_OUT_MESSAGE);
  }
  const problemNumber = parseProblemNumber(formData);
  if (problemNumber === null) {
    return failure("Enter a LeetCode problem number, like 1 or 238.");
  }

  const outcome = await addProblem(user, problemNumber);
  if (outcome.status === "notFound") {
    return failure(`Couldn't find LeetCode problem ${problemNumber}. Check the number and try again.`);
  }
  if (outcome.status === "alreadyAdded") {
    return failure(`${outcome.problem.number}. ${outcome.problem.title} is already in your list.`);
  }
  revalidatePath("/");
  return success(`Added ${outcome.problem.number}. ${outcome.problem.title}. It's due again tomorrow.`);
}

export async function solveCardAction(cardId: number): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) {
    return failure(SIGNED_OUT_MESSAGE);
  }
  const outcome = await solveCard(user, cardId);
  if (outcome === "alreadySolvedToday") {
    return failure("You already solved this one today. Come back when it's due.");
  }
  if (outcome === "notFound") {
    return failure("That problem is no longer in your list.");
  }
  revalidatePath("/");
  return success("Nice work. The next review is scheduled.");
}

export async function removeCardAction(cardId: number): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) {
    return failure(SIGNED_OUT_MESSAGE);
  }
  await deleteCard(user.id, cardId);
  revalidatePath("/");
  return success("Removed from your list.");
}
