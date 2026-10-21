# `src/lib/services/`: the use cases

A **service** carries out one thing a user wants to do, step by step, by calling the pure rules and the repositories in the right order.
It's the "recipe"; the rules and repositories are the "ingredients".

There's one file, [`card-service.ts`](card-service.ts), with two use cases.

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
