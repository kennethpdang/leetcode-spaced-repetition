-- LeetCode Spaced Repetition database schema (PostgreSQL).
-- Safe to run more than once: every statement only creates what is missing.

-- People who can sign in.
CREATE TABLE IF NOT EXISTS users (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         TEXT        NOT NULL UNIQUE,
  password_hash TEXT        NOT NULL,
  first_name    TEXT        NOT NULL,
  last_name     TEXT        NOT NULL,
  time_zone     TEXT        NOT NULL DEFAULT 'UTC',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- LeetCode problem details, shared by every user.
-- The primary key is the problem number shown on LeetCode (e.g. 1 = Two Sum).
CREATE TABLE IF NOT EXISTS problems (
  number     INTEGER     PRIMARY KEY CHECK (number > 0),
  title      TEXT        NOT NULL,
  slug       TEXT        NOT NULL,
  difficulty TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One flashcard per user per problem, holding its spaced repetition state.
-- level is a position in INTERVAL_DAYS (src/lib/spaced-repetition.ts).
CREATE TABLE IF NOT EXISTS cards (
  id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id        BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  problem_number INTEGER     NOT NULL REFERENCES problems (number),
  level          SMALLINT    NOT NULL DEFAULT 0 CHECK (level >= 0),
  last_solved_on DATE        NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, problem_number)
);

-- History of every solve. The unique rule makes a second solve on the same day impossible.
CREATE TABLE IF NOT EXISTS card_reviews (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  card_id     BIGINT      NOT NULL REFERENCES cards (id) ON DELETE CASCADE,
  solved_on   DATE        NOT NULL,
  level_after SMALLINT    NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (card_id, solved_on)
);
