const Reservation = require ('../models/reservation');

//ICI C'EST LE CALLBACK QUI SERVIRA A RECCUPERER TOUTES LES RESERVATIONS


exports.getAll = async (req, res, next) => {

    try {
        let reservations = await Reservation.find();

        if (reservations) {

            return res.render('reservations', {data: reservations});
        }

        return res.status(404).json('catways_not_found');

    }catch (error) {

        return res.status(501).json('error');
    }
};

//ICI C'EST LE CALLBACK QUI SERVIRA A RECCUPERER UNE RESERVATION AVEC SON ID

exports.getById = async (req, res, next) => {
    const id = req.params.id

    try {

        let reservation = await Reservation.findById(id);

        if (reservation) {
            return res.status(200).json(reservation);
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
        return res.status(201).json(reservation);
    }
    catch (error) {

        return res.status(501).json(error);
    }
};

//LE CALLBACK QUI SERVIRA A MODIFIER UNE RESERVATION

exports.update = async (req, res, next) => {

    const id = req.params.id

    const temp = ({
        number: req.body.catwayNumber,
        name: req.body.clientName,
        boat: req.body.boatName,
        start: req.body.startDate,
        end: req.body.endDate
    });

    try {
        let reservation = await Reservation.findOne({_id : id});
        if (reservation) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    reservation[key] = temp[key];
                }
            });
            await reservation.save();
            return res.status(201).json(reservation);

        }
        return res.status(404).json("reservation_not_found");
    }
    catch {
        return res.status(501).json(error);
    }
}

// ICI LE CALLBACK POUR SUPPRIMER UNE RESERVATION

exports.delete = async (req, res, next) => {
    const id = req.params.id

    try {
        await Reservation.deleteOne ({_id: id});

        return res.status(204).json("delete_ok");
    }
    catch (error) {
        return res.status(501).json(error);
    }
}
