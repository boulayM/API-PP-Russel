/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Page d'accueil de l'application (vue EJS)
 */

var express = require('express');
var router = express.Router();

const service = require('../services/home');
const authPrivate = require('../middlewares/authPrivate');
const skipAuthIfTest = require('../middlewares/skipAuthIfTest');

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Affiche la page d'accueil
 *     description: |
 *       Page HTML EJS affichant la page principale après connexion.  
 *       ⚠ Route protégée par JWT sauf lors des tests (skipAuthIfTest).
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Page HTML rendue (EJS)
 *       401:
 *         description: Non autorisé — JWT invalide ou manquant
 */
router.get('/', skipAuthIfTest(authPrivate.checkJWT), service.get);

module.exports = router;
