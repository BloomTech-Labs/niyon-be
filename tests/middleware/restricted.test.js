const restricted = require("../../Middleware/restricted");
const token =
describe("restricted is a function", () => {
  it("should have a function", () => {
    expect(typeof restricted).toBe("function");
  });
});

describe('Token is not a function', () => {
   it('not a function', ()=>{
      expect(typeof token).not.toBe('function')
   })
})
