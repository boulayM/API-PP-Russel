/**
 * @file services/logout.js
 * @description Service responsable de la déconnexion utilisateur. 
 * Il détruit la session, supprime le cookie de session, 
 * puis passe la main au middleware suivant.
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification
 */

/**
 * Middleware de déconnexion.
 *
 * Détruit la session active, supprime le cookie `connect.sid`,
 * puis exécute le middleware suivant.
 *
 * @function logout
 * @param {Object} req - Objet Request Express
 * @param {Object} req.session - Session Express stockée côté serveur
 * @param {Object} res - Objet Response Express
 * @param {Function} next - Fonction permettant de passer au middleware suivant
 *
 * @returns {void}
 *
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnexion utilisateur
 *     description: Détruit la session et supprime le cookie avant de continuer vers le prochain handler.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Déconnexion réussie (redirigé ensuite par la route).
 *       500:
 *         description: Erreur lors de la destruction de la session.
 */
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Could not log out.');
        }
        res.clearCookie('connect.sid');
        next();
    });
};
