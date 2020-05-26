const supertest = require("supertest");
const server = require("../../server");
const db = require("../../db/config");
const jwt = require("jsonwebtoken");
const user = {
  id: 1,
};
const id = 1;
const token = jwt.sign({ payload: user }, process.env.JWT_SECRET);

beforeAll((done) => {
  //sets the user from seeds
  supertest(server)
    .post("/auth/login")
    .send({ email: "joe1@gmail.com", password: "123" })
    .set("authorization", token);
  done();
});

afterAll(async () => {
  await db.destroy();
});

test("packageProfile authorized", async () => {
  const res = await supertest(server)
    .get("/profile/profilePackage")
    .set("authorization", token);
  expect(res.status).toBe(200);
});

test("profile:id not authorized, expect 401", async () => {
  const res = await supertest(server).get(`/profile/1`);
  expect(res.status).toBe(401);
});

test("Test user profile/:id working", async () => {
  const res = await supertest(server)
    .get(`/profile/1`)
    .set("authorization", token);
  expect(res.status).toBe(200);
  expect(res.type).toBe("application/json");
});

test("post profile/;id", async () => {
  const res = await supertest(server)
    .post("/profile/1")
    .set("authorization", token);
  expect(res.status).toBe(201);
});
