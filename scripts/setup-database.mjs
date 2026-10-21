// Creates the database tables. Run with: npm run db:setup
import { readFile } from "node:fs/promises";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Add it to .env.local or your shell first.");
  process.exit(1);
}

const schemaSql = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
const client = new pg.Client({ connectionString: databaseUrl });

await client.connect();
await client.query(schemaSql);
await client.end();

console.log("Database tables are ready.");
