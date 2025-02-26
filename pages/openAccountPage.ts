import { Page, expect } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openNewAccount(accountType: string) {
    await this.page.locator('#type').selectOption(accountType);
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Open New Account' }).click();
  }

  async verifyAccountOpened() {
    await this.page.waitForSelector("#newAccountId");
    await expect(this.page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();
  }
}
