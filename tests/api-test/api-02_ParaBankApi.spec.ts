import { test, expect } from "@playwright/test";
import { apiLogin } from "../../pages/apiParaBank";
import { HomePage } from "../../Pages/homePage";
import { UpdateProfilePage } from "../../Pages/updateProfilePage";
import { OpenAccountPage } from "../../Pages/openAccountPage";
import { BillPayPage } from "../../Pages/billPayPage";

test.describe("Parabank End-to-End API Test", () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await apiLogin(browser);
  });

  test("Perform banking operations via API login", async () => {
    const homePage = new HomePage(page);
    const updateProfilePage = new UpdateProfilePage(page);
    const openAccountPage = new OpenAccountPage(page);
    const billPayPage = new BillPayPage(page);

    // Open New Account
    await test.step("Open New Account", async () => {
      await homePage.goToOpenNewAccount();
      await openAccountPage.openNewAccount("1");
      await openAccountPage.waitForAccountOpened();
    });

    // Accounts Overview
    await test.step("Accounts Overview", async () => {
      await homePage.goToAccountsOverview();
    });

    // Bill Pay
    await test.step("Bill Pay", async () => {
      await homePage.goToBillPay();
      await billPayPage.verifyBillPayPage();
    });

    // Update Profile
    await test.step("Update Profile", async () => {
      await homePage.goToUpdateProfile();
      await updateProfilePage.updateLastName("Truth");
    });

    // Logout
    await test.step("Logout", async () => {
      await homePage.logout();
    });
  });
});
