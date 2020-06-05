const { locationHelper } = require("../../models/classHelpers");

test("getLocations, get location country, city", async () => {
  const res = await locationHelper.getAll();
  expect(res[2].location).toBe("Kano, Nigeria");
});

test("getLocations not working", async () => {
  const res = await locationHelper.getAll();
  expect(res[2].location).not.toBe("");
});
