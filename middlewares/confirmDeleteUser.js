/**
 * @file confirmDeleteUser.js
 * @description Middleware vérifiant la présence du champ `confirm` avant suppression d’un utilisateur.
 *
 * @swagger
 * components:
 *   schemas:
 *     ConfirmDeleteError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Confirmation de suppression manquante.
 */

/**
 * Middleware : exige req.body.confirm === "yes" pour autoriser la suppression.
 *
 * @function confirmDeleteUser
 * @param {object} req - Requête Express contenant req.body.confirm
 * @param {object} res - Réponse Express
 * @param {function} next - next()
 * @returns {void}
 *
 * @swagger
 * /users/confirm-delete:
 *   post:
 *     summary: Vérifie que l’utilisateur a confirmé la suppression
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confirm:
 *                 type: string
 *                 example: yes
 *     responses:
 *       200:
 *         description: Confirmation valide — suppression autorisée.
 *       400:
 *         description: Confirmation manquante.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfirmDeleteError'
 */
module.exports = function confirmDeleteUser(req, res, next) {
  if (!req.body || req.body.confirm !== "yes") {
    return res.status(400).json({ message: "Confirmation de suppression manquante." });
  }

  next();
};
