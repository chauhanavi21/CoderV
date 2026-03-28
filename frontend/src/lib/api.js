const BASE_URL = import.meta.env.VITE_API_URL || 'https://coderv.onrender.com';

/**
 * Authenticated fetch wrapper.
 * Pass Firebase's `getToken` (from useAuth context) to attach the Bearer token.
 *
 * @param {string}   path      e.g. '/api/progress'
 * @param {object}   options   standard fetch options
 * @param {Function} getToken  getToken() from useAuth()
 */
export async function apiRequest(path, options = {}, getToken = null) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers ?? {}) };

  if (getToken) {
    const token = await getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(body.error || `HTTP ${res.status}`);
  }

  return res.json();
}
