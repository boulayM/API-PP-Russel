/**
 * @swagger
 * tags:
 *   - name: Index
 *     description: Routes principales et assemblage des sous-routeurs
 */

var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwaysRoute = require('../routes/catways');
const catwaysPageRoute = require('../routes/catwaysPage');
const reservationsRoute = require('../routes/reservations');
const reservationsPageRoute = require('../routes/reservationsPage');
const homeRoute = require('../routes/home');

const service = require('../services/index');
const serviceLogout = require('../services/logout');

/**
 * @swagger
 * /:
 *   post:
 *     summary: Authentifie un utilisateur
 *     description: |
 *       Retourne un JWT si les identifiants sont corrects.  
 *       Utilisé pour le formulaire de connexion.
 *     tags: [Index]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post('/', service.login);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retourne la page d'accueil
 *     description: Affiche la vue EJS correspondant à la page d'accueil.
 *     tags: [Index]
 *     responses:
 *       200:
 *         description: Page HTML rendue
 */
router.get('/', serviceLogout.logout, async (req, res) => {
  res.render('index', { title: 'Accueil' });
});

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Redirection vers les routes de réservation
 *     tags: [Index]
 *
 * /reservationsPage:
 *   get:
 *     summary: Redirection vers les vues de réservation
 *     tags: [Index]
 *
 * /catways:
 *   get:
 *     summary: Redirection vers les routes Catways
 *     tags: [Index]
 *
 * /catwaysPage:
 *   get:
 *     summary: Redirection vers les vues Catways
 *     tags: [Index]
 *
 * /users:
 *   get:
 *     summary: Redirection vers les routes Utilisateurs
 *     tags: [Index]
 *
 * /home:
 *   get:
 *     summary: Redirection vers la page Home (vue)
 *     tags: [Index]
 */
router.use('/reservations', reservationsRoute);
router.use('/reservationsPage', reservationsPageRoute);
router.use('/catways', catwaysRoute);
router.use('/catwaysPage', catwaysPageRoute);
router.use('/users', userRoute);
router.use('/home', homeRoute);

module.exports = router;
