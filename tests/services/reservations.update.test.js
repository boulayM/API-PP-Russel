// tests/services/reservations.test.js
process.env.NODE_ENV = "test";

jest.mock("../../models/reservation", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  deleteOne: jest.fn()
}));


const Reservation = require("../../models/reservation");
const service = require("../../services/reservations");

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  return res;
}

describe("Service Reservation (unit)", () => {
  beforeEach(() => jest.clearAllMocks());

  // getAll
  describe("getAll()", () => {
it("retourne toutes les réservations avec dates formatées", async () => {
  Reservation.find.mockResolvedValue([
    {
      _id: "1",
      catwayNumber: 3,
      clientName: "Paul",
      boatName: "Océane",
      startDate: "2024-01-10",
      endDate: "2024-01-20",
      _doc: {
        _id: "1",
        catwayNumber: 3,
        clientName: "Paul",
        boatName: "Océane",
        startDate: "2024-01-10",
        endDate: "2024-01-20"
      }
    }
  ]);

  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  await service.getAll(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    data: [
      {
        _id: "1",
        catwayNumber: 3,
        clientName: "Paul",
        boatName: "Océane",
        startDate: "10/01/2024",
        endDate: "20/01/2024"
      }
    ]
  });
});

    it("retourne erreur 501 si find rejette", async () => {
      Reservation.find.mockRejectedValue(new Error("Crash DB"));
      const req = {};
      const res = mockResponse();
      await service.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(501);
      expect(res.json).toHaveBeenCalledWith("error");
    });
  });

  // getById
  describe("getById()", () => {
    it("retourne une réservation", async () => {
      const mockReservation = { clientName: "Paul" };
      Reservation.findOne.mockResolvedValue(mockReservation);
      const req = { body: { catwayNumber: 5 } };
      const res = mockResponse();
      await service.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ reservation: mockReservation });
    });

    it("retourne 404 si non trouvée", async () => {
      Reservation.findOne.mockResolvedValue(null);
      const req = { body: { catwayNumber: 99 } };
      const res = mockResponse();
      await service.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("reservation_not_found");
    });
  });

  // add
  describe("add()", () => {
    it("crée une réservation et render", async () => {
      const created = { clientName: "Paul" };
      Reservation.create.mockResolvedValue(created);
      const req = { body: { catwayNumber:1, clientName:"Paul", boatName:"B", startDate:"2024-01-01", endDate:"2024-01-10" } };
      const res = mockResponse();
      await service.add(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ reservation: created });

    });

    it("retourne 501 si create rejette", async () => {
      Reservation.create.mockRejectedValue(new Error("DB Error"));
      const req = { body: {} };
      const res = mockResponse();
      await service.add(req, res);
      expect(res.status).toHaveBeenCalledWith(501);
      expect(res.json).toHaveBeenCalled();
    });
  });

  // update (exists in your service - uses findByIdAndUpdate)
  describe("update()", () => {
    it("met à jour et render la page de confirmation", async () => {
      const updatedReservation = { _id: "123", clientName: "Paul" };
      Reservation.findByIdAndUpdate.mockResolvedValue(updatedReservation);
      const req = { params: { id: "123" }, updates: { clientName: "Paul" } };
      const res = mockResponse();
      await service.update(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ reservation: updatedReservation });

    });

    it("retourne 404 si non trouvée", async () => {
      Reservation.findByIdAndUpdate.mockResolvedValue(null);
      const req = { params: { id: "999" }, updates: { clientName: "John" } };
      const res = mockResponse();
      await service.update(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Réservation non trouvée" });
    });

    it("retourne 500 si erreur", async () => {
      Reservation.findByIdAndUpdate.mockRejectedValue(new Error("DB error"));
      const req = { params: { id: "123" }, updates: { clientName: "Paul" } };
      const res = mockResponse();
      await service.update(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erreur serveur" });
    });
  });

  // delete
  describe("delete()", () => {
    it("supprime et render", async () => {
      Reservation.deleteOne.mockResolvedValue({ deletedCount: 1 });
      const req = { params: { id: "123" } };
      const res = mockResponse();
      await service.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ deleted: true });

    });

    it("retourne 501 si delete rejette", async () => {
      Reservation.deleteOne.mockRejectedValue(new Error("DB error"));
      const req = { params: { id: "123" } };
      const res = mockResponse();
      await service.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(501);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
