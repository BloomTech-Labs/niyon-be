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

test("post profile/:id", async () => {
  const res = await supertest(server)
    .post("/profile/1")
    .set("authorization", token)
    .send({ bio: "test" });
  expect(res.status).toBe(201);
});

test("testing get for profile", async () => {
  const res = await supertest(server)
    .get("/profile/")
    .set("authorization", token);
  expect(res.status).toBe(200);
  expect(res.body[1].first_name).toBe("tawne");
});

test("testing get for profile at incorrect endpoint (expect 404)", async () => {
  const res = await supertest(server)
    .get("/profile1/")
    .set("authorization", token);
  expect(res.status).toBe(404);
});

test("post profile/:id not working", async () => {
  const res = await supertest(server)
    .post("/profile/1233")
    .set("authorization", token)
    .send({ bio: "" });
  expect(res.status).toBe(400);
});

test("get:packageProfile authorized not working", async () => {
  const next = jest.fn();
  try {
    const res = await supertest(server)
    .get("/profile/profilePackage")
    expect(res.status).toBeDefined();
    expect(res.status).toBe(401);
    expect(res.error).toBeDefined();
  } catch(e) {
    expect(e).toMatch("error");
    expect(next).toHaveBeenCalled();
    // expect(next).toHaveBeenCalledWith(e)
   }
});

