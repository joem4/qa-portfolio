import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://cognito-login.qa.sugu.urbano.com.ar/login');
  await page.getByRole('textbox', { name: 'Nombre de usuario o email' }).click();
  await page.getByRole('textbox', { name: 'Nombre de usuario o email' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Urbano=123');
  await page.getByText('Ingresar').click();
  await page.locator('a').filter({ hasText: 'Sistema Core' }).click();
});

test('nombre del test', async ({ page }) => {
  // pasos del caso de prueba
});