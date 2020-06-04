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
  const res = await supertest(
  "postgres://lqtdmycffkmufv:e5cd313f3acb6780ddf83a3dffe9eee55d27b3fefc57163f8b559401b6418c8f@ec2-18-210-214-86.compute-1.amazonaws.com:5432/d8jg2nh2jskl47"
  )
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

test("post profile/:id", async () => {
  const res = await supertest(server)
    .post("/profile/1")
    .set("authorization", token)
    .send({bio: 'test'})
  expect(res.status).toBe(201);
});
