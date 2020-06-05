const { jobHelper } = require("../../models/classHelpers");
const { locationHelper } = require("../../models/classHelpers");
const { techHelper } = require("../../models/classHelpers");
const { userHelper } = require("../../models/classHelpers");

test("getTitles", async () => {
   const res = await jobHelper.getAll();
   expect(res[1].job_title).toBe("Full Stack Web Developer");
 });

 test("getLocations, get location country, city", async () => {
   const res = await locationHelper.getAll();
   expect(res[2].location).toBe("Kano, Nigeria");
 });
 
 test("getLocations not working", async () => {
   const res = await locationHelper.getAll();
   expect(res[2].location).not.toBe("");
 });

 test("Working getTech", async () => {
   const res = await techHelper.getAll();
   expect(res[4].name).toBe("Dev-Ops");
 });
 
 test('getById', async()=>{
   const id = 1;
   const res = await techHelper.findById(id)
   expect(res.name).toBe('C ++')
 })
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

    