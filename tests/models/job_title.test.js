const jobModel = require("../../models/job_title");

test("getTitles", async () => {
  const res = await jobModel.getTitles();
  expect(res[1].job_title).toBe("Full Stack Web Developer");
});
