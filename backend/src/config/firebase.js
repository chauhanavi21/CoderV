import admin from 'firebase-admin';

/**
 * Render and other hosts often mangle PEMs: extra wrapping quotes, CRLF, or
 * `\n` stored as two characters. Bad PEMs surface as OpenSSL
 * `DECODER routines::unsupported` when the Admin SDK signs a JWT.
 */
function normalizePrivateKey(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }
  return key.replace(/\\n/g, '\n').replace(/\r\n/g, '\n');
}

function loadServiceAccount() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64?.trim();
  if (b64) {
    try {
      const json = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
      return {
        projectId: json.project_id,
        clientEmail: json.client_email,
        privateKey: normalizePrivateKey(json.private_key),
      };
    } catch (err) {
      console.warn('[Firebase Admin] FIREBASE_SERVICE_ACCOUNT_JSON_BASE64 is invalid:', err.message);
    }
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
  };
}

if (!admin.apps.length) {
  const { projectId, clientEmail, privateKey } = loadServiceAccount();

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('[Firebase Admin] Missing env vars — token verification will fail.');
  } else {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  }
}

export default admin;
