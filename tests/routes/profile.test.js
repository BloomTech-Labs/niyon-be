const supertest = require("supertest");
const server = require("../../server");
const db = require("../../db/config");
const restricted =require('../../Middleware/restricted')

test("profilePackage:Id not working", async () => {
  const res = await supertest(server).put("/profilePackage/:id");
  expect(res.status).toBe(404);
  
});


test("api not working", async () => {
  const res = await supertest(server).get("/:id");
  expect(res.status).toBe(404);
});


