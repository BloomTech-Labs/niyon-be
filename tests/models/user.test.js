const userModel = require("../../models/user");
const findById =require('../../models/user')
test("update", async () => {
  const id = 1;
  const res = await userModel.update(id);
  expect(res).toBeFalsy;
});

test("findBy", async () => {
  const res = await userModel.findById;
  expect(res).not.toContainEqual('');
});

test("userProfile", async () => {
  const res = await userModel.update;
  expect(res).not.toContainEqual('');
});


describe("GetById is an object export", () => {
   it("is a module.exports", () => {
     expect(typeof findById).toBe("object");
                                
     });
   });

   test("Test findById to find id of user's lastname", async()=>{
     const id = 2;
     const res = await userModel.findById(id)
     expect(res.last_name).toBe('thompson')
   })

   test("Test findById for users email", async ()=>{
     const id = 1;
     const res = await userModel.findById(id)
     expect(res.email).toBe('joe1@gmail.com')
   })