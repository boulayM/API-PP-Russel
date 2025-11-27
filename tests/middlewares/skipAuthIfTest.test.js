// tests/middlewares/skipAuthIfTest.test.js
process.env.NODE_ENV = "test";
const skip = require("../../middlewares/skipAuthIfTest");

describe("skipAuthIfTest", () => {
  it("returns a passthrough middleware in test env", () => {
    const middleware = skip(() => { throw new Error("should not be called"); });
    const next = jest.fn();
    const req = {}; const res = {};
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
