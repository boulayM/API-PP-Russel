var express = require('express');
var router = express.Router();
const service = require ('../services/reservationsPage');
const private = require ('../middlewares/private');


router.get('/', private.checkJWT, service.get);

module.exports = router;