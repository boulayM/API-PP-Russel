process.env.NODE_ENV = "test";

const sanitizeReservationUpdate = require("../../middlewares/sanitizeReservationUpdate");

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = () => jest.fn();

describe("sanitizeReservationUpdate Middleware", () => {

    test("accepte et nettoie les champs valides", () => {
        const req = {
            body: {
                clientName: "  Paul  ",
                boatName: "  Neptune ",
                catwayNumber: "12",
                startDate: "2025-04-05",
            }
        };

        const res = mockResponse();
        const next = mockNext();

        sanitizeReservationUpdate(req, res, next);

        expect(req.updates).toEqual({
            clientName: "Paul",
            boatName: "Neptune",
            catwayNumber: 12,
            startDate: new Date("2025-04-05"),
        });

        expect(next).toHaveBeenCalled();
    });


    test("rejette catwayNumber non numérique", () => {
        const req = { body: { catwayNumber: "abc" } };
        const res = mockResponse();
        const next = mockNext();

        sanitizeReservationUpdate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "catwayNumber doit être un nombre."
        });
        expect(next).not.toHaveBeenCalled();
    });


    test("rejette une date invalide", () => {
        const req = { body: { startDate: "2025-99-99" } };
        const res = mockResponse();
        const next = mockNext();

        sanitizeReservationUpdate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Date invalide : startDate"
        });
        expect(next).not.toHaveBeenCalled();
    });


    test("ignore les champs vides", () => {
        const req = { body: { clientName: "" } };
        const res = mockResponse();
        const next = mockNext();

        sanitizeReservationUpdate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Aucune modification envoyée."
        });
        expect(next).not.toHaveBeenCalled();
    });


    test("ignore les champs non autorisés", () => {
        const req = {
            body: {
                hacked: "evil",
                clientName: "John"
            }
        };

        const res = mockResponse();
        const next = mockNext();

        sanitizeReservationUpdate(req, res, next);

        expect(req.updates).toEqual({ clientName: "John" });
        expect(next).toHaveBeenCalled();
    });


    test("retourne erreur si aucun champ valide", () => {
        const req = { body: { unknownField: "value" } };
        const res = mockResponse();
        const next = mockNext();

        sanitizeReservationUpdate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Aucune modification envoyée."
        });
        expect(next).not.toHaveBeenCalled();
    });

    test("rejette si startDate est après endDate", () => {
        const req = {
            body: {
                startDate: "2025-05-10",
                endDate: "2025-05-05"
            }
        };
        const res = mockResponse();
        const next = mockNext();
        sanitizeReservationUpdate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "La date de départ doit être après la date d'arrivée."
        });
        expect(next).not.toHaveBeenCalled();
    });

});
