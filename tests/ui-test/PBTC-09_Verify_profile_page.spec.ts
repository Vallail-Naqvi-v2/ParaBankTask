import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/loginPage";
import { USER_DATA } from "../../utils";
import { HomePage } from "../../Pages/homePage";
import { UpdateProfilePage } from "../../Pages/updateProfilePage";

test("PBTC-09 | Verify update profile page of parabank", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const updateProfilePage = new UpdateProfilePage(page);

  await test.step("Verify URL of the login page", async () => {
    await loginPage.goTo(USER_DATA.Url);
    await page.waitForLoadState("domcontentloaded");
    await loginPage.login(USER_DATA.Username, USER_DATA.Password);
  });
  await test.step("Clicks on the request loan tab", async () => {
    await homePage.goToUpdateProfile();
    await page.waitForLoadState("networkidle");
    await updateProfilePage.updateLastName("random");
    await updateProfilePage.waitForProfileUpdate();
    const successMessage = page.locator('h1:has-text("Profile Updated")');
    await expect(successMessage).toBeVisible();
  });
});
