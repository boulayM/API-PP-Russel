/**
 * @file adminConfirm.js
 * @description Middleware pour vérifier que l'utilisateur connecté possède le rôle administrateur.
 *
 * @swagger
 * components:
 *   schemas:
 *     AdminCheckError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Accès réservé aux administrateurs.
 */

/**
 * Middleware : vérifie que req.user existe et possède role = "admin".
 *
 * @function adminConfirm
 * @param {object} req - Objet requête Express avec req.user injecté par JWT
 * @param {object} res - Objet réponse Express
 * @param {function} next - Fonction next()
 * @returns {void}
 *
 * @swagger
 * /auth/admin-check:
 *   get:
 *     summary: Vérifie si l’utilisateur est administrateur
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: L’utilisateur est admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Accès administrateur validé.
 *       403:
 *         description: Accès refusé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminCheckError'
 */
module.exports = function adminConfirm(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs." });
  }

  next();
};
