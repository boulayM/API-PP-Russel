
var express = require('express');
var router = express.Router();

const service = require ('../services/users');
const private = require ('../middlewares/private');
const validate = require ('../middlewares/usersValidation');
const confirm = require ('../middlewares/confirmDeleteUser');
const admin = require ('../middlewares/admin');


router.get ('/', private.checkJWT, admin.check, service.getAll);
//La route pour lire les infos d'un utilistaeur
router.post ('/:id', private.checkJWT, admin.check, service.getById);
//La route pour ajouter un utilistaeur
router.put ('/add', private.checkJWT, admin.check, validate.validateUser, service.add);
//La route pour modifier un utilistaeur
router.patch ('/:id', private.checkJWT, admin.check, service.update);
//La route pour supprimer un utilistaeur
router.delete ('/:id', private.checkJWT, admin.check, service.delete, confirm.confirmDelete);

router.post('/authenticate', service.authenticate);

module.exports = router;

