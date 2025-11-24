var express = require('express');
var router = express.Router();


const userRoute = require ('../routes/users');
const catwaysRoute = require('../routes/catways');
const catwaysPageRoute = require ('../routes/catwaysPage');
const reservationsRoute = require('../routes/reservations');
const reservationsPageRoute = require('../routes/reservationsPage');
const homeRoute = require ('../routes/home');

const service = require ('../services/index');
const serviceLogout = require ('../services/logout');


router.post('/', service.login);

/* GET home page. */

router.get('/', serviceLogout.logout, async (req, res) => {
  res.render('index', {
    title: 'Accueil'
  })
});


router.use('/reservations', reservationsRoute);
router.use('/reservationsPage', reservationsPageRoute);
router.use ('/catways', catwaysRoute);
router.use('/catwaysPage', catwaysPageRoute);
router.use ('/users', userRoute);
router.use('/home', homeRoute);

module.exports = router;
