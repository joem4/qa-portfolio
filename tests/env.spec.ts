import { test, expect } from '@playwright/test';

test('validar BASE_URL desde archivo de entorno', async ({ page, baseURL }) => {
  console.log('ENV:', process.env.ENV || 'qa');
  console.log('BASE_URL:', baseURL);

  expect(baseURL).toBeTruthy();

  await page.goto('/');
});

test('validar navegación usando baseURL', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/cognito-login\.qa\.sugu\.urbano\.com\.ar/);
});

test('validar retries configurados en CI', async ({}, testInfo) => {
  console.log('CI:', process.env.CI);
  console.log('Retries configurados:', testInfo.project.retries);

  if (process.env.CI) {
    expect(process.env.CI).toBe('true');
    expect(testInfo.project.retries).toBe(2);
  } else {
    expect(testInfo.project.retries).toBe(0);
  }
});