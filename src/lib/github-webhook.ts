// Reads the "push" messages GitHub sends when NeetCode commits a solution to your GitHub repository.
import { createHmac, timingSafeEqual } from "node:crypto";

export interface PushCommit {
  added?: string[];
}

export interface PushEvent {
  ref?: string;
  repository?: { default_branch?: string };
  commits?: PushCommit[];
}

const SIGNATURE_PREFIX = "sha256=";

// NeetCode saves each submission as "<topic folder>/<problem name>/submission-<number>.<extension>".
const SUBMISSION_PATH_PATTERN = /^[^/]+\/([a-z0-9-]+)\/submission-\d+\.[a-z]+$/;

// GitHub signs every message with the webhook secret. A wrong or missing signature means it didn't come from GitHub.
export function isValidSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader || !signatureHeader.startsWith(SIGNATURE_PREFIX)) {
    return false;
  }
  const expectedSignature = SIGNATURE_PREFIX + createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBytes = Buffer.from(expectedSignature);
  const receivedBytes = Buffer.from(signatureHeader);
  if (expectedBytes.length !== receivedBytes.length) {
    return false;
  }
  return timingSafeEqual(expectedBytes, receivedBytes);
}

// Only pushes to the main branch count, so experiments on other branches never add problems.
export function isPushToDefaultBranch(pushEvent: PushEvent): boolean {
  const defaultBranch = pushEvent.repository?.default_branch;
  if (!defaultBranch) {
    return false;
  }
  return pushEvent.ref === "refs/heads/" + defaultBranch;
}

export function getNeetcodeSlugFromPath(filePath: string): string | null {
  const match = SUBMISSION_PATH_PATTERN.exec(filePath);
  if (!match) {
    return null;
  }
  return match[1];
}

// Returns each NeetCode problem name with a new submission file in this push, once each, in the order seen.
export function getSubmittedNeetcodeSlugs(pushEvent: PushEvent): string[] {
  const slugs: string[] = [];
  const commits = pushEvent.commits ?? [];
  for (let commitIndex = 0; commitIndex < commits.length; commitIndex++) {
    const addedPaths = commits[commitIndex].added ?? [];
    for (let pathIndex = 0; pathIndex < addedPaths.length; pathIndex++) {
      const slug = getNeetcodeSlugFromPath(addedPaths[pathIndex]);
      if (slug && !slugs.includes(slug)) {
        slugs.push(slug);
      }
    }
  }
  return slugs;
}
