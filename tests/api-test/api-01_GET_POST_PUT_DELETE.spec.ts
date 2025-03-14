import { test, expect, request, APIRequestContext } from "@playwright/test";
import { ApiService } from "../../pages/apiTestPage";
import fs from "fs";

// data from the JSON file
const testData = JSON.parse(fs.readFileSync("test-data/api-data.json", "utf-8"));

let apiContext: APIRequestContext;
let apiService: ApiService;

// Setup API context and ApiService instance
test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: "https://jsonplaceholder.typicode.com", // Example API URL
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  });
  apiService = new ApiService(apiContext);
});

// GET Request - Fetch all posts and validate structure
test("GET Request - Fetch all posts and validate structure", async () => {
  const responseData = await apiService.getAllPosts();
  console.log(responseData);

  // Ensure at least one post exists
  expect(responseData.length).toBeGreaterThan(0);

  // Validate each post has required properties
  responseData.forEach((post: { id: number; title: string; body: string }) => {
    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("body");
  });
});

// POST Request - Create a new post
test("POST Request - Create a new post", async () => {
  const { title, body, userId } = testData.postData;
  const createdPost = await apiService.createPost(title, body, userId);

  // Validate the created post
  expect(createdPost.title).toBe(title);
  expect(createdPost.body).toBe(body);
  expect(createdPost.userId).toBe(userId);
});

// PUT Request - Update a post
test("PUT Request - Update a post", async () => {
  const { postId, updatedData } = testData;
  const updatedPost = await apiService.updatePost(postId, updatedData);

  expect(updatedPost.title).toBe(updatedData.title);
  expect(updatedPost.body).toBe(updatedData.body);
  expect(updatedPost.userId).toBe(updatedData.userId);
});

// DELETE Request - Delete a post
test("DELETE Request - Delete a post", async () => {
  const { postId } = testData;
  const status = await apiService.deletePost(postId);
  expect(status).toBe(200);
});

// Error Handling - 404 Not Found
test("Error Handling - 404 Not Found", async () => {
  const response = await apiContext.get("/invalid-endpoint");
  expect(response.status()).toBe(404);
  console.warn("Verified 404 Error Handling");
});
