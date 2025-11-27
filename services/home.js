/**
 * @file services/home.js
 * @description Service permettant d'afficher la page d'accueil de l'utilisateur connecté.
 */

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Page d'accueil utilisateur
 */

/**
 * Affiche la page `home` si l'utilisateur est connecté.
 * Si aucun utilisateur n'est en session, l'utilisateur est redirigé vers la page d'accueil publique `/`.
 *
 * @async
 * @function get
 * 
 * @swagger
 * /home:
 *   get:
 *     summary: Affiche la page d'accueil de l'utilisateur connecté
 *     tags: [Home]
 *     description: Vérifie la session, puis rend la vue `home` avec les données utilisateur.
 *     responses:
 *       302:
 *         description: Redirection vers `/` si l'utilisateur n'est pas connecté.
 *       200:
 *         description: Page affichée avec succès.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
exports.get = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/'); 
    }
    res.render('home', { user: req.session.user });
};
