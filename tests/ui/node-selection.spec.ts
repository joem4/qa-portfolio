import { test, expect } from '@playwright/test';
import { NodeSelectionPage } from '../../pages/nodos/NodeSelectionPage';

test.describe('Selección de nodo', () => {
  test('[NODOS] debe seleccionar nodo Rendiciones e ingresar correctamente al sistema', async ({ page }) => {
    await page.goto('/');

    const nodeSelectionPage = new NodeSelectionPage(page);

    await nodeSelectionPage.ingresarConNodoRendiciones();

  });
});