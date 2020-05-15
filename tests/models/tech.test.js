const tech = require('../../models/tech')

test("getTech",async()=>{
  const res = await tech.getTech()
  expect(res[4].name).toBe('Dev-Ops')
})
