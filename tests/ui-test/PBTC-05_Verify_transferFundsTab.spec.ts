import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import { USER_DATA } from "../../utils";
import { HomePage } from "../../Pages/homePage";
import { TransferFundsPage } from "../../pages/transferFundsPage";

test("PBTC-05 | Verify transfer funds page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const transferFundsPage = new TransferFundsPage(page);

  await test.step("Login into the website", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("domcontentloaded");
    await loginPage.login(USER_DATA.Username, USER_DATA.Password);
    const logoutbutton = await loginPage.verifyLoginSuccess();
    expect(logoutbutton).toBe(true);
  });

  await test.step("Go to the transfer funds tab", async () => {
    await homePage.goToTransferFunds();
    await transferFundsPage.transferFunds("1000", "16341", "21114");
    await transferFundsPage.verifyTransferSuccess();
    const successMessage = await page.locator("#rightPanel:has-text('Transfer Complete!')");
    await expect(successMessage).toBeVisible();
  });
});
