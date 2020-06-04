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
 
 test("Connection test not working", async () => {
   const res = await supertest(server)
     .post('/response/:id')
     .set("authorization", token)
     .send({user_id: 1})
   expect(res.status).toBe(404);
 });