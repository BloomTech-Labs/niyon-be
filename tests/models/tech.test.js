const tech = require("../../models/tech");

test("Working getTech", async () => {
  const res = await tech.getTech();
  expect(res[4].name).toBe("Dev-Ops");
});

test('getById', async()=>{
  const id = 1;
  const res = await tech.getById(id)
  expect(res.name).toBe('C ++')
})

