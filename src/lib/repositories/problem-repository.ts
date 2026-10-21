import { query } from "@/lib/database";
import { LeetcodeProblem } from "@/lib/leetcode-catalog";

interface ProblemRow {
  number: number;
  title: string;
  slug: string;
  difficulty: string;
}

export async function findSavedProblem(problemNumber: number): Promise<LeetcodeProblem | null> {
  const rows = await query<ProblemRow>("SELECT number, title, slug, difficulty FROM problems WHERE number = $1", [
    problemNumber,
  ]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
}

export async function saveProblem(problem: LeetcodeProblem): Promise<void> {
  await query(
    `INSERT INTO problems (number, title, slug, difficulty)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (number) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, difficulty = EXCLUDED.difficulty`,
    [problem.number, problem.title, problem.slug, problem.difficulty],
  );
}
