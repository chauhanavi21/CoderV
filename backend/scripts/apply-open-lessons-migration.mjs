/**
 * Adds users.open_lessons via direct Postgres (not the Supabase REST API).
 *
 * Requires DATABASE_URL in backend/.env — the Supabase **database** URI
 * (Project Settings → Database → Connection string → URI). This is NOT
 * the same as SUPABASE_SERVICE_ROLE_KEY.
 *
 * Usage (from backend/):
 *   node scripts/apply-open-lessons-migration.mjs
 *
 * If you do not use Supabase at all: you can skip this script. Professor
 * full access still works via Firebase custom claim `openLessons` and
 * POST /api/users/sync reading it from Firebase Admin.
 */
import 'dotenv/config';
import pg from 'pg';

const sql = `
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS open_lessons BOOLEAN NOT NULL DEFAULT false;
`;

async function main() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error(
      'Missing DATABASE_URL. Add to backend/.env the Postgres URI from Supabase:\n' +
        'Project Settings → Database → Connection string (postgres / URI).\n' +
        'Or skip this script if you only rely on Firebase custom claims for openLessons.'
    );
    process.exit(1);
  }

  const client = new pg.Client({
    connectionString: url,
    ssl: url.includes('supabase') ? { rejectUnauthorized: false } : undefined,
  });

  try {
    await client.connect();
    await client.query(sql);
    console.log('Migration applied: users.open_lessons is present.');
  } finally {
    await client.end().catch(() => {});
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
