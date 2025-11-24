var express = require('express');
var router = express.Router();

const service = require ('../services/catways');
const private = require ('../middlewares/private');
const admin = require ('../middlewares/admin');


router.get ('/', private.checkJWT, service.getAll);
//La route pour lire les infos d'un utilistaeur
router.post ('/:id', private.checkJWT, service.getById);
//La route pour ajouter un utilistaeur
router.put ('/add', private.checkJWT, admin.check, service.add);
//La route pour modifier un utilistaeur
router.patch ('/:id', private.checkJWT, admin.check, service.update);
//La route pour supprimer un utilistaeur
router.delete ('/:id', private.checkJWT, admin.check, service.delete);
//La route pour reccuperer les reservations d'un catway


module.exports = router;
