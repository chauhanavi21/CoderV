-- ═══════════════════════════════════════════════════════════════════════════
-- CoderV — Full Supabase Schema
-- Run this entire file in the Supabase SQL Editor once.
-- Then run: node seed.js  (from the backend folder) to populate lesson data.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Users (synced from Firebase on login/signup) ──────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,          -- Firebase UID
  email       TEXT,
  first_name  TEXT,
  last_name   TEXT,
  image_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. User progress ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT REFERENCES users(id) ON DELETE CASCADE,
  lesson_id    TEXT       NOT NULL,
  difficulty   TEXT       NOT NULL,
  example_id   TEXT       NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id, difficulty, example_id)
);

-- ── 3. Lesson types (type-1 … type-4) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lesson_types (
  id           TEXT PRIMARY KEY,          -- 'type-1', 'type-2', etc.
  number       INT,
  title        TEXT NOT NULL,
  description  TEXT,
  color        TEXT,                      -- Tailwind class e.g. 'bg-indigo-600'
  available    BOOLEAN DEFAULT false,
  summary      TEXT,
  lesson_label TEXT,                      -- 'Type 1', 'Type 2', …
  lesson_name  TEXT,                      -- 'Python step visualizer', …
  sort_order   INT DEFAULT 0
);

-- ── 4. Difficulty levels per lesson type ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS difficulties (
  id             SERIAL PRIMARY KEY,
  lesson_id      TEXT NOT NULL REFERENCES lesson_types(id) ON DELETE CASCADE,
  difficulty_key TEXT NOT NULL,           -- 'beginner', 'easy', 'medium', 'hard'
  label          TEXT NOT NULL,
  description    TEXT,
  sort_order     INT DEFAULT 0,
  UNIQUE(lesson_id, difficulty_key)
);

-- ── 5. Examples (one row per example, code/explanation stored here) ───────────
CREATE TABLE IF NOT EXISTS examples (
  id             TEXT PRIMARY KEY,        -- e.g. 'variables-intro'
  lesson_id      TEXT NOT NULL REFERENCES lesson_types(id) ON DELETE CASCADE,
  difficulty_key TEXT NOT NULL,
  title          TEXT NOT NULL,
  concept        TEXT,
  code           TEXT,
  explanation    TEXT,
  challenge      TEXT,
  sort_order     INT DEFAULT 0
);

-- ── 6. Step-by-step trace steps ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS example_steps (
  id          SERIAL PRIMARY KEY,
  example_id  TEXT NOT NULL REFERENCES examples(id) ON DELETE CASCADE,
  sort_order  INT  NOT NULL,
  line_number INT,
  description TEXT,
  action      JSONB    -- { type, name, val, color, arg, target, … }
);

-- ── 7. Quiz questions ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
  id            SERIAL PRIMARY KEY,
  example_id    TEXT NOT NULL REFERENCES examples(id) ON DELETE CASCADE,
  sort_order    INT  NOT NULL,
  question_text TEXT NOT NULL,
  correct_index INT  NOT NULL              -- 0-based index into quiz_options
);

-- ── 8. Quiz options ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_options (
  id          SERIAL PRIMARY KEY,
  question_id INT  NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  sort_order  INT  NOT NULL,
  option_text TEXT NOT NULL
);

-- ── 9. Graph nodes ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS graph_nodes (
  id         SERIAL PRIMARY KEY,
  example_id TEXT NOT NULL REFERENCES examples(id) ON DELETE CASCADE,
  node_id    TEXT NOT NULL,
  label      TEXT
);

-- ── 10. Graph edges ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS graph_edges (
  id         SERIAL PRIMARY KEY,
  example_id TEXT NOT NULL REFERENCES examples(id) ON DELETE CASCADE,
  from_node  TEXT NOT NULL,
  to_node    TEXT NOT NULL
);

-- ── Indexes for common query patterns ────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_user_progress_user   ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_difficulties_lesson  ON difficulties(lesson_id);
CREATE INDEX IF NOT EXISTS idx_examples_lesson      ON examples(lesson_id);
CREATE INDEX IF NOT EXISTS idx_examples_diff        ON examples(lesson_id, difficulty_key);
CREATE INDEX IF NOT EXISTS idx_steps_example        ON example_steps(example_id);
CREATE INDEX IF NOT EXISTS idx_questions_example    ON quiz_questions(example_id);
CREATE INDEX IF NOT EXISTS idx_options_question     ON quiz_options(question_id);
CREATE INDEX IF NOT EXISTS idx_nodes_example        ON graph_nodes(example_id);
CREATE INDEX IF NOT EXISTS idx_edges_example        ON graph_edges(example_id);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Lesson content is read-only public (no RLS needed — backend uses service role).
-- User data is protected — only the backend (service role) can write.

ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress  ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_types   ENABLE ROW LEVEL SECURITY;
ALTER TABLE difficulties   ENABLE ROW LEVEL SECURITY;
ALTER TABLE examples       ENABLE ROW LEVEL SECURITY;
ALTER TABLE example_steps  ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options   ENABLE ROW LEVEL SECURITY;
ALTER TABLE graph_nodes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE graph_edges    ENABLE ROW LEVEL SECURITY;

-- Backend uses service_role key which bypasses RLS — no policies needed for writes.
-- Add read-only policies so the anon key can read lesson content if ever needed:

CREATE POLICY "lesson_types are publicly readable"
  ON lesson_types FOR SELECT USING (true);

CREATE POLICY "difficulties are publicly readable"
  ON difficulties FOR SELECT USING (true);

CREATE POLICY "examples are publicly readable"
  ON examples FOR SELECT USING (true);

CREATE POLICY "example_steps are publicly readable"
  ON example_steps FOR SELECT USING (true);

CREATE POLICY "quiz_questions are publicly readable"
  ON quiz_questions FOR SELECT USING (true);

CREATE POLICY "quiz_options are publicly readable"
  ON quiz_options FOR SELECT USING (true);

CREATE POLICY "graph_nodes are publicly readable"
  ON graph_nodes FOR SELECT USING (true);

CREATE POLICY "graph_edges are publicly readable"
  ON graph_edges FOR SELECT USING (true);
