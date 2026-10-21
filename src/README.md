# `src/`: all application code

Everything that runs, whether on the server or in your browser, lives here. It's split into three folders:

| Folder | What's in it | Runs where |
| --- | --- | --- |
| [`app/`](app/README.md) | Pages, the page layout, styling, and server actions. Next.js reads this folder to decide which URLs exist. | Mostly server; actions always server |
| [`components/`](components/README.md) | Reusable UI pieces: a problem row, the forms, the confirm dialog. | Mostly browser |
| [`lib/`](lib/README.md) | Everything that isn't UI: the scheduling rules, database access, sessions, the LeetCode lookup. | Server (except a few pure helpers) |

## The one rule that keeps it tidy

**Dependencies point inward, toward the rules.**

```
app/  ──►  components/
 │
 ▼
app/actions/  ──►  lib/services/  ──►  lib/repositories/  ──►  lib/database.ts
                         │
                         ▼
             lib/spaced-repetition.ts, lib/dates.ts   (pure: imports nothing app-specific)
```

- Pages and components can import from `lib/`, but `lib/` never imports from `app/` or `components/`.
- The pure rule files (`spaced-repetition.ts`, `dates.ts`) import nothing that touches the database, the network, or React.

This is what lets you test the scheduling rules with no database, change the look without touching the rules,
or swap the database without touching the UI.

## The `@/` import shortcut

Imports like `import { query } from "@/lib/database"` use `@/` as a shortcut for `src/`.
It's set up in `tsconfig.json` (`"paths": { "@/*": ["./src/*"] }`) and in `vitest.config.ts` for the tests.
Without it you'd write fragile paths like `../../../lib/database`, which break whenever a file moves.

## Naming conventions

- **Files**: `kebab-case.ts` for modules (`card-repository.ts`), `PascalCase.tsx` for React components (`CardRow.tsx`),
  because React components are always capitalized.
- **Variables and functions**: `camelCase`, and always descriptive (`cardIndex`, not `i`; `problemNumber`, not `n`).
- **Constants that are fixed settings**: `UPPER_SNAKE_CASE` (`INTERVAL_DAYS`, `SESSION_LENGTH_DAYS`), so they're easy to spot and tweak.
- **Database columns**: `snake_case` (`last_solved_on`), which is the SQL convention. The repositories convert them to `camelCase`
  (`lastSolvedOn`) so the rest of the code follows TypeScript conventions.
