// tests/middlewares/authPrivate.test.js
process.env.NODE_ENV = "test";

const jwt = require("jsonwebtoken");
jest.mock("jsonwebtoken");

const auth = require("../../middlewares/authPrivate");

describe("authPrivate middleware", () => {
  const mockReq = (headers = {}, session = {}) => ({ headers, session });
  const mockRes = () => {
    const r = {};
    r.status = jest.fn().mockReturnValue(r);
    r.json = jest.fn().mockReturnValue(r);
    return r;
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects if no Authorization header and no session token", () => {
    const req = mockReq({}, {}); // session provided to avoid undefined
    const res = mockRes();

    auth.checkJWT(req, res, next);

    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next if Authorization header exists and jwt.verify succeeds", () => {
    jwt.verify.mockImplementation(() => ({ userId: "u1" }));
    const req = mockReq({ authorization: "Bearer faketoken" }, {});
    const res = mockRes();

    auth.checkJWT(req, res, next);

    expect(jwt.verify).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("calls next if session.token exists and jwt.verify succeeds", () => {
    jwt.verify.mockImplementation(() => ({ userId: "u1" }));
    const req = mockReq({}, { token: "faketoken" });
    const res = mockRes();

    auth.checkJWT(req, res, next);

    expect(jwt.verify).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
