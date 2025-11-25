var express = require('express');
var router = express.Router();

const service = require ('../services/reservations');
const private = require ('../middlewares/private');


router.get('/', private.checkJWT, service.getAll);
//La route pour lire les infos d'un utilistaeur
router.post ('/:id', private.checkJWT, service.getById);
//La route pour ajouter un utilistaeur
router.put ('/add', private.checkJWT, service.add);
//La route pour modifier un utilistaeur
router.patch ('/:id', private.checkJWT,async (req, res) => {
    try {
        const reservationId = req.params.id;
        const data = req.body;
        const updatedReservation = await service.update(reservationId, data);
        res.render('reservationsUpdate', { reservation: updatedReservation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//La route pour supprimer un utilistaeur
router.delete ('/:id', private.checkJWT, service.delete);

module.exports = router;
