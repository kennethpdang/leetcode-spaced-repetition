"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { ActionResult, failure } from "@/lib/action-result";
import { isValidTimeZone } from "@/lib/dates";
import { createUser, findUserWithPasswordByEmail, updateUserTimeZone } from "@/lib/repositories/user-repository";
import { endSession, startSession } from "@/lib/session";

const PASSWORD_HASH_ROUNDS = 12;
const MINIMUM_PASSWORD_LENGTH = 8;
const MAXIMUM_NAME_LENGTH = 100;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName);
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function readEmail(formData: FormData): string {
  return readText(formData, "email").toLowerCase();
}

function readTimeZone(formData: FormData): string {
  const timeZone = readText(formData, "timeZone");
  if (isValidTimeZone(timeZone)) {
    return timeZone;
  }
  return "UTC";
}

export async function signInAction(previousState: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = readEmail(formData);
  const password = formData.get("password");
  if (!email || typeof password !== "string" || !password) {
    return failure("Enter your email and password.");
  }

  const account = await findUserWithPasswordByEmail(email);
  const passwordMatches = account !== null && (await bcrypt.compare(password, account.passwordHash));
  if (!account || !passwordMatches) {
    return failure("That email and password don't match an account.");
  }

  await updateUserTimeZone(account.user.id, readTimeZone(formData));
  await startSession(account.user.id);
  redirect("/");
}

export async function createAccountAction(previousState: ActionResult, formData: FormData): Promise<ActionResult> {
  const firstName = readText(formData, "firstName");
  const lastName = readText(formData, "lastName");
  const email = readEmail(formData);
  const password = formData.get("password");

  if (!firstName || !lastName) {
    return failure("Enter your first and last name.");
  }
  if (firstName.length > MAXIMUM_NAME_LENGTH || lastName.length > MAXIMUM_NAME_LENGTH) {
    return failure("Names must be 100 characters or fewer.");
  }
  if (!EMAIL_PATTERN.test(email)) {
    return failure("Enter a valid email address.");
  }
  if (typeof password !== "string" || password.length < MINIMUM_PASSWORD_LENGTH) {
    return failure(`Use a password with at least ${MINIMUM_PASSWORD_LENGTH} characters.`);
  }

  const passwordHash = await bcrypt.hash(password, PASSWORD_HASH_ROUNDS);
  const user = await createUser({
    email: email,
    passwordHash: passwordHash,
    firstName: firstName,
    lastName: lastName,
    timeZone: readTimeZone(formData),
  });
  if (!user) {
    return failure("An account with that email already exists. Try signing in.");
  }

  await startSession(user.id);
  redirect("/");
}

export async function signOutAction(): Promise<void> {
  await endSession();
  redirect("/sign-in");
}
