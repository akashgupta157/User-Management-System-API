import request from "supertest";
import app from "../index";
import mongoose from "mongoose";
import User from "../models/user.model";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  const testUser = {
    name: "Test User",
    email: `test+${Date.now()}@example.com`, // unique email per run
    password: "password123",
  };

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send(testUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.email).toBe(testUser.email);
    });

    it("should not register with duplicate email", async () => {
      // Reusing the same testUser (already registered in the test above)
      const res = await request(app).post("/api/auth/register").send(testUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBeDefined();
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login an existing user", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
    });

    it("should not login with wrong password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: "wrongpassword",
      });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toBeDefined();
    });
  });
});
