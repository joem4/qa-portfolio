import { expect, Locator, Page } from '@playwright/test';

export class NodeSelectionPage {
  readonly page: Page;

  // LOCATORS
  readonly sistemaCoreButton: Locator;
  readonly inputNodo: Locator;

  // CONSTANTES
  readonly nodoRendiciones = 'RENDICIONES';

  constructor(page: Page) {
    this.page = page;
    this.sistemaCoreButton = page.getByText(/sistema core/i);
    this.inputNodo = page.getByPlaceholder('Ingrese nombre del nodo');
  }

  // HELPERS
  async esperarPantallaApps() {
    await expect(this.sistemaCoreButton).toBeVisible();
  }

  async esperarSelectorNodo() {
    await expect(this.inputNodo).toBeVisible();
  }

  // ACTIONS
  async ingresarASistemaCore() {
    await this.esperarPantallaApps();
    await this.sistemaCoreButton.click();
  }

  async seleccionarNodo(nombreNodo: string) {
    await this.esperarSelectorNodo();

    // escribir nodo
    await this.inputNodo.fill(nombreNodo);

    // seleccionar opción
    const opcion = this.page.getByRole('option', { name: nombreNodo });
    await expect(opcion).toBeVisible();
    await opcion.click();

    await this.page.waitForLoadState('networkidle');
  }

  async ingresarConNodo(nombreNodo: string) {
    await this.ingresarASistemaCore();
    await this.seleccionarNodo(nombreNodo);
  }

  async ingresarConNodoRendiciones() {
    await this.ingresarConNodo(this.nodoRendiciones);
  }
}