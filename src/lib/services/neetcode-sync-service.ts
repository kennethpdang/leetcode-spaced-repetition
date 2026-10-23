import { findLeetcodeProblemBySlug } from "@/lib/leetcode-catalog";
import { LEETCODE_NUMBER_BY_NEETCODE_SLUG } from "@/lib/neetcode-problems";
import { findSavedProblemBySlug, saveProblem } from "@/lib/repositories/problem-repository";
import { User } from "@/lib/repositories/user-repository";
import { addProblem, solveProblem } from "@/lib/services/card-service";

export interface NeetcodeSyncSummary {
  added: number[];
  reviewed: number[];
  unchanged: number[];
  notMatched: string[];
}

// Finds the LeetCode number for a NeetCode problem name: the rename table, then our saved problems, then LeetCode itself.
async function findLeetcodeNumber(neetcodeSlug: string): Promise<number | null> {
  const renamedNumber = LEETCODE_NUMBER_BY_NEETCODE_SLUG[neetcodeSlug];
  if (renamedNumber) {
    return renamedNumber;
  }
  const savedProblem = await findSavedProblemBySlug(neetcodeSlug);
  if (savedProblem) {
    return savedProblem.number;
  }
  const problem = await findLeetcodeProblemBySlug(neetcodeSlug);
  if (!problem) {
    return null;
  }
  await saveProblem(problem);
  return problem.number;
}

// Adds every problem NeetCode just synced that isn't in the user's list yet. When countsAsReview is true, a problem that is
// already in the list is marked solved today, exactly like tapping its circle (so at most once a day).
export async function syncNeetcodeSolves(
  user: User,
  neetcodeSlugs: string[],
  countsAsReview: boolean,
): Promise<NeetcodeSyncSummary> {
  const summary: NeetcodeSyncSummary = { added: [], reviewed: [], unchanged: [], notMatched: [] };
  for (let slugIndex = 0; slugIndex < neetcodeSlugs.length; slugIndex++) {
    const neetcodeSlug = neetcodeSlugs[slugIndex];
    const problemNumber = await findLeetcodeNumber(neetcodeSlug);
    if (problemNumber === null) {
      summary.notMatched.push(neetcodeSlug);
      continue;
    }
    const outcome = await addProblem(user, problemNumber);
    if (outcome.status === "added") {
      summary.added.push(problemNumber);
      continue;
    }
    if (outcome.status === "notFound") {
      summary.notMatched.push(neetcodeSlug);
      continue;
    }
    if (countsAsReview) {
      const solveOutcome = await solveProblem(user, problemNumber);
      if (solveOutcome === "solved") {
        summary.reviewed.push(problemNumber);
        continue;
      }
    }
    // Already solved today (including just added), or a Bulk Sync of a problem already in the list.
    summary.unchanged.push(problemNumber);
  }
  return summary;
}
