const Reservation = require('../models/reservation');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * GET /reservations
 * @summary Récupère toutes les réservations
 * @tags Reservations
 * @return {object} 200 - Liste des réservations
 * @return {object} 501 - Erreur serveur
 */
exports.getAll = async (req, res, next) => {
    try {
        let reservations = await Reservation.find();
        reservations.sort((a, b) => a.catwayNumber - b.catwayNumber);

        reservations = reservations.map(reservation => ({
            ...reservation._doc,
            startDate: new Date(reservation.startDate).toLocaleDateString('fr-FR'),
            endDate: new Date(reservation.endDate).toLocaleDateString('fr-FR')
        }));

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ data: reservations });
        }

        return res.render("reservations", { data: reservations });

    } catch (error) {
        return res.status(501).json('error');
    }
};

/**
 * POST /reservations/:catwayNumber
 * @summary Récupère une réservation par numéro de catway
 * @tags Reservations
 * @param {number} req.body.catwayNumber - Numéro du catway recherché
 * @return {object} 200 - Réservation trouvée
 * @return {object} 404 - Réservation introuvable
 * @return {object} 501 - Erreur serveur
 */
exports.getById = async (req, res, next) => {

    const id = req.body.catwayNumber;

    try {
        let reservation = await Reservation.findOne({ catwayNumber: id });

        if (reservation) {
            if (process.env.NODE_ENV === "test") {
                return res.status(200).json({ reservation });
            }
            return res.render('oneReservation', { reservation });
        }

        return res.status(404).json('reservation_not_found');
    }
    catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * PUT /reservations/add
 * @summary Ajoute une réservation
 * @tags Reservations
 * @param {object} req.body - Données de la réservation
 * @return {object} 200 - Réservation créée
 * @return {object} 501 - Erreur serveur
 */
exports.add = async (req, res, next) => {

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    try {
        let reservation = await Reservation.create(temp);

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ reservation });
        }

        return res.render('reservationAdd', { reservation });
    }
    catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * PATCH /reservations/:id
 * @summary Met à jour une réservation existante
 * @tags Reservations
 * @param {string} req.params.id - ID MongoDB de la réservation
 * @return {object} 200 - Réservation mise à jour
 * @return {object} 404 - Réservation non trouvée
 * @return {object} 500 - Erreur serveur
 */
exports.update = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { $set: req.updates },
            { new: true }
        );

        if (!reservation) {
            return res.status(404).json({ error: "Réservation non trouvée" });
        }

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ reservation });
        }

        return res.render('reservationsUpdate', { reservation });

    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

/**
 * DELETE /reservations/:id
 * @summary Supprime une réservation
 * @tags Reservations
 * @param {string} req.params.id - ID MongoDB
 * @return {object} 200 - Suppression confirmée
 * @return {object} 501 - Erreur serveur
 */
exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Reservation.deleteOne({ _id: id });

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ deleted: true });
        }

        return res.render('reservationDelete');
    }
    catch (error) {
        return res.status(501).json(error);
    }
};
