const express = require('express');
const router = express.Router();

const service = require ('../services/logout');
router.get('/', service.logout, async (req, res) => {
  res.render('index', {
    title: 'Accueil'
  })
});

module.exports = router;