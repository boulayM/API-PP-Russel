// tests/services/catways.test.js
process.env.NODE_ENV = "test";

jest.mock("../../models/catway", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  deleteOne: jest.fn()
}));

const Catway = require("../../models/catway");
const service = require("../../services/catways");
const { mockResponse } = require("../setup/mockResponse");

describe("Service Catways", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns formatted list", async () => {
    const mock = [{ _id: "c1", number: 1, _doc: { _id: "c1", number: 1 } }];
    Catway.find.mockResolvedValue(mock);
    const req = {};
    const res = mockResponse();
    await service.getAll(req, res);
    if (res.status.mock.calls.length) {
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    } else {
      expect(res.render).toHaveBeenCalled();
    }
  });

  it("handles db error", async () => {
    Catway.find.mockRejectedValue(new Error("db"));
    const req = {};
    const res = mockResponse();
    await service.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(expect.any(Number));
    expect(res.json).toHaveBeenCalled();
  });

  it("creates catway", async () => {
    const created = { _id: "c1", number: 5 };
    Catway.create.mockResolvedValue(created);
    const req = { body: { number: 5 } };
    const res = mockResponse();
    await service.add(req, res);
    if (res.status.mock.calls.length) {
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ catway: created }));
    } else {
      expect(res.render).toHaveBeenCalled();
    }
  });
});
