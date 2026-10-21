// GitHub calls this address every time NeetCode pushes a solution to your NeetCode GitHub repository.
import { revalidatePath } from "next/cache";
import { getSubmittedNeetcodeSlugs, isPushToDefaultBranch, isValidSignature, PushEvent } from "@/lib/github-webhook";
import { findUserByEmail } from "@/lib/repositories/user-repository";
import { syncNeetcodeSolves } from "@/lib/services/neetcode-sync-service";

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

  const eventName = request.headers.get("x-github-event");
  if (eventName === "ping") {
    return reply(200, "Connected.");
  }
  if (eventName !== "push") {
    return reply(200, "Ignored: only push events add problems.");
  }

  const pushEvent: PushEvent = JSON.parse(rawBody);
  if (!isPushToDefaultBranch(pushEvent)) {
    return reply(200, "Ignored: not a push to the main branch.");
  }

  const user = await findUserByEmail(syncEmail.trim().toLowerCase());
  if (!user) {
    return reply(500, "No account uses the email in NEETCODE_SYNC_EMAIL.");
  }

  const summary = await syncNeetcodeSolves(user, getSubmittedNeetcodeSlugs(pushEvent));
  if (summary.notMatched.length > 0) {
    console.error("NeetCode sync couldn't match these problems to LeetCode:", summary.notMatched);
  }
  revalidatePath("/");
  return reply(200, "Synced.", summary);
}
