// tests/middlewares/usersValidation.test.js
process.env.NODE_ENV = "test";

const validate = require("../../middlewares/usersValidation"); // assume module.exports = function(req,res,next)
describe("usersValidation middleware", () => {
  const next = jest.fn();
  const mockRes = () => {
    const r = {};
    r.status = jest.fn().mockReturnValue(r);
    r.json = jest.fn().mockReturnValue(r);
    return r;
  };

  beforeEach(() => jest.clearAllMocks());

  it("rejects missing email", () => {
    const req = { body: { password: "p" } };
    const res = mockRes();
    validate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("allows valid body", () => {
    const req = { body: { email: "a@a.com", password: "123456" } };
    const res = mockRes();
    validate(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
