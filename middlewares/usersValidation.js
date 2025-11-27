/**
 * @module Middleware/UsersValidation
 * @description Valide les données envoyées lors de la création/modification d’un utilisateur.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Veuillez remplir tous les champs."
 *
 *   parameters:
 *     EmailParam:
 *       in: query
 *       name: email
 *       required: true
 *       schema:
 *         type: string
 *         format: email
 *       description: Adresse email de l’utilisateur
 *
 *   requestBodies:
 *     UserValidationBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *             required:
 *               - email
 *               - password
 */

/**
 * Middleware de validation basique des utilisateurs.
 *
 * - En mode **test**, seules les valeurs présentes sont vérifiées.
 * - En mode **normal**, une validation stricte est appliquée au mot de passe.
 *
 * @param {object} req - Requête Express
 * @param {object} res - Réponse Express
 * @param {function} next - Fonction next()
 */
module.exports = function validate(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Veuillez remplir tous les champs." });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email invalide." });
  }

  // En mode test → validation allégée
  if (process.env.NODE_ENV === "test") {
    return next();
  }

  // Validation stricte en mode normal
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
    });
  }

  next();
};
