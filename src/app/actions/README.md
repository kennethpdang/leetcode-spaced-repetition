# `src/app/actions/`: server actions

A **server action** is a function, marked with `"use server"` at the top of its file, that the browser can call as if it were local.
Behind the scenes, Next.js turns each call into an HTTP POST request, runs the function on the server, and sends the return value back.

So instead of writing a REST API (`POST /api/cards/42/solve`), a `fetch` call, and JSON parsing on both ends, the client simply writes:

```ts
const result = await solveCardAction(card.id);
```

Even though it looks like a normal function call, **it's still a network request**. Treat every argument as untrusted input from the internet.

## The files

### `auth-actions.ts`

| Action | What it does |
| --- | --- |
| `signInAction` | Looks up the email, compares the password with the bcrypt hash, saves the browser's time zone, starts a session, and redirects to `/`. |
| `createAccountAction` | Validates the name, email and password, hashes the password, creates the user, starts a session, and redirects to `/`. |
| `signOutAction` | Deletes the session cookie and redirects to `/sign-in`. |

### `card-actions.ts`

| Action | What it does |
| --- | --- |
| `addProblemAction` | Checks who you are, checks the number is a whole number from 1 to 100000, and calls the `addProblem` service. |
| `solveCardAction` | Checks who you are, and calls the `solveCard` service. |
| `removeCardAction` | Checks who you are, and deletes the card, but only if it's yours. |

## What an action's job is (and isn't)

An action is a thin **adapter** between the web and the rest of the app. Each one does the same four things:

1. **Find out who's asking**, from the session cookie (`getCurrentUser()`), never from anything the browser sends.
2. **Read and validate the input.** Form fields arrive as `string | File | null`, so each one is checked
   (`readText`, `parseProblemNumber`) before use.
3. **Call a service or repository** to do the real work.
4. **Translate the outcome into a message** for the user, and call `revalidatePath("/")` if data changed.

What it does *not* do is contain business rules. "Can this card be solved today?" is answered in `lib/spaced-repetition.ts`,
not here. That way the rule is the same no matter what calls it, and it can be tested without a web request.

## The `ActionResult` shape

Every action that shows a message returns the same shape, defined in [`../../lib/action-result.ts`](../../lib/action-result.ts):

```ts
{ error: string | null; success: string | null }
```

The helpers `failure("...")` and `success("...")` build it, and the `FormMessage` component displays it.
Using one shape everywhere means one component can show every message on the site.

## Forms and `useActionState`

Actions used by forms (`signInAction`, `createAccountAction`, `addProblemAction`) take two arguments: `(previousState, formData)`.
That's the signature React's `useActionState` hook expects. The hook gives the component:

- the latest result (to show an error or success message),
- a function to submit the form,
- an `isPending` flag (to disable the button and show "Adding…").

## `redirect()` and `revalidatePath()`

- **`redirect("/")`** sends the browser to another page. It works by *throwing* a special error that Next.js catches,
  so any code after it never runs. That's why sign-in calls it last.
- **`revalidatePath("/")`** marks the problem list as stale. Next.js re-renders it on the server and sends the new version back
  with the action's response. That's how the list updates after a solve with no full page reload.

## Why the sign-in error is vague

`signInAction` says "That email and password don't match an account" whether the email doesn't exist or the password is wrong.
Saying "no account with that email" would let anyone check which emails have accounts. This is called **user enumeration**.

## Validation, here and in the browser

The forms also have browser-side checks (`required`, `type="email"`, `minLength`, `inputMode="numeric"`).
Those are for a nicer experience only. Anyone can bypass them with a tool like `curl`,
so **the server-side checks in these actions are the ones that actually count**.
