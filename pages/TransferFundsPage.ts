import { Page } from "@playwright/test";

export class TransferFundsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async transferFunds(amount: string, fromAccount: string, toAccount: string) {
    await this.page.fill('input[name="amount"]', amount);
    await this.page.selectOption("select#fromAccountId", fromAccount);
    await this.page.selectOption("select#toAccountId", toAccount);
    await this.page.click('input[type="submit"]');
  }

  async verifyTransferSuccess() {
    await this.page.waitForSelector("#rightPanel:has-text('Transfer Complete!')");
  }
}
