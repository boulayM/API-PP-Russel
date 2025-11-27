/**
 * @file services/catwaysPage.js
 * @description Service chargé d'afficher la page des catways.
 */

/**
 * @swagger
 * tags:
 *   name: CatwaysPage
 *   description: Pages de consultation des catways (Frontend)
 */

/**
 * Affiche la page HTML des catways.
 *
 * @swagger
 * /catwaysPage:
 *   get:
 *     summary: Page d'affichage des catways
 *     tags: [CatwaysPage]
 *     description: Renvoie la page frontend affichant les catways associés.
 *     responses:
 *       200:
 *         description: Page rendue avec succès
 */
exports.get = async (req, res) => {
    res.render('catwaysPage', { user: req.session.user });
};
