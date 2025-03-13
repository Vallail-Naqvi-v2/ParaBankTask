import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import { USER_DATA } from "../../utils";
import { BillPayPage } from "../../Pages/billPayPage";
import fs from "fs";
import { HomePage } from "../../Pages/homePage";

test("PBTC-06 | Verify Bills payments ", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const billPayPage = new BillPayPage(page);
  const homePage = new HomePage(page);

  await test.step("Login into the website", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("domcontentloaded");
    await loginPage.login(USER_DATA.Username, USER_DATA.Password);
    const logoutbutton = await loginPage.verifyLoginSuccess();
    expect(logoutbutton).toBe(true);
  });
  await test.step("Verify bill payments", async () => {
    const data = JSON.parse(fs.readFileSync("test-data/bill-paymentsdata.json", "utf-8"));
    await homePage.goToBillPay();
    await billPayPage.verifyBillPayPage();
    await billPayPage.fillBillPaymentDetails(data);
    await billPayPage.verifyPaymentSuccess();

    const successMessage = await page.locator('h1:has-text("Bill Payment Complete")');
    await expect(successMessage).toBeVisible();
  });
});
