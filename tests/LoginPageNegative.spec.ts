import { expect, test } from "@playwright/test";
import { LoginPage } from "../Pages/loginPage";
import { USER_DATA } from "../utils";

test("Login page tests", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step("Verify URL of the login page", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("domcontentloaded");
    expect(page.url()).toBe(USER_DATA.Url);
  });

  await test.step("Verify user is able to login to the website", async () => {
    await loginPage.login("Wrong Username", "Wrong password");
    const currentLogin = await loginPage.verifyLoginSuccess();
    expect(currentLogin).toBe(false);
  });
});
