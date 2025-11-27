var express = require('express');
var router = express.Router();

const service = require ('../services/catways');
const authPrivate = require ('../middlewares/authPrivate');
const admin = require ('../middlewares/adminConfirm');
const skipAuthIfTest = require ('../middlewares/skipAuthIfTest');


router.get ('/', skipAuthIfTest(authPrivate.checkJWT), service.getAll);
//La route pour lire les infos d'un utilistaeur
router.post ('/:id', skipAuthIfTest(authPrivate.checkJWT), service.getById);
//La route pour ajouter un utilistaeur
router.put ('/add', skipAuthIfTest(authPrivate.checkJWT), admin, service.add);
//La route pour modifier un utilistaeur
router.patch ('/:id', skipAuthIfTest(authPrivate.checkJWT), admin, service.update);
//La route pour supprimer un utilistaeur
router.delete ('/:id', skipAuthIfTest(authPrivate.checkJWT), admin, service.delete);
//La route pour reccuperer les reservations d'un catway


module.exports = router;
