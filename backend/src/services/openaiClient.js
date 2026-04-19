import OpenAI from 'openai';

let cachedClient = null;
let warned = false;

/**
 * Returns a singleton OpenAI client built from process.env.OPENAI_API_KEY.
 * Returns null (and logs once) if the key is missing — callers should respond
 * with a friendly 503 instead of crashing.
 */
export function getOpenAIClient() {
  if (cachedClient) return cachedClient;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    if (!warned) {
      console.warn('[openai] OPENAI_API_KEY is not set — AI features will be disabled.');
      warned = true;
    }
    return null;
  }

  cachedClient = new OpenAI({ apiKey });
  return cachedClient;
}

export const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
