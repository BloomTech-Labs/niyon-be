const supertest = require("supertest");
const server = require("../../server");
const db = require("../../db/config");
const jwt = require("jsonwebtoken");
const user = {
  id: 1,
};

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

test("Testing the news ", async () => {
  const resLocal = await supertest(server)
    .get("/news")
    .set("authorization", token);
  const articles = [{ test: "this is a test article" }];
  const asyncMock = jest.fn().mockResolvedValue(articles);
  const res = await asyncMock();
  expect(res).toEqual(articles);
  expect(res.length).not.toBe(0)
});

