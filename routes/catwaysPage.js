var express = require('express');
var router = express.Router();
const service = require ('../services/catwaysPage');
const private = require ('../middlewares/private');


router.get('/', private.checkJWT, service.get);

module.exports = router;