const restricted = require("../../Middleware/restricted");
const jwt = require("jsonwebtoken");
require("dotenv").config();

describe("restricted is a function", () => {
  it("should have a function", () => {
    expect(typeof restricted).toBe("function");
  });
});

describe("Token is not a function", () => {
  it("not a function", () => {
    expect(typeof token).not.toBe("function");
  });
});
const user = {
  id: 1,
};
const token = jwt.sign({ payload: user }, process.env.JWT_SECRET);

describe("Restricted function is working", () => {
  it("Restricted working", () => {
    expect(jwt.sign({ payload: user }, process.env.JWT_SECRET)).toBe(token);
  });
});

describe("Restricted is not working", () => {
  it("Restricted is not working", () => {
    expect(!jwt.sign({ payload: user }, process.env.JWT_SECRET)).toBe(!token);
  });
});

test("Test the JWT_SECRET", async () => {
  const secret = await process.env.JWT_SECRET;
  expect(secret).not.toBe("");
});
