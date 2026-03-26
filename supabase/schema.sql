-- ════════════════════════════════════════════════════════════════════════════
-- CoderV — Supabase schema
-- Run this in: Supabase dashboard → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════════════════════════


-- ── users ────────────────────────────────────────────────────────────────────
-- Synced automatically from Clerk via the /api/webhooks/clerk endpoint.
-- The id column is the Clerk user ID (e.g. user_2abc...).
-- Do NOT insert into this table manually — Clerk webhooks handle it.

CREATE TABLE IF NOT EXISTS users (
  id          text        PRIMARY KEY,           -- Clerk user ID
  email       text        UNIQUE,
  first_name  text,
  last_name   text,
  image_url   text,
  created_at  timestamptz DEFAULT now() NOT NULL,
  updated_at  timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Backend uses the service role key which bypasses RLS automatically.
-- No RLS policies needed for server-side operations.


-- ── user_progress ─────────────────────────────────────────────────────────────
-- One row per completed (lesson + difficulty + example) per user.
-- user_id references the Clerk user ID stored in the users table.

CREATE TABLE IF NOT EXISTS user_progress (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     text        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id   text        NOT NULL,
  difficulty  text        NOT NULL,
  example_id  text        NOT NULL,
  completed_at timestamptz DEFAULT now() NOT NULL,

  UNIQUE (user_id, lesson_id, difficulty, example_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Index for fast per-user progress lookups
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id
  ON user_progress (user_id);


-- ════════════════════════════════════════════════════════════════════════════
-- Setup checklist (do once after running this SQL):
--
--  1. In Clerk dashboard → Webhooks → Add endpoint:
--       URL:    https://coderv-backend.onrender.com/api/webhooks/clerk
--       Events: user.created  user.updated  user.deleted
--       Copy the "Signing Secret" and add it to backend .env as:
--       CLERK_WEBHOOK_SECRET=whsec_...
--
--  2. In Render dashboard → Environment variables, add:
--       CLERK_WEBHOOK_SECRET = whsec_...
--
-- The webhook fires automatically whenever a user signs up, updates their
-- profile, or deletes their account in Clerk. Their data is then kept in
-- sync with the Supabase users table, and progress rows are cascade-deleted
-- when a user deletes their account.
-- ════════════════════════════════════════════════════════════════════════════
