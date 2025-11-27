module.exports = (req, res, next) => {
    const allowedFields = ['catwayNumber', 'clientName', 'boatName', 'startDate', 'endDate'];
    const updates = {};

    try {
        for (const field of allowedFields) {
            if (!req.body.hasOwnProperty(field)) continue;

            let value = req.body[field];
            if (value === '' || value === undefined) continue;

            if (typeof value === 'string') value = value.trim();

            if (field === 'catwayNumber') {
                value = Number(value);
                if (isNaN(value)) throw new Error("catwayNumber doit être un nombre.");
            }

            if (field === 'startDate' || field === 'endDate') {
                const dateObj = new Date(value);
                if (isNaN(dateObj)) throw new Error(`Date invalide : ${field}`);
                value = dateObj;
            }

            updates[field] = value;
        }

        if (updates.startDate && updates.endDate) {
        if (updates.startDate > updates.endDate) {
            throw new Error("La date de départ doit être après la date d'arrivée.");
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "Aucune modification envoyée." });
        }

        req.updates = updates;
        next();

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
