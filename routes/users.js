
var express = require('express');
var router = express.Router();

const service = require ('../services/users');
const authPrivate = require ('../middlewares/authPrivate');
const validate = require ('../middlewares/usersValidation');
const confirm = require ('../middlewares/confirmDeleteUser');
const adminConfirm = require ('../middlewares/adminConfirm');
const skipAuthIfTest = require ('../middlewares/skipAuthIfTest');


router.get ('/', skipAuthIfTest(authPrivate.checkJWT), adminConfirm, service.getAll);
//La route pour lire les infos d'un utilistaeur
router.post ('/:id', skipAuthIfTest(authPrivate.checkJWT), adminConfirm, service.getById);
//La route pour ajouter un utilistaeur
router.put ('/add', skipAuthIfTest(authPrivate.checkJWT), adminConfirm, validate, service.add);
//La route pour modifier un utilistaeur
router.patch ('/:id', skipAuthIfTest(authPrivate.checkJWT), adminConfirm, service.update);
//La route pour supprimer un utilistaeur
router.delete ('/:id', skipAuthIfTest(authPrivate.checkJWT), adminConfirm, service.delete, confirm);

router.post('/authenticate', service.authenticate);

module.exports = router;

