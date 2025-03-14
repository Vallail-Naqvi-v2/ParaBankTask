import { APIRequestContext, expect } from "@playwright/test";
import { USER_DATA } from "../utils";

// Class to handle all API requests
export class ApiService {
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  // GET Request: Fetch all posts and validate each item
  async getAllPosts() {
    const response = await this.apiContext.get("/posts");
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    return responseData;
  }

  // POST Request: Create a new post
  async createPost(title: string, body: string, userId: number) {
    const response = await this.apiContext.post("/posts", {
      data: { title, body, userId },
    });
    expect(response.status()).toBe(201);
    return await response.json();
  }

  // PUT Request: Update a post
  async updatePost(postId: number, updatedData: { title: string; body: string; userId: number }) {
    const response = await this.apiContext.put(`/posts/${postId}`, { data: updatedData });
    expect(response.status()).toBe(200);
    return await response.json();
  }

  // DELETE Request: Delete a post
  async deletePost(postId: number) {
    const response = await this.apiContext.delete(`/posts/${postId}`);
    expect(response.status()).toBe(200);
    return response.status();
  }
}
