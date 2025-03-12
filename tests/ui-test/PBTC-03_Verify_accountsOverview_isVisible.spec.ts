import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import { USER_DATA } from "../../utils";
import { AccountsOverviewPage } from "../../pages/accountsOverviewPage";
import { HomePage } from "../../Pages/homePage";

test("Verify Accounts Overview page is Visible", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const accountsOverViewPage = new AccountsOverviewPage(page);

  await test.step("Login into the website", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("domcontentloaded");
    await loginPage.login(USER_DATA.Username, USER_DATA.Password);
    const logoutbutton = await loginPage.verifyLoginSuccess();
    expect(logoutbutton).toBe(true);
  });

  await test.step("Verify Accounts Overview is Visible", async () => {
    await homePage.goToAccountsOverview();
    await page.pause();
    // Get all rows in the table
    const rows = await accountsOverViewPage.getTableRows();
    const rowCount = await rows.count();

    // Loop through each row and verify the data
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const cells = await accountsOverViewPage.getRowCells(rowIndex);

      // Skip the "Total" row since it doesn't have full data
      if (cells[0] === "Total") {
        continue;
      }

      // Verify Account number (should be a number or non-empty)
      const account = cells[0];
      expect(account).toBeDefined(); // Check if account exists
      expect(isNaN(Number(account))).toBeFalsy(); // Check if account is a valid number

      // Verify Balance (should not be empty)
      const balance = cells[1];
      expect(balance).toBeDefined(); // Check if balance exists
      expect(balance.trim()).not.toBe(""); // Ensure balance is not empty

      // Verify Available Amount (should not be empty)
      const availableAmount = cells[2];
      expect(availableAmount).toBeDefined(); // Check if availableAmount exists
      expect(availableAmount.trim()).not.toBe(""); // Ensure availableAmount is not empty
    }

    // Check if the footer text exists (optional)
    const footerText = await accountsOverViewPage.getFooterText();
    expect(footerText).toContain("*Balance includes deposits that may be subject to holds");
  });
});
