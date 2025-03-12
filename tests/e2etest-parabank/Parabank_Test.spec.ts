import { test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import { HomePage } from "../../Pages/homePage";
import { UpdateProfilePage } from "../../Pages/updateProfilePage";
import { OpenAccountPage } from "../../Pages/openAccountPage";
import { BillPayPage } from "../../Pages/billPayPage";
import { RequestLoanPage } from "../../Pages/requestLoanPage";
import { TransferFundsPage } from "../../pages/transferFundsPage";

test("Parabank End-to-End Test", async ({ page }) => {
  const transferFundsPage = new TransferFundsPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const updateProfilePage = new UpdateProfilePage(page);
  const openAccountPage = new OpenAccountPage(page);
  const billPayPage = new BillPayPage(page);
  const requestLoanPage = new RequestLoanPage(page);

  // Login
  await test.step("Login", async () => {
    await page.waitForLoadState("networkidle");
    await loginPage.login("vallail", "vallail1");
    await page.waitForLoadState("networkidle");
    await loginPage.verifyLoginSuccess();
  });

  // Open New Account
  await test.step("Open New Account", async () => {
    await homePage.goToOpenNewAccount();
    await openAccountPage.openNewAccount("1");
    //await openAccountPage.verifyAccountOpened();
  });

  // Accounts Overview
  await test.step("Accounts Overview", async () => {
    await homePage.goToAccountsOverview();
  });

  // Bill Pay
  await test.step("Bill Pay", async () => {
    await homePage.goToBillPay();
    await billPayPage.verifyBillPayPage();
    //await billPayPage.fillBillPaymentDetails();
    await billPayPage.verifyPaymentSuccess();
  });

  // Update Profile
  await test.step("Update Profile", async () => {
    await homePage.goToUpdateProfile();
    await updateProfilePage.updateLastName("Truth");
    await updateProfilePage.verifyProfileUpdate();
  });

  // Request Loan
  await test.step("Request Loan", async () => {
    await homePage.goToRequestLoan();
    await requestLoanPage.requestLoan();
    await requestLoanPage.verifyLoanRequestSuccess();
  });
  // Transfer Funds
  await test.step("Transfer Funds", async () => {
    await homePage.goToTransferFunds();
    await transferFundsPage.transferFunds("100", "12345", "67890");
    await transferFundsPage.verifyTransferSuccess();
  });

  // Logout
  await test.step("Logout", async () => {
    await homePage.logout();
  });
});
