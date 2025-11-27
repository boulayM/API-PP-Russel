/**
 * @swagger
 * tags:
 *   name: ReservationsPage
 *   description: Page publique des réservations (affichage EJS)
 */

var express = require('express');
var router = express.Router();

const service = require('../services/reservationsPage');
const authPrivate = require('../middlewares/authPrivate');
const skipAuthIfTest = require('../middlewares/skipAuthIfTest');

/**
 * @swagger
 * /reservationsPage:
 *   get:
 *     summary: Affiche la page des réservations
 *     description: |
 *       Retourne la vue EJS contenant le tableau des réservations.  
 *       ⚠ Protégé par authentification sauf en mode test (skipAuthIfTest).
 *     tags: [ReservationsPage]
 *     responses:
 *       200:
 *         description: Page HTML rendue (EJS)
 *       401:
 *         description: Non autorisé - JWT manquant ou invalide
 */
router.get('/', skipAuthIfTest(authPrivate.checkJWT), service.get);

module.exports = router;
