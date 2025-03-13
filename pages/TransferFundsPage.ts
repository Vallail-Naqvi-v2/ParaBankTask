import { Locator, Page } from "@playwright/test";

/**
 * @author Vallail N
 */
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

  async transferFunds(amount: string, fromAccountIndex: string, toAccountIndex: string) {
    await this.amount.fill(amount);
    const fromAccountOptions = this.fromAccount.locator("option");
    const fromAccountCount = await fromAccountOptions.count();
    if (parseInt(fromAccountIndex) <= fromAccountCount) {
      await this.fromAccount.selectOption({ index: parseInt(fromAccountIndex) - 1 });
    }
    const toAccountOptions = this.toAccount.locator("option");
    const toAccountCount = await toAccountOptions.count();
    if (parseInt(toAccountIndex) <= toAccountCount) {
      await this.toAccount.selectOption({ index: parseInt(toAccountIndex) - 1 });
    }
    await this.submitButton.click();
  }

  async verifyTransferSuccess() {
    await this.successMessage.waitFor({ state: "visible" });
  }
}
