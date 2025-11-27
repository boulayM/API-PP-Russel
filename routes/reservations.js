var express = require('express');
var router = express.Router();

const service = require ('../services/reservations');
const authPrivate = require ('../middlewares/authPrivate');
const sanitizeReservationUpdate = require ('../middlewares/sanitizeReservationUpdate');
const skipAuthIfTest = require ('../middlewares/skipAuthIfTest');


router.get('/', skipAuthIfTest(authPrivate.checkJWT), service.getAll);
router.post('/:id', skipAuthIfTest(authPrivate.checkJWT), service.getById);
router.put('/add', skipAuthIfTest(authPrivate.checkJWT), service.add);
router.patch('/:id', skipAuthIfTest(authPrivate.checkJWT), sanitizeReservationUpdate, service.update);
router.delete('/:id', skipAuthIfTest(authPrivate.checkJWT), service.delete);

module.exports = router;
