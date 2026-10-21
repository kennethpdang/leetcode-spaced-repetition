import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  getNeetcodeSlugFromPath,
  getSubmittedNeetcodeSlugs,
  isPushToDefaultBranch,
  isValidSignature,
} from "@/lib/github-webhook";
import { LEETCODE_NUMBER_BY_NEETCODE_SLUG } from "@/lib/neetcode-problems";

const SECRET = "test-secret";

function signBody(body: string, secret: string): string {
  return "sha256=" + createHmac("sha256", secret).update(body).digest("hex");
}

describe("webhook signature", () => {
  const body = JSON.stringify({ ref: "refs/heads/main" });

  it("accepts a message signed with the shared secret", () => {
    expect(isValidSignature(body, signBody(body, SECRET), SECRET)).toBe(true);
  });

  it("rejects a message signed with a different secret", () => {
    expect(isValidSignature(body, signBody(body, "wrong-secret"), SECRET)).toBe(false);
  });

  it("rejects a message whose body was changed after signing", () => {
    expect(isValidSignature(body + " ", signBody(body, SECRET), SECRET)).toBe(false);
  });

  it("rejects a missing or malformed signature", () => {
    expect(isValidSignature(body, null, SECRET)).toBe(false);
    expect(isValidSignature(body, "sha1=abc", SECRET)).toBe(false);
  });
});

describe("default branch check", () => {
  it("counts pushes to the main branch", () => {
    expect(isPushToDefaultBranch({ ref: "refs/heads/main", repository: { default_branch: "main" } })).toBe(true);
  });

  it("ignores pushes to other branches", () => {
    expect(isPushToDefaultBranch({ ref: "refs/heads/experiment", repository: { default_branch: "main" } })).toBe(false);
  });
});

describe("reading NeetCode submission paths", () => {
  it("finds the problem name in a submission path", () => {
    expect(getNeetcodeSlugFromPath("Data Structures & Algorithms/two-integer-sum/submission-0.py")).toBe("two-integer-sum");
    expect(getNeetcodeSlugFromPath("Data Structures & Algorithms/binary-search/submission-12.cpp")).toBe("binary-search");
  });

  it("ignores files that aren't submissions", () => {
    expect(getNeetcodeSlugFromPath("README.md")).toBeNull();
    expect(getNeetcodeSlugFromPath("Data Structures & Algorithms/two-integer-sum/notes.md")).toBeNull();
  });

  it("lists each problem once, from added files only", () => {
    const slugs = getSubmittedNeetcodeSlugs({
      commits: [
        { added: ["Data Structures & Algorithms/two-integer-sum/submission-0.py", "README.md"] },
        { added: ["Data Structures & Algorithms/two-integer-sum/submission-1.py"] },
        { added: ["Data Structures & Algorithms/binary-search/submission-0.py"] },
        {},
      ],
    });
    expect(slugs).toEqual(["two-integer-sum", "binary-search"]);
  });
});

describe("NeetCode rename table", () => {
  it("maps NeetCode's own names to LeetCode numbers", () => {
    expect(LEETCODE_NUMBER_BY_NEETCODE_SLUG["two-integer-sum"]).toBe(1);
    expect(LEETCODE_NUMBER_BY_NEETCODE_SLUG["duplicate-integer"]).toBe(217);
    expect(LEETCODE_NUMBER_BY_NEETCODE_SLUG["eating-bananas"]).toBe(875);
  });

  it("leaves out problems that already share LeetCode's name", () => {
    expect(LEETCODE_NUMBER_BY_NEETCODE_SLUG["binary-search"]).toBeUndefined();
  });
});
