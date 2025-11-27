/**
 * @swagger
 * tags:
 *   name: CatwaysPage
 *   description: Page HTML listant les catways
 */

var express = require('express');
var router = express.Router();

const service = require('../services/catwaysPage');
const authPrivate = require('../middlewares/authPrivate');
const skipAuthIfTest = require('../middlewares/skipAuthIfTest');

/**
 * @swagger
 * /catwaysPage:
 *   get:
 *     summary: Affiche la page des catways
 *     tags: [CatwaysPage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Page HTML listant les catways
 *       401:
 *         description: Non autorisé ou token invalide
 */
router.get('/', skipAuthIfTest(authPrivate.checkJWT), service.get);

module.exports = router;
