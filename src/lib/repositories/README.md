# `src/lib/repositories/`: all the SQL

A **repository** is a module whose only job is reading and writing one kind of data. Every SQL statement in the app lives in this folder.
Nothing outside it writes SQL.

| File | Tables | Functions |
| --- | --- | --- |
| `user-repository.ts` | `users` | `findUserById`, `findUserWithPasswordByEmail`, `createUser`, `updateUserTimeZone` |
| `problem-repository.ts` | `problems` | `findSavedProblem`, `saveProblem` |
| `card-repository.ts` | `cards`, `card_reviews` | `listCards`, `createCard`, `findCardId`, `findCardScheduleForUpdate`, `recordSolve`, `deleteCard` |

## Why have repositories at all?

- **One place to look.** "What query loads my cards?" always has the same answer: `card-repository.ts`.
- **The rest of the app speaks TypeScript, not SQL.** A service calls `listCards(userId)` and gets back `Card[]`.
  It doesn't need to know about table names, `JOIN`s, or column names.
- **Changing the database is contained.** Renaming a column, or even moving to a different database, only touches this folder.

## Parameterized queries (and why you must never build SQL with strings)

Every query passes values separately from the SQL text, using numbered placeholders:

```ts
await query("SELECT ... FROM users WHERE email = $1", [email]);
```

The database receives the SQL and the values as *separate* things and never treats a value as SQL code.

Compare with building the string yourself:

```ts
// NEVER do this
await query(`SELECT ... FROM users WHERE email = '${email}'`);
```

If someone typed `' OR '1'='1` as their email, the second version would run `WHERE email = '' OR '1'='1'`, which matches every user.
That's **SQL injection**, one of the most common security holes on the web. Placeholders make it impossible.

(The `${USER_COLUMNS}` you'll see inside some SQL strings is fine: it's a constant written in our own code, never user input.)

## Converting rows: `snake_case` to `camelCase`

SQL columns are conventionally `snake_case` (`last_solved_on`); TypeScript properties are conventionally `camelCase` (`lastSolvedOn`).
Each repository has a small `Row` interface describing exactly what the database returns, and a `toX(row)` function that converts it.
The conversion happens once, at the edge, so the rest of the code never sees `snake_case`.

The converters also fix types. Postgres `BIGINT` can hold numbers larger than JavaScript can represent exactly, so `pg` returns it as a **string**.
Our ids will never get that big, so `toUser` and `toCard` convert them with `Number(row.id)`.

## Things to notice in each file

### `user-repository.ts`

- `findUserByEmail` finds the account NeetCode sync adds problems to. Like every other lookup, it leaves the hash out.
- `findUserWithPasswordByEmail` is the **only** function that returns the password hash, and it's only used by sign-in.
  Everything else gets a `User` with no hash in it, so the hash can't leak into a page by accident.
- `createUser` uses `INSERT ... ON CONFLICT (email) DO NOTHING RETURNING ...`. If the email is taken, no row comes back, and the function returns `null`.
  This is safer than "check if the email exists, then insert", because two sign-ups at the same moment could both pass the check.

### `problem-repository.ts`

- `saveProblem` uses `ON CONFLICT (number) DO UPDATE` (an **upsert**: insert, or update if it already exists). If two people add the same new problem
  at the same moment, neither request fails.
- `findSavedProblemBySlug` finds a saved problem by its URL name, so NeetCode sync can skip asking LeetCode about problems we already know.

### `card-repository.ts`

- `listCards` joins `cards` with `problems` so one query returns each card *with* its title, slug and difficulty.
  Every card query filters by `user_id`, so you can only ever see your own cards.
- `createCard` uses `ON CONFLICT (user_id, problem_number) DO NOTHING` and returns `false` if you already had that problem.
  It also writes the first `card_reviews` row, because adding counts as the first solve.
- `findCardId` finds your card for a problem number, so NeetCode sync can tick the circle of a problem you re-solved.
  Like every card query, it filters by `user_id`.
- `findCardScheduleForUpdate` uses `SELECT ... FOR UPDATE`, which **locks** the row until the transaction ends.
  See [`../services/README.md`](../services/README.md) for why.
- `deleteCard` uses `WHERE id = $1 AND user_id = $2`. Even if someone sends another person's card id, nothing is deleted.

## Why some functions take a `client` argument

Functions that must run inside a transaction (`createCard`, `findCardScheduleForUpdate`, `recordSolve`) take a `client` as their first argument.
A transaction only works if every statement runs on the **same** database connection, and `client` is that connection,
handed in by `withTransaction` in [`../database.ts`](../database.ts).
Functions that run a single statement on their own (`listCards`, `deleteCard`) just use the shared `query` helper.

The parameter's type is `DatabaseClient`, which only promises a `query` method. That's all these functions need,
and it means a test could pass in a fake client.
