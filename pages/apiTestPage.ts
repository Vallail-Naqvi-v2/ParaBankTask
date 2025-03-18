import { APIRequestContext } from "@playwright/test";

// Class to handle all API requests
export class ApiService {
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  // GET Request: Fetch all posts
  async getAllPosts() {
    return await this.apiContext.get("/posts");
  }

  // POST Request: Create a new post
  async createPost(title: string, body: string, userId: number) {
    return await this.apiContext.post("/posts", {
      data: { title, body, userId },
    });
  }

  // PUT Request: Update a post
  async updatePost(postId: number, updatedData: { title: string; body: string; userId: number }) {
    return await this.apiContext.put(`/posts/${postId}`, { data: updatedData });
  }

  // DELETE Request: Delete a post
  async deletePost(postId: number) {
    return await this.apiContext.delete(`/posts/${postId}`);
  }
}
