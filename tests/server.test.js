const supertest = require("supertest");
const server = require("../server");

test("/ working", async () => {
  const res = await supertest(server).get("/");
  expect(res.status).toBe(200);
  expect(res.body.welcomeMessage).toBe("Welcome to the auto deployed Niyon Server");
});

test("/ not working", async () => {
   const res = await supertest(server).get("/s");
   expect(res.status).toBe(404);
});