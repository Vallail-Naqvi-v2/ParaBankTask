import { Locator, Page, expect } from "@playwright/test";

/**
 * @author Vallail N
 */

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.logoutLink = page.locator("text=Log Out");
  }

  /**
   * Goin to url
   * @param url The url of the website
   */
  async goTo(url: string): Promise<void> {
    await this.page.goto(url, { timeout: 300000 });
    await this.page.waitForLoadState("networkidle");
  }
  /**
   * @param username takes username as an argument
   * @param password takes password as an argument
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.page.getByRole("button", { name: "Log In" }).click();
    // await this.page.click(this.loginButton);
  }

  /**
   * @returns true if the login is successful, otherwise false
   */
  async verifyLoginSuccess(): Promise<boolean> {
    return await this.logoutLink.isVisible(); // Ensure the function waits for the result
  }
}
