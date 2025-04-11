import request from "supertest";
import app from "../index";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET as string;

describe("User API", () => {
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
    await User.deleteMany({});

    // Create a test user and generate JWT
    const user = await User.create({
      name: "Test User",
      email: "user@example.com",
      password: "password123",
    }) as typeof User.prototype;

    userId = user._id.toString();
    authToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/user/profile", () => {
    it("should get user profile with valid token", async () => {
      const res = await request(app)
        .get("/api/user/profile")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body._id).toBe(userId);
    });

    it("should not get profile without token", async () => {
      const res = await request(app).get("/api/user/profile");

      expect(res.statusCode).toEqual(401);
      expect(res.body.message || res.body.error).toBeDefined();
    });
  });

  describe("PATCH /api/user/profile", () => {
    it("should update user profile", async () => {
      const res = await request(app)
        .patch("/api/user/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ name: "Updated Name" });

      expect(res.statusCode).toEqual(200);
      expect(res.body.user.name).toBe("Updated Name");
      expect(res.body.message).toBe("Profile updated successfully");
    });
  });

  describe("DELETE /api/user/profile", () => {
    it("should delete user profile", async () => {
      const res = await request(app)
        .delete("/api/user/profile")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe("Profile deleted successfully");

      const deletedUser = await User.findById(userId);
      expect(deletedUser).toBeNull();
    });
  });
});
