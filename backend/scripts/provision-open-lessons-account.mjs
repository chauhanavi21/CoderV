/**
 * Creates or updates a Firebase Auth user and grants full lesson access via
 * Firebase custom claim `openLessons` (always), plus `users.open_lessons` in
 * Supabase when that column exists.
 *
 * Usage (from backend/):
 *   PROVISION_PASSWORD='yourSecurePass123' node scripts/provision-open-lessons-account.mjs
 *
 * Optional env:
 *   PROVISION_EMAIL (default: jeff.offutt@coderv.com)
 *   PROVISION_FIRST_NAME, PROVISION_LAST_NAME
 *
 * Requires backend .env: Firebase Admin + Supabase service role (same as server).
 */
import 'dotenv/config';
import admin from '../src/config/firebase.js';
import { supabase } from '../src/config/supabase.js';

const EMAIL =
  process.env.PROVISION_EMAIL?.trim().toLowerCase() || 'jeff.offutt@coderv.com';
const PASSWORD = process.env.PROVISION_PASSWORD;
const FIRST = process.env.PROVISION_FIRST_NAME?.trim() || 'Jeff';
const LAST = process.env.PROVISION_LAST_NAME?.trim() || 'Offutt';

async function main() {
  if (!PASSWORD || PASSWORD.length < 8) {
    console.error('Set PROVISION_PASSWORD (min 8 characters).');
    process.exit(1);
  }
  if (!supabase) {
    console.error('Supabase not configured (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY).');
    process.exit(1);
  }
  if (!admin.apps.length) {
    console.error('Firebase Admin not initialized — check Firebase env vars.');
    process.exit(1);
  }

  let uid;
  try {
    const created = await admin.auth().createUser({
      email: EMAIL,
      password: PASSWORD,
      displayName: `${FIRST} ${LAST}`.trim(),
      emailVerified: true,
    });
    uid = created.uid;
    console.log('Created Firebase user:', EMAIL);
  } catch (err) {
    if (err.code === 'auth/email-already-exists') {
      const existing = await admin.auth().getUserByEmail(EMAIL);
      uid = existing.uid;
      await admin.auth().updateUser(uid, {
        password: PASSWORD,
        displayName: `${FIRST} ${LAST}`.trim(),
        emailVerified: true,
      });
      console.log('Updated existing Firebase user:', EMAIL);
    } else {
      throw err;
    }
  }

  await admin.auth().setCustomUserClaims(uid, { openLessons: true });
  console.log('Set Firebase custom claim openLessons=true (refresh token / re-login to pick up in client).');

  const baseRow = {
    id: uid,
    email: EMAIL,
    first_name: FIRST,
    last_name: LAST,
    image_url: null,
    updated_at: new Date().toISOString(),
  };

  const { error: upsertErr } = await supabase
    .from('users')
    .upsert(baseRow, { onConflict: 'id' });
  if (upsertErr) throw upsertErr;

  const { error: colErr } = await supabase
    .from('users')
    .update({ open_lessons: true })
    .eq('id', uid);

  if (colErr) {
    console.warn(
      'Supabase users.open_lessons not updated (column may be missing — run supabase/migrations/20260504120000_add_open_lessons.sql). Access still works via Firebase custom claim.'
    );
    console.warn(colErr.message);
  } else {
    console.log('Supabase users.open_lessons=true');
  }

  console.log('uid:', uid);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
