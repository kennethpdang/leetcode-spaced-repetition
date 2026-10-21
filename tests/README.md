# `tests/`: automated tests

Run them with:

```bash
npm test
```

They use [Vitest](https://vitest.dev). The tests need no database or browser, because they only exercise the pure rule functions
in `src/lib/spaced-repetition.ts`, `src/lib/dates.ts` and `src/lib/card-view.ts`.

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
