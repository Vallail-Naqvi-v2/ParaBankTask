import { test, expect, request } from "@playwright/test";
import { ApiService } from "../../pages/apiTestPage";

test.describe("API Tests for Posts", () => {
  let apiService: ApiService;

  test.beforeAll(async () => {
    const apiContext = await request.newContext({ baseURL: "https://jsonplaceholder.typicode.com" });
    apiService = new ApiService(apiContext);
  });

  test("GET Request - Fetch all posts", async () => {
    const response = await apiService.getAllPosts();
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    expect(Array.isArray(responseData)).toBeTruthy();
    expect(responseData.length).toBeGreaterThan(0);
  });

  test("POST Request - Create a new post", async () => {
    const newPost = { title: "New Post", body: "Post body content", userId: 1 };
    const response = await apiService.createPost(newPost.title, newPost.body, newPost.userId);

    expect(response.status()).toBe(201);
    const responseData = await response.json();
    expect(responseData.title).toBe(newPost.title);
    expect(responseData.body).toBe(newPost.body);
    expect(responseData.userId).toBe(newPost.userId);
  });

  test("PUT Request - Update a post", async () => {
    const updatedPost = { title: "Updated Title", body: "Updated Content", userId: 1 };
    const response = await apiService.updatePost(1, updatedPost);

    expect(response.status()).toBe(200);
    const responseData = await response.json();
    expect(responseData.title).toBe(updatedPost.title);
    expect(responseData.body).toBe(updatedPost.body);
  });

  test("DELETE Request - Delete a post", async () => {
    const response = await apiService.deletePost(1);
    expect(response.status()).toBe(200);
  });
});
