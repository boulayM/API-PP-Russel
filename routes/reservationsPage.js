var express = require('express');
var router = express.Router();
const service = require ('../services/reservationsPage');
const private = require ('../middlewares/private');


router.get('/', service.get, private.checkJWT);

module.exports = router;