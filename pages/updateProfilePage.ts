import { Page, Locator } from "@playwright/test";

/**
 * @author Vallail N
 */

export class UpdateProfilePage {
  readonly page: Page;

  private lastNameInput: Locator;
  private updateProfileButton: Locator;
  private successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.lastNameInput = page.locator('[id="customer\\.lastName"]');
    this.updateProfileButton = page.locator('input[type="button"][value="Update Profile"]');
    this.successMessage = page.locator('h1:has-text("Profile Updated")');
  }
  /**
   * @param lastName Fills the lastname according to the parameter passed
   */
  async updateLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
    await this.updateProfileButton.click();
  }

  /**
   * waits for the profile updated message
   */
  async waitForProfileUpdate() {
    await this.page.locator('h1:has-text("Profile Updated")').waitFor({ state: "visible" });
  }
  async returnSuccessMessage() {
    const result = await this.successMessage.allTextContents();
    return result;
  }
}
