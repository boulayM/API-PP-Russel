var express = require('express');
var router = express.Router();
const service = require ('../services/reservationsPage');
const authPrivate = require ('../middlewares/authPrivate');
const skipAuthIfTest = require ('../middlewares/skipAuthIfTest');


router.get('/', skipAuthIfTest(authPrivate.checkJWT), service.get);

module.exports = router;