import { expect, test } from "@playwright/test";
import { LoginPage } from "../Pages/loginPage";
import { USER_DATA } from "../utils";
import { HomePage } from "../Pages/homePage";

test("Login page tests", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await test.step("Verify URL of the login page", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("domcontentloaded");
    await loginPage.login(USER_DATA.Url, USER_DATA.Password);
  });
  await test.step("Verify ", async () => {});
});
