import { test, expect } from '@playwright/test';

test('debe ingresar con sesión guardada', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/apps/);
});