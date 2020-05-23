const supertest = require("supertest");
const server = require("../../server");
const db = require("../../db/config");
const restricted = require("../../Middleware/restricted");
const jwt = require("jsonwebtoken");

afterAll(async () => {
  await db.destroy();
});

test("packageProfile set up", async () => {
  const res = await supertest(server).get("/profilePackage");
});
test("profilePackage:Id not working", async () => {
  const res = await supertest(server).put("/profilePackage/:id");
  expect(res.status).toBe(404);
});

const user = {
  id: 1,
};
const id = {
  id: 2,
};
const token = jwt.sign({ payload: user }, process.env.JWT_SECRET);
test("profile:id not authorized, expect 401", async () => {
  const res = await supertest(server).get(`/profile/${id}`);
  expect(res.status).toBe(401);
});
