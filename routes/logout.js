/**
 * @swagger
 * tags:
 *   - name: Logout
 *     description: Gestion de la déconnexion utilisateur
 */

const express = require('express');
const router = express.Router();

const service = require('../services/logout');

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnecte l'utilisateur
 *     description: 
 *       Supprime les données de session de l'utilisateur puis renvoie la page d'accueil.
 *     tags: [Logout]
 *     responses:
 *       200:
 *         description: Page d'accueil rendue après déconnexion.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/', service.logout, async (req, res) => {
  res.render('index', {
    title: 'Accueil'
  });
});

module.exports = router;
