import { test, expect, request } from "@playwright/test";
import { ApiService } from "../../pages/apiTestPage";
import readJsonFile from "../../utils";

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
    //console.log(responseData);
  });

  test("POST Request - Create a new post", async () => {
    const newPost = readJsonFile("./test-data/api-data.json");
    const response = await apiService.createPost(
      newPost.postData.title,
      newPost.postData.body,
      newPost.postData.userId
    );
    //console.log(newPost.postData);

    expect(response.status()).toBe(201);
    const responseData = await response.json();
    expect(responseData.title).toBe(newPost.postData.title);
    expect(responseData.body).toBe(newPost.postData.body);
    expect(responseData.userId).toBe(newPost.postData.userId);
  });

  test("PUT Request - Update a post", async () => {
    const updatedPost = readJsonFile("./test-data/api-data.json");
    const response = await apiService.updatePost(1, updatedPost.updatedData);
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    expect(responseData.title).toBe(updatedPost.updatedData.title);
    expect(responseData.body).toBe(updatedPost.updatedData.body);
  });

  test("DELETE Request - Delete a post", async () => {
    const response = await apiService.deletePost(1);
    expect(response.status()).toBe(200);
  });
});
