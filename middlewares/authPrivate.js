/**
 * @file authPrivate.js
 * @description Middleware d’authentification JWT. Vérifie la présence du token, le valide,
 * et injecte le payload dans req.user.
 * 
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     JWTUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 65fc1234abcd7890ef11aa22
 *         email:
 *           type: string
 *           example: user@example.com
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: admin
 */

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "testsecret";

/**
 * Middleware : vérifie qu’un JWT valide est présent.
 *
 * @function checkJWT
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 * @param {function} next - Fonction next()
 *
 * @returns {void}
 *
 * @swagger
 * /auth/check:
 *   get:
 *     summary: Vérifie un token JWT
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token valide.
 *                 user:
 *                   $ref: '#/components/schemas/JWTUser'
 *       401:
 *         description: Token manquant ou invalide
 */
module.exports.checkJWT = (req, res, next) => {
  let token =
    (req.session && req.session.token) ||
    req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token manquant." });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);

    // Injection du payload dans req.user
    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide." });
  }
};
