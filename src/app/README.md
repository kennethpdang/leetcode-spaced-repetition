# `src/app/`: pages, layout and styling

Next.js uses **file-based routing**: the folders inside `app/` *are* the website's URLs.

| File | URL | What it is |
| --- | --- | --- |
| `page.tsx` | `/` | The problem list. |
| `sign-in/page.tsx` | `/sign-in` | The sign in / create account page. |
| `layout.tsx` | (wraps every page) | The `<html>` and `<body>` tags, page title, and the CSS import. |
| `globals.css` | — | All styling for the whole site. |
| `actions/` | — | Server actions. Not pages; see [`actions/README.md`](actions/README.md). |
| `api/github-webhook/route.ts` | `/api/github-webhook` | Where GitHub sends NeetCode sync messages. Not a page. |

A file must be named exactly `page.tsx` to become a page. Any other file in this folder is just a normal module.

## Server Components vs Client Components

This is the most important React/Next.js idea in the project, so it's worth a careful read.

By default, every component in `app/` is a **Server Component**. It runs *only on the server*, once per request, and sends finished HTML
to the browser. Its code is never downloaded by the browser. This means a Server Component can:

- be an `async` function and `await` database queries directly (look at `page.tsx`: it calls `listCards(user.id)`),
- read secrets like `DATABASE_URL` safely, since that code never reaches the browser.

But a Server Component *can't* respond to clicks or hold state (no `useState`, no `onClick`), because it doesn't exist in the browser.

A **Client Component** starts with the line `"use client"`. It's rendered on the server first (so the page appears fast), and then its code
also runs in the browser to make it interactive. All of our Client Components are in [`../components/`](../components/README.md).

**The pattern used here:** pages are Server Components that load the data, then pass plain data down as props to small
Client Components that handle the interactive bits.

```
page.tsx (server)  ── loads user and cards from the database
 ├── AddProblemForm (client)   ── the number box and button
 └── CardSection (server)      ── a heading and a list
      └── CardRow (client)     ── the circle, the dialog, the remove button
```

The data crossing from server to client must be plain values (strings, numbers, arrays, objects).
That's why `card-view.ts` builds simple `CardView` objects rather than passing class instances or database rows.

## `page.tsx`: the problem list

Step by step:

1. `getCurrentUser()` reads the session cookie. No valid session → `redirect("/sign-in")`.
2. `getTodayInTimeZone(user.timeZone)` works out today's date *for this user*.
3. `listCards(user.id)` loads the user's cards (one SQL query).
4. `groupCards(cards, today)` splits them into overdue / due today / upcoming and sorts each group.
5. It renders the header, the add form, the summary pills, and three `CardSection`s. A section with no cards renders nothing.

`export const dynamic = "force-dynamic"` tells Next.js never to cache this page. It depends on who you are and what day it is,
so it must be rendered fresh on every request. (Reading cookies already makes it dynamic; this line just makes the intent obvious.)

## `sign-in/page.tsx`: the sign in page

If you're already signed in, it redirects you to `/`. Otherwise it shows `AuthForm`, which switches between "Sign in" and "Create account".

## How a page is protected

Each page checks the session itself at the top (`getCurrentUser()` then `redirect`). There's no separate "middleware" file.
With only two pages that's the simplest thing that works, and the check sits right next to the code it protects.
**The actions check the session again on their own**, because a request can reach a server action without going through a page.
Never rely on "the button isn't shown" as security.

## `api/github-webhook/route.ts`: the NeetCode sync endpoint

A file named `route.ts` is a **Route Handler**: instead of a page, it answers raw HTTP requests. Exporting a function named `POST`
handles POST requests to `/api/github-webhook`. GitHub is the only caller, so there's no session cookie to check.
The **signature** is the check instead. In order:

1. Both `GITHUB_WEBHOOK_SECRET` and `NEETCODE_SYNC_EMAIL` must be set, or it answers 500 with a message saying so.
2. It reads the body as raw text and checks the `X-Hub-Signature-256` header (`isValidSignature`). A bad signature gets 401, and nothing else runs.
3. It parses the body as JSON. If GitHub was set to send form data instead, it answers 400 and says to switch the content type.
   This happens before the `ping` check on purpose, so the mistake shows up on GitHub's very first test message.
4. `ping` (GitHub's test message when you add the webhook) answers "Connected." Any event other than `push` is ignored.
5. Pushes to any branch but main are ignored.
6. It finds the account by email and calls `syncNeetcodeSolves`. Re-solves count as reviews, except in a NeetCode Bulk Sync (`isBulkSync`),
   which re-sends old solutions. Then it calls `revalidatePath("/")` so your list is fresh next time you open it.
7. It answers with the summary (`added`, `reviewed`, `unchanged`, `notMatched`), which GitHub shows under the webhook's **Recent Deliveries**.

Ignored events still answer 200. GitHub marks anything else as a failed delivery, and an ignored event isn't a failure.

`export const maxDuration = 60` lets the function run for up to a minute, which a big Bulk Sync can need.
One problem at a time (the normal case) takes a second or two.

## `layout.tsx`

Wraps every page. It sets the `<title>`, the viewport tag (`width=device-width`, which phones need in order to
use the mobile layout instead of shrinking the desktop one), and imports `globals.css`.

## `globals.css`: styling

One plain CSS file, organized top to bottom:

1. **Color and font variables** in `:root`. Every color on the site is a variable like `var(--color-accent)`.
2. **Dark mode**: `@media (prefers-color-scheme: dark)` redefines the same variables. Nothing else has to know about dark mode.
3. **Shared building blocks**: `.panel`, `.button`, `.text-input`, `.message`.
4. **Page-specific sections**: sign in, dashboard, confirmation dialog.
5. **Small screens**: `@media (max-width: 520px)` stacks the add form vertically and puts the name fields on separate lines.

The palette copies the Claude workspace:

| Variable | Light | Used for |
| --- | --- | --- |
| `--color-background` | `#faf9f5` warm off-white | Page background |
| `--color-surface` | `#ffffff` | Cards and panels |
| `--color-text` | `#141413` near-black | Main text |
| `--color-text-muted` | `#6f6d66` warm gray | Secondary text |
| `--color-accent` | `#c96442` terracotta | Buttons, overdue items |
| `--color-success` | `#5f7f4c` muted green | Solved-today circle |

Headings use a serif font and body text uses the system sans-serif font, like Claude does.
Using the system fonts means nothing extra to download, so pages load faster.

**Why not Tailwind or a component library?** For a two-page site, one CSS file is easier to read top to bottom and has nothing new to learn.
If the site grows a lot, Tailwind would be a reasonable next step.
