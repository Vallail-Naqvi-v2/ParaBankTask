import { test, expect } from "@playwright/test";
import testData from "../../test-data/tags.json"; // Import test data from the JSON file

test.beforeEach(async ({ page }) => {
  // Mock the API responses for tags and articles using data from the JSON file
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      body: JSON.stringify(testData.tags), // Use tags from the JSON file
    });
  });

  await page.route("*/**/api/articles?limit=10&offset=0", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles = testData.articles; // Use articles from the JSON file

    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });

  await page.goto("https://conduit.bondaracademy.com/");
});

// Test: Check for title and description of first article
test("Has Title", async ({ page }) => {
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("app-article-list h1").first()).toContainText(testData.articles[0].title);
  await expect(page.locator("app-article-list p").first()).toContainText(testData.articles[0].description);
});

// Test: Delete an article
test("Delete an article", async ({ page, request }) => {
  const response = await request.post("https://api.example.com/articles/delete", {
    data: {
      articleId: 1, // Assume the article has an ID of 1
    },
  });

  // Assert that the deletion request was successful
  expect(response.status()).toBe(200);

  // Check if the article is removed from the page (by title for simplicity)
  await expect(page.locator("app-article-list h1").first()).not.toContainText(testData.articles[0].title);
});

// Test: Edit an article
test("Edit an article", async ({ page }) => {
  // Click on the edit button of the first article (assuming the edit button exists)
  await page.locator("button.edit-article").first().click();

  // Type new values for the title and description from testData
  await page.locator("input[placeholder='Article Title']").fill(testData.articles[1].title);
  await page.locator("textarea[placeholder='Article Description']").fill(testData.articles[1].description);

  // Submit the form (click the save button)
  await page.locator("button.save-article").click();

  // Assert the article has been updated (title and description)
  await expect(page.locator("app-article-list h1").first()).toContainText(testData.articles[1].title);
  await expect(page.locator("app-article-list p").first()).toContainText(testData.articles[1].description);
});

// Test: Create a new article
test("Create a new article", async ({ page }) => {
  // Click on the "New Article" button to open the form
  await page.locator("button.new-article").click();

  // Fill out the form with new article details from testData
  await page.locator("input[placeholder='Article Title']").fill(testData.articles[2].title);
  await page.locator("textarea[placeholder='Article Description']").fill(testData.articles[2].description);

  // Submit the form (click the save button)
  await page.locator("button.save-article").click();

  // Assert that the new article is added to the list (by title)
  await expect(page.locator("app-article-list h1").first()).toContainText(testData.articles[2].title);
});

// Test: Filter articles by tag
test("Filter articles by tag", async ({ page }) => {
  // Click on the tag filter button (assuming tags are clickable)
  await page.locator("button.tag-filter").click();

  // Select a specific tag (replace 'Tag1' with an actual tag from the data)
  await page.locator("button.tag-" + testData.tags[0]).click();

  // Assert that the filtered articles appear with the selected tag
  await expect(page.locator("app-article-list .tag")).toContainText(testData.tags[0]);
});
