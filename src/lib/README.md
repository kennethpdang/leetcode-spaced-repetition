# `src/lib/`: rules, data access and infrastructure

Everything that isn't UI. The files fall into four groups:

| Group | Files | Touches database or network? |
| --- | --- | --- |
| **Pure rules** | `spaced-repetition.ts`, `dates.ts`, `card-view.ts`, `github-webhook.ts`, `neetcode-problems.ts` | No. Input in, output out. |
| **Use cases** | [`services/`](services/README.md) | Yes, through repositories |
| **Data access** | [`repositories/`](repositories/README.md) | Yes, all SQL lives here |
| **Infrastructure** | `database.ts`, `session.ts`, `current-user.ts`, `leetcode-catalog.ts` | Yes |
| **Small helpers** | `action-result.ts`, `submit-without-reset.ts` | No |

The pure rules are the heart of the app, so they come first.

---

## `spaced-repetition.ts`: the scheduling rules

### The data

```ts
export const INTERVAL_DAYS: readonly number[] = [1, 2, 4, 8, 16, 32, 64, 128, 256, 365, 365, 365, 1095];
```

A card's **level** is an index into this list. A card at level 4 has a gap of `INTERVAL_DAYS[4]` = 16 days.
`readonly` means TypeScript won't let any code accidentally change the list while the app runs.

A card's whole schedule is just two values:

```ts
interface CardSchedule {
  level: number;        // index into INTERVAL_DAYS
  lastSolvedOn: string; // "YYYY-MM-DD"
}
```

### The functions

**`getIntervalDays(level)`** returns `INTERVAL_DAYS[level]`, but caps the level at the last index.
This is how "1095 days forever" works: levels past the end all read the last entry.

**`getCardStatus(schedule, today)`** computes everything the UI and the solve logic need, in one place:

```
dueOn           = lastSolvedOn + interval(level)
daysUntilDue    = dueOn - today                  (negative when overdue)
overdueDays     = max(0, -daysUntilDue)
effectiveLevel  = level - 1   if level > 0 and overdueDays > interval(level) + interval(level - 1)
                  level       otherwise
levelAfterSolve = min(effectiveLevel + 1, last level)
group           = "overdue" if daysUntilDue < 0, "dueToday" if 0, else "upcoming"
isSolvedToday   = lastSolvedOn == today
```

**`getLevelAfterSolve(schedule, today)`** returns the level a solve today would move the card to,
or `null` if it was already solved today. It's a thin wrapper around `getCardStatus`, so the math exists exactly once.

### Walking through the decrement rule

The rule: if a card is overdue by **more than** its current interval plus the previous interval, it's treated as one level lower.

A card at level 4 (16 days), last solved on Jan 1:

| Today | Due | Overdue days | 16 + 8 = 24 exceeded? | effectiveLevel | Solve moves it to |
| --- | --- | --- | --- | --- | --- |
| Jan 10 | Jan 17 | 0 (not due yet) | no | 4 | level 5 (32 days) |
| Jan 17 | Jan 17 | 0 (due today) | no | 4 | level 5 (32 days) |
| Feb 10 | Jan 17 | 24 | no (24 is not *more than* 24) | 4 | level 5 (32 days) |
| Feb 11 | Jan 17 | 25 | **yes** | 3 | level 4 (16 days) |
| Jun 1 | Jan 17 | 135 | **yes** | 3 | level 4 (16 days) |

Two design decisions are visible in that table:

1. **The drop is computed, never stored.** The database still says level 4. Nothing runs at midnight to "apply" the drop.
   The card keeps showing as overdue, with the true number of overdue days, because the due date is still based on the stored level.
2. **It drops at most one level**, no matter how long you wait. That's the reading of the original spec
   ("you decrement from 16 to 8"). If you'd rather keep dropping (one level for every additional window missed), `getEffectiveLevel`
   is the only function to change. Make it loop, lowering the level while `overdueDays` is still past the threshold for the new level.

At level 0 there's nothing lower to drop to, so the `level > 0` check skips it.

### Why the rules are "pure"

A **pure function** gets everything it needs from its arguments and doesn't change anything outside itself:
no database, no clock, no network. Notice that `today` is an argument, rather than the function reading the system clock.

That's what makes the rules easy to test. The tests pretend today is `2026-10-21` and build a card "solved 41 days ago" in one line.
If the function read the real clock, the tests would give different answers on different days.

---

## `dates.ts`: calendar date math without time zone bugs

**The problem.** JavaScript's `Date` is really a *moment in time*, not a calendar day.
`new Date("2026-10-21")` is midnight UTC, which is Oct 20 at 7 pm in Texas. Mixing that with local time leads to off-by-one-day bugs
that only show up at night, or only for users in some time zones.

