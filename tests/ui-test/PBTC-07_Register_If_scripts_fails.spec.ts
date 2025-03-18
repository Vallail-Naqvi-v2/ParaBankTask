import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import { USER_DATA } from "../../utils";
import { RegisterPage } from "../../pages/registerPage";
import fs from "fs";

test("PBTC-07 | Test to register a new user into the website", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  await test.step("Register a new user", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await loginPage.goToRegisteration();
    const data = JSON.parse(fs.readFileSync("test-data/registration.json", "utf-8"));
    await registerPage.fillRegistrationForm(data);
    await registerPage.submitForm();
  });
});
