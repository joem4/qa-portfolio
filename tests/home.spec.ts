import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('validar titulo con Page', async ({ page }) => {

  const home = new HomePage(page);

  await home.navegar();

  const titulo = await home.obtenerTitulo();

  expect(titulo).toContain('Urbano Login');
});