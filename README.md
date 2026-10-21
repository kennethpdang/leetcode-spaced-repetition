# LeetCode Spaced Repetition

A small website for reviewing LeetCode problems on a spaced repetition schedule.
Type a problem number, and the site looks up its name and tells you when to solve it again.

- **Sign in page**: create an account with first name, last name, email and password, or sign in.
- **Problem list**: overdue problems at the top, then today's, then upcoming ones.
- Tap the circle next to a problem when you've solved it. A confirmation pops up so a stray tap doesn't count.
- A problem can only move up once per day.
- Works on phones, tablets and desktops, in light and dark mode.

## How the schedule works

The schedule lives in one list in [`src/lib/spaced-repetition.ts`](src/lib/spaced-repetition.ts):

```ts
export const INTERVAL_DAYS: readonly number[] = [1, 2, 4, 8, 16, 32, 64, 128, 256, 356, 356, 356, 1068];
```

1. **Adding a problem counts as your first solve.** It's due again in 1 day.
2. **Each solve moves it one step up the list**: 2 days, then 4, then 8, and so on. After the last entry it stays at 1068 days forever.
3. **One step per day.** Once you've solved a problem today, its circle turns green and stays locked until tomorrow.
4. **Falling far behind drops it a step.** If a problem is overdue by more than its current gap plus the one before it, it drops one step.
   For example, a problem on the 16 day gap that is more than 16 + 8 = 24 days overdue drops to 8 days. It still shows as overdue with the number of days,
   and solving it moves it back up to 16 days, not 32.

"Today" uses your own time zone, which the site picks up from your browser when you sign in.

To change the schedule, edit that one list and push the change.

## Setting it up on Vercel (one time, about 15 minutes)

You need free accounts on [GitHub](https://github.com) and [Vercel](https://vercel.com). Sign up for Vercel with your GitHub account to make step 1 easiest.

### 1. Put the site on Vercel

1. In Vercel, click **Add New… → Project**.
2. Find this repository in the list and click **Import**.
3. Leave every setting as it is and click **Deploy**. The first deploy will show an error page when you open it. That's expected, because the database isn't connected yet.

### 2. Add a database

1. In your Vercel project, open the **Storage** tab.
2. Click **Create Database**, choose **Neon** (Serverless Postgres), and accept the free plan.
3. When it asks which project to connect, pick this one and keep all environments ticked.
   Vercel now stores the database's address for you as `DATABASE_URL`. You never need to copy it by hand.

### 3. Create the tables

1. Still in the **Storage** tab, click your new database, then **Open in Neon**.
2. In Neon, open **SQL Editor** in the left menu.
3. Open [`db/schema.sql`](db/schema.sql) in this repository, copy everything in it, paste it into the editor, and click **Run**.
   It's safe to run again later; it only creates what is missing.

### 4. Add a session secret

The session secret is a long random password the site uses to keep you signed in. You never type it anywhere else.

1. Make a random string of at least 32 characters. Any password generator works (for example, a 64 character password from your password manager).
   On a Mac or Linux terminal, `openssl rand -hex 32` makes one.
2. In Vercel, open **Settings → Environment Variables**.
3. Add a variable named `SESSION_SECRET`, paste the string as its value, keep all environments ticked, and save.

### 5. Redeploy

Open the **Deployments** tab, click the **⋯** menu on the newest deployment, and choose **Redeploy**.
When it finishes, open your site's address, click **Create an account**, and you're in.

**Keep `DATABASE_URL` and `SESSION_SECRET` private.** Don't paste them into chats, issues or code.
If one ever leaks, change it in Vercel and redeploy. Changing `SESSION_SECRET` signs everyone out, which is harmless.

## Updating the site

Every change pushed to the `main` branch on GitHub deploys automatically within a minute or two.
If a change ever adds new tables, run `db/schema.sql` in the Neon SQL Editor again.

## Running it on your own computer (optional)

You need [Node.js](https://nodejs.org) 20 or newer and a Postgres database (your Neon one works; use its connection string).

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL and SESSION_SECRET
npm run db:setup              # creates the tables
npm run dev                   # opens at http://localhost:3000
npm test                      # checks the scheduling rules
```

## Why these choices

**PostgreSQL (SQL), not MongoDB.** The data is naturally relational: a user has many cards, each card points at one LeetCode problem,
and each card has a history of solves. Postgres lets the database itself enforce the important rules,
so a bug in the code can't break them:

- `UNIQUE (user_id, problem_number)` means a problem can only be in your list once.
- `UNIQUE (card_id, solved_on)` means a problem can only be solved once per calendar day, even if you double tap.
- Foreign keys with `ON DELETE CASCADE` mean removing a problem also removes its history, with nothing left behind.
- Transactions with row locks keep two quick clicks from both counting.

Neon's free Postgres plugs straight into Vercel, so there's nothing extra to host.

**The schema** ([`db/schema.sql`](db/schema.sql)):

| Table | What it holds | Why it's separate |
| --- | --- | --- |
| `users` | Name, email, password hash, time zone | Passwords are stored only as bcrypt hashes. |
| `problems` | LeetCode number, title, link slug, difficulty | Shared by all users, so LeetCode is only asked about each problem once. |
| `cards` | Which user is studying which problem, its current step, and the last day it was solved | The due date is calculated from these two values, so it never goes stale and no nightly job is needed. |
| `card_reviews` | One row per solve, including the day you added it | A full history, and the database-level guard against two solves in one day. |

**Next.js on Vercel.** One project holds both the pages and the server code, and Vercel deploys it with no configuration.

**Sign-in** uses email and password only. Passwords are hashed with bcrypt, and the session is a signed, `httpOnly` cookie that lasts 30 days.

**Problem names** come from LeetCode's public GraphQL API, with LeetCode's full problem list as a backup if the first lookup fails.

## Where things are

| Path | What's in it |
| --- | --- |
| `src/lib/spaced-repetition.ts` | The schedule and all scheduling rules. No database or UI code. |
| `src/lib/card-view.ts` | Sorting problems into Overdue / Due today / Upcoming, and the labels shown on each. |
| `src/lib/services/card-service.ts` | Adding and solving problems: ties the rules to the database. |
| `src/lib/repositories/` | All SQL, one file per table group. |
| `src/lib/leetcode-catalog.ts` | Looking up a problem's name from its number. |
| `src/lib/session.ts` | Sign-in cookie handling. |
| `src/app/actions/` | Server actions the forms and buttons call. |
| `src/app/page.tsx` | The problem list page. |
| `src/app/sign-in/page.tsx` | The sign in page. |
| `src/components/` | Reusable pieces: the confirmation dialog, problem rows, forms. |
| `src/app/globals.css` | All styling, with the colors defined once at the top. |
| `tests/` | Tests for the scheduling rules. |
