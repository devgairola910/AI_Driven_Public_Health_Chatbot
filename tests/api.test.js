import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/index.js';

function createMockResponse() {
  return {
    headers: {},
    statusCode: 200,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    end(body) {
      this.body = body;
    }
  };
}

test('GET /api/health responds successfully', async () => {
  const req = {
    method: 'GET',
    url: '/api/health'
  };
  const res = createMockResponse();

  await handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.match(res.body, /"ok": true/);
});
