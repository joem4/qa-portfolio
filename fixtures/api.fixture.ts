import { test as base, expect, APIRequestContext } from '@playwright/test';
import { AuthApi } from '@api/auth.api';

type ApiWorkerFixtures = {
  apiRequest: APIRequestContext;
  accessToken: string;
};

export const test = base.extend<{}, ApiWorkerFixtures>({
  apiRequest: [
    async ({ playwright }, use) => {
      const apiRequest = await playwright.request.newContext();

      await use(apiRequest);

      await apiRequest.dispose();
    },
    { scope: 'worker' },
  ],

  accessToken: [
    async ({ apiRequest }, use) => {
      const authApi = new AuthApi(apiRequest);
      const token = await authApi.getAccessToken();

      await use(token);
    },
    { scope: 'worker' },
  ],
});

export { expect };