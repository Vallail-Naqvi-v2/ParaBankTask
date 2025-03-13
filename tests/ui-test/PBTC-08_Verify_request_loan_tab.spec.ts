import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import { USER_DATA } from "../../utils";
import { HomePage } from "../../Pages/homePage";
import { RequestLoanPage } from "../../Pages/requestLoanPage";

test("PBTC-08 | Verify Request loan tab", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const requestLoanPage = new RequestLoanPage(page);
  await test.step("Verify URL of the login page", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("domcontentloaded");
    await loginPage.login(USER_DATA.Username, USER_DATA.Password);
  });
  await test.step("Clicks on the request loan tab", async () => {
    await homePage.goToRequestLoan();
    await requestLoanPage.requestLoan("1000", "15");
    await requestLoanPage.waitForLoanRequestSuccess();
    const successMessage = await page.locator('h1:has-text("Loan Request Processed")');
    await expect(successMessage).toBeVisible();
  });
});
