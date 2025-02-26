import { Page, expect } from "@playwright/test";

export class UpdateProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async updateLastName(lastName: string) {
    await this.page.waitForTimeout(2000);
    await this.page.locator('[id="customer\\.lastName"]').fill(lastName);
    await this.page.getByRole("button", { name: "Update Profile" }).click();
  }

  async verifyProfileUpdate() {
    await expect(this.page.getByRole("heading", { name: "Profile Updated" })).toBeVisible();
  }
}
