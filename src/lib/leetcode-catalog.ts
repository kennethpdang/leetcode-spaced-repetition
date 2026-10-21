// Looks up a LeetCode problem's name from its number using LeetCode's public endpoints.

export interface LeetcodeProblem {
  number: number;
  title: string;
  slug: string;
  difficulty: string;
}

type ProblemSource = (problemNumber: number) => Promise<LeetcodeProblem | null>;

const LEETCODE_HEADERS = {
  "Content-Type": "application/json",
  Referer: "https://leetcode.com/problemset/",
  "User-Agent": "Mozilla/5.0 (compatible; LeetcodeSpacedRepetition/1.0)",
};

const DIFFICULTY_BY_LEVEL: Record<number, string> = { 1: "Easy", 2: "Medium", 3: "Hard" };

const SEARCH_QUERY = `
  query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
      questions: data {
        questionFrontendId
        title
        titleSlug
        difficulty
      }
    }
  }
`;

interface SearchQuestion {
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
}

// First choice: a small search request to LeetCode's GraphQL API.
async function findWithGraphql(problemNumber: number): Promise<LeetcodeProblem | null> {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: LEETCODE_HEADERS,
    cache: "no-store",
    body: JSON.stringify({
      query: SEARCH_QUERY,
      variables: {
        categorySlug: "",
        limit: 50,
        skip: 0,
        filters: { searchKeywords: String(problemNumber) },
      },
    }),
  });
  if (!response.ok) {
    return null;
  }
  const body = await response.json();
  const questions: SearchQuestion[] = body?.data?.problemsetQuestionList?.questions ?? [];
  for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
    const question = questions[questionIndex];
    if (Number(question.questionFrontendId) === problemNumber) {
      return {
        number: problemNumber,
        title: question.title,
        slug: question.titleSlug,
        difficulty: question.difficulty,
      };
    }
  }
  return null;
}

interface ProblemListEntry {
  stat: { frontend_question_id: number; question__title: string; question__title_slug: string };
  difficulty: { level: number };
}

// Backup: LeetCode's full problem list, used only if the search above fails.
async function findWithProblemList(problemNumber: number): Promise<LeetcodeProblem | null> {
  const response = await fetch("https://leetcode.com/api/problems/all/", {
    headers: LEETCODE_HEADERS,
    cache: "no-store",
  });
  if (!response.ok) {
    return null;
  }
  const body = await response.json();
  const entries: ProblemListEntry[] = body?.stat_status_pairs ?? [];
  for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
    const entry = entries[entryIndex];
    if (entry.stat.frontend_question_id === problemNumber) {
      return {
        number: problemNumber,
        title: entry.stat.question__title,
        slug: entry.stat.question__title_slug,
        difficulty: DIFFICULTY_BY_LEVEL[entry.difficulty.level] ?? "Unknown",
      };
    }
  }
  return null;
}

const PROBLEM_SOURCES: ProblemSource[] = [findWithGraphql, findWithProblemList];

const QUESTION_BY_SLUG_QUERY = `
  query questionTitle($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionFrontendId
      title
      titleSlug
      difficulty
    }
  }
`;

// Looks up a problem by its name in the URL (e.g. "binary-search"), for problems that arrive from NeetCode.
export async function findLeetcodeProblemBySlug(slug: string): Promise<LeetcodeProblem | null> {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: LEETCODE_HEADERS,
      cache: "no-store",
      body: JSON.stringify({ query: QUESTION_BY_SLUG_QUERY, variables: { titleSlug: slug } }),
    });
    if (!response.ok) {
      return null;
    }
    const body = await response.json();
    const question: SearchQuestion | null = body?.data?.question ?? null;
    if (!question) {
      return null;
    }
    return {
      number: Number(question.questionFrontendId),
      title: question.title,
      slug: question.titleSlug,
      difficulty: question.difficulty,
    };
  } catch (error) {
    console.error("LeetCode lookup by name failed.", error);
    return null;
  }
}

export async function findLeetcodeProblem(problemNumber: number): Promise<LeetcodeProblem | null> {
  for (let sourceIndex = 0; sourceIndex < PROBLEM_SOURCES.length; sourceIndex++) {
    try {
      const problem = await PROBLEM_SOURCES[sourceIndex](problemNumber);
      if (problem) {
        return problem;
      }
    } catch (error) {
      console.error("LeetCode lookup failed, trying the next source.", error);
    }
  }
  return null;
}
