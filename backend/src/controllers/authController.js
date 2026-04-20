import admin from '../config/firebase.js';
import { sendPasswordResetEmail } from '../services/emailService.js';

/**
 * POST /api/auth/forgot-password
 * Body: { email }
 *
 * Generates a Firebase password-reset link, extracts the secure oobCode,
 * then emails the user a link to OUR custom reset page:
 *   `${FRONTEND_URL}/reset-password?oobCode=XXX`
 *
 * NOTE: For security we always respond with { success: true } so that
 * attackers cannot enumerate which emails are registered.
 */
export async function forgotPassword(req, res) {
  const email = (req.body?.email || '').trim().toLowerCase();

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const frontendUrl =
      process.env.FRONTEND_URL?.replace(/\/$/, '') || 'http://localhost:5173';

    // Ask Firebase for a password-reset action link. This verifies the
    // user exists and returns a URL containing a one-time `oobCode`.
    const firebaseLink = await admin.auth().generatePasswordResetLink(email, {
      url: `${frontendUrl}/login`,
      handleCodeInApp: false,
    });

    // Pull the oobCode out of the Firebase URL and point the user at our
    // custom reset page instead of the default Firebase-hosted one.
    const parsed = new URL(firebaseLink);
    const oobCode = parsed.searchParams.get('oobCode');
    if (!oobCode) throw new Error('Missing oobCode in generated link.');

    const resetLink = `${frontendUrl}/reset-password?oobCode=${encodeURIComponent(oobCode)}`;

    let displayName = '';
    try {
      const record = await admin.auth().getUserByEmail(email);
      displayName = record.displayName || '';
    } catch {
      // Ignore — falls back to a generic greeting.
    }

    await sendPasswordResetEmail({ to: email, resetLink, displayName });

    return res.json({ success: true });
  } catch (err) {
    // Don't leak which emails are registered.
    if (err.code === 'auth/user-not-found' || err.code === 'auth/email-not-found') {
      return res.json({ success: true });
    }

    console.error('[authController.forgotPassword]', err.message);
    return res.status(500).json({ error: 'Could not send reset email. Please try again.' });
  }
}
