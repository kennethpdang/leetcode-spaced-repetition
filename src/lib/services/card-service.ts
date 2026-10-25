import { withTransaction } from "@/lib/database";
import { getTodayInTimeZone } from "@/lib/dates";
import { findLeetcodeProblem, LeetcodeProblem } from "@/lib/leetcode-catalog";
import { createCard, findCardId, findCardScheduleForUpdate, recordSolve } from "@/lib/repositories/card-repository";
import { findSavedProblem, saveProblem } from "@/lib/repositories/problem-repository";
import { User } from "@/lib/repositories/user-repository";
import { getLevelAfterSolve } from "@/lib/spaced-repetition";

export type AddProblemOutcome =
  | { status: "added"; problem: LeetcodeProblem }
  | { status: "alreadyAdded"; problem: LeetcodeProblem }
  | { status: "notFound" };

export type SolveOutcome = "solved" | "alreadySolvedToday" | "notFound";

const UNIQUE_VIOLATION_CODE = "23505";

function isUniqueViolation(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === UNIQUE_VIOLATION_CODE;
}

// Uses the saved copy of a problem when there is one, so LeetCode is only asked once per problem.
async function getProblem(problemNumber: number): Promise<LeetcodeProblem | null> {
  const savedProblem = await findSavedProblem(problemNumber);
  if (savedProblem) {
    return savedProblem;
  }
  const leetcodeProblem = await findLeetcodeProblem(problemNumber);
  if (leetcodeProblem) {
    await saveProblem(leetcodeProblem);
  }
  return leetcodeProblem;
}

export async function addProblem(user: User, problemNumber: number): Promise<AddProblemOutcome> {
  const problem = await getProblem(problemNumber);
  if (!problem) {
    return { status: "notFound" };
  }
  const today = getTodayInTimeZone(user.timeZone);
  const wasCreated = await withTransaction((client) => {
    return createCard(client, user.id, problem.number, today);
  });
  if (!wasCreated) {
    return { status: "alreadyAdded", problem: problem };
  }
  return { status: "added", problem: problem };
}

export async function solveCard(user: User, cardId: number): Promise<SolveOutcome> {
  const today = getTodayInTimeZone(user.timeZone);
  try {
    return await withTransaction(async (client) => {
      const schedule = await findCardScheduleForUpdate(client, user.id, cardId);
      if (!schedule) {
        return "notFound";
      }
      const newLevel = getLevelAfterSolve(schedule, today);
      if (newLevel === null) {
        return "alreadySolvedToday";
      }
      await recordSolve(client, cardId, newLevel, today);
      return "solved";
    });
  } catch (error) {
    // The database also blocks two solves on one day, e.g. after a time zone change.
    if (isUniqueViolation(error)) {
      return "alreadySolvedToday";
    }
    throw error;
  }
}

// The same as tapping a problem's circle, for callers that know the problem number rather than the card (NeetCode sync).
export async function solveProblem(user: User, problemNumber: number): Promise<SolveOutcome> {
  const cardId = await findCardId(user.id, problemNumber);
  if (cardId === null) {
    return "notFound";
  }
  return solveCard(user, cardId);
}
