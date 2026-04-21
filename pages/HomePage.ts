import { Page } from '@playwright/test';

export class HomePage {

  constructor(private page: Page) {}

  async navegar() {
    await this.page.goto('https://cognito-login.qa.sugu.urbano.com.ar');
  }

  async obtenerTitulo(): Promise<string> {
    return await this.page.title();
  }
}
