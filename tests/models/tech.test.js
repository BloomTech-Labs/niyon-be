const { techHelper } = require("../../models/classHelpers");

test("Working getTech", async () => {
  const res = await techHelper.getAll();
  expect(res[4].name).toBe("Dev-Ops");
});

test('getById', async()=>{
  const id = 1;
  const res = await techHelper.findById(id)
  expect(res.name).toBe('C ++')
})

