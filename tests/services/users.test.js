// tests/services/users.test.js
process.env.NODE_ENV = "test";

jest.mock("../../models/user", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  deleteOne: jest.fn()
}));

const User = require("../../models/user");
const service = require("../../services/users");
const { mockResponse } = require("../setup/mockResponse");

describe("Service Users", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getAll", () => {
    it("returns users list", async () => {
      const mock = [{ _id: "u1", name: "Alice", _doc: { _id: "u1", name: "Alice" } }];
      User.find.mockResolvedValue(mock);
      const req = {};
      const res = mockResponse();
      await service.getAll(req, res);
      // accept either JSON(200) in test-mode or render
      if (res.status.mock.calls.length) {
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: expect.any(Array) }));
      } else {
        expect(res.render).toHaveBeenCalled();
      }
    });

    it("db error", async () => {
      User.find.mockRejectedValue(new Error("db"));
      const res = mockResponse();
      await service.getAll({}, res);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("add", () => {
    it("creates user", async () => {
      const created = { _id: "u1", email: "a@a.com" };
      User.create.mockResolvedValue(created);
      const req = { body: { email: "a@a.com", password: "pass" } };
      const res = mockResponse();
      await service.add(req, res);
      if (res.status.mock.calls.length) {
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ user: created }));
      } else {
        expect(res.render).toHaveBeenCalled();
      }
    });

    it("create error", async () => {
      User.create.mockRejectedValue(new Error("db"));
      const res = mockResponse();
      await service.add({ body: {} }, res);
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
});
