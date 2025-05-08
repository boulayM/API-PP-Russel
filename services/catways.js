const Catway = require ('../models/catway');
const Reservation = require('../models/reservation');

//ICI C'EST LE CALLBACK QUI SERVIRA A RECCUPERER TOUS LES CATWAYS

exports.getAll = async (req, res, next) => {

    try {
        let catways = await Catway.find();

        if (catways) {

            return res.render('catways', {data: catways});
        }

        return res.status(404).json('catways_not_found');

    }catch (error) {

        return res.status(501).json('error');
    }
};

//ICI C'EST LE CALLBACK QUI SERVIRA A RECCUPERER UN CATWAY AVEC SON ID

exports.getById = async (req, res, next) => {

    const id = req.params.catwayNumber;

    try {

        let catway = await Catway.findOne(id);

        if (catway) {
            
            return res.status(200).json(catway);
        }

        return res.status(404).json('catway_not_found');
    }
    catch (error) {
        return res.status(501).json(error);
    }
};

//LE CALLBACK QUI SERVIRA A RECCUPERE LES RESERVATIONS D'UN CATWAY

exports.getReservation = async (req, res, next) => {

    const number = req.params.catwayNumber

    try {
        let reservation = await Reservation.find(number);
        if (reservation) {
        return res.status(200).json(reservation);
    }
    return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

//LE CALLBACK QUI SERVIRA A AJOUTER UN CATWAY

exports.add = async (req, res, next) => {

    const temp = ({
        
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try {
        let catway = await Catway.create(temp);
        return res.status(201).json(catway);
    }
    catch (error) {

        return res.status(501).json(error);
    }
};

//LE CALLBACK QUI SERVIRA A MODIFIER UN CATWAY

exports.update = async (req, res, next) => {

    const id = req.params.id

    const temp = ({
        number: req.body.catwayNumber,
        type: req.body.catwayType,
        state: req.body.catwayState
    });

    try {
        let catway = await Catway.findOne({_id : id});
        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });
            await catway.save();
            return res.status(201).json(catway);

        }
        return res.status(404).json("user_not_found");
    }
    catch {
        return res.status(501).json(error);
    }
};

// ICI LE CALLBACK POUR SUPPRIMER UN CATWAY

exports.delete = async (req, res, next) => {
    const id = req.params.id

    try {
        await Catway.deleteOne ({_id: id});

        return res.status(204).json("delete_ok");
    }
    catch (error) {
        return res.status(501).json(error);
    }
}
