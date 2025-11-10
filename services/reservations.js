const Reservation = require ('../models/reservation');



//ICI C'EST LE CALLBACK QUI SERVIRA A RECCUPERER TOUTES LES RESERVATIONS


exports.getAll = async (req, res, next) => {

    try {
        let reservations = await Reservation.find();
        reservations.sort((a, b)=> {
            return a.catwayNumber - b.catwayNumber
        });


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

    const id = req.body.catwayNumber

    try {

        let reservation = await Reservation.findOne({ catwayNumber: id });


        if (reservation) {
            return res.render('oneReservation', {reservation});
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
        return res.render('reservationAdd', {reservation});
    }
    catch (error) {

        return res.status(501).json(error);
    }
};

//LE CALLBACK QUI SERVIRA A MODIFIER UNE RESERVATION

exports.update = async (req, res, next) => {

    const id = req.body.catwayNumber;

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    try {
        let reservation = await Reservation.findOne({ catwayNumber: id});
        if (reservation) {
            Object.keys(temp).forEach((key) => {
                if (reservation.hasOwnProperty(key)) {
                    reservation[key] = temp[key];
                }
            });
            await reservation.save();
            return res.render('reservationsUpdate', {reservation});

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

        return res.render('reservationDelete');
    }
    catch (error) {
        return res.status(501).json(error);
    }
}
