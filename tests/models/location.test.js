const locationModel = require("../../models/location");

test("getLocations", async () => {
  const res = await locationModel.getLocations();
  expect(res[2].location).toBe("Kano, Nigeria");
});
