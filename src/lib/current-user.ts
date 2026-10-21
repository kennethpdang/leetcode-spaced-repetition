import { findUserById, User } from "@/lib/repositories/user-repository";
import { getSessionUserId } from "@/lib/session";

export async function getCurrentUser(): Promise<User | null> {
  const userId = await getSessionUserId();
  if (userId === null) {
    return null;
  }
  return findUserById(userId);
}
