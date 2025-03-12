import { test, expect, request, APIRequestContext } from "@playwright/test";
import { USER_DATA } from "../../utils";

let apiContext: APIRequestContext;

// Setup API context before all tests
test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: USER_DATA.BASE_URL,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  });
});

// GET Request - Fetch all posts and validate each item
test("GET Request - Fetch all posts and validate structure", async () => {
  const response = await apiContext.get("/posts");
  expect(response.status()).toBe(200);

  const responseData = await response.json();
  console.log("Total Posts Fetched:", responseData.length);

  // Ensure at least one post exists
  expect(responseData.length).toBeGreaterThan(0);

  // Validate each post has required properties
  responseData.forEach((post: { id: number; title: string; body: string }) => {
    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("body");
    console.log(`Post ID: ${post.id} - Title: ${post.title}`);
  });
});

// Helper function for API requests
async function createPost(title: string, body: string, userId: number) {
  return await apiContext.post("/posts", {
    data: { title, body, userId },
  });
}

// POST Request - Create a new post
test("POST Request - Create a new post", async () => {
  const requestBody = {
    title: "Playwright API Testing",
    body: "Testing Playwright API automation",
    userId: 777,
  };

  const response = await createPost(requestBody.title, requestBody.body, requestBody.userId);
  expect(response.status()).toBe(201);

  const responseData = await response.json();
  console.log("Created Post:", responseData);

  expect(responseData.title).toBe(requestBody.title);
  expect(responseData.body).toBe(requestBody.body);
  expect(responseData.userId).toBe(requestBody.userId);
});

// PUT Request - Update a post
test("PUT Request - Update a post", async () => {
  const postId = 1;
  const updatedData = {
    title: "Updated Title",
    body: "Updated Body Content",
    userId: 1,
  };

  const response = await apiContext.put(`/posts/${postId}`, { data: updatedData });
  expect(response.status()).toBe(200);

  const responseData = await response.json();
  console.log("Updated Post:", responseData);

  expect(responseData.title).toBe(updatedData.title);
  expect(responseData.body).toBe(updatedData.body);
});

// DELETE Request - Delete a post
test("DELETE Request - Delete a post", async () => {
  const postId = 1;
  const response = await apiContext.delete(`/posts/${postId}`);
  expect(response.status()).toBe(200);
  console.log(`Post with ID ${postId} deleted successfully.`);
});

// Error Handling - 404 Not Found
test("Error Handling - 404 Not Found", async () => {
  const response = await apiContext.get("/invalid-endpoint");
  expect(response.status()).toBe(404);
  console.warn("Verified 404 Error Handling");
});

// Cleanup after all tests
test.afterAll(async () => {
  await apiContext.dispose();
});
