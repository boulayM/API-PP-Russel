var express = require('express');
var router = express.Router();

const service = require ('../services/reservations');
const private = require ('../middlewares/private')


router.get('/', service.getAll, private.checkJWT);
//La route pour lire les infos d'un utilistaeur
router.get ('/:id', service.getById, private.checkJWT);
//La route pour ajouter un utilistaeur
router.put ('/add', service.add, private.checkJWT);
//La route pour modifier un utilistaeur
router.patch ('/:id', service.update, private.checkJWT);
//La route pour supprimer un utilistaeur
router.delete ('/:id', service.delete, private.checkJWT);


module.exports = router;
