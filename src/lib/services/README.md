# `src/lib/services/`: the use cases

A **service** carries out one thing a user wants to do, step by step, by calling the pure rules and the repositories in the right order.
It's the "recipe"; the rules and repositories are the "ingredients".

There are two files. [`card-service.ts`](card-service.ts) has the use cases you trigger by hand (plus `solveProblem`, which lets sync tick a circle by problem number), and
[`neetcode-sync-service.ts`](neetcode-sync-service.ts) has the one GitHub triggers when you solve a problem on NeetCode.

## `addProblem(user, problemNumber)`

1. **Find the problem.** `getProblem` checks our own `problems` table first. Only if it's not there does it ask LeetCode
   (`findLeetcodeProblem`), and then it saves the answer so LeetCode is never asked about that problem again.
   This is a simple form of **caching**.
2. **Work out today** in the user's time zone.
3. **Create the card** at level 0 with `last_solved_on = today`, plus its first history row, inside one transaction.
4. **Report what happened** as one of three outcomes: `added`, `alreadyAdded`, or `notFound`.

The service returns an *outcome*, not a message. Choosing the wording ("is already in your list") is the action's job.
That keeps the service reusable: a future command-line tool or API could call it and phrase things differently.

## `solveCard(user, cardId)`

```ts
withTransaction(async (client) => {
  const schedule = await findCardScheduleForUpdate(client, user.id, cardId); // read and lock the row
  if (!schedule) {
    return "notFound";
  }
  const newLevel = getLevelAfterSolve(schedule, today);                    // pure rule
  if (newLevel === null) {
    return "alreadySolvedToday";
  }
  await recordSolve(client, cardId, newLevel, today);                        // update card and log the solve
  return "solved";
});
```

### Why a transaction?

`recordSolve` makes two changes: it updates the card and inserts a `card_reviews` row.
If the server crashed between them, you'd have a card that moved up with no history, or history for a solve that didn't happen.
A **transaction** makes the two changes all-or-nothing.

### Why lock the row (`FOR UPDATE`)? A race condition, step by step

Imagine you double tap the confirm button, or confirm on your phone and laptop at once. Two requests run at the same time.
**Without** a lock:

| Time | Request A | Request B |
| --- | --- | --- |
| 1 | reads card: level 2, last solved 3 days ago | |
| 2 | | reads card: level 2, last solved 3 days ago |
| 3 | not solved today → new level 3 | |
| 4 | | not solved today → new level 3 |
| 5 | saves level 3 | |
| 6 | | saves level 3, logs a second solve |

Both requests read the old value before either one saved, so the "only once a day" check passed twice. This is a **race condition**.

**With** `SELECT ... FOR UPDATE`, request B's read at time 2 *waits* until request A's transaction commits.
B then sees "solved today" and stops. The rule holds.

And as a final safety net, the database's `UNIQUE (card_id, solved_on)` constraint would reject a duplicate history row anyway.
If that ever happens (for example, after a time zone change makes two solves land on the same date), `isUniqueViolation`
recognizes Postgres error code `23505` and the service reports `alreadySolvedToday` rather than crashing.

This layering is called **defense in depth**: the UI disables the button, the rule function checks the date, the row lock prevents races,
and the database constraint catches anything that slips through. Any one of them failing doesn't break the rule.

### Why does "today" come from the user's time zone?

Vercel's servers run on UTC. If you solve a problem at 9 pm in Texas, it's already 2 am tomorrow in UTC.
Using UTC would record the solve on the wrong day, and you could "solve" again the next morning (your same calendar day)
and climb two levels in one day. `getTodayInTimeZone(user.timeZone)` uses your calendar instead.

## `solveProblem(user, problemNumber)`

The same as tapping a problem's circle, for a caller that knows the LeetCode number but not the card's id.
It finds the card (`findCardId`) and hands it to `solveCard`, so every rule above applies unchanged. NeetCode sync is the caller.

## `syncNeetcodeSolves(user, neetcodeSlugs, countsAsReview)`

Called by the GitHub webhook with the NeetCode problem names found in a push. For each name:

1. **Find the LeetCode number**, trying the cheapest source first:
   the rename table in `neetcode-problems.ts`, then our own `problems` table by slug, then LeetCode by slug (saving the answer).
2. **Call `addProblem(user, number)`**, the same function the "Add problem" button uses. That's DRY: the rules about
   creating a card, its first history row, and "already in your list" exist only once.
3. **If it was already in your list**, and `countsAsReview` is true, **call `solveProblem`**: the re-solve counts exactly like a tap,
   including "at most once a day". `countsAsReview` is false for a NeetCode Bulk Sync, which re-sends old solutions.
4. **Sort the result** into `added`, `reviewed`, `unchanged`, or `notMatched`, and return all four lists.
   `unchanged` means the problem was already solved today (a problem added today counts), or came in a Bulk Sync.

The webhook sends that summary back to GitHub, so you can read it under the webhook's **Recent Deliveries**.
