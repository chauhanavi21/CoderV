import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';

import app from '../src/app.js';
import { validateCode } from '../src/middleware/validate.js';

function runValidate(body) {
  let statusCode = null;
  let jsonBody = null;
  let nextCalled = false;

  const req = { body };
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(payload) {
      jsonBody = payload;
      return this;
    },
  };

  validateCode(req, res, () => {
    nextCalled = true;
  });

  return { jsonBody, nextCalled, statusCode };
}

test('UNIT LEVEL - validateCode middleware - rejects requests without a code string', () => {
  const result = runValidate({});

  assert.equal(result.statusCode, 400);
  assert.equal(result.nextCalled, false);
  assert.match(result.jsonBody.error, /code.*string/i);
});

test('UNIT LEVEL - validateCode middleware - rejects unsafe Python operations', () => {
  const result = runValidate({ code: 'import os\nos.system("rm -rf /")' });

  assert.equal(result.statusCode, 400);
  assert.equal(result.nextCalled, false);
  assert.match(result.jsonBody.error, /os\.system/);
});

test('UNIT LEVEL - validateCode middleware - rejects oversized playground programs', () => {
  const result = runValidate({ code: 'x'.repeat(8001) });

  assert.equal(result.statusCode, 400);
  assert.equal(result.nextCalled, false);
  assert.match(result.jsonBody.error, /too long/i);
});

test('UNIT LEVEL - validateCode middleware - allows normal Python code to reach the controller', () => {
  const result = runValidate({ code: 'total = 1 + 2\nprint(total)' });

  assert.equal(result.statusCode, null);
  assert.equal(result.jsonBody, null);
  assert.equal(result.nextCalled, true);
});

test('INTEGRATION LEVEL - /api/health - returns backend health information from the Express app', async () => {
  const server = app.listen(0);
  await once(server, 'listening');

  try {
    const res = await fetch(`http://127.0.0.1:${server.address().port}/api/health`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.status, 'ok');
    assert.equal(typeof body.python, 'string');
    assert.equal(typeof body.supabase, 'boolean');
    assert.equal(typeof body.firebase, 'boolean');
  } finally {
    server.close();
  }
});

test('INTEGRATION LEVEL - /api/trace - validates input, runs the Python tracer, and returns execution steps', async () => {
  const server = app.listen(0);
  await once(server, 'listening');

  try {
    const code = 'x = 2\nprint(x)';
    const res = await fetch(`http://127.0.0.1:${server.address().port}/api/trace`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.code, code);
    assert.ok(Array.isArray(body.steps));
    assert.ok(body.steps.some((step) => step.action?.type === 'output' && step.action.val === '2'));
  } finally {
    server.close();
  }
});
