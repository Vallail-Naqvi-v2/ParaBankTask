import { Page, expect } from '@playwright/test';

export class RequestLoanPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async requestLoan() {
    await this.page.locator('#amount').click();
    await this.page.locator('#amount').fill('1000');
    await this.page.locator('#amount').press('Tab');
    await this.page.locator('#downPayment').fill('15');
    await this.page.getByRole('button', { name: 'Apply Now' }).click();
  }

  async verifyLoanRequestSuccess() {
    await expect(this.page.getByRole('heading', { name: 'Loan Request Processed' })).toBeVisible();
  }
}