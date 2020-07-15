const supertest = require("supertest");
const server = require("../../server");
const db = require("../../db/config");

afterAll(async () => {
  await db.destroy();
});


test("create a user", async () => {
  const res = await supertest(server)
    .post("/auth/register") //checks the route
    .send({ email: "test@gmail.com", password: "test1232" }); //test the info being sent
  expect(res.status).toBe(201); //test the status to be 201
  expect(res.type).toBe("application/json"); //test the data coming back
  expect(res.body.user.email).toBe("test@gmail.com"); //test the email to match
});

test("login user", async () => {
  const res = await supertest(server)
    .post("/auth/login") //testing the route
    .send({ email: "test@gmail.com", password: "test1232" }); //testing email password
  expect(res.status).toBe(200); //testing the status code to be 200
  expect(res.type).toBe("application/json"); //test the data coming back
  expect(res.body.user.user_type).toBe("Mentor"); //testing to see if mentor matchs
});

test("login try with no email", async () => {
  const res = await supertest(server)
    .post("/auth/login") //testing route
    .send({ email: "", password: "password1" }); //testing without email
  expect(res.status).toBe(409); //testing to see if 404 comes back
});

test("login with no password", async () => {  
  const res = await supertest(server)    
  .post("/auth/login")     
  .send({ email: "test@gmail.com", password: "" });     
  expect(res.status).toBe(401);
});
