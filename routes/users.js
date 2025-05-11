
var express = require('express');
var router = express.Router();

const service = require ('../services/users');
const private = require ('../middlewares/private');
const validate = require ('../middlewares/usersValidation');


router.get ('/', service.getAll, private.checkJWT);
//La route pour lire les infos d'un utilistaeur
router.post ('/:id', service.getById, private.checkJWT);
//La route pour ajouter un utilistaeur
router.put ('/add', service.add, private.checkJWT, validate.validateUser);
//La route pour modifier un utilistaeur
router.patch ('/:id', service.update, private.checkJWT);
//La route pour supprimer un utilistaeur
router.delete ('/:id', service.delete, private.checkJWT);

router.post('/authenticate', service.authenticate);

module.exports = router;

