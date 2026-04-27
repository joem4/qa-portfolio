import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly btnIngresar: Locator;
  readonly alertaLoginExitoso: Locator;
  readonly alertaLoginNoExitoso: Locator;

  private readonly mensajeLoginExitoso = 'Ingreso exitoso';

  constructor(page: Page) {
    this.page = page;

    this.inputEmail = page.locator('input[type="email"]');
    this.inputPassword = page.locator('input[type="password"]');
    this.btnIngresar = page.getByRole('button', { name: /ingresar/i });

    this.alertaLoginExitoso = page.getByText(this.mensajeLoginExitoso);
    this.alertaLoginNoExitoso = page.getByText(/usuario|contraseña|incorrect/i);
  }

  async login(username: string, password: string): Promise<void> {
    await this.inputEmail.fill(username);
    await this.inputPassword.fill(password);
    await this.btnIngresar.click();
  }

  async validarLoginExitoso(): Promise<void> {
    await expect(this.alertaLoginExitoso).toBeVisible();
  }

  async validarLoginNoExitoso(): Promise<void> {
    await expect(this.alertaLoginNoExitoso).toBeVisible();
  }
}