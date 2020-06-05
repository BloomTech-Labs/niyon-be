const { jobHelper } = require("../../models/classHelpers");

test("getTitles", async () => {
  const res = await jobHelper.getAll();
  expect(res[1].job_title).toBe("Full Stack Web Developer");
});
