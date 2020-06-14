const { jobHelper } = require("../../models/classHelpers");
const { locationHelper } = require("../../models/classHelpers");
const { techHelper } = require("../../models/classHelpers");
const { userHelper } = require("../../models/classHelpers");
const { connectHelper } = require("../../models/classHelpers");

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

    test("Test wrong filter being passed in", async () => {
       const wrongColumn = {book: "It"};
       const res = await userHelper.findBy(wrongColumn);
       console.log(res)
       expect(res.code).toBe("SQLITE_ERROR")
    })

    test("update user tech", async () => {
        const res = await techHelper.updateTech(1, 13);
        expect(res[0]).toBe(2)
    })

    test("making a new connection", async () => {
        const users = await userHelper.getAll();
        const res = await connectHelper.updateConnection(users[0].id, users[1].id)
        expect(res[0]).toBe(1)
    })

    test("request a new connection", async () => {
        const users = await userHelper.getAll();
        const res1 = await connectHelper.updateConnection(users[2].id, users[1].id)
        const res = await connectHelper.requestConnection(2)
        expect(res[1].userReq).toBe(3)
    })

    test("Passing no data to update answer connection", async () => {
       const res = await connectHelper.responseConnection(5,1);
       expect(res).toStrictEqual(TypeError(`Cannot convert undefined or null to object`))
    })

    test("Passing no ID into model for new connections", async () => {
        const res = await connectHelper.newConnections();
        expect(res).toStrictEqual(Error("Undefined binding(s) detected when compiling SELECT. Undefined column(s): [userAcc] query: select * from `user_connections` where `userAcc` = ? and `status` = ? and `rejected` = ?"))
    })

    test("Passing no ID into model for connection requests", async () => {
        const res = await connectHelper.newConnectionRequests();
        expect(res).toStrictEqual(Error("Undefined binding(s) detected when compiling SELECT. Undefined column(s): [userReq] query: select `userAcc` from `user_connections` where `userReq` = ? and `status` = ? and `rejected` = ?"))
    })

    test("Passing no ID into model for user connections", async () => {
        const res = await connectHelper.myConnections();
        expect(res).toStrictEqual(Error("Undefined binding(s) detected when compiling SELECT. Undefined column(s): [userAcc, userReq] query: select * from `user_connections` where `userAcc` = ? or `userReq` = ? and `status` = ? and `rejected` = ?"))
    })

