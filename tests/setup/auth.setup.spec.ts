import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';
import path from 'path';

const authFile = path.resolve(__dirname, '../../storage/auth-state.json');

setup('login y guardar sesión', async ({ page }) => {
  const baseURL = process.env.BASE_URL;
  const username = process.env.COGNITO_USERNAME;
const password = process.env.COGNITO_PASSWORD;

  if (!baseURL || !username || !password) {
  throw new Error('Faltan variables de entorno: BASE_URL, COGNITO_USERNAME o COGNITO_PASSWORD');
}

  const loginPage = new LoginPage(page);

  await page.goto(baseURL);

  await loginPage.login(username, password);

  await loginPage.validarLoginExitoso();

  await page.context().storageState({ path: authFile });

  expect(true).toBeTruthy();
});