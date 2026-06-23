import { test, expect } from '../src/fixtures/apiFixtures';

test.describe('Auth - CreateToken API', () => {
  test('Verify successful token creation with valid credentials returns a token string (TC-AUTH-001)', async ({ authApi }) => {
    const response = await authApi.createToken({
      username: 'admin',
      password: 'password123'
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('Verify token creation fails when invalid password is supplied (TC-AUTH-002)', async ({ authApi }) => {
    const response = await authApi.createToken({
      username: 'admin',
      password: 'WRONG_PASSWORD'
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('reason');
    expect(body.reason).toBe('Bad credentials');
  });

  test('Verify token creation fails when username is incorrect (TC-AUTH-002 Alternative)', async ({ authApi }) => {
    const response = await authApi.createToken({
      username: 'wrong_user',
      password: 'password123'
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('reason');
    expect(body.reason).toBe('Bad credentials');
  });
});
