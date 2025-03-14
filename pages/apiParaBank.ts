import { request, APIRequestContext, Browser, BrowserContext, Page, expect } from "@playwright/test";
import { USER_DATA } from "../utils";

const API_URL = USER_DATA.API_URL;
const UI_URL = USER_DATA.UI_URL;
const username = USER_DATA.Username;
const password = USER_DATA.Password;

export async function apiLogin(browser: Browser): Promise<Page> {
  const apiContext: APIRequestContext = await request.newContext();

  // Perform API Login
  await apiContext.post(API_URL, {
    form: { username, password },
  });
  //Extract Cookies & Validate**
  const cookies = await apiContext.storageState();

  // Create a new browser context with the authenticated cookies
  const context: BrowserContext = await browser.newContext({
    storageState: cookies,
  });

  // Open a new page with authenticated session
  const page = await context.newPage();
  await page.goto(UI_URL);

  return page;
}
