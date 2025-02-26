import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToUpdateProfile() {
    await this.page.getByRole("link", { name: "Update Contact Info" }).click();
  }

  async goToOpenNewAccount() {
    await this.page.getByRole("link", { name: "Open New Account" }).click();
  }

  async goToAccountsOverview() {
    await this.page.getByRole("link", { name: "Accounts Overview" }).click();
  }

  async goToBillPay() {
    await this.page.getByRole("link", { name: "Bill Pay" }).click();
  }

  async goToRequestLoan() {
    await this.page.getByRole("link", { name: "Request Loan" }).click();
  }

  async logout() {
    await this.page.getByRole("link", { name: "Log Out" }).click();
  }

  async goToTransferFunds() {
    await this.page.click('a[href="/parabank/transfer.htm"]');
  }
}
