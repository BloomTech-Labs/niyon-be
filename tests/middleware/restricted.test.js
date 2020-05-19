const restricted = require("../../Middleware/restricted");

describe("restricted is a function", () => {
  it("should have a function", () => {
    expect(typeof restricted).toBe("function");
  });
});
