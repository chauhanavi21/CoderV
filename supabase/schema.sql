CREATE TABLE IF NOT EXISTS users (
  id          text        PRIMARY KEY,           
  email       text        UNIQUE,
  first_name  text,
  last_name   text,
  image_url   text,
  created_at  timestamptz DEFAULT now() NOT NULL,
  updated_at  timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

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

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id
  ON user_progress (user_id);

