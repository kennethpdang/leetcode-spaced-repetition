import { query } from "@/lib/database";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  timeZone: string;
}

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  time_zone: string;
}

export interface UserWithPassword {
  user: User;
  passwordHash: string;
}

export interface NewUser {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  timeZone: string;
}

const USER_COLUMNS = "id, email, password_hash, first_name, last_name, time_zone";

function toUser(row: UserRow): User {
  return {
    id: Number(row.id),
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    timeZone: row.time_zone,
  };
}

export async function findUserById(userId: number): Promise<User | null> {
  const rows = await query<UserRow>(`SELECT ${USER_COLUMNS} FROM users WHERE id = $1`, [userId]);
  if (rows.length === 0) {
    return null;
  }
  return toUser(rows[0]);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const rows = await query<UserRow>(`SELECT ${USER_COLUMNS} FROM users WHERE email = $1`, [email]);
  if (rows.length === 0) {
    return null;
  }
  return toUser(rows[0]);
}

export async function findUserWithPasswordByEmail(email: string): Promise<UserWithPassword | null> {
  const rows = await query<UserRow>(`SELECT ${USER_COLUMNS} FROM users WHERE email = $1`, [email]);
  if (rows.length === 0) {
    return null;
  }
  return { user: toUser(rows[0]), passwordHash: rows[0].password_hash };
}

// Returns the new user, or null if the email is already taken.
export async function createUser(newUser: NewUser): Promise<User | null> {
  const rows = await query<UserRow>(
    `INSERT INTO users (email, password_hash, first_name, last_name, time_zone)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO NOTHING
     RETURNING ${USER_COLUMNS}`,
    [newUser.email, newUser.passwordHash, newUser.firstName, newUser.lastName, newUser.timeZone],
  );
  if (rows.length === 0) {
    return null;
  }
  return toUser(rows[0]);
}

export async function updateUserTimeZone(userId: number, timeZone: string): Promise<void> {
  await query("UPDATE users SET time_zone = $2 WHERE id = $1", [userId, timeZone]);
}
