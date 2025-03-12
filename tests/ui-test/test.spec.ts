import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import { USER_DATA } from "../../utils";
import { RegisterPage } from "../../pages/registerPage";
import fs from "fs";

test("PBTC-01 | Verify User is able to login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  await test.step("Register a new user", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await loginPage.goToRegisteration();
    const data = JSON.parse(fs.readFileSync("test-data/registration.json", "utf-8"));
    await registerPage.fillRegistrationForm(data);
    await registerPage.submitForm();
    await loginPage.clickOnLogout();
  });
});
