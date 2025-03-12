import { Locator, Page } from "@playwright/test";

export class TransferFundsPage {
  readonly page: Page;
  private amount: Locator;
  private fromAccount: Locator;
  private toAccount: Locator;
  private submitButton: Locator;
  private successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amount = page.locator("#amount");
    this.fromAccount = page.locator("select#fromAccountId");
    this.toAccount = page.locator("select#toAccountId");
    this.submitButton = page.locator('input[type="submit"]');
    this.successMessage = page.locator("#rightPanel:has-text('Transfer Complete!')");
  }

  async transferFunds(amount: string, fromAccount: string, toAccount: string) {
    await this.amount.fill(amount);
    await this.fromAccount.selectOption({ value: fromAccount });
    await this.toAccount.selectOption({ value: toAccount });
    await this.submitButton.click();
  }

  async verifyTransferSuccess() {
    await this.successMessage.waitFor({ state: "visible" });
  }
}
