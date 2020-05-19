const locationModel = require("../../models/location");

test("getLocations, get location country, city", async () => {
  const res = await locationModel.getLocations();
  expect(res[2].location).toBe("Kano, Nigeria");
});

test("getLocations not working", async () => {
  const res = await locationModel.getLocations();
  expect(res[2].location).not.toBe("");
});
