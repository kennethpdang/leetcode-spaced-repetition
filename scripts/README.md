# `scripts/`: one-off helper scripts

## `setup-database.mjs`

Creates the database tables by running [`../db/schema.sql`](../db/schema.sql) against the database in `DATABASE_URL`.

```bash
npm run db:setup
```

The `npm run db:setup` command (defined in `package.json`) runs `node --env-file-if-exists=.env.local scripts/setup-database.mjs`.
The `--env-file-if-exists` flag is built into Node.js 20.12 and newer. It loads `.env.local` if there is one,
so the script finds the same `DATABASE_URL` the site uses when running locally.

**Why `.mjs` and not TypeScript?** The `.mjs` extension tells Node "this is a modern JavaScript module", so Node can run it directly.
A TypeScript file would need a compile step first. For a ten-line script that's not worth it.

**Why is it safe to run more than once?** Every statement in `schema.sql` is `CREATE TABLE IF NOT EXISTS`. Tables that already exist,
and the data in them, are left alone.

You don't need this script on Vercel. Pasting `schema.sql` into Neon's SQL Editor does the same thing
(see the [main README](../README.md#3-create-the-tables)).
