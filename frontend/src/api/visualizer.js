const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Send Python code to the backend tracer and return { code, steps }.
 * @param {string} code  Python source code
 * @returns {Promise<{ code: string, steps: Array }>}
 */
export async function traceCode(code) {
  const res = await fetch(`${BASE_URL}/api/trace`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Unknown server error' }));
    throw new Error(body.error || `Server error ${res.status}`);
  }

  return res.json();
}

/**
 * Ping the backend health endpoint.
 * @returns {Promise<boolean>}
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}
