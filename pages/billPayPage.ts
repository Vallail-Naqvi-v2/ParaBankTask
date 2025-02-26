import { Page, expect } from "@playwright/test";

export class BillPayPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyBillPayPage() {
    await expect(this.page.getByRole("button", { name: "Send Payment" })).toBeVisible();
  }

  async fillBillPaymentDetails() {
    await this.page.getByRole("link", { name: "Bill Pay" }).click();
    await this.page.locator('input[name="payee.name"]').fill("Vallail");
    await this.page.locator('input[name="payee.address.street"]').fill("Kalyanpur");
    await this.page.locator('input[name="payee.address.city"]').fill("Lucknow");
    await this.page.locator('input[name="payee.address.state"]').fill("UttarPradesh");
    await this.page.locator('input[name="payee.address.zipCode"]').fill("226022");
    await this.page.locator('input[name="payee.phoneNumber"]').fill("123546678");
    await this.page.locator('input[name="payee.accountNumber"]').fill("445677");
    await this.page.locator('input[name="verifyAccount"]').fill("445677");
    await this.page.locator('input[name="amount"]').fill("1652");
    await this.page.waitForTimeout(1000);
    await this.page.getByRole("button", { name: "Send Payment" }).click();
  }

  async verifyPaymentSuccess() {
    await expect(this.page.getByRole("heading", { name: "Bill Payment Complete" })).toBeVisible();
  }
}
