import { Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = 'input[name="username"]';
  readonly passwordInput = 'input[name="password"]';
  //   readonly loginButton = 'button:text("Log In")';
  readonly logoutLink = 'a:text("Log Out")';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC");
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.getByRole("button", { name: "Log In" }).click();
    // await this.page.click(this.loginButton);
  }

  async verifyLoginSuccess() {
    await expect(this.page.locator(this.logoutLink)).toBeVisible();
  }
}
