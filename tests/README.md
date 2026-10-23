# `tests/`: automated tests

Run them with:

```bash
npm test
```

They use [Vitest](https://vitest.dev). The tests need no database or browser, because they only exercise the pure rule functions
in `src/lib/spaced-repetition.ts`, `src/lib/dates.ts`, `src/lib/card-view.ts`, `src/lib/github-webhook.ts` and `src/lib/neetcode-problems.ts`.

## What's covered

[`spaced-repetition.test.ts`](spaced-repetition.test.ts) checks every rule from the spec:

| Test | Rule |
| --- | --- |
| follows the agreed interval list, with three one-year steps | The schedule is exactly 1, 2, 4 … 256, 365, 365, 365, 1095. |
| makes a newly added problem due tomorrow | Adding counts as the first solve (1 day). |
| climbs 1, 2, 4, 8, 16 when solved on time | Each solve moves up one level. |
| still moves up when solved before the due date | Solving early counts. |
| refuses a second solve on the same day | One step per day. |
| stays at 1095 days forever after the end of the list | The last interval repeats. |
| reports due today and overdue days | The day counts are right. |
| keeps the level at exactly 24 days overdue on a 16 day interval | The boundary: 24 is not *more than* 16 + 8. |
| drops to 8 days past 24 days overdue, so solving returns to 16 not 32 | The decrement rule. |
| never drops below the first level | Level 0 can't drop. |
| puts the most overdue problems first | Sorting and grouping. |

[`neetcode-sync.test.ts`](neetcode-sync.test.ts) checks the NeetCode sync helpers:

| Test | What it proves |
| --- | --- |
| accepts a message signed with the shared secret | A real GitHub message gets through. |
| rejects a message signed with a different secret | Someone without the secret can't add problems. |
| rejects a message whose body was changed after signing | A message can't be edited on the way. |
| rejects a missing or malformed signature | Unsigned requests are refused. |
| counts pushes to the main branch / ignores pushes to other branches | Only main counts. |
| spots NeetCode's Bulk Sync commit, which re-sends old solutions | A Bulk Sync doesn't tick problems already on your list. |
| treats NeetCode's normal commit as a new solve | An "Add: ..." commit counts as a review. |
| treats a push without commit messages as a new solve | Missing data falls back to the normal case. |
| finds the problem name in a submission path | `.../two-integer-sum/submission-0.py` → `two-integer-sum`. |
| ignores files that aren't submissions | The README and other files are skipped. |
| lists each problem once, from added files only | Two submissions of one problem add it once. |
| maps NeetCode's own names to LeetCode numbers | `two-integer-sum` → 1, `eating-bananas` → 875. |
| leaves out problems that already share LeetCode's name | The table only holds real renames. |
| links renamed NeetCode problems to NeetCode's name | 1. Two Sum opens `neetcode.io/problems/two-integer-sum`. |
| links same-name NeetCode problems to NeetCode | 704. Binary Search opens `neetcode.io/problems/binary-search`. |
| links problems NeetCode doesn't have to LeetCode | A LeetCode-only problem still opens on LeetCode. |
| lists each LeetCode number only once | No problem is in both tables, so there's never a question which link wins. |

## How the tests control time

Every test uses a fixed `TODAY = "2026-10-21"` and builds cards relative to it:

```ts
function solvedDaysAgo(level: number, dayCount: number) {
  return { level: level, lastSolvedOn: addDays(TODAY, -dayCount) };
}
```

So `solvedDaysAgo(4, 41)` means "a card on the 16 day gap, last solved 41 days ago", which is 25 days overdue.
Because the rule functions take `today` as an argument instead of reading the clock, the tests give the same result on any day you run them.

## Boundary testing

Notice the pair of tests at exactly 24 and at 25 days overdue. Bugs love boundaries: `>` versus `>=` is a one-character difference
that changes behavior on exactly one day. Testing both sides of the line pins down which one the code uses.

## Adding a test

Add an `it("describes the behavior", () => { ... })` block inside the relevant `describe` group and use `expect(actual).toBe(expected)`.
If you change `INTERVAL_DAYS`, some of these tests will (correctly) fail, because they check the specific schedule from the spec. Update them to match.

## What isn't automated

The full flow (sign up, add, solve, remove, sign out, sign in) was checked by hand-driven browser runs during development, but there's no
end-to-end test suite in the repository. If you want one, [Playwright](https://playwright.dev) is the usual choice for Next.js.
It would need a real (test) database to run against.
