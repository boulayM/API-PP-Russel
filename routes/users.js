/* GET users listing. 
On utilise le router d'Express pour définir 4 routes.
On exprime le CRU (Create, Read, Update, Delete).
Pour déclarer une route: app.verbeHttp (route, fonction).
On utilise le router pour appeler le verbe Http GET;
router.get ('/:id', service.getById).
Le CALL-BACK sera fourni par un service qu'on va déclarer.
Recourir à des services permet de structurer le projet et séparer les diverses logiques.
On pourra se resservir de ces mêmes services pour d'autres entités que USERS.
*/

var express = require('express');
var router = express.Router();

const service = require ('../services/users');
const private = require ('../middlewares/private');


router.get ('/', service.getAll, private.checkJWT);
//La route pour lire les infos d'un utilistaeur
router.get ('/:id', service.getById, private.checkJWT);
//La route pour ajouter un utilistaeur
router.put ('/add', service.add, private.checkJWT);
//La route pour modifier un utilistaeur
router.patch ('/:id', service.update, private.checkJWT);
//La route pour supprimer un utilistaeur
router.delete ('/:id', service.delete, private.checkJWT);


module.exports = router;

