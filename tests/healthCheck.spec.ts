import { test, expect } from '../src/fixtures/apiFixtures';

test.describe('Health Check - Ping API', () => {
  test('Verify GET /ping returns HTTP 201 Created confirming the API is up and running', async ({ pingApi }) => {
    const response = await pingApi.healthCheck();
    expect(response.status()).toBe(201);
    const body = await response.text();
    expect(body).toBe('Created');
  });
});
