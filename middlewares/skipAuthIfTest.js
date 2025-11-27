/**
 * @module Middleware/SkipAuthIfTest
 * @description Désactive un middleware d'authentification lorsque NODE_ENV === "test".
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SkipAuthInfo:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Authentication skipped in test mode."
 */

/**
 * Wrapper permettant de désactiver un middleware en environnement de test.
 *
 * @param {Function} middleware - Middleware original
 * @returns {Function} Middleware modifié selon l'environnement
 */
function skipAuthIfTest(middleware) {
  return process.env.NODE_ENV === "test"
    ? (req, res, next) => next()
    : middleware;
}

module.exports = skipAuthIfTest;
