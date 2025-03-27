import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import readJsonFile, { USER_DATA } from "../../utils";
import { HomePage } from "../../Pages/homePage";
import { OpenAccountPage } from "../../Pages/openAccountPage";

test("PBTC-04 | Verify User is able to create a new account", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const openAccountPage = new OpenAccountPage(page);

  await test.step("Login into the website", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("domcontentloaded");
    await loginPage.login(USER_DATA.Username, USER_DATA.Password);
    const logoutbutton = await loginPage.verifyLoginSuccess();
    expect(logoutbutton).toBe(true);
  });

  await test.step("clicks on the open new account tab", async () => {
    await homePage.goToOpenNewAccount();
    await openAccountPage.openNewAccount("1");
    await openAccountPage.waitForAccountOpened();
    const heading = readJsonFile("./test-data/expected-response.json");
    const result = await openAccountPage.returnSucessText();
    expect(result).toContain(heading.accountoverview);
    //console.log(result);
    //console.log(heading.accountoverview);
  });
});
