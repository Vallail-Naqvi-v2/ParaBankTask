import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import readJsonFile, { USER_DATA } from "../../utils";
import { RegisterPage } from "../../pages/registerPage";

test("PBTC-07 | Test to register a new user into the website", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  await test.step("Register a new user", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await loginPage.goToRegisteration();
    const data = readJsonFile("test-data/registration.json");
    await registerPage.fillRegistrationForm(data);
    await registerPage.submitForm();
  });
});