**The approach.** Dates are kept as plain `"YYYY-MM-DD"` strings everywhere: in the database (`DATE` columns), in the code, and in the tests.
Math happens by converting to a whole number of UTC days, adding or subtracting, and converting back. Because it's all UTC internally,
daylight saving time can never make a "day" 23 or 25 hours long.

| Function | Example |
| --- | --- |
| `getTodayInTimeZone("America/Chicago")` | `"2026-10-21"`, today's date *in that time zone* |
| `addDays("2026-10-30", 3)` | `"2026-11-02"` (rolls over months and years correctly) |
| `daysBetween("2026-10-21", "2026-10-25")` | `4` |
| `formatDateForDisplay("2026-10-25")` | `"Oct 25, 2026"` |
| `isValidTimeZone("Mars/Base")` | `false` |

`getTodayInTimeZone` uses the `"en-CA"` locale, because Canada's standard date format happens to be exactly `YYYY-MM-DD`.

## `card-view.ts`: from database rows to what you see

- **`groupCards(cards, today)`** attaches a `status` to each card and puts it into the `overdue`, `dueToday` or `upcoming` bucket.
- **`compareByUrgency`** sorts within each bucket by `daysUntilDue`, smallest first. Overdue cards have negative values,
  so the *most* overdue (most negative) come first. Ties are broken by problem number so the order never jumps around.
- Each card also gets a **`problemUrl`**, from `getProblemUrl` in `neetcode-problems.ts` (see below).
- **`describeDueDate`** and **`describeInterval`** turn a status into the gray text under each title, like "Overdue by 3 days" or "Every 16 days".

Keeping these labels out of the React component means the wording can be tested, and the component stays short.

---

## Infrastructure

### `database.ts`

- **Connection pool.** Opening a database connection takes a while (network round trips, TLS, authentication).
  A `Pool` keeps a few open connections and lends them out. `max: 5` keeps us well under Neon's free-tier connection limit.
- **One pool per server process.** The pool is stored on `globalThis`. In development, Next.js reloads modules on every save;
  without this, each reload would open a new pool and eventually run out of connections. On Vercel, a "warm" serverless function reuses it between requests.
