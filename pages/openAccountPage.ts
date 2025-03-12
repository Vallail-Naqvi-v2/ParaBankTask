import { Page } from "@playwright/test";

export class OpenAccountPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Method to open a new account
  async openNewAccount(accountType: string) {
    await this.page.locator("#type").selectOption(accountType);
    await this.page.waitForTimeout(1000); // Consider replacing this with a better wait method
    await this.page.getByRole("button", { name: "Open New Account" }).click();
  }

  // Method to wait for the account to open
  async waitForAccountOpened() {
    await this.page.waitForSelector("#newAccountId"); // Ensure the new account ID is available
    await this.page.waitForSelector('h1:has-text("Account Opened!")'); // Wait for the heading text
  }
}
