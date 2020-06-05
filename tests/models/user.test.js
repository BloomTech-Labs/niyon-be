const { userHelper } = require("../../models/classHelpers");

test("update", async () => {
  const id = 1;
  const res = await userHelper.update(id);
  expect(res).toBeFalsy;
});

test("findBy", async () => {
  const res = await userHelper.findById;
  expect(res).not.toContainEqual('');
});

test("userProfile", async () => {
  const res = await userHelper.update;
  expect(res).not.toContainEqual('');
});


describe("GetById is an object export", () => {
   it("is a module.exports", () => {
     expect(typeof userHelper.findById).toBe("function");
                                
     });
   });

   test("Test findById to find id of user's lastname", async()=>{
     const id = 2;
     const res = await userHelper.findById(id)
     expect(res.last_name).toBe('thompson')
   })

   test("Test findById for users email", async ()=>{
     const id = 1;
     const res = await userHelper.findById(id)
     expect(res.email).toBe('joe1@gmail.com')
   })