- **`DATE` columns come back as strings.** By default `pg` converts `DATE` to a JavaScript `Date`, which brings back the time zone problem
  described above. `types.setTypeParser(1082, ...)` turns that off. (`1082` is Postgres's internal id for the `DATE` type.)
- **`query(sql, parameters)`** runs one statement and returns the rows.
- **`withTransaction(work)`** runs several statements as one unit: `BEGIN`, your code, then `COMMIT`. If anything throws, it runs `ROLLBACK`
  instead, so nothing is half-saved. The connection is always returned to the pool in `finally`.

### `session.ts`

Keeps you signed in using a **JSON Web Token (JWT)** stored in a cookie.

- `startSession(userId)` makes a token containing your user id and an expiry date 30 days out, **signs** it with `SESSION_SECRET`
  (HMAC-SHA256), and stores it in a cookie.
- `getSessionUserId()` reads the cookie and checks the signature. If anyone has edited the token, or it's expired, or it was signed with
  a different secret, verification fails and you're treated as signed out.
- `endSession()` deletes the cookie.

A JWT is *signed*, not *encrypted*: anyone holding it can read the user id inside. That's fine, because the user id isn't secret.
What matters is that nobody can *forge* one without the secret.

**Why a JWT and not a sessions table?** No extra table, and no database query just to check a signature.
The trade-off is that you can't sign out one specific device from the server. Changing `SESSION_SECRET` signs out everyone at once.
For a personal site that's an acceptable trade.

### `current-user.ts`

`getCurrentUser()` combines the two: session cookie → user id → user row from the database. Returns `null` if any step fails.
Loading the row (rather than trusting the token alone) means a deleted account is signed out right away.

### `leetcode-catalog.ts`

Looks up a problem's title, URL slug and difficulty from its number. LeetCode has no official public API, so this uses the same
endpoints LeetCode's own website uses:

1. **GraphQL search** (`https://leetcode.com/graphql`): searches for the number and picks the result whose `questionFrontendId` matches exactly.
   The response is small, so this is tried first.
2. **Full problem list** (`https://leetcode.com/api/problems/all/`): about 1 MB listing every problem. Only used if the search fails.

The sources sit in an array, `PROBLEM_SOURCES`, and `findLeetcodeProblem` tries each in order, stopping at the first that answers.
A source that throws (for example, LeetCode is down) is logged and skipped. Adding a third source means adding one function to the array.
This is the **Open/Closed principle** in action: open to extension, without modifying the loop.

Because problem details are saved in our `problems` table the first time they're found, each problem is only ever looked up once.

`findLeetcodeProblemBySlug` does the same lookup by URL name instead of number (`question(titleSlug: ...)`). NeetCode sync uses it
for problems whose NeetCode name is the same as LeetCode's. It returns `null` instead of throwing, so one failed lookup never stops a sync.

> **Heads-up:** these endpoints aren't officially supported and could change. If adding new problems ever starts failing
> with "Couldn't find LeetCode problem", this file is the only place that needs a fix.

---

## NeetCode sync helpers

### `github-webhook.ts`

Pure functions for the messages GitHub sends when NeetCode pushes a solution. None of them touch the database.

- **`isValidSignature(rawBody, signatureHeader, secret)`**: GitHub sends `X-Hub-Signature-256: sha256=<hex>`, an HMAC of the exact request body
  made with the webhook secret. We make the same HMAC and compare. It must be the *raw* body: parsing the JSON and turning it back into text
  could change spacing and break the match. The comparison uses `timingSafeEqual`, which takes the same time whether the first byte or the last
  byte differs, so nobody can learn the signature by timing many guesses.
- **`isPushToDefaultBranch(pushEvent)`**: only pushes to the repository's main branch count.
- **`getNeetcodeSlugFromPath(path)`**: NeetCode saves submissions as `<topic folder>/<problem name>/submission-<n>.<ext>`, for example
  `Data Structures & Algorithms/two-integer-sum/submission-0.py`. A regular expression pulls out `two-integer-sum`. Anything else
  (the README, a folder you added yourself) returns `null` and is ignored.
- **`getSubmittedNeetcodeSlugs(pushEvent)`**: walks every commit's `added` files and returns each problem name once.
  Only *added* files count, because a new submission is always a new file.

### `neetcode-problems.ts`

Everything the app knows about which problems NeetCode has. It does two jobs: NeetCode sync uses it to turn a NeetCode name into a
LeetCode number, and the problem list uses it to decide whether a title links to NeetCode or LeetCode.

NeetCode only has about 420 of LeetCode's 3,000+ problems, and it gives some of them its own URL name
(`neetcode.io/problems/two-integer-sum` is LeetCode's `two-sum`). So every LeetCode problem falls into one of three buckets:

| Bucket | Example | Stored in | Link |
| --- | --- | --- | --- |
| On NeetCode, **renamed** | 1. Two Sum | `LEETCODE_NUMBER_BY_NEETCODE_SLUG` (`"two-integer-sum": 1`) | `neetcode.io/problems/two-integer-sum` |
| On NeetCode, **same name** | 704. Binary Search | `LEETCODE_NUMBERS_WITH_SAME_NEETCODE_SLUG` (`704`) | `neetcode.io/problems/binary-search` |
| **LeetCode only** | 1000. Minimum Cost to Merge Stones | neither table | `leetcode.com/problems/minimum-cost-to-merge-stones/` |

Both tables were built from NeetCode's own problem list (`.problemSiteData.json` in the
[neetcode-gh/leetcode](https://github.com/neetcode-gh/leetcode) repository). Each NeetCode name was checked against that repository's
`articles/` folder, which has one solution page per NeetCode problem, named exactly like the problem's NeetCode URL.
NeetCode's JavaScript course problems (LeetCode 2618 and up) are left out, because they live in a separate course, not the problem list.

**`getProblemUrl(problemNumber, leetcodeSlug)`** is the function the rest of the app calls. It asks
**`findNeetcodeSlug`** for the NeetCode name and builds a NeetCode link if there is one, or a LeetCode link if not.
`card-view.ts` calls it once per card on the server, so the 400-line table never gets sent to your browser.

The rename table is stored NeetCode name → LeetCode number, because that's the direction sync needs. Links need the other direction,
so `buildNeetcodeSlugByLeetcodeNumber` flips it into a `Map` once, when the file first loads. Keeping one table and flipping it,
instead of typing a second reversed table, is **DRY**: a rename can never be added to one table and forgotten in the other.

**When NeetCode adds problems**, add one line: to the rename table if NeetCode's URL name differs from LeetCode's, otherwise to the
same-name list. If a sync reports a name in `notMatched`, that's a missing rename.

---

## Small helpers

- **`action-result.ts`**: the `{ error, success }` shape every action returns, plus the `failure()` and `success()` builders.
- **`submit-without-reset.ts`**: stops React from clearing a form after an error. See [`../components/README.md`](../components/README.md).
