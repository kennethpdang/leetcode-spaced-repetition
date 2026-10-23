// GitHub calls this address every time NeetCode pushes a solution to your NeetCode GitHub repository.
import { revalidatePath } from "next/cache";
import {
  getSubmittedNeetcodeSlugs,
  isBulkSync,
  isPushToDefaultBranch,
  isValidSignature,
  PushEvent,
} from "@/lib/github-webhook";
import { findUserByEmail } from "@/lib/repositories/user-repository";
import { syncNeetcodeSolves } from "@/lib/services/neetcode-sync-service";

// A NeetCode Bulk Sync can bring dozens of problems at once, and each new one is looked up on LeetCode.
export const maxDuration = 60;

function reply(status: number, message: string, details: object = {}): Response {
  return Response.json({ message: message, ...details }, { status: status });
}

export async function POST(request: Request): Promise<Response> {
  const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
  const syncEmail = process.env.NEETCODE_SYNC_EMAIL;
  if (!webhookSecret || !syncEmail) {
    return reply(500, "GITHUB_WEBHOOK_SECRET and NEETCODE_SYNC_EMAIL must both be set.");
  }

  const rawBody = await request.text();
  if (!isValidSignature(rawBody, request.headers.get("x-hub-signature-256"), webhookSecret)) {
    return reply(401, "The signature doesn't match. Check that the webhook secret is the same in GitHub and Vercel.");
  }

  // Read the body before answering GitHub's test message, so a wrong content type shows up as soon as the webhook is added.
  let pushEvent: PushEvent;
  try {
    pushEvent = JSON.parse(rawBody);
  } catch {
    return reply(400, "Set the webhook's content type to application/json in GitHub.");
  }

  const eventName = request.headers.get("x-github-event");
  if (eventName === "ping") {
    return reply(200, "Connected.");
  }
  if (eventName !== "push") {
    return reply(200, "Ignored: only push events add problems.");
  }

  if (!isPushToDefaultBranch(pushEvent)) {
    return reply(200, "Ignored: not a push to the main branch.");
  }

  const user = await findUserByEmail(syncEmail.trim().toLowerCase());
  if (!user) {
    return reply(500, "No account uses the email in NEETCODE_SYNC_EMAIL.");
  }

  // A new solve of a problem already on the list counts as a review. A Bulk Sync of old solutions only adds new problems.
  const summary = await syncNeetcodeSolves(user, getSubmittedNeetcodeSlugs(pushEvent), !isBulkSync(pushEvent));
  if (summary.notMatched.length > 0) {
    console.error("NeetCode sync couldn't match these problems to LeetCode:", summary.notMatched);
  }
  revalidatePath("/");
  return reply(200, "Synced.", summary);
}
