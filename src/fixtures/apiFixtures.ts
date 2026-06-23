import { test as base } from '@playwright/test';
import { AuthApi } from '../api/AuthApi';
import { BookingApi } from '../api/BookingApi';
import { PingApi } from '../api/PingApi';

interface ApiFixtures {
  authApi: AuthApi;
  bookingApi: BookingApi;
  pingApi: PingApi;
  authToken: string;
  basicAuthHeader: Record<string, string>;
  cookieAuthHeader: Record<string, string>;
}

export const test = base.extend<ApiFixtures>({
  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },
  bookingApi: async ({ request }, use) => {
    await use(new BookingApi(request));
  },
  pingApi: async ({ request }, use) => {
    await use(new PingApi(request));
  },
  authToken: async ({ authApi }, use) => {
    const token = await authApi.getAuthToken();
    await use(token);
  },
  basicAuthHeader: async ({}, use) => {
    await use({ 'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=' });
  },
  cookieAuthHeader: async ({ authToken }, use) => {
    await use({ 'Cookie': `token=${authToken}` });
  }
});

export { expect } from '@playwright/test';
