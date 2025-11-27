// tests/middlewares/admin.test.js
process.env.NODE_ENV = "test";

const admin = require("../../middlewares/adminConfirm"); // assume module.exports = function(req,res,next)

describe("admin middleware", () => {
  const next = jest.fn();
  const mockRes = () => {
    const r = {};
    r.status = jest.fn().mockReturnValue(r);
    r.json = jest.fn().mockReturnValue(r);
    return r;
  };

  beforeEach(() => jest.clearAllMocks());

  it("denies access if no user or not admin", () => {
    const req = { user: null };
    const res = mockRes();
    admin(req, res, next);
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it("allows if user is admin", () => {
    const req = { user: { role: "admin" } };
    const res = mockRes();
    admin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
