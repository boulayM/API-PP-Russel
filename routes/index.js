var express = require('express');
var router = express.Router();


const userRoute = require ('../routes/users');
const catwaysRoute = require('../routes/catways');
const catwaysPageRoute = require ('../routes/catwaysPage');
const reservationsRoute = require('../routes/reservations');
const reservationsPageRoute = require('../routes/reservationsPage');
const homeRoute = require ('../routes/home');

const service = require ('../services/index');
const private = require ('../middlewares/private');

router.post('/', service.login, private.checkJWT);

/* GET home page. */

router.get('/', async (req, res) => {/*
  res.status (200).json({
    name: process.env.APP_NAME,
    version: '1.0',
    status: 200,
    message: 'Bienvenue sur l\'API !'
  });*/

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
