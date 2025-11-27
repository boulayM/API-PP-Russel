// tests/middlewares/confirmDeleteUser.test.js
process.env.NODE_ENV = "test";

const confirm = require("../../middlewares/confirmDeleteUser"); // assume module.exports = function(req,res,next)
describe("confirmDeleteUser middleware", () => {
  const next = jest.fn();
  const mockRes = () => {
    const r = {};
    r.status = jest.fn().mockReturnValue(r);
    r.json = jest.fn().mockReturnValue(r);
    return r;
  };

  beforeEach(() => jest.clearAllMocks());

  it("rejects if confirmation missing", () => {
    const req = { body: {} };
    const res = mockRes();
    confirm(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next if confirmation present", () => {
    const req = { body: { confirm: "yes" } };
    const res = mockRes();
    confirm(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
