import { Page, Locator } from "@playwright/test";

export class RequestLoanPage {
  readonly page: Page;

  private amountInput: Locator;
  private downPaymentInput: Locator;
  private applyNowButton: Locator;
  private loanRequestSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.locator("#amount");
    this.downPaymentInput = page.locator("#downPayment");
    this.applyNowButton = page.locator('input[type="button"][value="Apply Now"]');
    this.loanRequestSuccessMessage = page.locator('h1:has-text("Loan Request Processed")');
  }

  async requestLoan(amount: string, downPayment: string) {
    await this.amountInput.click();
    await this.amountInput.fill(amount);
    await this.amountInput.press("Tab");
    await this.downPaymentInput.fill(downPayment);
    await this.applyNowButton.click();
  }

  // This method just waits for the success message element to appear, without doing the assertion
  async waitForLoanRequestSuccess() {
    await this.loanRequestSuccessMessage.waitFor({ state: "visible" });
  }
}
