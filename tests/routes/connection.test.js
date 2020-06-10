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
     .send({ email: "joe1@gmail.com", password: "123" } )

     .set("authorization", token);
   done();
 });
 
 afterAll(async () => {
   await db.destroy();
 });

 test("Connection request working", async () => {
  
   const res = await supertest(server)
     .post('/connection/response/1')
     .send({userReq: 1, userAcc: 2, status: true , rejected: false})
     .set("authorization", token)
   expect(res.status).toBe(201);
 });
const requestConnection = {
   mentor_id: 1,
   mentee_id: 2,
}
 
