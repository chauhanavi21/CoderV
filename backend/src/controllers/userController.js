import admin from '../config/firebase.js';
import * as userModel from '../models/userModel.js';

/**
 * POST /api/users/sync
 * Called by the frontend after signup (or login) to upsert the user
 * into Supabase using the verified Firebase identity.
 */
export async function syncUser(req, res) {
  try {
    const { userId, email, name, picture } = req.auth;
    const { displayName, photoURL } = req.body ?? {};

    // Prefer values from the token; fall back to body (useful right after signup
    // when the profile update hasn't propagated to the token yet).
    const fullName   = name || displayName || '';
    const [firstName = '', ...rest] = fullName.trim().split(' ');
    const lastName   = rest.join(' ');
    const imageUrl   = picture || photoURL || null;

    await userModel.upsertUser({
      id:         userId,
      email:      email ?? '',
      first_name: firstName,
      last_name:  lastName,
      image_url:  imageUrl,
    });

    const row = await userModel.getUserById(userId);
    let fromClaims = false;
    if (admin.apps?.length) {
      try {
        const fbUser = await admin.auth().getUser(userId);
        fromClaims = !!fbUser.customClaims?.openLessons;
      } catch (_) {
        /* ignore */
      }
    }
    res.json({
      success: true,
      openLessons: !!row?.open_lessons || fromClaims,
    });
  } catch (err) {
    console.error('[userController.syncUser]', err.message);
    res.status(500).json({ error: err.message });
  }
}
