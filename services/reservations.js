const Reservation = require ('../models/reservation');


//ICI C'EST LE CALLBACK QUI SERVIRA A RECCUPERER TOUTES LES RESERVATIONS


exports.getAll = async (req, res, next) => {
    try {
        let reservations = await Reservation.find();
        reservations.sort((a, b) => a.catwayNumber - b.catwayNumber);

        reservations = reservations.map(reservation => ({
            ...reservation._doc,
            startDate: new Date(reservation.startDate).toLocaleDateString('fr-FR'),
            endDate: new Date(reservation.endDate).toLocaleDateString('fr-FR')
        }));

        // 🎯 En environnement de test → renvoyer JSON au lieu de render()
        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ data: reservations });
        }

        // Sinon, rendu normal avec les vues
        return res.render("reservations", { data: reservations });

    } catch (error) {
        return res.status(501).json('error');
    }
};


//ICI C'EST LE CALLBACK QUI SERVIRA A RECCUPERER UNE RESERVATION AVEC SON ID

exports.getById = async (req, res, next) => {

    const id = req.body.catwayNumber

    try {

        let reservation = await Reservation.findOne({ catwayNumber: id });


        if (reservation) {
        // 🎯 En environnement de test → renvoyer JSON au lieu de render()
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

//LE CALLBACK QUI SERVIRA A AJOUTER UNE RESERVATION

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
        // 🎯 En environnement de test → renvoyer JSON au lieu de render()
        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ reservation });
        }

        return res.render('reservationAdd', { reservation });
    }
    catch (error) {

        return res.status(501).json(error);
    }
};

//LE CALLBACK QUI SERVIRA A MODIFIER UNE RESERVATION
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
        // 🎯 En environnement de test → renvoyer JSON au lieu de render()
        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ reservation });
        }

        return res.render('reservationsUpdate', { reservation });

    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// ICI LE CALLBACK POUR SUPPRIMER UNE RESERVATION

exports.delete = async (req, res, next) => {
    const id = req.params.id

    try {
        await Reservation.deleteOne ({_id: id});
        // 🎯 En environnement de test → renvoyer JSON au lieu de render()
        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ deleted: true });
        }

        return res.render('reservationDelete');
    }
    catch (error) {
        return res.status(501).json(error);
    }
}
