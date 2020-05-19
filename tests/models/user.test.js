const userModel = require("../../models/user");

test("update", async () => {
  const res = await userModel.update;
  expect(res).not.toContainEqual('');
});

test("findBy", async () => {
  const res = await userModel.findById;
  expect(res).not.toContainEqual('');
});

test("userProfile", async () => {
  const res = await userModel.update;
  expect(res).not.toContainEqual('');
});