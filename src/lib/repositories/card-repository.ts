import { DatabaseClient, query } from "@/lib/database";
import { CardSchedule } from "@/lib/spaced-repetition";

export interface Card extends CardSchedule {
  id: number;
  problemNumber: number;
  title: string;
  slug: string;
  difficulty: string;
  createdAt: string;
}

interface CardRow {
  id: string;
  problem_number: number;
  title: string;
  slug: string;
  difficulty: string;
  level: number;
  last_solved_on: string;
  created_at: Date;
}

function toCard(row: CardRow): Card {
  return {
    id: Number(row.id),
    problemNumber: row.problem_number,
    title: row.title,
    slug: row.slug,
    difficulty: row.difficulty,
    level: row.level,
    lastSolvedOn: row.last_solved_on,
    createdAt: row.created_at.toISOString(),
  };
}

export async function listCards(userId: number): Promise<Card[]> {
  const rows = await query<CardRow>(
    `SELECT cards.id, cards.problem_number, problems.title, problems.slug, problems.difficulty,
            cards.level, cards.last_solved_on, cards.created_at
     FROM cards
     JOIN problems ON problems.number = cards.problem_number
     WHERE cards.user_id = $1
     ORDER BY cards.problem_number`,
    [userId],
  );
  const cards: Card[] = [];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    cards.push(toCard(rows[rowIndex]));
  }
  return cards;
}

// Adding a problem counts as its first solve. Returns false if the user already has this problem.
export async function createCard(client: DatabaseClient, userId: number, problemNumber: number, today: string): Promise<boolean> {
  const result = await client.query<{ id: string }>(
    `INSERT INTO cards (user_id, problem_number, level, last_solved_on)
     VALUES ($1, $2, 0, $3)
     ON CONFLICT (user_id, problem_number) DO NOTHING
     RETURNING id`,
    [userId, problemNumber, today],
  );
  if (result.rows.length === 0) {
    return false;
  }
  await insertReview(client, Number(result.rows[0].id), today, 0);
  return true;
}

export async function findCardId(userId: number, problemNumber: number): Promise<number | null> {
  const rows = await query<{ id: string }>("SELECT id FROM cards WHERE user_id = $1 AND problem_number = $2", [
    userId,
    problemNumber,
  ]);
  if (rows.length === 0) {
    return null;
  }
  return Number(rows[0].id);
}

// Locks the card row until the transaction ends so two clicks cannot both count.
export async function findCardScheduleForUpdate(client: DatabaseClient, userId: number, cardId: number): Promise<CardSchedule | null> {
  const result = await client.query<{ level: number; last_solved_on: string }>(
    "SELECT level, last_solved_on FROM cards WHERE id = $1 AND user_id = $2 FOR UPDATE",
    [cardId, userId],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return { level: result.rows[0].level, lastSolvedOn: result.rows[0].last_solved_on };
}

export async function recordSolve(client: DatabaseClient, cardId: number, newLevel: number, today: string): Promise<void> {
  await client.query("UPDATE cards SET level = $2, last_solved_on = $3 WHERE id = $1", [cardId, newLevel, today]);
  await insertReview(client, cardId, today, newLevel);
}

async function insertReview(client: DatabaseClient, cardId: number, solvedOn: string, levelAfter: number): Promise<void> {
  await client.query("INSERT INTO card_reviews (card_id, solved_on, level_after) VALUES ($1, $2, $3)", [
    cardId,
    solvedOn,
    levelAfter,
  ]);
}

export async function deleteCard(userId: number, cardId: number): Promise<void> {
  await query("DELETE FROM cards WHERE id = $1 AND user_id = $2", [cardId, userId]);
}
