import { Locator, Page } from "@playwright/test";

/**
 * @author Vallail N
 */

export class HomePage {
  readonly page: Page;
  readonly openNewAccountButton: Locator;
  readonly updateProfileButton: Locator;
  readonly accountsOverviewButton: Locator;
  readonly billPayButton: Locator;
  readonly requestLoadButton: Locator;
  readonly logOutButton: Locator;
  readonly transferFundsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.updateProfileButton = page.getByRole("link", { name: "Update Contact Info" });
    this.openNewAccountButton = page.getByRole("link", { name: "Open New Account" });
    this.accountsOverviewButton = page.getByRole("link", { name: "Accounts Overview" });
    this.billPayButton = page.getByRole("link", { name: "Bill Pay" });
    this.requestLoadButton = page.getByRole("link", { name: "Request Loan" });
    this.logOutButton = page.getByRole("link", { name: "Log Out" });
    this.transferFundsButton = page.getByRole("link", { name: "Transfer Funds" });
  }

  async goToUpdateProfile() {
    await this.updateProfileButton.click();
  }

  async goToOpenNewAccount() {
    await this.openNewAccountButton.click();
  }

  async goToAccountsOverview() {
    await this.accountsOverviewButton.click();
  }

  async goToBillPay() {
    await this.billPayButton.click();
  }

  async goToRequestLoan() {
    await this.requestLoadButton.click();
  }

  async logout() {
    await this.logOutButton.click();
  }

  async goToTransferFunds() {
    await this.transferFundsButton.click();
  }
}
