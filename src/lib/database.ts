import { Pool, PoolClient, QueryResultRow, types } from "pg";

// Return DATE columns as "YYYY-MM-DD" text instead of JavaScript Date objects.
const DATE_TYPE_ID = 1082;
types.setTypeParser(DATE_TYPE_ID, (value: string) => {
  return value;
});

// Reuse one pool across hot reloads in development and warm serverless calls.
const globalForDatabase = globalThis as unknown as { databasePool?: Pool };

function getPool(): Pool {
  if (!globalForDatabase.databasePool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set.");
    }
    globalForDatabase.databasePool = new Pool({ connectionString: connectionString, max: 5 });
  }
  return globalForDatabase.databasePool;
}

export type DatabaseClient = Pick<PoolClient, "query">;

export async function query<Row extends QueryResultRow>(sql: string, parameters: unknown[] = []): Promise<Row[]> {
  const result = await getPool().query<Row>(sql, parameters);
  return result.rows;
}

export async function withTransaction<Result>(work: (client: DatabaseClient) => Promise<Result>): Promise<Result> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
