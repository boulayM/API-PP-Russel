/**
 * @file sanitizeReservationUpdate.js
 * @description Middleware chargé de valider et assainir les données d'une mise à jour de réservation.
 * 
 * Il effectue :
 *  - le filtrage des champs autorisés
 *  - la suppression des valeurs vides
 *  - la conversion des dates et du catwayNumber
 *  - la vérification cohérente des dates (startDate <= endDate)
 *  - l'interdiction de mise à jour vide
 * 
 * Le comportement reste 100% identique à la version initiale.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReservationUpdate:
 *       type: object
 *       description: Champs autorisés pour la mise à jour d'une réservation
 *       properties:
 *         catwayNumber:
 *           type: integer
 *           example: 12
 *         clientName:
 *           type: string
 *           example: "Jean Dupont"
 *         boatName:
 *           type: string
 *           example: "Le Béluga"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2025-03-01"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2025-03-15"
 */


/**
 * Middleware Express : sanitisation/validation des champs de mise à jour d'une réservation.
 *
 * @param {object} req - Requête Express
 * @param {object} req.body - Données envoyées par l'utilisateur
 * @param {object} res - Réponse Express
 * @param {function} next - Fonction next()
 *
 * @returns {Response|void}
 */
module.exports = (req, res, next) => {

    const allowedFields = ["catwayNumber", "clientName", "boatName", "startDate", "endDate"];
    const updates = {};

    try {

        for (const field of allowedFields) {

            // Ignore les champs absents
            if (!Object.prototype.hasOwnProperty.call(req.body, field)) continue;

            let value = req.body[field];

            // Ignore les champs vides
            if (value === "" || value === undefined) continue;

            // Nettoyage des chaînes
            if (typeof value === "string") value = value.trim();

            // Validation du numéro de catway
            if (field === "catwayNumber") {
                const numeric = Number(value);
                if (isNaN(numeric)) {
                    throw new Error("catwayNumber doit être un nombre.");
                }
                value = numeric;
            }

            // Validation des dates
            if (field === "startDate" || field === "endDate") {
                const dateObj = new Date(value);
                if (isNaN(dateObj)) {
                    throw new Error(`Date invalide : ${field}`);
                }
                value = dateObj;
            }

            updates[field] = value;
        }

        // Vérification cohérente des dates
        if (updates.startDate && updates.endDate) {
            if (updates.startDate > updates.endDate) {
                throw new Error("La date de départ doit être après la date d'arrivée.");
            }
        }

        // Aucun champ valide ? => erreur
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "Aucune modification envoyée." });
        }

        req.updates = updates;
        return next();

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
